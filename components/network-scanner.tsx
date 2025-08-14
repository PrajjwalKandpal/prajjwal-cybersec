"use client"

import { useState } from "react"
import { Wifi, Shield, AlertTriangle, CheckCircle } from "lucide-react"

interface ScanResult {
  ip: string
  hostname: string
  ports: number[]
  os: string
  status: "online" | "offline" | "filtered"
  vulnerabilities: string[]
}

interface NetworkScannerProps {
  className?: string
}

export default function NetworkScanner({ className = "" }: NetworkScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [results, setResults] = useState<ScanResult[]>([])

  const mockResults: ScanResult[] = [
    {
      ip: "192.168.1.1",
      hostname: "router.local",
      ports: [22, 80, 443],
      os: "Linux 3.x",
      status: "online",
      vulnerabilities: ["Weak SSH configuration", "Default credentials"],
    },
    {
      ip: "192.168.1.100",
      hostname: "server.local",
      ports: [22, 80, 443, 3389],
      os: "Windows Server 2019",
      status: "online",
      vulnerabilities: ["RDP exposed", "Unpatched SMB service"],
    },
    {
      ip: "192.168.1.150",
      hostname: "workstation.local",
      ports: [135, 445],
      os: "Windows 10",
      status: "online",
      vulnerabilities: ["SMB v1 enabled"],
    },
    {
      ip: "192.168.1.200",
      hostname: "printer.local",
      ports: [80, 631],
      os: "Embedded Linux",
      status: "online",
      vulnerabilities: ["Default admin password", "Unencrypted web interface"],
    },
  ]

  const startScan = async () => {
    setIsScanning(true)
    setScanProgress(0)
    setResults([])

    // Simulate scanning progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setScanProgress(i)

      // Add results progressively
      if (i === 25) setResults([mockResults[0]])
      if (i === 50) setResults([mockResults[0], mockResults[1]])
      if (i === 75) setResults([mockResults[0], mockResults[1], mockResults[2]])
      if (i === 100) setResults(mockResults)
    }

    setIsScanning(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "offline":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      default:
        return <Shield className="h-4 w-4 text-yellow-400" />
    }
  }

  const getRiskLevel = (vulnerabilities: string[]) => {
    if (vulnerabilities.length >= 3) return { level: "High", color: "text-red-400" }
    if (vulnerabilities.length >= 2) return { level: "Medium", color: "text-yellow-400" }
    if (vulnerabilities.length >= 1) return { level: "Low", color: "text-orange-400" }
    return { level: "None", color: "text-green-400" }
  }

  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <div className="flex items-center gap-2 ml-4">
          <Wifi className="h-4 w-4 text-cyan-400" />
          <span className="text-gray-400 text-sm">Network Scanner</span>
        </div>
      </div>

      <div className="p-4 h-96 overflow-y-auto font-mono text-sm bg-black">
        {/* Scan Controls */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-cyan-400">Network Range: 192.168.1.0/24</span>
            <button
              onClick={startScan}
              disabled={isScanning}
              className="px-3 py-1 bg-cyan-600 text-white rounded text-xs hover:bg-cyan-500 disabled:opacity-50"
            >
              {isScanning ? "Scanning..." : "Start Scan"}
            </button>
          </div>

          {isScanning && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300 text-xs">Progress</span>
                <span className="text-cyan-400 text-xs">{scanProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 bg-cyan-500 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <div className="text-cyan-400 mb-2">Scan Results ({results.length} hosts found)</div>

            {results.map((result, index) => (
              <div key={index} className="border border-gray-700 rounded p-3 bg-gray-900/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span className="text-white font-semibold">{result.ip}</span>
                    <span className="text-gray-400">({result.hostname})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{result.os}</span>
                    <span className={`text-xs ${getRiskLevel(result.vulnerabilities).color}`}>
                      {getRiskLevel(result.vulnerabilities).level} Risk
                    </span>
                  </div>
                </div>

                <div className="mb-2">
                  <span className="text-gray-400 text-xs">Open Ports: </span>
                  <span className="text-green-400 text-xs">{result.ports.join(", ")}</span>
                </div>

                {result.vulnerabilities.length > 0 && (
                  <div>
                    <span className="text-red-400 text-xs">Vulnerabilities:</span>
                    <ul className="ml-4 mt-1">
                      {result.vulnerabilities.map((vuln, vIndex) => (
                        <li key={vIndex} className="text-yellow-400 text-xs">
                          • {vuln}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!isScanning && results.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <Wifi className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Click "Start Scan" to discover network devices</p>
          </div>
        )}
      </div>
    </div>
  )
}
