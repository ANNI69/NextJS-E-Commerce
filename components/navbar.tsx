/* eslint-disable */
"use client"


import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CartSidebar from "@/components/cart-items"

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleCart = () => setIsCartOpen(!isCartOpen)

  return (
    <nav className="bg-yellow-400 border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-black text-black hover:text-white transition-colors">
              BRUTESHOP
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link
                href="/shop"
                className="bg-pink-500 text-black px-4 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                SHOP
              </Link>
              <Link
                href="/categories"
                className="bg-cyan-400 text-black px-4 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                CATEGORIES
              </Link>
              <Link
                href="/deals"
                className="bg-lime-400 text-black px-4 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                DEALS
              </Link>
              <Link
                href="/about"
                className="bg-orange-400 text-black px-4 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                ABOUT
              </Link>
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="SEARCH..."
                    className="w-48 bg-white border-2 border-black font-bold placeholder:text-gray-600 focus:ring-0 focus:border-black"
                  />
                  <Button
                    onClick={toggleSearch}
                    className="ml-2 bg-red-500 hover:bg-red-600 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={toggleSearch}
                  className="bg-purple-500 hover:bg-purple-600 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Cart */}
            <Button
              onClick={toggleCart}
              className="bg-green-500 hover:bg-green-600 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all relative"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-black">
                3
              </span>
            </Button>

            {/* User Account */}
            <Link href="/profile">
              <Button className="bg-blue-500 hover:bg-blue-600 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <User className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden mr-2">
            <Button
              onClick={toggleMenu}
              className="bg-red-500 hover:bg-red-600 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-yellow-300 border-t-4 border-black">
          <div className="px-6 pt-4 pb-4 space-y-3">
            <Link
              href="/shop"
              className="block bg-pink-500 text-black px-6 py-4 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-center text-lg"
            >
              SHOP
            </Link>
            <Link
              href="/categories"
              className="block bg-cyan-400 text-black px-6 py-4 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-center text-lg"
            >
              CATEGORIES
            </Link>
            <Link
              href="/deals"
              className="block bg-lime-400 text-black px-6 py-4 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-center text-lg"
            >
              DEALS
            </Link>
            <Link
              href="/about"
              className="block bg-orange-400 text-black px-6 py-4 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-center text-lg"
            >
              ABOUT
            </Link>

            {/* Mobile Search */}
            <div className="pt-2">
              <Input
                type="text"
                placeholder="SEARCH..."
                className="w-full bg-white border-2 border-black font-bold placeholder:text-gray-600 focus:ring-0 focus:border-black py-4 text-lg"
              />
            </div>

            {/* Mobile Actions */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              <Button
                onClick={toggleCart}
                className="w-full bg-green-500 hover:bg-green-600 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all relative py-4 text-lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                CART (3)
              </Button>
              <Link href="/profile" className="w-full">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all py-4 text-lg">
                  <User className="h-5 w-5 mr-2" />
                  ACCOUNT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  )
}
