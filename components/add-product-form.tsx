"use client"

import { useState, useTransition } from "react"
import { X, Package, DollarSign, Hash, FileText, Image as ImageIcon, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/client"

interface AddProductFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AddProductForm({ isOpen, onClose, onSuccess }: AddProductFormProps) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    stock: "",
    category: "",
    offer: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // Validation
    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Product name is required!" })
      return
    }
    if (!formData.image.trim()) {
      setMessage({ type: "error", text: "Image link is required!" })
      return
    }
    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      setMessage({ type: "error", text: "Valid price is required!" })
      return
    }
    if (!formData.stock || Number.parseInt(formData.stock) < 0) {
      setMessage({ type: "error", text: "Valid stock quantity is required!" })
      return
    }
    if (!formData.category.trim()) {
      setMessage({ type: "error", text: "Category is required!" })
      return
    }

    startTransition(async () => {
      try {
        const { data, error } = await supabase.from("products").insert([
          {
            name: formData.name.trim(),
            image: formData.image.trim(),
            price: Number(formData.price),
            stock: Number(formData.stock),
            category: formData.category.trim(),
            offer: formData.offer.trim() || null,
          },
        ]).select().single()

        if (error) {
          setMessage({ type: "error", text: error.message })
        } else {
          setMessage({ type: "success", text: "Product added successfully!" })
          setFormData({
            name: "",
            image: "",
            price: "",
            stock: "",
            category: "",
            offer: "",
          })
          onSuccess?.()
          setTimeout(() => {
            onClose()
            setMessage(null)
          }, 1500)
        }
      } catch (error) {
        setMessage({ type: "error", text: "An unexpected error occurred!" })
      }
    })
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        {/* Modal */}
        <div className="bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b-4 border-black bg-pink-500">
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6 text-black" />
              <h2 className="text-xl sm:text-2xl font-black text-black">ADD PRODUCT</h2>
            </div>
            <Button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all p-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Product Name */}
            <div>
              <Label htmlFor="name" className="block text-sm font-bold text-black mb-2">
                PRODUCT NAME *
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black font-bold text-black placeholder:text-gray-500 focus:ring-0 focus:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  placeholder="Enter product name"
                />
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
              </div>
            </div>

            {/* Image Link */}
            <div>
              <Label htmlFor="image" className="block text-sm font-bold text-black mb-2">
                IMAGE LINK *
              </Label>
              <div className="relative">
                <Input
                  id="image"
                  name="image"
                  type="text"
                  required
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black font-bold text-black placeholder:text-gray-500 focus:ring-0 focus:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  placeholder="https://..."
                />
                <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
              </div>
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price" className="block text-sm font-bold text-black mb-2">
                PRICE ($) *
              </Label>
              <div className="relative">
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black font-bold text-black placeholder:text-gray-500 focus:ring-0 focus:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  placeholder="0.00"
                />
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
              </div>
            </div>

            {/* Stock */}
            <div>
              <Label htmlFor="stock" className="block text-sm font-bold text-black mb-2">
                STOCK *
              </Label>
              <div className="relative">
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  required
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black font-bold text-black placeholder:text-gray-500 focus:ring-0 focus:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  placeholder="0"
                />
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
              </div>
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="block text-sm font-bold text-black mb-2">
                CATEGORY *
              </Label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black font-bold text-black focus:ring-0 focus:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <option value="">Select Category</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Bags">Bags</option>
                </select>
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
              </div>
            </div>

            {/* Offer */}
            <div>
              <Label htmlFor="offer" className="block text-sm font-bold text-black mb-2">
                OFFER
              </Label>
              <div className="relative">
                <Input
                  id="offer"
                  name="offer"
                  type="text"
                  value={formData.offer}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black font-bold text-black placeholder:text-gray-500 focus:ring-0 focus:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  placeholder="e.g. 10% OFF, Buy 1 Get 1"
                />
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
              </div>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-3 border-2 border-black font-bold ${
                  message.type === "success" ? "bg-green-400 text-black" : "bg-red-400 text-black"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-black py-3 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-green-500 hover:bg-green-600 text-black py-3 font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "ADDING PRODUCT..." : "ADD PRODUCT"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
