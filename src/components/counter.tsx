import { createSignal, onCleanup } from "solid-js"

const format = (number: number) => String(Math.floor(number)).padStart(2, "0")

export const Counter = () => {
  const startTime = Date.now()
  const [time, setTime] = createSignal(0)

  const interval = setInterval(() => setTime(Date.now() - startTime), 11)
  onCleanup(() => clearInterval(interval))

  const days = () => {
    return format(time() / (1000 * 60 * 60 * 24))
  }
  const hours = () => {
    return format((time() % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  }
  const minutes = () => {
    return format((time() % (1000 * 60 * 60)) / (1000 * 60))
  }
  const seconds = () => {
    return format((time() % (1000 * 60)) / 1000)
  }
  const hundredths = () => {
    return format(time() % 100)
  }

  return (
    <p class="font-['Chakra_Petch'] font-medium text-4xl flex items-center gap-x-1_ text-center *:w-6 select-none">
      <span>{days()[0]}</span>
      <span>{days()[1]}</span>
      <span class=" text-sky-500/40">:</span>
      <span>{hours()[0]}</span>
      <span>{hours()[1]}</span>
      <span class=" text-sky-500/40">:</span>
      <span>{minutes()[0]}</span>
      <span>{minutes()[1]}</span>
      <span class=" text-sky-500/40">:</span>
      <span>{seconds()[0]}</span>
      <span>{seconds()[1]}</span>
      <span class=" text-sky-500/40">:</span>
      <span>{hundredths()[0]}</span>
      <span>{hundredths()[1]}</span>
    </p>
  )
}
