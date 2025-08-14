"use server"

export async function submitContact(prevState: any, formData: FormData) {
  try {
    const contactData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: (formData.get("company") as string) || null,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      phone: (formData.get("phone") as string) || null,
      service_type: (formData.get("service_type") as string) || null,
      budget_range: (formData.get("budget_range") as string) || null,
    }

    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
      return {
        success: false,
        error: "Please fill in all required fields.",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactData.email)) {
      return {
        success: false,
        error: "Please enter a valid email address.",
      }
    }

    // Log submission for you to see
    console.log("=== NEW CONTACT FROM PORTFOLIO ===")
    console.log("📧 Send response to: professionalworkpj@gmail.com")
    console.log("⏰ Received:", new Date().toLocaleString())
    console.log("👤 From:", contactData.name, `(${contactData.email})`)
    console.log("📱 Phone:", contactData.phone || "Not provided")
    console.log("🏢 Company:", contactData.company || "Not provided")
    console.log("📋 Subject:", contactData.subject)
    console.log("💬 Message:", contactData.message)
    console.log("🔧 Service:", contactData.service_type || "Not specified")
    console.log("💰 Budget:", contactData.budget_range || "Not specified")
    console.log("==================================")

    return {
      success: true,
      message: "Message sent successfully! I'll respond to your email within 24 hours.",
      data: { ...contactData, id: Date.now(), created_at: new Date().toISOString() },
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function getContacts() {
  return {
    success: true,
    data: [],
    message: "Contact retrieval is available after deployment with database integration.",
  }
}
