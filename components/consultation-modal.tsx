"use client"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, Loader2, Send } from "lucide-react"
import { submitConsultation } from "@/lib/actions/consultation"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="cyber-button w-full py-3">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Scheduling...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Schedule Consultation
        </>
      )}
    </Button>
  )
}

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [state, formAction] = useActionState(submitConsultation, null)

  // Close modal on successful submission
  if (state?.success) {
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-red-600/50 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-400 flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Schedule Security Consultation
          </DialogTitle>
        </DialogHeader>

        {state?.success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded mb-4 animate-fade-in-up">
            {state.message}
          </div>
        )}

        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded mb-4 animate-fade-in-up">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-red-400 mb-2">
                Full Name *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                className="bg-black/50 border-red-600/50 text-white placeholder:text-gray-500 focus:border-red-400"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-red-400 mb-2">
                Email Address *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="bg-black/50 border-red-600/50 text-white placeholder:text-gray-500 focus:border-red-400"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-red-400 mb-2">
                Company
              </label>
              <Input
                id="company"
                name="company"
                type="text"
                className="bg-black/50 border-red-600/50 text-white placeholder:text-gray-500 focus:border-red-400"
                placeholder="Your Company"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-red-400 mb-2">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                className="bg-black/50 border-red-600/50 text-white placeholder:text-gray-500 focus:border-red-400"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="preferred_date" className="block text-sm font-medium text-red-400 mb-2">
                Preferred Date *
              </label>
              <Input
                id="preferred_date"
                name="preferred_date"
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                className="bg-black/50 border-red-600/50 text-white focus:border-red-400"
              />
            </div>
            <div>
              <label htmlFor="preferred_time" className="block text-sm font-medium text-red-400 mb-2">
                Preferred Time *
              </label>
              <Select name="preferred_time" required>
                <SelectTrigger className="bg-black/50 border-red-600/50 text-white focus:border-red-400">
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-red-600/50">
                  <SelectItem value="09:00">09:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="14:00">02:00 PM</SelectItem>
                  <SelectItem value="15:00">03:00 PM</SelectItem>
                  <SelectItem value="16:00">04:00 PM</SelectItem>
                  <SelectItem value="17:00">05:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="consultation_type" className="block text-sm font-medium text-red-400 mb-2">
                Consultation Type *
              </label>
              <Select name="consultation_type" required>
                <SelectTrigger className="bg-black/50 border-red-600/50 text-white focus:border-red-400">
                  <SelectValue placeholder="Select consultation type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-red-600/50">
                  <SelectItem value="security-assessment">Security Assessment</SelectItem>
                  <SelectItem value="penetration-testing">Penetration Testing</SelectItem>
                  <SelectItem value="vulnerability-audit">Vulnerability Audit</SelectItem>
                  <SelectItem value="incident-response">Incident Response</SelectItem>
                  <SelectItem value="compliance-review">Compliance Review</SelectItem>
                  <SelectItem value="security-training">Security Training</SelectItem>
                  <SelectItem value="general-consultation">General Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="budget_range" className="block text-sm font-medium text-red-400 mb-2">
                Budget Range (INR)
              </label>
              <Select name="budget_range">
                <SelectTrigger className="bg-black/50 border-red-600/50 text-white focus:border-red-400">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-red-600/50">
                  <SelectItem value="under-6k">Under ₹6,000</SelectItem>
                  <SelectItem value="6k-15k">₹6,000 - ₹15,000</SelectItem>
                  <SelectItem value="15k-30k">₹15,000 - ₹30,000</SelectItem>
                  <SelectItem value="30k-50k">₹30,000 - ₹50,000</SelectItem>
                  <SelectItem value="50k-70k">₹50,000 - ₹70,000</SelectItem>
                  <SelectItem value="70k-plus">Above ₹70,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label htmlFor="consultation_topic" className="block text-sm font-medium text-red-400 mb-2">
              Consultation Topic *
            </label>
            <Input
              id="consultation_topic"
              name="consultation_topic"
              type="text"
              required
              className="bg-black/50 border-red-600/50 text-white placeholder:text-gray-500 focus:border-red-400"
              placeholder="e.g., Web Application Security Review, Network Penetration Test"
            />
          </div>

          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-red-400 mb-2">
              Additional Requirements
            </label>
            <Textarea
              id="requirements"
              name="requirements"
              rows={4}
              className="bg-black/50 border-red-600/50 text-white placeholder:text-gray-500 focus:border-red-400 resize-none"
              placeholder="Please describe your specific security concerns, current infrastructure, compliance requirements, or any other relevant details..."
            />
          </div>

          <div className="bg-gray-800/50 border border-red-600/30 rounded-lg p-4">
            <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Consultation Details
            </h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p>• Duration: 30-60 minutes depending on complexity</p>
              <p>• Format: Video call (Google Meet/Zoom) or Phone</p>
              <p>• Follow-up: Detailed report with recommendations</p>
              <p>• Response: Confirmation within 24 hours</p>
            </div>
          </div>

          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  )
}
