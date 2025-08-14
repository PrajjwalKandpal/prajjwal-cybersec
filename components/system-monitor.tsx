"use client"

import { useState, useEffect } from "react"
import { Activity, Cpu, HardDrive, Wifi } from "lucide-react"

interface SystemStats {
  cpu: number
  memory: number
  disk: number
  network: number
}

interface SystemMonitorProps {
  className?: string
}

export default function SystemMonitor({ className = "" }: SystemMonitorProps) {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
  })

  const [processes] = useState([
    { name: "nmap", cpu: 15.2, memory: 45.6, status: "running" },
    { name: "wireshark", cpu: 8.7, memory: 128.4, status: "running" },
    { name: "metasploit", cpu: 22.1, memory: 256.8, status: "running" },
    { name: "burpsuite", cpu: 12.4, memory: 89.2, status: "running" },
    { name: "john", cpu: 45.8, memory: 67.3, status: "running" },
  ])

  const [networkConnections] = useState([
    { local: "192.168.1.50:22", remote: "203.0.113.1:54321", status: "ESTABLISHED" },
    { local: "192.168.1.50:443", remote: "198.51.100.1:80", status: "TIME_WAIT" },
    { local: "192.168.1.50:8080", remote: "10.0.0.1:443", status: "ESTABLISHED" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.random() * 100,
        memory: 60 + Math.random() * 30,
        disk: 45 + Math.random() * 10,
        network: Math.random() * 50,
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (value: number) => {
    if (value > 80) return "text-red-400"
    if (value > 60) return "text-yellow-400"
    return "text-green-400"
  }

  const getBarColor = (value: number) => {
    if (value > 80) return "bg-red-500"
    if (value > 60) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <div className="flex items-center gap-2 ml-4">
          <Activity className="h-4 w-4 text-cyan-400" />
          <span className="text-gray-400 text-sm">System Monitor</span>
        </div>
      </div>

      <div className="p-4 h-96 overflow-y-auto font-mono text-sm bg-black">
        {/* System Stats */}
        <div className="mb-6">
          <div className="text-cyan-400 mb-3 flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            System Resources
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300">CPU Usage</span>
                <span className={getStatusColor(stats.cpu)}>{stats.cpu.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getBarColor(stats.cpu)}`}
                  style={{ width: `${stats.cpu}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300">Memory</span>
                <span className={getStatusColor(stats.memory)}>{stats.memory.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getBarColor(stats.memory)}`}
                  style={{ width: `${stats.memory}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300">Disk I/O</span>
                <span className={getStatusColor(stats.disk)}>{stats.disk.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getBarColor(stats.disk)}`}
                  style={{ width: `${stats.disk}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300">Network</span>
                <span className={getStatusColor(stats.network)}>{stats.network.toFixed(1)} MB/s</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getBarColor(stats.network * 2)}`}
                  style={{ width: `${Math.min(stats.network * 2, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Running Processes */}
        <div className="mb-6">
          <div className="text-cyan-400 mb-3 flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            Security Tools
          </div>
          <div className="space-y-1">
            {processes.map((process, index) => (
              <div key={index} className="flex justify-between items-center text-xs">
                <span className="text-gray-300 w-20">{process.name}</span>
                <span className="text-yellow-400 w-12">{process.cpu}%</span>
                <span className="text-blue-400 w-16">{process.memory}MB</span>
                <span className="text-green-400 w-16">{process.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Network Connections */}
        <div>
          <div className="text-cyan-400 mb-3 flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            Active Connections
          </div>
          <div className="space-y-1">
            {networkConnections.map((conn, index) => (
              <div key={index} className="text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{conn.local}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-gray-300">{conn.remote}</span>
                  <span className={conn.status === "ESTABLISHED" ? "text-green-400" : "text-yellow-400"}>
                    {conn.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
