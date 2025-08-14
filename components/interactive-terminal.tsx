"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Terminal } from "lucide-react"

interface Command {
  input: string
  output: string[]
  timestamp: string
}

interface InteractiveTerminalProps {
  title?: string
  initialCommands?: Command[]
  className?: string
}

export default function InteractiveTerminal({
  title = "Terminal",
  initialCommands = [],
  className = "",
}: InteractiveTerminalProps) {
  const [commands, setCommands] = useState<Command[]>(initialCommands)
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const commandDatabase = {
    help: [
      "Available commands:",
      "  help          - Show this help message",
      "  whoami        - Display current user info",
      "  ls            - List directory contents",
      "  cat <file>    - Display file contents",
      "  nmap          - Network scan simulation",
      "  ps            - Show running processes",
      "  netstat       - Display network connections",
      "  clear         - Clear terminal",
      "  hack          - Initialize penetration testing tools",
    ],
    whoami: ["alex_chen - Senior Cybersecurity Specialist"],
    ls: [
      "total 8",
      "drwxr-xr-x  2 alex alex 4096 Dec 14 10:30 exploits/",
      "drwxr-xr-x  2 alex alex 4096 Dec 14 10:30 reports/",
      "drwxr-xr-x  2 alex alex 4096 Dec 14 10:30 tools/",
      "-rw-r--r--  1 alex alex  256 Dec 14 10:30 mission.txt",
      "-rw-r--r--  1 alex alex  512 Dec 14 10:30 credentials.enc",
    ],
    "cat mission.txt": [
      "MISSION: Secure digital infrastructure",
      "OBJECTIVE: Identify and eliminate vulnerabilities",
      "STATUS: Active",
      "CLEARANCE: Level 5",
    ],
    nmap: [
      "Starting Nmap 7.94 ( https://nmap.org )",
      "Nmap scan report for target.local (192.168.1.100)",
      "Host is up (0.0012s latency).",
      "PORT     STATE SERVICE",
      "22/tcp   open  ssh",
      "80/tcp   open  http",
      "443/tcp  open  https",
      "3389/tcp open  ms-wbt-server",
      "",
      "Nmap done: 1 IP address (1 host up) scanned in 2.45 seconds",
    ],
    ps: [
      "  PID TTY          TIME CMD",
      " 1234 pts/0    00:00:01 bash",
      " 1235 pts/0    00:00:00 nmap",
      " 1236 pts/0    00:00:02 metasploit",
      " 1237 pts/0    00:00:00 wireshark",
      " 1238 pts/0    00:00:01 burpsuite",
    ],
    netstat: [
      "Active Internet connections (w/o servers)",
      "Proto Recv-Q Send-Q Local Address           Foreign Address         State",
      "tcp        0      0 192.168.1.50:22         192.168.1.100:54321     ESTABLISHED",
      "tcp        0      0 192.168.1.50:443        203.0.113.1:80          TIME_WAIT",
      "tcp        0      0 192.168.1.50:8080       10.0.0.1:443           ESTABLISHED",
    ],
    hack: [
      "Initializing penetration testing framework...",
      "[+] Loading exploit database",
      "[+] Starting vulnerability scanner",
      "[+] Configuring payload generators",
      "[+] Establishing secure tunnel",
      "[✓] All systems ready for engagement",
      "",
      "WARNING: Use only on authorized targets!",
    ],
  }

  const executeCommand = async (input: string) => {
    const trimmedInput = input.trim().toLowerCase()
    const timestamp = new Date().toLocaleTimeString()

    if (trimmedInput === "clear") {
      setCommands([])
      return
    }

    let output: string[] = []

    if (commandDatabase[trimmedInput as keyof typeof commandDatabase]) {
      output = commandDatabase[trimmedInput as keyof typeof commandDatabase]
    } else if (trimmedInput === "") {
      output = []
    } else {
      output = [`Command not found: ${input}`, "Type 'help' for available commands."]
    }

    const newCommand: Command = {
      input,
      output,
      timestamp,
    }

    setIsTyping(true)

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    setCommands((prev) => [...prev, newCommand])
    setIsTyping(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim() && !isTyping) {
      executeCommand(currentInput)
      setCurrentInput("")
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commands])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <div className="flex items-center gap-2 ml-4">
          <Terminal className="h-4 w-4 text-cyan-400" />
          <span className="text-gray-400 text-sm">{title}</span>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="p-4 h-96 overflow-y-auto font-mono text-sm bg-black"
        onClick={() => inputRef.current?.focus()}
      >
        {commands.map((command, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <span>alex@cybersec:~$</span>
              <span className="text-white">{command.input}</span>
              <span className="text-gray-500 text-xs ml-auto">{command.timestamp}</span>
            </div>
            {command.output.map((line, lineIndex) => (
              <div key={lineIndex} className="text-gray-300 ml-4">
                {line}
              </div>
            ))}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-cyan-400">
            <span>alex@cybersec:~$</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2 text-cyan-400">
          <span>alex@cybersec:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none"
            disabled={isTyping}
            placeholder="Type 'help' for commands..."
          />
        </form>
      </div>
    </div>
  )
}
