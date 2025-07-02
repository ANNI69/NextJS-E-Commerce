"use client"
import { Target, Zap, Heart, Award, Globe } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "../../components/footer"

const teamMembers = [
  {
    name: "ALEX BRUTAL",
    role: "CEO & FOUNDER",
    image: "https://i.ibb.co/DgfVBSbs/46.png",
    bio: "Visionary behind the brutal revolution in fashion.",
    color: "bg-pink-500",
  },
  {
    name: "SARAH NEON",
    role: "CREATIVE DIRECTOR",
    image: "https://i.ibb.co/q3dyQt26/50.png",
    bio: "Master of brutal aesthetics and bold designs.",
    color: "bg-cyan-400",
  },
  {
    name: "MIKE CYBER",
    role: "HEAD OF TECH",
    image: "https://i.ibb.co/qMyxfrSW/42.png",
    bio: "Building the most brutal shopping experience.",
    color: "bg-lime-400",
  },
  {
    name: "LUNA FIERCE",
    role: "BRAND MANAGER",
    image: "https://i.ibb.co/xqnyBzSP/Avatar-25.png",
    bio: "Spreading the brutal message worldwide.",
    color: "bg-orange-400",
  },
]

const values = [
  {
    icon: Zap,
    title: "BRUTAL QUALITY",
    description: "We never compromise on quality. Every product is built to last and make a statement.",
    color: "bg-yellow-400",
  },
  {
    icon: Heart,
    title: "CUSTOMER OBSESSED",
    description: "Our customers are at the heart of everything we do. Your satisfaction is our mission.",
    color: "bg-pink-500",
  },
  {
    icon: Globe,
    title: "GLOBAL IMPACT",
    description: "Making a positive impact on communities and the environment through brutal innovation.",
    color: "bg-cyan-400",
  },
  {
    icon: Award,
    title: "EXCELLENCE",
    description: "Striving for excellence in every aspect of our business, from products to service.",
    color: "bg-lime-400",
  },
]

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-500 p-4 sm:p-8 border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-black text-black mb-2 sm:mb-4">ABOUT BRUTESHOP</h1>
          <p className="text-base sm:text-xl font-bold text-black">The story behind the brutal revolution!</p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="bg-yellow-400 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black text-black mb-4 sm:mb-6">OUR BRUTAL STORY</h2>
            <p className="text-sm sm:text-base font-bold text-black mb-4">
              Founded in 2020, BRUTESHOP emerged from a simple idea: fashion should be bold, unapologetic, and brutally
              honest. We were tired of bland, cookie-cutter designs that lacked personality and edge.
            </p>
            <p className="text-sm sm:text-base font-bold text-black mb-4">
              What started as a small collection of statement pieces has grown into a global movement. We believe that
              your style should reflect your attitude, and our products are designed for those who aren't afraid to
              stand out.
            </p>
            <p className="text-sm sm:text-base font-bold text-black">
              Today, we serve thousands of customers worldwide who share our passion for brutal aesthetics and
              uncompromising quality.
            </p>
          </div>
          <div className="bg-pink-500 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-8">
            <img
              src="https://i.ibb.co/zT42QZy3/Chat-GPT-Image-Jul-2-2025-05-55-26-PM.png"
              alt="Our story"
              className="w-full h-64 sm:h-80 object-cover border-2 border-black mb-4"
            />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-black">50K+</div>
                <div className="text-xs sm:text-sm font-bold text-black">CUSTOMERS</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-black">500+</div>
                <div className="text-xs sm:text-sm font-bold text-black">PRODUCTS</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-black">25+</div>
                <div className="text-xs sm:text-sm font-bold text-black">COUNTRIES</div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-black mb-4">OUR BRUTAL VALUES</h2>
            <p className="text-base sm:text-lg font-bold text-gray-700">The principles that drive our brutal mission</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div
                  key={index}
                  className={`${value.color} border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 text-center`}
                >
                  <IconComponent className="h-8 w-8 sm:h-12 sm:w-12 text-black mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-black text-black mb-2 sm:mb-3">{value.title}</h3>
                  <p className="text-xs sm:text-sm font-bold text-black">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-black mb-4">MEET THE BRUTAL TEAM</h2>
            <p className="text-base sm:text-lg font-bold text-gray-700">The masterminds behind the brutality</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`${member.color} border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6`}
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-48 sm:h-64 object-cover mb-4"
                />
                <h3 className="text-lg sm:text-xl font-black text-black mb-1">{member.name}</h3>
                <p className="text-sm sm:text-base font-bold text-black mb-2">{member.role}</p>
                <p className="text-xs sm:text-sm font-bold text-black">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-8 text-center">
          <Target className="h-12 w-12 sm:h-16 sm:w-16 text-black mx-auto mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl font-black text-black mb-4 sm:mb-6">OUR BRUTAL MISSION</h2>
          <p className="text-base sm:text-xl font-bold text-black max-w-4xl mx-auto">
            "To empower individuals to express their authentic selves through bold, uncompromising fashion that
            challenges the status quo and celebrates the beauty of being brutally honest about who you are."
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
