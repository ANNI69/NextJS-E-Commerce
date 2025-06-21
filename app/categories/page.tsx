"use client"

import Link from "next/link"
import { ShoppingBag, Shirt, Watch, Footprints, Headphones, Gamepad2 } from "lucide-react"

import Navbar from "@/components/navbar"
import Footer from "../../components/footer"

const categories = [
  {
    id: 1,
    name: "CLOTHING",
    description: "Brutal fashion for the bold",
    icon: Shirt,
    color: "bg-pink-500",
    itemCount: 156,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "FOOTWEAR",
    description: "Step up your brutal game",
    icon: Footprints,
    color: "bg-cyan-400",
    itemCount: 89,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "ACCESSORIES",
    description: "Complete your brutal look",
    icon: Watch,
    color: "bg-lime-400",
    itemCount: 234,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "ELECTRONICS",
    description: "Tech with attitude",
    icon: Headphones,
    color: "bg-orange-400",
    itemCount: 67,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "GAMING",
    description: "Level up brutally",
    icon: Gamepad2,
    color: "bg-purple-500",
    itemCount: 123,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "BAGS",
    description: "Carry your brutal essentials",
    icon: ShoppingBag,
    color: "bg-red-500",
    itemCount: 78,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function CategoriesPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 p-4 sm:p-8 border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-black text-black mb-2 sm:mb-4">BRUTAL CATEGORIES</h1>
          <p className="text-base sm:text-xl font-bold text-black">Explore our collection by category!</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.id} href={`/shop?category=${category.name.toLowerCase()}`}>
                <div
                  className={`${category.color} border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] transition-all p-4 sm:p-6 cursor-pointer`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
                    <span className="text-sm sm:text-base font-bold text-black bg-white px-2 py-1 border border-black">
                      {category.itemCount} ITEMS
                    </span>
                  </div>

                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-32 sm:h-40 object-cover border-2 border-black mb-4"
                  />

                  <h3 className="text-xl sm:text-2xl font-black text-black mb-2">{category.name}</h3>
                  <p className="text-sm sm:text-base font-bold text-black">{category.description}</p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Featured Categories */}
        <div className="bg-yellow-400 border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-black text-black mb-4 sm:mb-6 text-center">TRENDING NOW</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-pink-500 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4 text-center">
              <h3 className="text-lg sm:text-xl font-black text-black mb-2">SUMMER COLLECTION</h3>
              <p className="text-sm sm:text-base font-bold text-black">Hot brutal styles for summer</p>
            </div>
            <div className="bg-cyan-400 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4 text-center">
              <h3 className="text-lg sm:text-xl font-black text-black mb-2">NEW ARRIVALS</h3>
              <p className="text-sm sm:text-base font-bold text-black">Fresh brutal products weekly</p>
            </div>
            <div className="bg-lime-400 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4 text-center">
              <h3 className="text-lg sm:text-xl font-black text-black mb-2">BESTSELLERS</h3>
              <p className="text-sm sm:text-base font-bold text-black">Most loved brutal items</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
