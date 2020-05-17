
export function asyncDelay(time: number): Promise<any> {
  return new Promise((resole) => delay(time))
}

export function delay(time: number) {
  setTimeout(null, time)
}

