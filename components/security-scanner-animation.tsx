"use client"

import { useState, useEffect } from "react"
import { Shield, AlertTriangle, CheckCircle, Zap } from "lucide-react"

interface ScanResult {
  id: string
  type: "vulnerability" | "secure" | "warning" | "critical"
  message: string
  timestamp: string
}

export default function SecurityScannerAnimation() {
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<ScanResult[]>([])

  const scanResults: ScanResult[] = [
    { id: "1", type: "secure", message: "SSL/TLS encryption verified", timestamp: "12:34:01" },
    { id: "2", type: "warning", message: "Outdated dependency detected", timestamp: "12:34:02" },
    { id: "3", type: "secure", message: "Firewall rules validated", timestamp: "12:34:03" },
    { id: "4", type: "vulnerability", message: "Open port 3389 detected", timestamp: "12:34:04" },
    { id: "5", type: "secure", message: "Authentication mechanisms secure", timestamp: "12:34:05" },
    { id: "6", type: "critical", message: "SQL injection vulnerability found", timestamp: "12:34:06" },
    { id: "7", type: "secure", message: "Data encryption compliant", timestamp: "12:34:07" },
  ]

  useEffect(() => {
    if (!isScanning) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          setIsScanning(false)
          return 100
        }

        // Add results progressively
        const resultIndex = Math.floor((newProgress / 100) * scanResults.length)
        if (resultIndex < scanResults.length && !results.find((r) => r.id === scanResults[resultIndex].id)) {
          setResults((prev) => [...prev, scanResults[resultIndex]])
        }

        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [isScanning, results])

  const startScan = () => {
    setIsScanning(true)
    setProgress(0)
    setResults([])
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "secure":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case "vulnerability":
        return <AlertTriangle className="h-4 w-4 text-orange-400" />
      case "critical":
        return <Zap className="h-4 w-4 text-red-400" />
      default:
        return <Shield className="h-4 w-4 text-cyan-400" />
    }
  }

  return (
    <div className="terminal-window security-scan">
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <div className="flex items-center gap-2 ml-4">
          <Shield className="h-4 w-4 text-cyan-400" />
          <span className="text-gray-400 text-sm">Security Scanner</span>
        </div>
        <button
          onClick={startScan}
          disabled={isScanning}
          className="ml-auto px-3 py-1 bg-cyan-600 text-white rounded text-xs hover:bg-cyan-500 disabled:opacity-50"
        >
          {isScanning ? "Scanning..." : "Start Scan"}
        </button>
      </div>

      <div className="p-4 h-64 overflow-y-auto font-mono text-sm bg-black">
        {isScanning && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-cyan-400">Security Scan Progress</span>
              <span className="text-cyan-400">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 relative overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300 data-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {results.map((result, index) => (
            <div
              key={result.id}
              className="flex items-center gap-3 text-xs animate-in slide-in-from-left duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-gray-500">{result.timestamp}</span>
              {getIcon(result.type)}
              <span className="text-gray-300">{result.message}</span>
            </div>
          ))}
        </div>

        {!isScanning && results.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Click "Start Scan" to begin security assessment</p>
          </div>
        )}

        {!isScanning && results.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="text-cyan-400 text-sm">Scan Complete</div>
            <div className="text-gray-300 text-xs mt-1">
              Found {results.filter((r) => r.type === "vulnerability" || r.type === "critical").length} security issues
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
