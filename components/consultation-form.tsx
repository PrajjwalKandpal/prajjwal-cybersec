"use client"

import { useState, useEffect } from "react"
import { submitConsultation } from "@/lib/actions/consultation"
import { Calendar, Clock, DollarSign, MessageSquare, User, Mail, Phone, Shield, Terminal, Zap } from "lucide-react"

interface ConsultationFormProps {
  onClose: () => void
}

export default function ConsultationForm({ onClose }: ConsultationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [scanningEffect, setScanningEffect] = useState(false)

  useEffect(() => {
    setScanningEffect(true)
    const timer = setTimeout(() => setScanningEffect(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setMessage("")
    setScanningEffect(true)

    try {
      const result = await submitConsultation(formData)
      if (result.success) {
        setMessage("✓ CONSULTATION REQUEST AUTHENTICATED | RESPONSE INITIATED")
        setTimeout(() => {
          onClose()
        }, 3000)
      } else {
        setMessage("⚠ TRANSMISSION FAILED | RETRY PROTOCOL ACTIVATED")
      }
    } catch (error) {
      setMessage("⚠ CONNECTION ERROR | SECURE CHANNEL COMPROMISED")
    } finally {
      setIsSubmitting(false)
      setScanningEffect(false)
    }
  }

  return (
    <div className="relative">
      {scanningEffect && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="scanning-line"></div>
        </div>
      )}

      <div className="mb-4 p-3 bg-black/50 border border-red-600/30 rounded-lg font-mono text-xs">
        <div className="flex items-center gap-2 text-red-400">
          <Terminal className="h-3 w-3" />
          <span>root@cybersec:~$ init_consultation_protocol</span>
        </div>
        <div className="text-green-400 mt-1">[✓] Secure channel established | Encryption: AES-256</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="cyber-input-group">
            <label className="block text-red-400 text-xs font-mono mb-1 uppercase tracking-wider">
              <User className="inline h-3 w-3 mr-1" />
              Identity_Token *
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full bg-gray-900/80 border border-red-600/30 rounded px-3 py-2 text-white text-sm font-mono focus:border-red-500 focus:outline-none focus:shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all duration-300"
              placeholder="Enter_Full_Name"
            />
          </div>

          <div className="cyber-input-group">
            <label className="block text-red-400 text-xs font-mono mb-1 uppercase tracking-wider">
              <Mail className="inline h-3 w-3 mr-1" />
              Email_Protocol *
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-gray-900/80 border border-red-600/30 rounded px-3 py-2 text-white text-sm font-mono focus:border-red-500 focus:outline-none focus:shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all duration-300"
              placeholder="user@domain.ext"
            />
          </div>

          <div className="cyber-input-group">
            <label className="block text-red-400 text-xs font-mono mb-1 uppercase tracking-wider">
              <Phone className="inline h-3 w-3 mr-1" />
              Contact_Vector *
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full bg-gray-900/80 border border-red-600/30 rounded px-3 py-2 text-white text-sm font-mono focus:border-red-500 focus:outline-none focus:shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all duration-300"
              placeholder="+91_XXXXX_XXXXX"
            />
          </div>

          <div className="cyber-input-group">
            <label className="block text-red-400 text-xs font-mono mb-1 uppercase tracking-wider">
              <Calendar className="inline h-3 w-3 mr-1" />
              Date_Stamp
            </label>
            <input
              type="date"
              name="preferredDate"
              className="w-full bg-gray-900/80 border border-red-600/30 rounded px-3 py-2 text-white text-sm font-mono focus:border-red-500 focus:outline-none focus:shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all duration-300"
            />
          </div>

          <div className="cyber-input-group">
            <label className="block text-red-400 text-xs font-mono mb-1 uppercase tracking-wider">
              <Clock className="inline h-3 w-3 mr-1" />
              Time_Slot
            </label>
            <select
              name="preferredTime"
              className="w-full bg-gray-900/80 border border-red-600/30 rounded px-3 py-2 text-white text-sm font-mono focus:border-red-500 focus:outline-none focus:shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all duration-300"
            >
              <option value="">SELECT_TIME_WINDOW</option>
              <option value="09:00-10:00">09:00_-_10:00_IST</option>
              <option value="10:00-11:00">10:00_-_11:00_IST</option>
              <option value="11:00-12:00">11:00_-_12:00_IST</option>
              <option value="14:00-15:00">14:00_-_15:00_IST</option>
              <option value="15:00-16:00">15:00_-_16:00_IST</option>
              <option value="16:00-17:00">16:00_-_17:00_IST</option>
              <option value="17:00-18:00">17:00_-_18:00_IST</option>
            </select>
          </div>

          <div className="cyber-input-group">
            <label className="block text-red-400 text-xs font-mono mb-1 uppercase tracking-wider">
              <DollarSign className="inline h-3 w-3 mr-1" />
              Budget_Range_INR
            </label>
            <select
              name="budget"
              className="w-full bg-gray-900/80 border border-red-600/30 rounded px-3 py-2 text-white text-sm font-mono focus:border-red-500 focus:outline-none focus:shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all duration-300"
            >
              <option value="">SELECT_BUDGET_TIER</option>
              <option value="under-6000">TIER_1: &lt; ₹6,000</option>
              <option value="6000-15000">TIER_2: ₹6K - ₹15K</option>
              <option value="15000-30000">TIER_3: ₹15K - ₹30K</option>
              <option value="30000-50000">TIER_4: ₹30K - ₹50K</option>
              <option value="50000-70000">TIER_5: ₹50K - ₹70K</option>
              <option value="above-70000">TIER_6: &gt; ₹70K</option>
            </select>
          </div>
        </div>

        <div className="cyber-input-group">
          <label className="block text-red-400 text-xs font-mono mb-1 uppercase tracking-wider">
            <Shield className="inline h-3 w-3 mr-1" />
            Security_Consultation_Type *
          </label>
          <select
            name="consultationType"
            required
            className="w-full bg-gray-900/80 border border-red-600/30 rounded px-3 py-2 text-white text-sm font-mono focus:border-red-500 focus:outline-none focus:shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all duration-300"
          >
            <option value="">SELECT_OPERATION_TYPE</option>
            <option value="penetration-testing">PENTEST_PROTOCOL</option>
            <option value="vulnerability-assessment">VULN_ASSESSMENT</option>
            <option value="security-audit">SECURITY_AUDIT</option>
            <option value="incident-response">INCIDENT_RESPONSE</option>
            <option value="security-training">SECURITY_TRAINING</option>
            <option value="compliance-assessment">COMPLIANCE_CHECK</option>
            <option value="general-consultation">GENERAL_CONSULT</option>
          </select>
        </div>

        <div className="cyber-input-group">
          <label className="block text-red-400 text-xs font-mono mb-1 uppercase tracking-wider">
            <MessageSquare className="inline h-3 w-3 mr-1" />
            Mission_Brief
          </label>
          <textarea
            name="message"
            rows={3}
            className="w-full bg-gray-900/80 border border-red-600/30 rounded px-3 py-2 text-white text-sm font-mono focus:border-red-500 focus:outline-none focus:shadow-[0_0_10px_rgba(239,68,68,0.3)] resize-none"
            placeholder="Describe_security_requirements_infrastructure_threats..."
          />
        </div>

        {message && (
          <div
            className={`p-3 rounded border font-mono text-xs ${
              message.includes("AUTHENTICATED")
                ? "bg-green-600/20 border-green-600/30 text-green-400"
                : "bg-red-600/20 border-red-600/30 text-red-400"
            }`}
          >
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3" />
              {message}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-red-600/20 border border-red-600 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded font-mono text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
          >
            {isSubmitting ? "PROCESSING..." : "INITIATE_CONSULTATION"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 text-gray-400 hover:border-red-600 hover:text-red-400 rounded font-mono text-sm font-semibold transition-all duration-300"
          >
            ABORT
          </button>
        </div>

        <div className="text-xs text-gray-500 text-center font-mono pt-2">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-3 w-3 text-red-600" />
            ENCRYPTED_TRANSMISSION | AES-256 | RESPONSE_TIME: &lt;24H
          </div>
        </div>
      </form>

      <style jsx>{`
        .scanning-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ef4444, transparent);
          animation: scan 2s ease-in-out;
        }
        
        @keyframes scan {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }
        
        .cyber-input-group:hover {
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  )
}
