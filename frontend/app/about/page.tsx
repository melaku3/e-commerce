import type { Metadata } from "next"
import Image from "next/image"
import { ArrowRight, Heart, Package, Shield, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us | Korah-Store",
  description: "Discover our journey, mission, and values. Meet the passionate team driving innovation and quality at Korah-Store.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Story</h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We started with a simple idea: create products that we would want to use ourselves. From our humble
                  beginnings in a small garage to becoming a trusted name in the industry, our journey has been defined
                  by passion, quality, and customer satisfaction.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/all-products">
                  <Button>
                    Shop Our Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">Contact Us</Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto flex items-center justify-center">
              <Image alt="About Us Image" className="rounded-lg object-cover" height="400" src="/story.jpeg" width="600" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Mission & Values</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We&apos;re committed to creating exceptional products that enhance your everyday life while maintaining the
                highest standards of quality and sustainability.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <Card className="bg-background border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Passion</h3>
                <p className="text-muted-foreground">
                  We pour our hearts into every product we create, ensuring each item meets our exacting standards.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Quality</h3>
                <p className="text-muted-foreground">
                  We never compromise on materials or craftsmanship, delivering products that stand the test of time.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-muted-foreground">
                  We believe in building lasting relationships with our customers and giving back to the communities we
                  serve.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* Our History */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mx-auto flex items-center justify-center order-last lg:order-first">
              <Image alt="Company History" className="rounded-lg object-cover" height="400" src="/journey.jpeg" width="600" />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Journey</h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Founded in 2010, our company has grown from a small team of passionate individuals to an industry
                  leader. Through the years, we&apos;ve remained committed to our core values while continuously innovating
                  and expanding our product line.
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">1</span>
                    <div>
                      <h3 className="font-medium">2010: Our Founding</h3>
                      <p className="text-sm text-muted-foreground">Started with just three employees and one product line</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">2</span>
                    <div>
                      <h3 className="font-medium">2015: Expansion</h3>
                      <p className="text-sm text-muted-foreground">Opened our first flagship store and expanded to international markets</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">3</span>
                    <div>
                      <h3 className="font-medium">2020: Innovation</h3>
                      <p className="text-sm text-muted-foreground">Launched our sustainable product line and e-commerce platform</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Sets Us Apart</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">We differentiate ourselves through unwavering commitment to quality, innovation, and customer satisfaction.</p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 mt-12">
            <div className="flex flex-col items-start space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Premium Quality</h3>
              <p className="text-muted-foreground">Every product undergoes rigorous quality testing to ensure it meets our high standards before reaching your hands. </p>
            </div>
            <div className="flex flex-col items-start space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Sustainable Practices</h3>
              <p className="text-muted-foreground">We&apos;re committed to reducing our environmental footprint through eco-friendly materials and responsible manufacturing.</p>
            </div>
            <div className="flex flex-col items-start space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Customer-Centric Approach</h3>
              <p className="text-muted-foreground">We listen to our customers and continuously improve our products based on your valuable feedback.</p>
            </div>
            <div className="flex flex-col items-start space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Community Involvement</h3>
              <p className="text-muted-foreground">We actively participate in community initiatives and donate a portion of our profits to charitable causes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Team</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">The passionate individuals behind our brand who work tirelessly to bring our vision to life.</p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-12">
            <div className="flex flex-col items-center space-y-4">
              <Image alt="Team Member" className="rounded-full object-cover" height="120" src="/avatar1.jpg" width="120" />
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">Angle Know</h3>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Image alt="Team Member" className="rounded-full object-cover" height="120" src="/avatar2.png" width="120" />
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">Bezawit Abebe</h3>
                <p className="text-sm text-muted-foreground">Head of Design</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Image alt="Team Member" className="rounded-full object-cover" height="120" src="/avatar3.jpg" width="120" />
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">Biruk Tesfaye</h3>
                <p className="text-sm text-muted-foreground">Product Development</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Journey</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Be part of our story as we continue to grow and innovate. Explore our products and experience the difference.</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/all-products">
                <Button size="lg">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

