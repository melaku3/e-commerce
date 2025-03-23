import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function FaqSection() {
    return (
        <div className="bg-card rounded-lg shadow-sm p-6 border">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How can I track my order?</AccordionTrigger>
                    <AccordionContent>
                        You can track your order by logging into your account and visiting the &quot;Order History&quot; section.
                        Alternatively, you can use the tracking number provided in your shipping confirmation email.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>What is your return policy?</AccordionTrigger>
                    <AccordionContent>
                        We offer a 30-day return policy for most items. Products must be in their original condition with all tags
                        and packaging. Please visit our{" "}
                        <Link href="/returns" className="text-primary underline">
                            Returns & Refunds
                        </Link>{" "}
                        page for more details.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                    <AccordionContent>
                        Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see
                        the shipping options available to your country during checkout.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                    <AccordionTrigger>How can I change or cancel my order?</AccordionTrigger>
                    <AccordionContent>
                        You can request changes or cancellations within 1 hour of placing your order by contacting our customer
                        support team. After this window, orders may have already been processed for shipping.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className="mt-6 text-center">
                <Link href="#" className="text-primary hover:underline">
                    Visit our Help Center for more answers
                </Link>
            </div>
        </div>
    )
}

