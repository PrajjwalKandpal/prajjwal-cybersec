"use client"

import { useEffect, useRef } from "react"

export default function CodeRainEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const codeChars = [
      "0",
      "1",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "GET",
      "POST",
      "HTTP",
      "SSH",
      "TCP",
      "UDP",
      "SCAN",
      "HACK",
      "ROOT",
      "SUDO",
      "EXEC",
      "192.168",
      "127.0",
      "0x",
      "FF",
      "00",
      "アイウエオ",
      "カキクケコ",
      "サシスセソ",
    ]

    const createCodeStream = () => {
      const stream = document.createElement("div")
      stream.className = "code-stream"

      // Random character type
      const charType = Math.random()
      if (charType < 0.4) {
        stream.classList.add("binary")
      } else if (charType < 0.7) {
        stream.classList.add("hex")
      } else {
        stream.classList.add("symbol")
      }

      stream.textContent = codeChars[Math.floor(Math.random() * codeChars.length)]
      stream.style.left = Math.random() * 100 + "vw"
      stream.style.animationDuration = Math.random() * 3 + 2 + "s"
      stream.style.animationDelay = Math.random() * 2 + "s"

      container.appendChild(stream)

      // Remove after animation
      setTimeout(() => {
        if (stream.parentNode) {
          stream.parentNode.removeChild(stream)
        }
      }, 5000)
    }

    // Create streams periodically
    const interval = setInterval(createCodeStream, 300)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div ref={containerRef} className="code-rain fixed inset-0 pointer-events-none z-0" />
}
