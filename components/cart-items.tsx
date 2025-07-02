"use client"

import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = 9.99
  const total = subtotal + shipping

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
          style={{ touchAction: "none" }}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-yellow-400 border-l-8 border-black shadow-[-12px_0px_0px_0px_rgba(0,0,0,1)] z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          height: "100dvh",
          overscrollBehavior: "contain",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b-4 border-black bg-pink-500 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
            <h2 className="text-xl sm:text-2xl font-black text-black">YOUR CART</h2>
          </div>
          <Button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-black border-2 sm:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] transition-all p-2"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        {/* Cart Items - Scrollable Area */}
        <div
          className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4"
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
          }}
        >
          {cartItems.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg sm:text-xl font-bold text-black">YOUR CART IS EMPTY</p>
              <p className="text-gray-600 font-bold mt-2 text-sm sm:text-base">Add some brutal items!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-3 sm:p-4"
              >
                <div className="flex space-x-3 sm:space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover border-2 border-black"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-black text-black truncate">{item.product.name}</h3>
                    <div className="mt-1 space-y-1">
                      {/* Add color/size if needed */}
                    </div>
                    <p className="text-lg sm:text-xl font-black text-black mt-2">${item.product.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-3 sm:mt-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="bg-cyan-400 hover:bg-cyan-500 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all p-2 sm:p-1 touch-manipulation"
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <span className="text-base sm:text-lg font-black text-black min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <Button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="bg-lime-400 hover:bg-lime-500 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all p-2 sm:p-1 touch-manipulation"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>

                  <Button
                    onClick={() => removeFromCart(item.product.id)}
                    className="bg-red-500 hover:bg-red-600 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all p-2 touch-manipulation"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="flex-shrink-0 border-t-4 border-black bg-cyan-400 p-4 sm:p-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-base sm:text-lg font-bold text-black">SUBTOTAL:</span>
                <span className="text-base sm:text-lg font-black text-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base sm:text-lg font-bold text-black">SHIPPING:</span>
                <span className="text-base sm:text-lg font-black text-black">${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t-2 border-black pt-2 sm:pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-xl font-black text-black">TOTAL:</span>
                  <span className="text-lg sm:text-xl font-black text-black">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 space-y-3">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-black py-3 sm:py-4 text-base sm:text-lg font-black border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] transition-all touch-manipulation">
                CHECKOUT NOW
              </Button>
              <Button
                onClick={onClose}
                className="w-full bg-purple-500 hover:bg-purple-600 text-black py-2 sm:py-3 text-sm sm:text-base font-bold border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] transition-all touch-manipulation"
              >
                CONTINUE SHOPPING
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
