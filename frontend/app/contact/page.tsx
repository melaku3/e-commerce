import type { Metadata } from "next"
import ContactForm from "@/components/ContactForm"
import ContactInfo from "@/components/ContactInfo"
import MapSection from "@/components/MapSection"
import FaqSection from "@/components/FaqSection"
import SocialLinks from "@/components/SocialLinks"

export const metadata: Metadata = {
  title: "Contact Us | Korah-Store",
  description: "Reach out to us for inquiries, support, or feedback. We're here to help!",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;d love to hear from you! Whether you have a question about our products, need help with an order, or want
            to provide feedback, our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-card rounded-lg shadow-sm p-6 border">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div>
            <ContactInfo />

            {/* Map Section */}
            <MapSection />
          </div>
        </div>

        {/* FAQ Section */}
        <FaqSection />

        {/* Social Links */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Connect With Us</h2>
          <SocialLinks />
        </div>
      </div>
    </div>
  )
}

