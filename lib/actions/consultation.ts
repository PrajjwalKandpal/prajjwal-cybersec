"use server"

export async function submitConsultation(prevState: any, formData: FormData) {
  try {
    const consultationData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: (formData.get("company") as string) || null,
      phone: (formData.get("phone") as string) || null,
      preferred_date: formData.get("preferred_date") as string,
      preferred_time: formData.get("preferred_time") as string,
      consultation_type: formData.get("consultation_type") as string,
      consultation_topic: formData.get("consultation_topic") as string,
      budget_range: (formData.get("budget_range") as string) || null,
      requirements: (formData.get("requirements") as string) || null,
    }

    // Validate required fields
    if (
      !consultationData.name ||
      !consultationData.email ||
      !consultationData.preferred_date ||
      !consultationData.preferred_time ||
      !consultationData.consultation_type ||
      !consultationData.consultation_topic
    ) {
      return {
        success: false,
        error: "Please fill in all required fields.",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(consultationData.email)) {
      return {
        success: false,
        error: "Please enter a valid email address.",
      }
    }

    // Validate date is not in the past
    const selectedDate = new Date(consultationData.preferred_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      return {
        success: false,
        error: "Please select a future date for the consultation.",
      }
    }

    // Log consultation request
    console.log("=== NEW CONSULTATION REQUEST ===")
    console.log("📧 Send response to: professionalworkpj@gmail.com")
    console.log("⏰ Received:", new Date().toLocaleString())
    console.log("👤 From:", consultationData.name, `(${consultationData.email})`)
    console.log("📱 Phone:", consultationData.phone || "Not provided")
    console.log("🏢 Company:", consultationData.company || "Not provided")
    console.log("📅 Preferred Date:", consultationData.preferred_date)
    console.log("🕐 Preferred Time:", consultationData.preferred_time)
    console.log("🔧 Type:", consultationData.consultation_type)
    console.log("📋 Topic:", consultationData.consultation_topic)
    console.log("💰 Budget:", consultationData.budget_range || "Not specified")
    console.log("📝 Requirements:", consultationData.requirements || "None specified")
    console.log("================================")

    return {
      success: true,
      message: "Consultation scheduled successfully! I'll confirm the appointment via email within 24 hours.",
      data: { ...consultationData, id: Date.now(), created_at: new Date().toISOString() },
    }
  } catch (error) {
    console.error("Consultation form error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}
