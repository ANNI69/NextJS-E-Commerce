/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import {
  Store,

  DollarSign,

  ShoppingCart,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  TrendingUp,
  BarChart3,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Footer from "../../../components/footer"
import AddProductForm from "@/components/add-product-form"
import { supabase } from "@/lib/client"

const stats = [
  {
    title: "TOTAL SALES",
    value: "$12,450",
    change: "+15%",
    icon: DollarSign,
    color: "bg-green-500",
  }
]

const orders = [
  {
    id: "ORD-001",
    customer: "John Brutal",
    email: "john@example.com",
    products: ["BRUTAL SNEAKERS", "NEON HOODIE"],
    total: 149.98,
    status: "Processing",
    date: "2024-01-25",
    address: "123 Brutal St, NYC",
  }
]

const analyticsData = {
  salesChart: [
    { month: "Jan", sales: 2400, orders: 45 },
    { month: "Feb", sales: 3200, orders: 62 },
    { month: "Mar", sales: 2800, orders: 54 },
    { month: "Apr", sales: 4100, orders: 78 },
    { month: "May", sales: 3600, orders: 69 },
    { month: "Jun", sales: 4800, orders: 89 },
  ],
  topProducts: [
    { name: "CYBER BACKPACK", sales: 234, revenue: 30426 },
    { name: "BRUTAL SNEAKERS", sales: 156, revenue: 14034 },
    { name: "BRUTAL T-SHIRT", sales: 123, revenue: 3687 },
    { name: "NEON HOODIE", sales: 89, revenue: 5339 },
    { name: "NEON PANTS", sales: 78, revenue: 6239 },
  ],
  categoryBreakdown: [
    { category: "Clothing", percentage: 45, sales: 290 },
    { category: "Accessories", percentage: 35, sales: 234 },
    { category: "Footwear", percentage: 20, sales: 156 },
  ],
}

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [addProductOpen, setAddProductOpen] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || product.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-400"
      case "Out of Stock":
        return "bg-red-400"
      case "Low Stock":
        return "bg-yellow-400"
      case "Processing":
        return "bg-blue-400"
      case "Shipped":
        return "bg-purple-400"
      case "Delivered":
        return "bg-green-400"
      case "Pending":
        return "bg-orange-400"
      default:
        return "bg-gray-400"
    }
  }

  // Handler for successful product addition
  const handleProductAdded = () => {
    // Refetch products after adding
    setLoading(true)
    setError(null)
    supabase.from("products").select("*").order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setError(error.message)
          setProducts([])
        } else {
          setProducts(data || [])
        }
        setLoading(false)
      })
    setAddProductOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-pink-400 to-cyan-400">
      {/* Add Product Modal */}
      <AddProductForm isOpen={addProductOpen} onClose={() => setAddProductOpen(false)} onSuccess={handleProductAdded} />

      {/* Header */}
      <div className="bg-black border-b-4 border-white p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Store className="h-8 w-8 text-white" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">SELLER DASHBOARD</h1>
              <p className="text-sm font-bold text-gray-300">Welcome back, BRUTAL SELLER!</p>
            </div>
          </div>
          <Button className="bg-red-500 hover:bg-red-600 text-black font-bold border-2 border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
            LOGOUT
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          {["overview", "products", "orders", "analytics"].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${activeTab === tab ? "bg-lime-400 hover:bg-lime-500" : "bg-white hover:bg-gray-100"
                } text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-sm sm:text-base px-3 sm:px-4 py-2 capitalize`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div
                    key={index}
                    className={`${stat.color} border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                      <span className="text-xs sm:text-sm font-bold text-black bg-white px-2 py-1 border border-black">
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-black mb-1">{stat.title}</h3>
                    <p className="text-2xl sm:text-3xl font-black text-black">{stat.value}</p>
                  </div>
                )
              })}
            </div>

            {/* Recent Products */}
            <div className="bg-white border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-black">RECENT PRODUCTS</h2>
                <Button className="bg-green-500 hover:bg-green-600 text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-sm px-3 py-2" onClick={() => setAddProductOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  ADD PRODUCT
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-8">Loading products...</div>
              ) : error ? (
                <div className="text-center py-8 text-red-600">{error}</div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {products.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-3 sm:p-4 border-2 border-black bg-gray-50">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover border-2 border-black"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm sm:text-base font-black text-black">{product.name}</h3>
                        <p className="text-xs sm:text-sm font-bold text-gray-600">
                          Price: ${product.price} | Stock: {product.stock}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2 py-1 border border-black ${getStatusColor(product.status)}`}
                        >
                          {product.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="bg-cyan-400 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Input
                    type="text"
                    placeholder="SEARCH PRODUCTS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 bg-white border-2 border-black font-bold text-black placeholder:text-gray-600 focus:ring-0 focus:border-black"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-white border-2 border-black font-bold text-black px-3 py-2 text-sm"
                  >
                    <option value="All">ALL CATEGORIES</option>
                    <option value="Clothing">CLOTHING</option>
                    <option value="Footwear">FOOTWEAR</option>
                    <option value="Accessories">ACCESSORIES</option>
                  </select>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-white border-2 border-black font-bold text-black px-3 py-2 text-sm"
                  >
                    <option value="All">ALL STATUS</option>
                    <option value="Active">ACTIVE</option>
                    <option value="Out of Stock">OUT OF STOCK</option>
                    <option value="Low Stock">LOW STOCK</option>
                  </select>

                  <Button className="bg-green-500 hover:bg-green-600 text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all" onClick={() => setAddProductOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    ADD PRODUCT
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              {loading ? (
                <div className="text-center py-8">Loading products...</div>
              ) : error ? (
                <div className="text-center py-8 text-red-600">{error}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-pink-500 border-b-2 border-black">
                      <tr>
                        <th className="text-left p-3 sm:p-4 font-black text-black">PRODUCT</th>
                        <th className="text-left p-3 sm:p-4 font-black text-black">CATEGORY</th>
                        <th className="text-left p-3 sm:p-4 font-black text-black">PRICE</th>
                        <th className="text-left p-3 sm:p-4 font-black text-black">STOCK</th>
                        <th className="text-left p-3 sm:p-4 font-black text-black">SALES</th>
                        <th className="text-left p-3 sm:p-4 font-black text-black">STATUS</th>
                        <th className="text-left p-3 sm:p-4 font-black text-black">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-gray-200">
                          <td className="p-3 sm:p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-10 h-10 sm:w-12 sm:h-12 object-cover border-2 border-black"
                              />
                              <div>
                                <h3 className="text-sm sm:text-base font-black text-black">{product.name}</h3>
                                <p className="text-xs text-gray-600">ID: {product.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 sm:p-4 text-sm font-bold text-black">{product.category}</td>
                          <td className="p-3 sm:p-4 text-sm font-bold text-black">${product.price}</td>
                          <td className="p-3 sm:p-4 text-sm font-bold text-black">{product.stock}</td>
                          <td className="p-3 sm:p-4 text-sm font-bold text-black">{product.sales}</td>
                          <td className="p-3 sm:p-4">
                            <span
                              className={`text-xs font-bold px-2 py-1 border border-black ${getStatusColor(product.status)}`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td className="p-3 sm:p-4">
                            <div className="flex gap-1">
                              <Button className="bg-blue-400 hover:bg-blue-500 text-black border border-black p-1">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black border border-black p-1">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button className="bg-red-400 hover:bg-red-500 text-black border border-black p-1">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="bg-purple-400 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Input
                    type="text"
                    placeholder="SEARCH ORDERS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 bg-white border-2 border-black font-bold text-black placeholder:text-gray-600 focus:ring-0 focus:border-black"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-white border-2 border-black font-bold text-black px-3 py-2 text-sm"
                  >
                    <option value="All">ALL STATUS</option>
                    <option value="Pending">PENDING</option>
                    <option value="Processing">PROCESSING</option>
                    <option value="Shipped">SHIPPED</option>
                    <option value="Delivered">DELIVERED</option>
                  </select>

                  <Button className="bg-lime-400 hover:bg-lime-500 text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                    <Filter className="h-4 w-4 mr-2" />
                    FILTER
                  </Button>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-orange-400 border-b-2 border-black">
                    <tr>
                      <th className="text-left p-3 sm:p-4 font-black text-black">ORDER ID</th>
                      <th className="text-left p-3 sm:p-4 font-black text-black">CUSTOMER</th>
                      <th className="text-left p-3 sm:p-4 font-black text-black">PRODUCTS</th>
                      <th className="text-left p-3 sm:p-4 font-black text-black">TOTAL</th>
                      <th className="text-left p-3 sm:p-4 font-black text-black">DATE</th>
                      <th className="text-left p-3 sm:p-4 font-black text-black">STATUS</th>
                      <th className="text-left p-3 sm:p-4 font-black text-black">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-200">
                        <td className="p-3 sm:p-4">
                          <div>
                            <h3 className="text-sm font-black text-black">{order.id}</h3>
                          </div>
                        </td>
                        <td className="p-3 sm:p-4">
                          <div>
                            <h3 className="text-sm font-bold text-black">{order.customer}</h3>
                            <p className="text-xs text-gray-600">{order.email}</p>
                          </div>
                        </td>
                        <td className="p-3 sm:p-4">
                          <div className="text-xs font-bold text-black">
                            {order.products.map((product, index) => (
                              <div key={index}>{product}</div>
                            ))}
                          </div>
                        </td>
                        <td className="p-3 sm:p-4 text-sm font-bold text-black">${order.total}</td>
                        <td className="p-3 sm:p-4 text-sm font-bold text-black">{order.date}</td>
                        <td className="p-3 sm:p-4">
                          <span
                            className={`text-xs font-bold px-2 py-1 border border-black ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3 sm:p-4">
                          <div className="flex gap-1">
                            <Button className="bg-blue-400 hover:bg-blue-500 text-black border border-black p-1">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black border border-black p-1">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* Analytics Header */}
            <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="h-8 w-8 text-black" />
                <h2 className="text-2xl sm:text-3xl font-black text-black">BRUTAL ANALYTICS</h2>
              </div>
              <p className="text-base sm:text-lg font-bold text-black">Track your performance and growth</p>
            </div>

            {/* Sales Chart */}
            <div className="bg-white border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-black text-black mb-4">SALES OVERVIEW</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-black text-black mb-3">MONTHLY SALES</h4>
                  <div className="space-y-2">
                    {analyticsData.salesChart.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border border-black bg-gray-50">
                        <span className="font-bold text-black">{data.month}</span>
                        <div className="flex gap-4">
                          <span className="text-sm font-bold text-green-600">${data.sales}</span>
                          <span className="text-sm font-bold text-blue-600">{data.orders} orders</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-black text-black mb-3">GROWTH METRICS</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-400 border-2 border-black p-4 text-center">
                      <TrendingUp className="h-6 w-6 text-black mx-auto mb-2" />
                      <div className="text-2xl font-black text-black">+23%</div>
                      <div className="text-sm font-bold text-black">SALES GROWTH</div>
                    </div>
                    <div className="bg-blue-400 border-2 border-black p-4 text-center">
                      <ShoppingCart className="h-6 w-6 text-black mx-auto mb-2" />
                      <div className="text-2xl font-black text-black">+15%</div>
                      <div className="text-sm font-bold text-black">ORDER GROWTH</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-black text-black mb-4">TOP PERFORMING PRODUCTS</h3>
              <div className="space-y-3">
                {analyticsData.topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border-2 border-black bg-yellow-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-pink-500 text-black font-black px-2 py-1 border border-black text-sm">
                        #{index + 1}
                      </span>
                      <span className="font-black text-black">{product.name}</span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className="font-bold text-black">{product.sales} sold</span>
                      <span className="font-bold text-green-600">${product.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-black text-black mb-4">CATEGORY BREAKDOWN</h3>
              <div className="space-y-4">
                {analyticsData.categoryBreakdown.map((category, index) => {
                  const colors = ["bg-pink-500", "bg-cyan-400", "bg-lime-400"]
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-black">{category.category}</span>
                        <span className="font-bold text-black">
                          {category.percentage}% ({category.sales} sales)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 border-2 border-black h-4">
                        <div
                          className={`${colors[index]} h-full border-r-2 border-black`}
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
