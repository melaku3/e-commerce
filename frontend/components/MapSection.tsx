import { FaMapMarkerAlt } from "react-icons/fa"

export default function MapSection() {
    return (
        <div className="bg-card rounded-lg shadow-sm p-6 border">
            <h2 className="text-2xl font-semibold mb-4">Our Location</h2>

            <div className="flex items-start mb-4">
                <FaMapMarkerAlt className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <div>
                    <h3 className="font-medium">Korah Group</h3>
                    <p className="text-muted-foreground">Addis Ababa</p>
                    <p className="text-muted-foreground">Ethiopia</p>
                </div>
            </div>

            <div className="aspect-video w-full rounded-md overflow-hidden border">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1242.7331171204146!2d38.7119509240403!3d8.983528748674425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b86c11744f1f5%3A0x78f85ea92cc2c927!2sKorah%20Group!5e0!3m2!1sen!2set!4v1742723902836!5m2!1sen!2set" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Company Location"></iframe>
            </div>
        </div>
    )
}

