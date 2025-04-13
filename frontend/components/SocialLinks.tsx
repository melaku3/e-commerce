import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa"
import Link from "next/link"

export default function SocialLinks() {
    return (
        <div className="flex justify-center space-x-6">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-card hover:bg-accent rounded-full p-3 transition-colors" aria-label="Facebook">
                <FaFacebook className="h-6 w-6 text-primary" />
            </Link>

            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-card hover:bg-accent rounded-full p-3 transition-colors" aria-label="Instagram">
                <FaInstagram className="h-6 w-6 text-primary" />
            </Link>

            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-card hover:bg-accent rounded-full p-3 transition-colors" aria-label="Twitter">
                <FaTwitter className="h-6 w-6 text-primary" />
            </Link>

            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-card hover:bg-accent rounded-full p-3 transition-colors" aria-label="LinkedIn">
                <FaLinkedin className="h-6 w-6 text-primary" />
            </Link>

            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-card hover:bg-accent rounded-full p-3 transition-colors" aria-label="YouTube">
                <FaYoutube className="h-6 w-6 text-primary" />
            </Link>
        </div>
    )
}

