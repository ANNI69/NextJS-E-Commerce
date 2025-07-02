"use client"

import { useState, useEffect } from "react"
import { Clock, Zap, Star, Tag } from "lucide-react"

import Navbar from "@/components/navbar"
import Footer from "../../components/footer"
import { Button } from "@/components/ui/button"

const deals = [
  {
    id: 1,
    name: "BRUTAL SNEAKERS MEGA DEAL",
    originalPrice: 129.99,
    salePrice: 79.99,
    discount: 38,
    image: "https://i.ibb.co/tML50rJd/Chat-GPT-Image-Jul-2-2025-10-29-50-PM.png",
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    category: "Flash Sale",
    rating: 4.8,
    sold: 156,
  },
  {
    id: 2,
    name: "NEON HOODIE BUNDLE",
    originalPrice: 89.99,
    salePrice: 59.99,
    discount: 33,
    image: "https://i.ibb.co/Pzh0Jmks/Chat-GPT-Image-Jul-2-2025-10-31-50-PM.png",
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    category: "Bundle Deal",
    rating: 4.6,
    sold: 89,
  },
  {
    id: 3,
    name: "CYBER ACCESSORIES SET",
    originalPrice: 199.99,
    salePrice: 149.99,
    discount: 25,
    image: "https://i.postimg.cc/CxH0Sj3D/Chat-GPT-Image-Jul-2-2025-04-57-18-PM.png",
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    category: "Limited Time",
    rating: 4.9,
    sold: 234,
  },
  {
    id: 4,
    name: "BRUTAL WARDROBE ESSENTIALS",
    originalPrice: 299.99,
    salePrice: 199.99,
    discount: 33,
    image: "https://i.postimg.cc/zfHnyFrt/Chat-GPT-Image-Jul-2-2025-05-14-20-PM.png",
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    category: "Weekly Deal",
    rating: 4.7,
    sold: 67,
  },
]

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <div className="flex items-center gap-2 text-black font-black">
      <Clock className="h-4 w-4" />
      <span className="text-sm sm:text-base">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    </div>
  )
}

export default function DealsPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 via-yellow-400 to-pink-500 p-4 sm:p-8 border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2 sm:mb-4">
            <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
            <h1 className="text-2xl sm:text-4xl font-black text-black">BRUTAL DEALS</h1>
          </div>
          <p className="text-base sm:text-xl font-bold text-black">Limited time offers that pack a punch!</p>
        </div>

        {/* Deal Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {["Flash Sale", "Bundle Deal", "Limited Time", "Weekly Deal"].map((category, index) => {
            const colors = ["bg-red-500", "bg-cyan-400", "bg-lime-400", "bg-purple-500"]
            return (
              <div
                key={category}
                className={`${colors[index]} border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-3 sm:p-4 text-center`}
              >
                <h3 className="text-sm sm:text-base font-black text-black">{category}</h3>
              </div>
            )
          })}
        </div>

        {/* Featured Deal */}
        <div className="bg-yellow-400 border-4 sm:border-8 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-8 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-6 w-6 text-black" />
            <span className="text-lg sm:text-xl font-black text-black">DEAL OF THE DAY</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <img
                src="https://i.postimg.cc/Njx3WQXk/Chat-GPT-Image-Jul-2-2025-04-51-32-PM.png"
                alt="Deal of the day"
                className="w-full h-64 sm:h-80 object-cover border-4 border-black"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-black mb-4">ULTIMATE BRUTAL BUNDLE</h2>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl sm:text-4xl font-black text-black">$99.99</span>
                <span className="text-xl sm:text-2xl font-bold text-gray-600 line-through">$199.99</span>
                <span className="bg-red-500 text-black font-black px-3 py-1 border-2 border-black text-lg">
                  50% OFF
                </span>
              </div>
              <CountdownTimer endTime={new Date(Date.now() + 24 * 60 * 60 * 1000)} />
              <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-black py-3 sm:py-4 text-base sm:text-lg font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                GRAB THIS DEAL NOW!
              </Button>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6"
            >
              <div className="relative mb-4">
                <img
                  src={deal.image || "/placeholder.svg"}
                  alt={deal.name}
                  className="w-full h-48 sm:h-64 object-cover border-2 border-black"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-black font-black px-2 py-1 text-xs sm:text-sm border border-black">
                  {deal.discount}% OFF
                </div>
                <div className="absolute top-2 right-2 bg-yellow-400 text-black font-bold px-2 py-1 text-xs border border-black">
                  {deal.category}
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-black mb-2">{deal.name}</h3>

              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(deal.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-bold text-gray-600">({deal.rating})</span>
                <span className="ml-auto text-sm font-bold text-gray-600">{deal.sold} sold</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl sm:text-2xl font-black text-black">${deal.salePrice}</span>
                <span className="text-base sm:text-lg font-bold text-gray-500 line-through">${deal.originalPrice}</span>
              </div>

              <div className="bg-pink-500 border-2 border-black p-2 mb-4">
                <CountdownTimer endTime={deal.endTime} />
              </div>

              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-black py-2 sm:py-3 text-sm sm:text-base font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] transition-all">
                ADD TO CART
              </Button>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-purple-500 border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-8 mt-8 sm:mt-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-black mb-4">NEVER MISS A BRUTAL DEAL!</h2>
          <p className="text-base sm:text-lg font-bold text-black mb-6">
            Subscribe to get exclusive deals and early access!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="flex-1 px-4 py-3 border-2 border-black font-bold text-black placeholder:text-gray-600"
            />
            <Button className="bg-green-500 hover:bg-green-600 text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all px-6 py-3">
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
