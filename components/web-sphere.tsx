"use client"

import { useEffect, useRef, useState } from "react"

interface Node {
  id: string
  label: string
  x: number
  y: number
  z: number
  targetX: number
  targetY: number
  targetZ: number
  section: string
}

interface Connection {
  from: string
  to: string
  strength: number
}

export default function WebSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  const nodes: Node[] = [
    { id: "home", label: "HOME", x: 0, y: 0, z: 100, targetX: 0, targetY: 0, targetZ: 100, section: "hero" },
    { id: "about", label: "ABOUT", x: 70, y: 70, z: 0, targetX: 70, targetY: 70, targetZ: 0, section: "about" },
    { id: "skills", label: "SKILLS", x: -70, y: 70, z: 0, targetX: -70, targetY: 70, targetZ: 0, section: "skills" },
    {
      id: "projects",
      label: "PROJECTS",
      x: 70,
      y: -70,
      z: 0,
      targetX: 70,
      targetY: -70,
      targetZ: 0,
      section: "projects",
    },
    {
      id: "contact",
      label: "CONTACT",
      x: -70,
      y: -70,
      z: 0,
      targetX: -70,
      targetY: -70,
      targetZ: 0,
      section: "contact",
    },
    { id: "security", label: "SECURITY", x: 0, y: 0, z: -100, targetX: 0, targetY: 0, targetZ: -100, section: "cta" },
  ]

  const connections: Connection[] = [
    { from: "home", to: "about", strength: 0.8 },
    { from: "home", to: "skills", strength: 0.9 },
    { from: "home", to: "projects", strength: 0.7 },
    { from: "home", to: "contact", strength: 0.6 },
    { from: "about", to: "skills", strength: 0.5 },
    { from: "skills", to: "projects", strength: 0.8 },
    { from: "projects", to: "contact", strength: 0.6 },
    { from: "contact", to: "security", strength: 0.7 },
    { from: "security", to: "home", strength: 0.9 },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const centerX = container.offsetWidth / 2
    const centerY = container.offsetHeight / 2

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Auto-rotate
      setRotation((prev) => ({
        x: prev.x + 0.005,
        y: prev.y + 0.003,
      }))

      // Draw connections
      connections.forEach((conn) => {
        const fromNode = nodes.find((n) => n.id === conn.from)
        const toNode = nodes.find((n) => n.id === conn.to)
        if (!fromNode || !toNode) return

        // Apply rotation
        const rotatedFrom = rotatePoint(fromNode, rotation)
        const rotatedTo = rotatePoint(toNode, rotation)

        // Project to 2D
        const fromScreen = project3D(rotatedFrom, centerX, centerY)
        const toScreen = project3D(rotatedTo, centerX, centerY)

        // Draw connection
        const gradient = ctx.createLinearGradient(fromScreen.x, fromScreen.y, toScreen.x, toScreen.y)
        gradient.addColorStop(0, `rgba(220, 38, 38, ${conn.strength * 0.3})`)
        gradient.addColorStop(0.5, `rgba(220, 38, 38, ${conn.strength * 0.6})`)
        gradient.addColorStop(1, `rgba(220, 38, 38, ${conn.strength * 0.3})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = conn.strength * 2
        ctx.beginPath()
        ctx.moveTo(fromScreen.x, fromScreen.y)
        ctx.lineTo(toScreen.x, toScreen.y)
        ctx.stroke()

        // Add animated particles along connections
        const t = (time * 0.001) % 1
        const particleX = fromScreen.x + (toScreen.x - fromScreen.x) * t
        const particleY = fromScreen.y + (toScreen.y - fromScreen.y) * t

        ctx.fillStyle = "rgba(220, 38, 38, 0.8)"
        ctx.beginPath()
        ctx.arc(particleX, particleY, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw nodes
      nodes.forEach((node) => {
        const rotated = rotatePoint(node, rotation)
        const screen = project3D(rotated, centerX, centerY)
        const isHovered = hoveredNode === node.id
        const scale = isHovered ? 1.5 : 1
        const alpha = Math.max(0.3, (rotated.z + 150) / 300)

        // Node glow effect
        if (isHovered) {
          const glowGradient = ctx.createRadialGradient(screen.x, screen.y, 0, screen.x, screen.y, 40 * scale)
          glowGradient.addColorStop(0, "rgba(220, 38, 38, 0.3)")
          glowGradient.addColorStop(1, "rgba(220, 38, 38, 0)")
          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(screen.x, screen.y, 40 * scale, 0, Math.PI * 2)
          ctx.fill()
        }

        // Node circle
        const nodeGradient = ctx.createRadialGradient(screen.x, screen.y, 0, screen.x, screen.y, 15 * scale)
        nodeGradient.addColorStop(0, `rgba(220, 38, 38, ${alpha})`)
        nodeGradient.addColorStop(0.7, `rgba(185, 28, 28, ${alpha * 0.8})`)
        nodeGradient.addColorStop(1, `rgba(127, 29, 29, ${alpha * 0.6})`)

        ctx.fillStyle = nodeGradient
        ctx.strokeStyle = `rgba(220, 38, 38, ${alpha})`
        ctx.lineWidth = isHovered ? 3 : 2
        ctx.beginPath()
        ctx.arc(screen.x, screen.y, 15 * scale, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        // Node label
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.font = `${isHovered ? 14 : 12}px 'Courier New', monospace`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(node.label, screen.x, screen.y - 25 * scale)

        // Pulse effect for hovered node
        if (isHovered) {
          const pulseRadius = 20 + Math.sin(time * 0.01) * 5
          ctx.strokeStyle = `rgba(220, 38, 38, ${0.3 * alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(screen.x, screen.y, pulseRadius, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      let foundNode = null
      nodes.forEach((node) => {
        const rotated = rotatePoint(node, rotation)
        const screen = project3D(rotated, centerX, centerY)
        const distance = Math.sqrt((mouseX - screen.x) ** 2 + (mouseY - screen.y) ** 2)
        if (distance < 25) {
          foundNode = node.id
        }
      })

      setHoveredNode(foundNode)
      canvas.style.cursor = foundNode ? "pointer" : "default"
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      nodes.forEach((node) => {
        const rotated = rotatePoint(node, rotation)
        const screen = project3D(rotated, centerX, centerY)
        const distance = Math.sqrt((mouseX - screen.x) ** 2 + (mouseY - screen.y) ** 2)
        if (distance < 25) {
          scrollToSection(node.section)
        }
      })
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("click", handleClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [rotation, hoveredNode])

  const rotatePoint = (point: Node, rotation: { x: number; y: number }) => {
    const { x, y, z } = point
    const { x: rx, y: ry } = rotation

    // Rotate around Y axis
    const x1 = x * Math.cos(ry) - z * Math.sin(ry)
    const z1 = x * Math.sin(ry) + z * Math.cos(ry)

    // Rotate around X axis
    const y2 = y * Math.cos(rx) - z1 * Math.sin(rx)
    const z2 = y * Math.sin(rx) + z1 * Math.cos(rx)

    return { x: x1, y: y2, z: z2 }
  }

  const project3D = (point: { x: number; y: number; z: number }, centerX: number, centerY: number) => {
    const perspective = 300
    const scale = perspective / (perspective + point.z)
    return {
      x: centerX + point.x * scale,
      y: centerY + point.y * scale,
    }
  }

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-screen z-40 pointer-events-none"
      style={{ height: "100vh" }}
    >
      <canvas ref={canvasRef} className="w-full h-full pointer-events-auto" style={{ background: "transparent" }} />
    </div>
  )
}
