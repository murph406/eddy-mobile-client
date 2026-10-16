import { logError } from "@/utils/Analytics"
import { useLayoutContext } from "@stores/LayoutContext"
import { MINUTE, SECOND } from "@utils/Vars"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import React from "react"
import { AppState } from "react-native"

type RequestFn<T> = (config: AxiosRequestConfig) => Promise<AxiosResponse<T>>

function useFetch<T = unknown>(key: string, request: RequestFn<T>, rest = {}) {
    if (key == null) throw new Error("key is undefined")
    if (typeof request !== 'function') throw new Error("request must be a function that returns an Axios promise")

    const { state: layoutState, dispatch: layoutDispatch } = useLayoutContext()
    const options = {
        autoFetch: true,
        poll: null,
        pauseInBackground: true,
        timeout: SECOND * 10,
        errorBackoff: SECOND * 5,
        maxErrorBackoff: MINUTE,
        ...rest
    }

    const requestRef = React.useRef<RequestFn<T>>(request)
    const optionsRef = React.useRef<Record<string, any>>(options)
    const intervalRef = React.useRef<number | null>(options.poll)
    const pollingRef = React.useRef<boolean>(options.poll != null)
    const pausedRef = React.useRef<boolean>(false)
    const mountedRef = React.useRef<boolean>(true)
    const controllerRef = React.useRef<AbortController | null>(null)
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const loadingActiveRef = React.useRef<boolean>(false)
    const errorCountRef = React.useRef<number>(0)

    const [firstLoad, setFirstLoad] = React.useState<boolean>(true)
    const [response, setResponse] = React.useState(<AxiosResponse | null>null)
    const [error, setError] = React.useState<Error | null>(null)
    const [lastGet, setLastGet] = React.useState<string | null>(null)
    const [polling, setPolling] = React.useState(options.poll != null)

    requestRef.current = request
    optionsRef.current = options

    React.useEffect(() => {
        mountedRef.current = true
        if (optionsRef.current.autoFetch) get()

        return () => {
            mountedRef.current = false
            clearTimeout(timerRef.current)
            controllerRef.current?.abort()
            if (loadingActiveRef.current) layoutDispatch({ type: 'CLEAR_LOADING_KEY', key })
        }
    }, [])

    React.useEffect(() => {
        if (!optionsRef.current.pauseInBackground) return

        const subscription = AppState.addEventListener('change', (state) => {
            if (state === 'background') {
                pausedRef.current = true
                clearTimeout(timerRef.current)
                controllerRef.current?.abort()
            } else if (state === 'active' && pausedRef.current) {
                pausedRef.current = false
                if (pollingRef.current) get(false)
            }
        })

        return () => subscription.remove()
    }, [])

    async function get(loadingEnabled = true) {
        clearTimeout(timerRef.current)
        controllerRef.current?.abort()

        const controller = new AbortController()
        controllerRef.current = controller

        if (loadingEnabled && !loadingActiveRef.current) {
            loadingActiveRef.current = true
            layoutDispatch({ type: 'SET_LOADING_KEY', key })
        }

        try {
            const res = await requestRef.current({
                signal: controller.signal,
                timeout: optionsRef.current.timeout
            })

            if (!mountedRef.current || controller.signal.aborted) return null
            console.log(res.data)

            errorCountRef.current = 0
            setResponse(res)
            setError(null)
            setLastGet(new Date().toISOString())
            return res
        } catch (err) {
            if (axios.isCancel(err) || controller.signal.aborted) return null

            errorCountRef.current += 1
            logError(err instanceof Error ? err.message : String(err))
            if (mountedRef.current) setError(err instanceof Error ? err : new Error(String(err)))
            return null
        } finally {
            if (controllerRef.current === controller) {
                controllerRef.current = null

                if (mountedRef.current) {
                    setFirstLoad(false)
                    if (loadingActiveRef.current) {
                        loadingActiveRef.current = false
                        layoutDispatch({ type: 'CLEAR_LOADING_KEY', key })
                    }
                    scheduleNext()
                }
            }
        }
    }

    function scheduleNext() {
        clearTimeout(timerRef.current)
        if (!pollingRef.current || pausedRef.current || intervalRef.current == null) return

        const { errorBackoff, maxErrorBackoff } = optionsRef.current
        const delay = errorCountRef.current > 0
            ? Math.min(errorBackoff * 2 ** (errorCountRef.current - 1), maxErrorBackoff)
            : intervalRef.current

        timerRef.current = setTimeout(() => get(false), delay)
    }

    function startPolling(interval = intervalRef.current) {
        if (interval == null) throw new Error("startPolling needs an interval or the poll option")

        intervalRef.current = interval
        pollingRef.current = true
        setPolling(true)
        get(false)
    }

    function stopPolling() {
        pollingRef.current = false
        setPolling(false)
        clearTimeout(timerRef.current)
    }

    function reset() {
        stopPolling()
        controllerRef.current?.abort()
        controllerRef.current = null
        errorCountRef.current = 0

        setFirstLoad(true)
        setResponse(null)
        setError(null)
        setLastGet(null)

        if (loadingActiveRef.current) {
            loadingActiveRef.current = false
            layoutDispatch({ type: 'CLEAR_LOADING_KEY', key })
        }
    }

    return {
        response,
        data: response?.data?.data ?? null,
        status: response?.status ?? null,
        headers: response?.headers ?? null,
        error,
        loading: layoutState.loadingMap[key] || false,
        firstLoad,
        lastGet,
        polling,
        get,
        refetch: () => get(),
        startPolling,
        stopPolling,
        reset
    }
}

export default useFetch