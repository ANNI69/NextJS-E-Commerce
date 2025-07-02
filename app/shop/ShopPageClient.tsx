/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, Grid, List, Star } from "lucide-react"

import Navbar from "@/components/navbar"
import Footer from "../../components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/client"

const categories = ["All", "Clothing", "Footwear", "Accessories", "Electronics", "Gaming", "Bags"]
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Rating", "Newest"]

export default function ShopPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams?.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setSearchQuery(searchParams?.get("q") || "")
  }, [searchParams])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })
      if (error) {
        setError(error.message)
        setProducts([])
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  // Filtering
  let filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sorting
  if (sortBy === "Price: Low to High") {
    filteredProducts = filteredProducts.slice().sort((a, b) => a.price - b.price)
  } else if (sortBy === "Price: High to Low") {
    filteredProducts = filteredProducts.slice().sort((a, b) => b.price - a.price)
  } else if (sortBy === "Rating") {
    filteredProducts = filteredProducts.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0))
  } else if (sortBy === "Newest") {
    filteredProducts = filteredProducts.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  // When user types in search box, update URL
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    router.replace(`/shop?q=${encodeURIComponent(e.target.value)}`)
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 p-4 sm:p-8 border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-black text-black mb-2 sm:mb-4">BRUTAL SHOP</h1>
            <p className="text-base sm:text-xl font-bold text-black">Discover our collection of BRUTAL products!</p>
          </div>

          {/* Filters and Search */}
          <div className="bg-cyan-400 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Input
                  type="text"
                  placeholder="SEARCH PRODUCTS..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 bg-white border-2 border-black font-bold text-black placeholder:text-gray-600 focus:ring-0 focus:border-black"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`$
                      {selectedCategory === category ? "bg-pink-500 hover:bg-pink-600" : "bg-white hover:bg-gray-100"}
                    text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-sm sm:text-base px-3 sm:px-4 py-2`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Sort and View */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border-2 border-black font-bold text-black px-3 py-2 text-sm sm:text-base"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <div className="flex border-2 border-black">
                  <Button
                    onClick={() => setViewMode("grid")}
                    className={`$
                      {viewMode === "grid" ? "bg-lime-400" : "bg-white"}
                    hover:bg-lime-500 text-black border-r border-black p-2`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setViewMode("list")}
                    className={`${viewMode === "list" ? "bg-lime-400" : "bg-white"} hover:bg-lime-500 text-black p-2`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : (
            <div
              className={`grid gap-4 sm:gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 ${
                    viewMode === "list" ? "flex gap-4" : ""
                  }`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-32 h-32 flex-shrink-0" : ""}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className={`w-full object-cover border-2 border-black ${
                        viewMode === "list" ? "h-full" : "h-32 sm:h-48"
                      }`}
                    />
                    {product.sale && (
                      <div className="absolute top-2 left-2 bg-red-500 text-black font-black px-2 py-1 text-xs border border-black">
                        SALE!
                      </div>
                    )}
                  </div>

                  <div className={`${viewMode === "list" ? "flex-1" : ""} mt-3 sm:mt-4`}>
                    <h3 className="text-lg sm:text-xl font-black text-black mb-2">{product.name}</h3>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating || 0) ? "text-yellow-500 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-bold text-gray-600">({product.rating || "N/A"})</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <span className="text-lg sm:text-xl font-black text-black">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm sm:text-base font-bold text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-black py-2 sm:py-3 text-sm sm:text-base font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] transition-all">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-8 sm:mt-12">
            <Button className="bg-purple-500 hover:bg-purple-600 text-black font-bold border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] transition-all px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
              LOAD MORE BRUTAL PRODUCTS
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    </Suspense>
  )
} 