import React, { Dispatch } from 'react';

type LoadingValue = boolean | string
export type LayoutAction =
  | { type: 'SET_LOADING_KEY'; key: string; value?: LoadingValue }
  | { type: 'CLEAR_LOADING_KEY'; key: string }
  | { type: 'CLEAR_LOADING' }

export interface LayoutState {
  loadingMap: Record<string, LoadingValue>
  loading: boolean
}

interface LayoutContextValue {
  state: LayoutState
  dispatch: Dispatch<LayoutAction>
}

const LayoutContext = React.createContext<LayoutContextValue | null>(null)
const isEmpty = (map: Record<string, unknown>): boolean => Object.keys(map).length === 0

const layoutReducer = (state: LayoutState, action: LayoutAction): LayoutState => {
  switch (action.type) {
    case 'SET_LOADING_KEY': {
      const newLoadingMap = { ...state.loadingMap }
      newLoadingMap[action.key] = action?.value ?? true

      return {
        ...state,
        loadingMap: newLoadingMap,
        loading: !isEmpty(newLoadingMap)
      }
    }
    case 'CLEAR_LOADING_KEY': {
      const newLoadingMap = { ...state.loadingMap }
      delete newLoadingMap[action.key]

      return {
        ...state,
        loadingMap: newLoadingMap,
        loading: !isEmpty(newLoadingMap)
      }
    }
    case 'CLEAR_LOADING': {
      return {
        ...state,
        loadingMap: {}, 
        loading: false
      }
    }
    default: {
      const exhaustive: never = action
      throw new Error('Unknown action: ' + (exhaustive as { type: string }).type)
    }
  }
}

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(
    layoutReducer,
    {
      loading: false,
      loadingMap: {},
    }
  )

  const value = React.useMemo(() => ({ state, dispatch }), [state])

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayoutContext() {
  const context = React.useContext(LayoutContext)

  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider')
  }

  return context
}