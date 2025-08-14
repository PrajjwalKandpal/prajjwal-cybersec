"use client"

import { useState } from "react"
import { Code, Play, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeEditorTerminalProps {
  className?: string
  initialCode?: string
  language?: string
}

export default function CodeEditorTerminal({
  className = "",
  initialCode = "",
  language = "python",
}: CodeEditorTerminalProps) {
  const [code, setCode] = useState(
    initialCode ||
      `# Vulnerability Scanner
import socket
import threading
from datetime import datetime

class VulnScanner:
    def __init__(self, target):
        self.target = target
        self.open_ports = []
    
    def scan_port(self, port):
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1)
            result = sock.connect_ex((self.target, port))
            if result == 0:
                self.open_ports.append(port)
                print(f"[+] Port {port}: Open")
            sock.close()
        except:
            pass
    
    def scan(self, start_port=1, end_port=1000):
        print(f"Scanning {self.target}...")
        threads = []
        
        for port in range(start_port, end_port + 1):
            thread = threading.Thread(target=self.scan_port, args=(port,))
            threads.append(thread)
            thread.start()
        
        for thread in threads:
            thread.join()
        
        print(f"Scan complete. Found {len(self.open_ports)} open ports.")
        return self.open_ports

# Usage
scanner = VulnScanner("192.168.1.100")
open_ports = scanner.scan(1, 100)`,
  )

  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runCode = async () => {
    setIsRunning(true)
    setOutput([])

    // Simulate code execution
    const simulatedOutput = [
      "Scanning 192.168.1.100...",
      "[+] Port 22: Open",
      "[+] Port 80: Open",
      "[+] Port 443: Open",
      "[+] Port 3389: Open",
      "Scan complete. Found 4 open ports.",
      "",
      "Vulnerability Assessment:",
      "[!] SSH service detected on port 22",
      "[!] HTTP service on port 80 (unencrypted)",
      "[+] HTTPS service on port 443",
      "[!] RDP service on port 3389 (high risk)",
      "",
      "Recommendations:",
      "- Disable unused services",
      "- Implement strong authentication",
      "- Use VPN for remote access",
    ]

    for (let i = 0; i < simulatedOutput.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setOutput((prev) => [...prev, simulatedOutput[i]])
    }

    setIsRunning(false)
  }

  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <div className="flex items-center gap-2 ml-4">
          <Code className="h-4 w-4 text-cyan-400" />
          <span className="text-gray-400 text-sm">Code Editor - {language}</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Button
            size="sm"
            variant="ghost"
            onClick={runCode}
            disabled={isRunning}
            className="text-green-400 hover:text-green-300 hover:bg-green-400/10"
          >
            <Play className="h-3 w-3 mr-1" />
            Run
          </Button>
          <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">
            <Save className="h-3 w-3 mr-1" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex h-96">
        {/* Code Editor */}
        <div className="flex-1 p-4 bg-black">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-transparent text-gray-300 font-mono text-sm resize-none outline-none"
            spellCheck={false}
          />
        </div>

        {/* Output Panel */}
        <div className="w-1/2 border-l border-cyan-600/30 bg-gray-900/50">
          <div className="p-2 border-b border-cyan-600/30 bg-gray-800/50">
            <span className="text-cyan-400 text-xs font-mono">Output</span>
          </div>
          <div className="p-4 h-full overflow-y-auto font-mono text-sm">
            {isRunning && (
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                Executing...
              </div>
            )}
            {output.map((line, index) => (
              <div
                key={index}
                className={`
                ${line.startsWith("[+]") ? "text-green-400" : ""}
                ${line.startsWith("[!]") ? "text-yellow-400" : ""}
                ${line.startsWith("[-]") ? "text-red-400" : ""}
                ${!line.startsWith("[") ? "text-gray-300" : ""}
              `}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
