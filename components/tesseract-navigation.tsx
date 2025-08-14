"use client"

import { useEffect, useState } from "react"

interface NavigationItem {
  id: string
  label: string
  target: string
  position: { x: number; y: number; z: number }
}

const navigationItems: NavigationItem[] = [
  { id: "home", label: "HOME", target: "hero", position: { x: 0, y: 0, z: 0 } },
  { id: "about", label: "ABOUT", target: "about", position: { x: 100, y: 0, z: 0 } },
  { id: "skills", label: "SKILLS", target: "skills", position: { x: 0, y: 100, z: 0 } },
  { id: "projects", label: "PROJECTS", target: "projects", position: { x: 100, y: 100, z: 0 } },
  { id: "services", label: "SERVICES", target: "services", position: { x: 0, y: 0, z: 100 } },
  { id: "contact", label: "CONTACT", target: "contact", position: { x: 100, y: 0, z: 100 } },
  { id: "experience", label: "EXPERIENCE", target: "experience", position: { x: 0, y: 100, z: 100 } },
  { id: "certifications", label: "CERTS", target: "certifications", position: { x: 100, y: 100, z: 100 } },
]

export default function TesseractNavigation() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x + 0.5,
        y: prev.y + 0.3,
        z: prev.z + 0.2,
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (target: string) => {
    const element = document.getElementById(target)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleItemClick = (target: string) => {
    scrollToSection(target)
    // Add click animation
    const clickEffect = document.createElement("div")
    clickEffect.className = "fixed inset-0 pointer-events-none z-50"
    clickEffect.innerHTML = `
      <div class="absolute inset-0 bg-red-500/10 animate-pulse"></div>
    `
    document.body.appendChild(clickEffect)
    setTimeout(() => document.body.removeChild(clickEffect), 300)
  }

  return (
    <div className="fixed top-8 left-8 z-50">
      <div className="relative w-64 h-64">
        {/* Tesseract Container */}
        <div
          className="absolute inset-0 transform-gpu"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Outer Cube Edges */}
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {/* Front Face Edges */}
            <div className="absolute w-full h-0.5 bg-red-500/30 top-0 left-0" />
            <div className="absolute w-full h-0.5 bg-red-500/30 bottom-0 left-0" />
            <div className="absolute w-0.5 h-full bg-red-500/30 top-0 left-0" />
            <div className="absolute w-0.5 h-full bg-red-500/30 top-0 right-0" />

            {/* Back Face Edges */}
            <div
              className="absolute w-full h-0.5 bg-red-500/30 top-0 left-0"
              style={{ transform: "translateZ(-200px)" }}
            />
            <div
              className="absolute w-full h-0.5 bg-red-500/30 bottom-0 left-0"
              style={{ transform: "translateZ(-200px)" }}
            />
            <div
              className="absolute w-0.5 h-full bg-red-500/30 top-0 left-0"
              style={{ transform: "translateZ(-200px)" }}
            />
            <div
              className="absolute w-0.5 h-full bg-red-500/30 top-0 right-0"
              style={{ transform: "translateZ(-200px)" }}
            />

            {/* Connecting Edges */}
            <div
              className="absolute w-0.5 h-full bg-red-500/30 top-0 left-0"
              style={{ transform: "rotateY(90deg) translateZ(-100px)" }}
            />
            <div
              className="absolute w-0.5 h-full bg-red-500/30 top-0 right-0"
              style={{ transform: "rotateY(90deg) translateZ(100px)" }}
            />
            <div
              className="absolute w-full h-0.5 bg-red-500/30 top-0 left-0"
              style={{ transform: "rotateX(90deg) translateZ(-100px)" }}
            />
            <div
              className="absolute w-full h-0.5 bg-red-500/30 bottom-0 left-0"
              style={{ transform: "rotateX(90deg) translateZ(100px)" }}
            />
          </div>

          {/* Inner Cube Edges (for tesseract effect) */}
          <div
            className="absolute inset-8"
            style={{
              transformStyle: "preserve-3d",
              transform: "scale(0.6) rotateX(45deg) rotateY(45deg)",
            }}
          >
            {/* Inner cube edges with different color */}
            <div className="absolute w-full h-0.5 bg-red-400/40 top-0 left-0" />
            <div className="absolute w-full h-0.5 bg-red-400/40 bottom-0 left-0" />
            <div className="absolute w-0.5 h-full bg-red-400/40 top-0 left-0" />
            <div className="absolute w-0.5 h-full bg-red-400/40 top-0 right-0" />

            <div
              className="absolute w-full h-0.5 bg-red-400/40 top-0 left-0"
              style={{ transform: "translateZ(-150px)" }}
            />
            <div
              className="absolute w-full h-0.5 bg-red-400/40 bottom-0 left-0"
              style={{ transform: "translateZ(-150px)" }}
            />
            <div
              className="absolute w-0.5 h-full bg-red-400/40 top-0 left-0"
              style={{ transform: "translateZ(-150px)" }}
            />
            <div
              className="absolute w-0.5 h-full bg-red-400/40 top-0 right-0"
              style={{ transform: "translateZ(-150px)" }}
            />
          </div>

          {/* Navigation Points */}
          {navigationItems.map((item, index) => (
            <div
              key={item.id}
              className="absolute cursor-pointer group"
              style={{
                transform: `translate3d(${item.position.x - 50}px, ${item.position.y - 50}px, ${item.position.z - 100}px)`,
                transformStyle: "preserve-3d",
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleItemClick(item.target)}
            >
              {/* Navigation Node */}
              <div
                className={`
                  w-4 h-4 rounded-full border-2 transition-all duration-300
                  ${
                    hoveredItem === item.id
                      ? "bg-red-500 border-red-400 shadow-lg shadow-red-500/50 scale-150"
                      : "bg-red-600/50 border-red-500/70 hover:bg-red-500/70"
                  }
                `}
              >
                {/* Pulsing effect */}
                <div
                  className={`
                    absolute inset-0 rounded-full border-2 border-red-400
                    ${hoveredItem === item.id ? "animate-ping" : ""}
                  `}
                />
              </div>

              {/* Label */}
              <div
                className={`
                  absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap
                  text-xs font-mono font-bold transition-all duration-300
                  ${
                    hoveredItem === item.id
                      ? "text-red-400 scale-110 drop-shadow-lg"
                      : "text-red-500/70 hover:text-red-400"
                  }
                `}
              >
                {item.label}
              </div>

              {/* Connection Lines to Center */}
              <div
                className={`
                  absolute top-2 left-2 w-0.5 bg-gradient-to-r from-red-500/30 to-transparent
                  transition-all duration-300
                  ${hoveredItem === item.id ? "shadow-lg shadow-red-500/30" : ""}
                `}
                style={{
                  height: "60px",
                  transform: `rotate(${index * 45}deg) translateY(-30px)`,
                  transformOrigin: "bottom",
                }}
              />
            </div>
          ))}

          {/* Central Core */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              className={`
                w-6 h-6 rounded-full bg-red-500 border-2 border-red-400
                shadow-lg shadow-red-500/50 animate-pulse
                ${hoveredItem ? "scale-125 shadow-red-500/70" : ""}
              `}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 rounded-full bg-red-400/30 animate-ping" />
            </div>
          </div>
        </div>

        {/* Holographic Base */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent rounded-full" />
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-red-400/50 to-transparent rounded-full mt-1" />
        </div>

        {/* Info Panel */}
        {hoveredItem && (
          <div className="absolute top-full left-0 mt-4 p-3 bg-black/80 border border-red-500/30 rounded-lg backdrop-blur-sm">
            <div className="text-red-400 text-sm font-mono">
              NAVIGATE TO: {navigationItems.find((item) => item.id === hoveredItem)?.label}
            </div>
            <div className="text-red-500/70 text-xs mt-1">Click to access section</div>
          </div>
        )}
      </div>
    </div>
  )
}
