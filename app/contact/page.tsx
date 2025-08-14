import ContactForm from "@/components/contact-form"
import { Terminal, Shield, Lock, Zap } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen cyber-bg">
      <div className="matrix-bg"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-cyan-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Terminal className="h-6 w-6 text-cyan-400" />
              <span className="font-bold text-xl text-white">Prajjwal Kandpal</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Home
              </a>
              <a href="/#about" className="text-gray-300 hover:text-cyan-400 transition-colors">
                About
              </a>
              <a href="/#skills" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Skills
              </a>
              <a href="/#projects" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Projects
              </a>
              <a href="/contact" className="text-cyan-400">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            <span className="glitch-text" data-text="Get In Touch">
              Get In Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to secure your digital infrastructure? Let's discuss your cybersecurity needs and how I can help
            protect your organization from evolving threats.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-cyan-600/20 rounded-full mb-4">
                <Shield className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Confidential</h3>
              <p className="text-gray-400 text-sm">All communications are secure and confidential</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-cyan-600/20 rounded-full mb-4">
                <Zap className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Fast Response</h3>
              <p className="text-gray-400 text-sm">Response within 24 hours guaranteed</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-cyan-600/20 rounded-full mb-4">
                <Lock className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Encrypted</h3>
              <p className="text-gray-400 text-sm">End-to-end encrypted communication</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <ContactForm />
      </section>

      {/* Footer */}
      <footer className="bg-black/60 py-8 px-4 sm:px-6 lg:px-8 border-t border-cyan-600/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Terminal className="h-5 w-5 text-cyan-400" />
              <span className="text-white font-semibold">Alex Chen - Cybersecurity Specialist</span>
            </div>
            <div className="text-gray-400 font-mono text-sm">$ echo "Defending the Digital Frontier" | base64</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
