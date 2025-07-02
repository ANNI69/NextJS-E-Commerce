"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Store, Eye, EyeOff, Mail, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Footer from "../../../components/footer"

export default function SellerLoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            console.log("Seller login:", formData)
            setIsLoading(false)
            // Redirect to seller dashboard
            window.location.href = "/seller/sellerDashboard"
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-orange-400 to-cyan-400">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(0,0,0,0.1) 10px,
            rgba(0,0,0,0.1) 20px
          )`,
                    }}
                ></div>
            </div>

            {/* Header */}
            <div className="relative z-10 p-4 sm:p-6">
                <Link href="/">
                    <Button className="bg-lime-400 hover:bg-lime-500 text-black font-bold border-2 sm:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] transition-all text-sm sm:text-base px-3 sm:px-4 py-2">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        BACK TO SHOP
                    </Button>
                </Link>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center px-4 py-6 sm:py-12">
                <div className="bg-orange-400 p-4 sm:p-8 border-4 sm:border-8 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
                    {/* Login Form */}
                    <div className="w-full max-w-md">
                        {/* Header */}
                        <div className="text-center mb-6 sm:mb-8">
                            <h2 className="text-2xl sm:text-3xl font-black text-black mb-2">SELLER LOGIN</h2>
                            <p className="text-base sm:text-lg font-bold text-black">Access your brutal seller dashboard!</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            {/* Email field */}
                            <div>
                                <Label htmlFor="email" className="block text-xs sm:text-sm font-bold text-black mb-2">
                                    EMAIL ADDRESS
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 sm:py-3 bg-white border-2 sm:border-4 border-black font-bold text-black placeholder:text-gray-500 focus:ring-0 focus:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm sm:text-base"
                                        placeholder="Enter your seller email"
                                    />
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                                </div>
                            </div>

                            {/* Password field */}
                            <div>
                                <Label htmlFor="password" className="block text-xs sm:text-sm font-bold text-black mb-2">
                                    PASSWORD
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-12 py-3 sm:py-3 bg-white border-2 sm:border-4 border-black font-bold text-black placeholder:text-gray-500 focus:ring-0 focus:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm sm:text-base"
                                        placeholder="Enter your password"
                                    />
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                                        ) : (
                                            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        className="mr-2 h-4 w-4 border-2 border-black"
                                    />
                                    <span className="text-xs sm:text-sm font-bold text-black">REMEMBER ME</span>
                                </label>
                                <Link
                                    href="/seller/forgot-password"
                                    className="text-xs sm:text-sm font-bold text-black hover:text-white transition-colors"
                                >
                                    FORGOT PASSWORD?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-green-500 hover:bg-green-600 text-black py-3 sm:py-4 text-base sm:text-lg font-black border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "LOGGING IN..." : "LOGIN TO DASHBOARD"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
