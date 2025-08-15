"use client"

import { useEffect, useState } from "react"
import { Shield, Search, Terminal, Award, Target, Eye, Github, Linkedin, Instagram, ExternalLink } from "lucide-react"
import ContactForm from "@/components/contact-form"
import WebSphere from "@/components/web-sphere"
import ConsultationForm from "@/components/consultation-form"

export default function HomePage() {
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const [showConsultationPopup, setShowConsultationPopup] = useState(false)

  const fullText = "Defending the Digital Frontier"

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const getTechnologyUrl = (tech: string) => {
    const techUrls: { [key: string]: string } = {
      Python: "https://www.python.org/",
      "C++": "https://cplusplus.com/",
      Tkinter: "https://docs.python.org/3/library/tkinter.html",
      PIL: "https://pillow.readthedocs.io/",
      "LSB Encryption": "https://en.wikipedia.org/wiki/Bit_manipulation",
      "Burp Suite": "https://portswigger.net/burp",
      Wireshark: "https://www.wireshark.org/",
      "Reverse Engineering Tools": "https://ghidra-sre.org/",
      "OWASP ZAP": "https://www.zaproxy.org/",
      Nmap: "https://nmap.org/",
      "Custom Scripts": "https://github.com/",
      Hashcat: "https://hashcat.net/hashcat/",
      "John the Ripper": "https://www.openwall.com/john/",
      Metasploit: "https://www.metasploit.com/",
      "Kali Linux": "https://www.kali.org/",
      "Aircrack-ng": "https://www.aircrack-ng.org/",
      "Custom Wordlists": "https://github.com/danielmiessler/SecLists",
      "Wireless Tools": "https://www.aircrack-ng.org/",
      "AI/ML Frameworks": "https://tensorflow.org/",
      "Research Methodologies": "https://scholar.google.com/",
    }
    return techUrls[tech] || `https://www.google.com/search?q=${encodeURIComponent(tech)}`
  }

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        if (Math.random() < 0.1) {
          const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
          const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
          setTypedText(fullText.slice(0, i) + glitchChar)
          setTimeout(() => {
            setTypedText(fullText.slice(0, i + 1))
            i++
          }, 50)
        } else {
          setTypedText(fullText.slice(0, i + 1))
          i++
        }
      } else {
        clearInterval(timer)
        setTimeout(() => setShowCursor(false), 2000)
      }
    }, 120)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      const sections = document.querySelectorAll("[data-animate]")
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0
        const sectionId = section.getAttribute("data-animate")
        if (sectionId) {
          setIsVisible((prev) => ({ ...prev, [sectionId]: isInView }))
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン!@#$%^&*()_+-=[]{}|;:,.<>?"
    const matrix = document.querySelector(".matrix-bg")

    if (!matrix) return

    const createChar = () => {
      const char = document.createElement("div")
      const charType = Math.random()

      if (charType < 0.3) {
        char.className = "matrix-char binary"
      } else if (charType < 0.6) {
        char.className = "matrix-char hex"
      } else if (charType < 0.8) {
        char.className = "matrix-char symbol"
      } else {
        char.className = "matrix-char"
      }

      char.textContent = chars[Math.floor(Math.random() * chars.length)]
      char.style.left = Math.random() * 100 + "vw"
      char.style.animationDuration = Math.random() * 4 + 3 + "s"
      char.style.animationDelay = Math.random() * 2 + "s"
      char.style.fontSize = Math.random() * 8 + 10 + "px"
      matrix.appendChild(char)

      setTimeout(() => {
        char.remove()
      }, 7000)
    }

    const interval = setInterval(createChar, 150)
    return () => clearInterval(interval)
  }, [])

  const skills = {
    "Penetration Testing": [
      "Web Application Testing",
      "Network Penetration Testing",
      "Mobile App Security",
      "API Security Testing",
      "Social Engineering",
      "Physical Security Assessment",
    ],
    "Vulnerability Management": [
      "Vulnerability Scanning",
      "Risk Assessment",
      "Threat Modeling",
      "Security Architecture Review",
      "Code Review",
      "Compliance Auditing",
    ],
    "Incident Response": [
      "Digital Forensics",
      "Malware Analysis",
      "Threat Hunting",
      "SIEM Management",
      "Incident Containment",
      "Recovery Planning",
    ],
    "Security Tools": ["Metasploit", "Burp Suite", "Nmap", "Wireshark", "OWASP ZAP", "Nessus"],
    "CTF Challenges": ["Web Exploitation", "OSINT", "Reverse Engineering", "Network Forensics", "Cryptography"],
  }

  const projects = [
    {
      title: "PJSTEGAN - Steganography Tool",
      description:
        "Enhanced steganographic GUI software using Python and C++, implementing encryption algorithms and the Least Significant Bit (LSB) method to improve data security for 15+ departmental users.",
      technologies: ["Python", "C++", "Tkinter", "PIL", "LSB Encryption"],
      impact: "Streamlined secure message embedding processes and enhanced operational efficiency",
      type: "Security Tool Development",
      status: "Completed",
      year: "2024",
    },
    {
      title: "Advanced CTF Challenge Solutions",
      description:
        "Solved 15 high-level Capture The Flag (CTF) challenges across multiple domains including Web 2.0 Exploitation, OSINT, Reverse Engineering, Network Forensics, and Cryptography in a 10-hour marathon.",
      technologies: ["Burp Suite", "Wireshark", "Python", "Reverse Engineering Tools"],
      impact: "Demonstrated expertise across multiple cybersecurity domains",
      type: "CTF Competition",
      status: "Completed",
      year: "2025",
    },
    {
      title: "Web Application Vulnerability Assessment",
      description:
        "Conducted comprehensive vulnerability assessments on web applications, identifying and resolving 95% of critical issues including SQL Injection, XSS, CORS, CSRF, IDOR, and HTML Injection vulnerabilities.",
      technologies: ["Burp Suite", "OWASP ZAP", "Nmap", "Custom Scripts"],
      impact: "Enhanced system security by identifying 20+ critical vulnerabilities",
      type: "Penetration Testing",
      status: "Completed",
      year: "2024",
    },
    {
      title: "Network Traffic Analysis & Cryptography",
      description:
        "Intercepted and analyzed over 500 network packets using Wireshark, successfully cracked complex password hashes with 98% success rate, and accessed encrypted files using advanced cryptographic tools.",
      technologies: ["Wireshark", "Hashcat", "John the Ripper", "Metasploit"],
      impact: "Uncovered critical credential leaks and enhanced security protocols",
      type: "Network Security",
      status: "Completed",
      year: "2024",
    },
    {
      title: "Wireless Network Penetration Testing",
      description:
        "Executed deauthentication attacks, captured Wi-Fi handshake data, and cracked WPA2 encryption with custom wordlists, achieving successful results within 15 minutes.",
      technologies: ["Kali Linux", "Aircrack-ng", "Custom Wordlists", "Wireless Tools"],
      impact: "Demonstrated wireless security vulnerabilities and provided remediation strategies",
      type: "Wireless Security",
      status: "Completed",
      year: "2024",
    },
    {
      title: "Human-Machine Collective Intelligence Research",
      description:
        "Authored research paper on Human-Machine Collective Intelligence at Smart City Scale, showcasing expertise in AI applications and smart city technologies with focus on cybersecurity implications.",
      technologies: ["Python", "AI/ML Frameworks", "Research Methodologies"],
      impact: "Contributed to academic understanding of AI security in smart city environments",
      type: "Security Research",
      status: "Completed",
      year: "2024",
    },
  ]

  const certifications = [
    {
      name: "Google Cybersecurity",
      issuer: "Google",
      year: "2024",
      icon: Shield,
      url: "https://www.coursera.org/account/accomplishments/specialization/S0GDMQORX5FR",
    },
    {
      name: "EHE Essentials",
      issuer: "EC-Council",
      year: "2024",
      icon: Target,
      url: "https://learn.eccouncil.org/certificate/03daf459-5b50-4967-b110-afc0238bf39f?logged=true",
    },
    {
      name: "Cisco Cybersecurity",
      issuer: "Cisco",
      year: "2024",
      icon: Terminal,
      url: "https://www.credly.com/badges/e1a823f4-02cf-4abb-9708-6146213aa0c0/linked_in_profile",
    },
    {
      name: "Azure Fundamentals",
      issuer: "Microsoft",
      year: "2024",
      icon: Award,
      url: "https://learn.microsoft.com/en-us/training/achievements/learn.wwl.describe-cloud-computing.badge?username=PrajjwalKandpal-0873&sharingId=91F0793367C0B0D1",
    },
    {
      name: "Python for Data Science",
      issuer: "IBM",
      year: "2024",
      icon: Eye,
      url: "https://www.credly.com/badges/a7fbd62b-180a-4dda-8875-1a204eb1b2e9/linked_in_profile",
    },
    {
      name: "Remote Sensing & GIS",
      issuer: "ISRO",
      year: "2021",
      icon: Search,
      url: "https://www.linkedin.com/posts/prajjwal-kandpal-529624284_certificate-of-completion-of-course-on-usefulness-activity-7107765412011913216-ozGa?utm_source=share&utm_medium=member_desktop",
    },
  ]

  return (
    <div className="min-h-screen cyber-bg">
      <div className="matrix-bg"></div>

      {showConsultationPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-red-600 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <span className="text-gray-400 text-sm ml-4">consultation_scheduler.exe</span>
              <button
                onClick={() => setShowConsultationPopup(false)}
                className="ml-auto mr-4 text-gray-400 hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4 glitch-text" data-text="Schedule Consultation">
                Schedule Consultation
              </h3>
              <ConsultationForm onClose={() => setShowConsultationPopup(false)} />
            </div>
          </div>
        </div>
      )}

      <section className="h-screen relative overflow-hidden">
        <div className="h-full flex items-center justify-center">
          <div className="scale-125">
            <WebSphere />
          </div>
        </div>
      </section>

      <div className="relative z-40 bg-black">
        <section id="hero" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              background: "radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 70%)",
            }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div
                className={`terminal-window terminal-boot hover-glow transition-all duration-1000 ${
                  isVisible.hero ? "animate-fade-in-up" : "opacity-0 translate-y-10"
                }`}
                data-animate="hero"
              >
                <div className="terminal-header">
                  <div className="terminal-dot red"></div>
                  <div className="terminal-dot yellow"></div>
                  <div className="terminal-dot green"></div>
                  <span className="text-gray-400 text-sm ml-4">prajjwal@cybersec:~$</span>
                </div>
                <div className="p-6 font-mono text-sm">
                  <div className="text-red-400 mb-2">$ whoami</div>
                  <div className="text-white mb-4">prajjwal_kandpal - Cybersecurity Specialist</div>
                  <div className="text-red-400 mb-2">$ cat mission.txt</div>
                  <div className="text-white mb-4">Protecting digital assets through advanced security solutions</div>
                  <div className="text-red-400 mb-2">$ ls skills/</div>
                  <div className="text-white mb-2">penetration_testing/</div>
                  <div className="text-white mb-2">vulnerability_assessment/</div>
                  <div className="text-white mb-2">ctf_challenges/</div>
                  <div className="text-white mb-2">security_tools/</div>
                  <div className="text-red-400 mb-2">$ ./start_mission.sh</div>
                  <div className="text-green-400 typing-animation">
                    Mission initialized. Ready to secure your digital assets.
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glitch-text" data-text={typedText}>
                  <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4">
                    {typedText}
                    {showCursor && <span className="animate-pulse text-red-500">|</span>}
                  </h1>
                </div>
                <p className="text-xl text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                  Cybersecurity Specialist & Ethical Hacker
                </p>
                <p
                  className="text-lg text-gray-400 mb-8 max-w-2xl animate-fade-in-up"
                  style={{ animationDelay: "0.7s" }}
                >
                  Protecting organizations from cyber threats through advanced penetration testing, vulnerability
                  assessments, and comprehensive security solutions. With expertise in both offensive and defensive
                  security, I help businesses stay ahead of evolving threats.
                </p>
                <div
                  className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
                  style={{ animationDelay: "0.9s" }}
                >
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="cyber-button cursor-pointer px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    View My Work
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="border border-red-600 text-red-400 hover:bg-red-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer hover-glow"
                  >
                    Contact Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50 relative">
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center mb-12 transition-all duration-1000 ${
                isVisible.about ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
              data-animate="about"
            >
              <h2 className="text-4xl font-bold text-white mb-4 glitch-text" data-text="About Me">
                About Me
              </h2>
              <p className="text-xl text-gray-400">Dedicated to digital security excellence</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed animate-fade-in-left">
                  With over 2 years of experience in cybersecurity, I specialize in identifying vulnerabilities before
                  malicious actors can exploit them. My approach combines technical expertise with strategic thinking to
                  provide comprehensive security solutions.
                </p>
                <p
                  className="text-lg text-gray-300 leading-relaxed animate-fade-in-left"
                  style={{ animationDelay: "0.2s" }}
                >
                  I hold multiple industry certifications and have successfully secured systems for various
                  organizations. My mission is to make the digital world safer, one system at a time.
                </p>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  {[
                    { value: "25+", label: "Vulnerability Assessments" },
                    { value: "15+", label: "CTF Challenges Solved" },
                    { value: "20+", label: "Critical Vulnerabilities Identified" },
                    { value: "95%", label: "Success Rate" },
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      className="text-center animate-fade-in-up hover-glow cursor-pointer"
                      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                    >
                      <div className="text-3xl font-bold text-red-400 mb-2 glitch-text" data-text={stat.value}>
                        {stat.value}
                      </div>
                      <div className="text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="terminal-window hover-glow animate-fade-in-right">
                <div className="terminal-header">
                  <div className="terminal-dot red"></div>
                  <div className="terminal-dot yellow"></div>
                  <div className="terminal-dot green"></div>
                  <span className="text-gray-400 text-sm ml-4">system_info.sh</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-2">
                  <div className="text-red-400">$ cat /proc/specialist/info</div>
                  <div className="text-white">Name: Prajjwal Kandpal</div>
                  <div className="text-white">Role: Cybersecurity Specialist</div>
                  <div className="text-white">Experience: 2+ years</div>
                  <div className="text-white">Specialization: Penetration Testing & CTF</div>
                  <div className="text-white">Location: India</div>
                  <div className="text-red-400 mt-4">$ uptime</div>
                  <div className="text-white">System uptime: 730 days (2 years)</div>
                  <div className="text-red-400">$ ps aux | grep skills</div>
                  <div className="text-white">ethical_hacking RUNNING</div>
                  <div className="text-white">vulnerability_research RUNNING</div>
                  <div className="text-white">ctf_solving RUNNING</div>
                  <div className="text-white">security_consulting RUNNING</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center mb-12 transition-all duration-1000 ${
                isVisible.skills ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
              data-animate="skills"
            >
              <h2 className="text-4xl font-bold text-white mb-4 glitch-text" data-text="Technical Arsenal">
                Technical Arsenal
              </h2>
              <p className="text-xl text-gray-400">Comprehensive cybersecurity expertise</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, skillList], categoryIndex) => (
                <div
                  key={category}
                  className="terminal-window hover-glow animate-fade-in-up"
                  style={{ animationDelay: `${categoryIndex * 0.2}s` }}
                >
                  <div className="terminal-header">
                    <div className="terminal-dot red"></div>
                    <div className="terminal-dot yellow"></div>
                    <div className="terminal-dot green"></div>
                    <span className="text-gray-400 text-sm ml-4">{category.toLowerCase().replace(" ", "_")}.sh</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-4">{category}</h3>
                    <div className="space-y-3">
                      {skillList.map((skill, index) => {
                        const proficiency = 85 + Math.random() * 15
                        return (
                          <div key={skill} className="flex items-center justify-between group">
                            <span className="text-gray-300 font-mono text-sm group-hover:text-red-400 transition-colors">
                              {skill}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000 ease-out data-bar"
                                  style={{
                                    width: `${proficiency}%`,
                                    animationDelay: `${(categoryIndex * skillList.length + index) * 0.1}s`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-red-400 text-xs font-mono">{Math.floor(proficiency)}%</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-8 text-center animate-fade-in-up">
                Professional Certifications
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {certifications.map((cert, index) => {
                  const IconComponent = cert.icon
                  return (
                    <div
                      key={cert.name}
                      className="text-center group animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-red-600 transition-all duration-300 hover-glow cursor-pointer"
                      >
                        <IconComponent className="h-8 w-8 text-red-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-white font-semibold text-sm">{cert.name}</div>
                        <div className="text-gray-400 text-xs">{cert.issuer}</div>
                        <div className="text-red-400 text-xs">{cert.year}</div>
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center mb-12 transition-all duration-1000 ${
                isVisible.projects ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
              data-animate="projects"
            >
              <h2 className="text-4xl font-bold text-white mb-4 glitch-text" data-text="Security Projects">
                Security Projects
              </h2>
              <p className="text-xl text-gray-400">Real-world cybersecurity implementations</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className="terminal-window group hover:border-red-600/50 transition-all duration-300 hover-glow animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="terminal-header">
                    <div className="terminal-dot red"></div>
                    <div className="terminal-dot yellow"></div>
                    <div className="terminal-dot green"></div>
                    <span className="text-gray-400 text-sm ml-4">project_{index + 1}.md</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">{project.type}</span>
                          <span className="text-gray-400">{project.year}</span>
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              project.status === "Completed"
                                ? "bg-green-600/20 text-green-400"
                                : "bg-yellow-600/20 text-yellow-400"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

                    <div className="mb-4">
                      <div className="text-red-400 text-sm font-semibold mb-2">Technologies Used:</div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <a
                            key={tech}
                            href={getTechnologyUrl(tech)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs font-mono hover:bg-red-600/20 hover:text-red-400 transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            {tech}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-green-400 text-sm font-semibold mb-1">Impact:</div>
                      <div className="text-gray-300 text-sm">{project.impact}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center mb-12 transition-all duration-1000 ${
                isVisible.contact ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
              data-animate="contact"
            >
              <h2 className="text-4xl font-bold text-white mb-4 glitch-text" data-text="Secure Contact">
                Secure Contact
              </h2>
              <p className="text-xl text-gray-400">Let's discuss your cybersecurity needs</p>
            </div>

            <ContactForm />
          </div>
        </section>

        <section id="cta" className="py-16 px-4 sm:px-6 lg:px-8 relative">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.2) 0%, transparent 70%)",
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2
              className="text-4xl font-bold text-white mb-4 glitch-text animate-fade-in-up"
              data-text="Ready to Secure Your Systems?"
            >
              Ready to Secure Your Systems?
            </h2>
            <p className="text-xl text-gray-400 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Let's work together to identify vulnerabilities and strengthen your security posture.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <button
                onClick={() => setShowConsultationPopup(true)}
                className="cyber-button cursor-pointer px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Schedule Consultation
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="border border-red-600 text-red-400 hover:bg-red-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer hover-glow"
              >
                View Portfolio
              </button>
            </div>
          </div>
        </section>

        <footer className="bg-black border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="animate-fade-in-left">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="h-6 w-6 text-red-400" />
                  <span className="font-bold text-xl text-white">Prajjwal Kandpal</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Cybersecurity Specialist dedicated to protecting digital assets and securing the future of technology.
                </p>
                <div className="text-gray-400 text-sm">
                  <div>India</div>
                  <div>professionalworkpj@gmail.com</div>
                  <div>+91 8126252806</div>
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-white font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="hover:text-red-400 transition-colors cursor-pointer">Penetration Testing</li>
                  <li className="hover:text-red-400 transition-colors cursor-pointer">Vulnerability Assessment</li>
                  <li className="hover:text-red-400 transition-colors cursor-pointer">Security Auditing</li>
                  <li className="hover:text-red-400 transition-colors cursor-pointer">Incident Response</li>
                  <li className="hover:text-red-400 transition-colors cursor-pointer">Security Consulting</li>
                </ul>
              </div>

              <div className="animate-fade-in-right" style={{ animationDelay: "0.4s" }}>
                <h3 className="text-white font-semibold mb-4">Connect</h3>
                <div className="flex gap-4 mb-4">
                  <a
                    href="https://linkedin.com/in/prajjwal-kandpal-1n3xpl1c4bl3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    title="LinkedIn Profile"
                  >
                    <div className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 cursor-pointer hover-glow">
                      <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                    </div>
                  </a>
                  <a
                    href="https://github.com/prajjwalkandpal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    title="GitHub Profile"
                  >
                    <div className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 cursor-pointer hover-glow">
                      <Github className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                    </div>
                  </a>
                  <a
                    href="https://instagram.com/prajjwal_kandpal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    title="Instagram Profile"
                  >
                    <div className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 cursor-pointer hover-glow">
                      <Instagram className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                    </div>
                  </a>
                  <a href="mailto:professionalworkpj@gmail.com" className="group" title="Send Email">
                    <div className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 cursor-pointer hover-glow">
                      <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                    </div>
                  </a>
                </div>
                <p className="text-gray-400 text-xs">
                  Follow for cybersecurity insights, threat intelligence, and security best practices.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0 animate-fade-in-left">
                © 2024 Prajjwal Kandpal. Securing the digital frontier.
              </div>
              <div className="flex gap-6 text-gray-400 text-sm animate-fade-in-right">
                <span className="hover:text-red-400 transition-colors cursor-pointer">Privacy Policy</span>
                <span className="hover:text-red-400 transition-colors cursor-pointer">Terms of Service</span>
                <span className="hover:text-red-400 transition-colors cursor-pointer">Security Disclosure</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
//new changes
