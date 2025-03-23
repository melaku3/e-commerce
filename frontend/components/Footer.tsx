import Link from "next/link"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"

export default function Footer() {
    return (
        <footer className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">About Us</h3>
                    <p className="text-muted-foreground">
                        Korah-Store is a modern e-commerce platform offering a seamless shopping experience with quality products.
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/all-products" className="text-muted-foreground hover:text-primary transition-colors">
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Customer Service</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                                Shipping Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                                Returns & Refunds
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Connect With Us</h3>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <FaFacebook size={24} />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <FaTwitter size={24} />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <FaInstagram size={24} />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <FaLinkedin size={24} />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                    </div>
                    <div className="pt-2">
                        <p className="text-muted-foreground">Email: contact@korah-store.com</p>
                        <p className="text-muted-foreground">Phone: +251 95 232 79 74</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-border/40 mt-8 pt-6 text-center">
                <p className="text-muted-foreground">© {new Date().getFullYear()} Korah-Store. All rights reserved.</p>
            </div>
        </footer>
    )
}

