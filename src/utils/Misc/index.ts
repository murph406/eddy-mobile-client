export function hasNullOrUndefined(obj: Record<string, unknown>): boolean {
  return Object.values(obj).some(value => value === null || value === undefined)
}

export function getRandomInt(min: number = 0, max: number = 1): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getRandomHex(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

export function isValidArraySubset<T>(sourceArray: T[] | null, targetArray: T[] | null): boolean {
  if (targetArray == null || sourceArray == null) return false
  return targetArray.every(item => sourceArray.includes(item))
}

export function timeout(milli: number = 0): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, milli)
  })
}

export function throttle(callback: (...args: unknown[]) => void, delay: number = 1000) {
  let shouldWait = false

  return (...args: unknown[]) => {
    if (shouldWait) return

    callback(...args)
    shouldWait = true
    setTimeout(() => {
      shouldWait = false
    }, delay)
  }
}

export function shortenObj<T extends Record<string, unknown>>(obj: T, n: number): Partial<T> {
  return Object.fromEntries(Object.entries(obj).slice(0, n)) as Partial<T>
}

// Easing functions
export const linear = (t: number): number => t
export const easeInQuad = (t: number): number => t * t
export const easeOutQuad = (t: number): number => t * (2 - t)
export const easeInOutQuad = (t: number): number => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
export const easeInOutCubic = (t: number): number => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2