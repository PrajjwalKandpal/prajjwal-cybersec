"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Loader2, Send, Shield, Mail, Phone } from "lucide-react"
import { submitContact } from "@/lib/actions/contact"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="cyber-button w-full py-3 text-lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Sending Message...
        </>
      ) : (
        <>
          <Send className="mr-2 h-5 w-5" />
          Send Secure Message
        </>
      )}
    </Button>
  )
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, null)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <div className="terminal-window mb-8 hover-glow">
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <span className="text-gray-400 text-sm ml-4">contact_info.txt</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-red-400 mb-2">$ cat contact_info.txt</div>
              <div className="text-white mb-4">
                <div className="mb-2">Name: Prajjwal Kandpal</div>
                <div className="mb-2">Role: Cybersecurity Specialist</div>
                <div className="mb-2">Location: India</div>
                <div className="mb-2">Timezone: IST (UTC+5:30)</div>
                <div className="mb-4">Status: Available for new projects</div>

                <div className="text-red-400 mb-2">$ ls services/</div>
                <div className="text-white ml-4 space-y-1">
                  <div>• vulnerability_assessment.py</div>
                  <div>• penetration_testing.sh</div>
                  <div>• ctf_challenges.js</div>
                  <div>• network_analysis.rb</div>
                  <div>• steganography_tools.cpp</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-red-600/30 p-6 hover-glow transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-red-400" />
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-gray-400">professionalworkpj@gmail.com</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900/50 border-red-600/30 p-6 hover-glow transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-6 w-6 text-red-400" />
                <div>
                  <h3 className="text-white font-semibold">Phone</h3>
                  <p className="text-gray-400">+91 8126252806</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900/50 border-red-600/30 p-6 hover-glow transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-red-400" />
                <div>
                  <h3 className="text-white font-semibold">Response Time</h3>
                  <p className="text-gray-400">Within 24 hours</p>
                </div>
              </div>
            </Card>

            <div className="bg-gray-900/30 border border-red-600/20 rounded-lg p-6">
              <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Features
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  End-to-end encrypted communications
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Confidential consultation guaranteed
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Fast response within 24 hours
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <Card className="bg-gray-900/50 border-red-600/30 p-8 hover-glow transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-red-400" />
              <h3 className="text-2xl font-bold text-white">Secure Contact Form</h3>
            </div>

            {state?.success && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded mb-6 animate-fade-in-up">
                {state.message}
              </div>
            )}

            {state?.error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded mb-6 animate-fade-in-up">
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
                    className="bg-black/50 border-red-600/50 text-white placeholder:text-gray-500 focus:border-red-400 hover:border-red-500/70 transition-colors"
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
                    className="bg-black/50 border-red-600/50 text-white placeholder:text-gray-500 focus:border-red-400 hover:border-red-500/70 transition-colors"
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
                    className="bg-black/50 border-red-600/50 text-white placeholder:text-gray-500 focus:border-red-400 hover:border-red-500/70 transition-colors"
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
                    className="bg-black/50 border-red-600/50 text-white placeholder:text-gray-500 focus:border-red-400 hover:border-red-500/70 transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="service_type" className="block text-sm font-medium text-red-400 mb-2">
                    Service Type
                  </label>
                  <Select name="service_type">
                    <SelectTrigger className="bg-black/50 border-red-600/50 text-white focus:border-red-400 hover:border-red-500/70 transition-colors">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-red-600/50">
                      <SelectItem value="penetration-testing">Penetration Testing</SelectItem>
                      <SelectItem value="vulnerability-assessment">Vulnerability Assessment</SelectItem>
                      <SelectItem value="incident-response">Incident Response</SelectItem>
                      <SelectItem value="risk-assessment">Risk Assessment</SelectItem>
                      <SelectItem value="compliance-audit">Compliance Audit</SelectItem>
                      <SelectItem value="security-training">Security Training</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="budget_range" className="block text-sm font-medium text-red-400 mb-2">
                    Budget Range
                  </label>
                  <Select name="budget_range">
                    <SelectTrigger className="bg-black/50 border-red-600/50 text-white focus:border-red-400 hover:border-red-500/70 transition-colors">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-red-600/50">
                      <SelectItem value="under-6k">Under ₹6,000</SelectItem>
                      <SelectItem value="6k-15k">₹6,000 - ₹15,000</SelectItem>
                      <SelectItem value="15k-30k">₹15,000 - ₹30,000</SelectItem>
                      <SelectItem value="30k-50k">₹30,000 - ₹50,000</SelectItem>
                      <SelectItem value="50k-70k">₹50,000 - ₹70,000</SelectItem>
                      <SelectItem value="70k-plus">₹70,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-red-400 mb-2">
                  Subject *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="bg-black/50 border-red-600/50 text-white placeholder:text-gray-500 focus:border-red-400 hover:border-red-500/70 transition-colors"
                  placeholder="Security Assessment Request"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-red-400 mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="bg-black/50 border-red-600/50 text-white placeholder:text-gray-500 focus:border-red-400 hover:border-red-500/70 transition-colors resize-none"
                  placeholder="Please describe your security needs, current challenges, and any specific requirements..."
                />
              </div>

              <SubmitButton />

              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  <Shield className="inline h-4 w-4 mr-1" />
                  All communications are encrypted and confidential
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
