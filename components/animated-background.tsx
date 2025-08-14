"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
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

    // Particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? "#0891b2" : "#0ea5e9",
      })
    }

    // Network connections
    const connections: Array<{
      start: { x: number; y: number }
      end: { x: number; y: number }
      progress: number
      speed: number
    }> = []

    // Create network connections
    for (let i = 0; i < 10; i++) {
      connections.push({
        start: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        },
        end: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        },
        progress: 0,
        speed: Math.random() * 0.02 + 0.01,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()
      })

      // Draw network connections
      connections.forEach((connection) => {
        connection.progress += connection.speed
        if (connection.progress > 1) {
          connection.progress = 0
          // Reset connection points
          connection.start = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
          }
          connection.end = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
          }
        }

        // Calculate current position
        const currentX = connection.start.x + (connection.end.x - connection.start.x) * connection.progress
        const currentY = connection.start.y + (connection.end.y - connection.start.y) * connection.progress

        // Draw connection line
        ctx.beginPath()
        ctx.moveTo(connection.start.x, connection.start.y)
        ctx.lineTo(currentX, currentY)
        ctx.strokeStyle = "#0891b2"
        ctx.globalAlpha = 0.3
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw pulse dot
        ctx.beginPath()
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2)
        ctx.fillStyle = "#0ea5e9"
        ctx.globalAlpha = 0.8
        ctx.fill()
      })

      ctx.globalAlpha = 1
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.1 }} />
}
