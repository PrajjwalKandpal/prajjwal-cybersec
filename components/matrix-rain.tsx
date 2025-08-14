"use client"

import { useEffect, useRef } from "react"

interface MatrixRainProps {
  className?: string
}

export default function MatrixRain({ className = "" }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix characters - mix of binary, hex, symbols, and katakana
    const matrixChars = [
      // Binary
      "0",
      "1",
      // Hex
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      // Symbols
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "_",
      "+",
      "=",
      "[",
      "]",
      "{",
      "}",
      "|",
      "\\",
      ":",
      ";",
      '"',
      "'",
      "<",
      ">",
      ",",
      ".",
      "?",
      "/",
      // Katakana (Japanese characters for authentic matrix feel)
      "ア",
      "イ",
      "ウ",
      "エ",
      "オ",
      "カ",
      "キ",
      "ク",
      "ケ",
      "コ",
      "サ",
      "シ",
      "ス",
      "セ",
      "ソ",
      "タ",
      "チ",
      "ツ",
      "テ",
      "ト",
      "ナ",
      "ニ",
      "ヌ",
      "ネ",
      "ノ",
      "ハ",
      "ヒ",
      "フ",
      "ヘ",
      "ホ",
      "マ",
      "ミ",
      "ム",
      "メ",
      "モ",
      "ヤ",
      "ユ",
      "ヨ",
      "ラ",
      "リ",
      "ル",
      "レ",
      "ロ",
      "ワ",
      "ヲ",
      "ン",
    ]

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track the y position of each column
    const drops: number[] = []

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100 // Start above screen
    }

    // Colors for different character types
    const colors = [
      "#dc2626", // Primary red
      "#ef4444", // Lighter red
      "#f87171", // Even lighter red
      "#fca5a5", // Lightest red
      "#ffffff", // White for highlights
    ]

    const draw = () => {
      // Create trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px 'Courier New', monospace`

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)]

        // Color selection based on position and randomness
        let colorIndex = 0
        const rand = Math.random()

        if (rand < 0.03)
          colorIndex = 4 // White highlights (rare)
        else if (rand < 0.1)
          colorIndex = 3 // Lightest red
        else if (rand < 0.3)
          colorIndex = 2 // Light red
        else if (rand < 0.6)
          colorIndex = 1 // Medium red
        else colorIndex = 0 // Primary red

        ctx.fillStyle = colors[colorIndex]

        // Add glow effect for brighter characters
        if (colorIndex >= 3) {
          ctx.shadowColor = colors[colorIndex]
          ctx.shadowBlur = 10
        } else {
          ctx.shadowBlur = 0
        }

        // Draw character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        // Reset drop if it goes off screen or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Move drop down
        drops[i]++

        // Add some randomness to speed
        if (Math.random() > 0.95) {
          drops[i]++
        }
      }
    }

    // Animation loop
    const interval = setInterval(draw, 50) // ~20 FPS for smooth performance

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: "transparent" }}
    />
  )
}
