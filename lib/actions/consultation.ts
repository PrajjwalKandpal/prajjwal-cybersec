"use server"

export async function submitConsultation(formData: FormData) {
  try {
    const consultationData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      preferredDate: formData.get("preferredDate") as string,
      preferredTime: formData.get("preferredTime") as string,
      budget: formData.get("budget") as string,
      consultationType: formData.get("consultationType") as string,
      message: formData.get("message") as string,
      submittedAt: new Date().toISOString(),
    }

    // Validate required fields
    if (
      !consultationData.name ||
      !consultationData.email ||
      !consultationData.phone ||
      !consultationData.consultationType
    ) {
      return { success: false, error: "Please fill in all required fields." }
    }

    // Log consultation request (in production, this would save to database)
    console.log("=== NEW CONSULTATION REQUEST ===")
    console.log("Name:", consultationData.name)
    console.log("Email:", consultationData.email)
    console.log("Phone:", consultationData.phone)
    console.log("Preferred Date:", consultationData.preferredDate || "Not specified")
    console.log("Preferred Time:", consultationData.preferredTime || "Not specified")
    console.log("Budget Range:", consultationData.budget || "Not specified")
    console.log("Consultation Type:", consultationData.consultationType)
    console.log("Message:", consultationData.message || "No additional details")
    console.log("Submitted At:", consultationData.submittedAt)
    console.log("================================")

    // Simulate email notification
    console.log(`📧 Consultation request notification sent to: professionalworkpj@gmail.com`)
    console.log(`Subject: New Consultation Request from ${consultationData.name}`)

    return { success: true }
  } catch (error) {
    console.error("Error submitting consultation:", error)
    return { success: false, error: "Failed to submit consultation request. Please try again." }
  }
}
