"use client"

import type React from "react"
import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formStatus, setFormStatus] = useState({ submitted: false, submitting: false, error: false, message: "" })

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value, })

    // Reset form status when user starts typing again
    if (formStatus.submitted) {
      setFormStatus({ submitted: false, submitting: false, error: false, message: "", })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus({ ...formStatus, submitting: true })

    try {
      // Replace with your actual EmailJS service ID, template ID, and public key
      const result = await emailjs.sendForm("service_xmc0kui", "template_usq9wol", formRef.current!, "AmBQrMBsupNC5UPT6")

      if (result.text === "OK") {
        setFormStatus({ submitted: true, submitting: false, error: false, message: "Thank you! Your message has been sent successfully.", })

        // Reset form data
        setFormData({ name: "", email: "", subject: "", message: "", })
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      console.error("Email submission error:", error)
      setFormStatus({ submitted: false, submitting: false, error: true, message: "Oops! Something went wrong. Please try again later.", })
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {formStatus.submitted && !formStatus.error && (
        <Alert className="bg-green-50 border-green-200 text-green-800 mb-6">
          <FaCheckCircle className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{formStatus.message}</AlertDescription>
        </Alert>
      )}

      {formStatus.error && (
        <Alert variant="destructive" className="mb-6">
          <FaExclamationCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formStatus.message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help you?" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your inquiry..." rows={5} required />
      </div>

      <Button type="submit" className="w-full" disabled={formStatus.submitting}>
        {formStatus.submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}

