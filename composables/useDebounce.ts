let timerId: any

export default (fn: () => void, delay: number) => {
  clearTimeout(timerId)
  timerId = setTimeout(() => {
    fn()
  }, delay)
}


