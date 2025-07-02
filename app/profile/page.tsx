"use client"

import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";
import { useCart } from "@/context";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, User } from "lucide-react";

const ProfilePage = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setError(error.message);
        setUserEmail(null);
      } else {
        setUserEmail(data.user?.email || null);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-pink-400 to-cyan-400 py-8 px-2 sm:px-0">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl p-6 flex items-center gap-6">
          <div className="bg-lime-400 border-2 border-black rounded-full p-4 flex items-center justify-center">
            <User className="h-10 w-10 text-black" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-black mb-1">Your Profile</h2>
            {loading ? (
              <p className="text-gray-600 font-bold">Loading user...</p>
            ) : error ? (
              <p className="text-red-600 font-bold">Error: {error}</p>
            ) : userEmail ? (
              <p className="text-lg font-bold text-black">{userEmail}</p>
            ) : (
              <p className="text-gray-600 font-bold">No user found.</p>
            )}
          </div>
        </div>

        {/* Cart Section */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="h-6 w-6 text-black" />
            <h3 className="text-xl sm:text-2xl font-black text-black">Your Cart</h3>
          </div>
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-bold text-black">Your cart is empty</p>
              <p className="text-gray-600 font-bold mt-2 text-sm">Add some brutal items!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-yellow-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg p-3"
                >
                  <img
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover border-2 border-black rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-black text-black truncate">{item.product.name}</h4>
                    <p className="text-base font-bold text-black mt-1">${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="bg-cyan-400 hover:bg-cyan-500 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all p-2"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-black text-black min-w-[2rem] text-center">{item.quantity}</span>
                    <Button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="bg-lime-400 hover:bg-lime-500 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all p-2"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={() => removeFromCart(item.product.id)}
                    className="bg-red-500 hover:bg-red-600 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {/* Cart Summary */}
              <div className="mt-6 border-t-4 border-black pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-cyan-400 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
                <div className="text-lg font-black text-black mb-2 sm:mb-0">Subtotal: ${cartTotal.toFixed(2)}</div>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-black font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] px-6 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={cartItems.length === 0}
                >
                  CHECKOUT NOW
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;