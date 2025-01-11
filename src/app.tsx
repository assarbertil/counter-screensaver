import { createSignal, onCleanup } from "solid-js"
import { Counter } from "./components/counter"
import { getCurrentWindow } from "@tauri-apps/api/window"

const closeWindow = async () => {
  await getCurrentWindow().close()
}

export const App = () => {
  const [initialMousePosition, setInitialMousePosition] = createSignal({
    x: 0,
    y: 0,
  })

  const getInitialMousePosition = (event: MouseEvent) => {
    setInitialMousePosition({ x: event.clientX, y: event.clientY })
  }

  const closeOnMouseMove = (event: MouseEvent) => {
    const { x, y } = initialMousePosition()

    const distanceFromInitial = Math.sqrt(
      (event.clientX - x) ** 2 + (event.clientY - y) ** 2
    )

    if (distanceFromInitial > 100) {
      closeWindow()
    }
  }

  document.addEventListener("mousemove", getInitialMousePosition, {
    once: true,
  })
  document.addEventListener("mousemove", closeOnMouseMove)
  document.addEventListener("mousedown", closeWindow)
  document.addEventListener("keydown", closeWindow)

  onCleanup(() => {
    document.removeEventListener("mousemove", getInitialMousePosition)
    document.removeEventListener("mousemove", closeOnMouseMove)
    document.removeEventListener("mousedown", closeWindow)
    document.removeEventListener("keydown", closeWindow)
  })

  return (
    <div class="fixed inset-0 flex items-center justify-center">
      <Counter />
    </div>
  )
}
