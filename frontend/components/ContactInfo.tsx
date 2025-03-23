import { FaEnvelope, FaPhone, FaClock } from "react-icons/fa"

export default function ContactInfo() {
    return (
        <div className="bg-card rounded-lg shadow-sm p-6 border mb-6">
            <h2 className="text-2xl font-semibold mb-6">Customer Support</h2>

            <div className="space-y-4">
                <div className="flex items-start">
                    <FaEnvelope className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                    <div>
                        <h3 className="font-medium">Email Us</h3>
                        <p className="text-muted-foreground">support@korah-store.com</p>
                        <p className="text-sm text-muted-foreground">We&apos;ll respond within 24 hours</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <FaPhone className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                    <div>
                        <h3 className="font-medium">Call Us</h3>
                        <p className="text-muted-foreground">+251 95 232 79 74</p>
                        <p className="text-sm text-muted-foreground">Toll-free for US customers</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <FaClock className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                    <div>
                        <h3 className="font-medium">Business Hours</h3>
                        <p className="text-muted-foreground">Monday - Friday: 3PM - 12AM EAT</p>
                        <p className="text-muted-foreground">Saturday: 10AM - 4PM EAT</p>
                        <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

