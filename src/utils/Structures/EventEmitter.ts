type Callback<T = unknown> = (data: T) => void

class EventEmitter {
  private listeners: Map<string, Callback[]>

  constructor() {
    this.listeners = new Map()
  }

  on(event: string, callback: Callback): this {
    if (!this.listeners.has(event)) this.listeners.set(event, [])
    this.listeners.get(event)!.push(callback)
    return this
  }

  off(event: string, callback: Callback): void {
    if (!this.listeners.has(event)) return
    const callbacks = this.listeners.get(event)!
    const index = callbacks.indexOf(callback)
    if (index > -1) callbacks.splice(index, 1)
  }

  emit<T>(event: string, data: T): void {
    if (!this.listeners.has(event)) this.listeners.set(event, [])
    this.listeners.get(event)!.forEach(callback => callback(data))
  }

  removeAllListeners(event?: string): void {
    if (event) this.listeners.delete(event)
    else this.listeners.clear()
  }
}

export default EventEmitter