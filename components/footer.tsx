"use client"

import type React from "react"

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <footer className="bg-black text-white mt-12 sm:mt-16">
      {/* Main Footer Content */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 border-t-4 sm:border-t-8 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Company Info */}
            <div className="bg-cyan-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
              <h3 className="text-2xl sm:text-3xl font-black text-black mb-3 sm:mb-4">BRUTESHOP</h3>
              <p className="text-sm sm:text-base font-bold text-black mb-4">
                The most BRUTAL shopping experience online. We deliver quality products with an attitude!
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-black" />
                  <span className="text-sm font-bold text-black">+1 (555) BRUTAL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-black" />
                  <span className="text-sm font-bold text-black">hello@bruteshop.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-black" />
                  <span className="text-sm font-bold text-black">123 Brutal St, NYC</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-lime-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
              <h4 className="text-lg sm:text-xl font-black text-black mb-3 sm:mb-4">QUICK LINKS</h4>
              <ul className="space-y-2">
                {["SHOP", "CATEGORIES", "DEALS", "NEW ARRIVALS", "BEST SELLERS", "ABOUT US"].map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="text-sm sm:text-base font-bold text-black hover:text-white transition-colors block py-1"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className="bg-orange-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
              <h4 className="text-lg sm:text-xl font-black text-black mb-3 sm:mb-4">CUSTOMER SERVICE</h4>
              <ul className="space-y-2">
                {["CONTACT US", "SHIPPING INFO", "RETURNS", "SIZE GUIDE", "FAQ", "TRACK ORDER"].map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="text-sm sm:text-base font-bold text-black hover:text-white transition-colors block py-1"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-pink-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
              <h4 className="text-lg sm:text-xl font-black text-black mb-3 sm:mb-4">STAY BRUTAL</h4>
              <p className="text-sm sm:text-base font-bold text-black mb-4">Get the latest deals and brutal updates!</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="YOUR EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white border-2 border-black font-bold text-black placeholder:text-gray-600 focus:ring-0 focus:border-black text-sm sm:text-base py-2 sm:py-3"
                />
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] transition-all py-2 sm:py-3 text-sm sm:text-base"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  SUBSCRIBE
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-red-500 border-t-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-black text-black mb-2">FOLLOW THE BRUTALITY</h4>
              <p className="text-sm sm:text-base font-bold text-black">Join our brutal community!</p>
            </div>
            <div className="flex space-x-3 sm:space-x-4">
              {[
                { icon: Facebook, color: "bg-blue-600", label: "Facebook" },
                { icon: Twitter, color: "bg-sky-500", label: "Twitter" },
                { icon: Instagram, color: "bg-pink-600", label: "Instagram" },
                { icon: Youtube, color: "bg-red-600", label: "YouTube" },
              ].map(({ icon: Icon, color, label }) => (
                <Link key={label} href={`#${label.toLowerCase()}`}>
                  <Button
                    className={`${color} hover:opacity-80 text-white border-2 sm:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] transition-all p-2 sm:p-3`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">{label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black border-t-4 border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-base font-bold text-white">© 2024 BRUTESHOP. ALL RIGHTS RESERVED.</p>
              <p className="text-xs sm:text-sm font-bold text-gray-400 mt-1">DESIGNED WITH BRUTAL LOVE ❤️</p>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
              {["PRIVACY POLICY", "TERMS OF SERVICE", "COOKIES"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase().replace(" ", "-")}`}
                  className="text-xs sm:text-sm font-bold text-gray-400 hover:text-white transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30">
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-yellow-400 hover:bg-yellow-500 text-black border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] transition-all p-2 sm:p-3 rounded-none"
        >
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 rotate-[-90deg]" />
          <span className="sr-only">Back to top</span>
        </Button>
      </div>
    </footer>
  )
}
