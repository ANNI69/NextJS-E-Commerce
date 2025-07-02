"use server"

import { supabase } from "../../lib/client"
import { revalidatePath } from "next/cache"
import { getCurrentSeller } from "../../lib/Auth"

export async function addProduct(formData: FormData) {
  try {
    // Get current authenticated seller
    const currentSeller = await getCurrentSeller()
    if (!currentSeller) {
      return {
        success: false,
        message: "You must be logged in as a seller to add products",
      }
    }

    // Extract form data
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const category_id = formData.get("category_id") as string
    const stock_quantity = Number.parseInt(formData.get("stock_quantity") as string)
    const status = formData.get("status") as string
    const seller_id = currentSeller.id // Use authenticated seller's ID

    // Validate required fields
    if (!name || !name.trim()) {
      return {
        success: false,
        message: "Product name is required",
      }
    }

    if (isNaN(price) || price <= 0) {
      return {
        success: false,
        message: "Valid price is required",
      }
    }

    if (isNaN(stock_quantity) || stock_quantity < 0) {
      return {
        success: false,
        message: "Valid stock quantity is required",
      }
    }

    // Handle image URLs (for demo, we'll use placeholder images)
    const imageUrls = ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"]

    // Prepare the product data
    const productData = {
      seller_id,
      name: name.trim(),
      description: description?.trim() || null,
      price,
      category_id: category_id || null,
      stock_quantity,
      status: status || "Active",
      images: imageUrls,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Insert product into Supabase
    const { data, error } = await supabase.from("products").insert([productData]).select()

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        message: `Database error: ${error.message}`,
      }
    }

    // Revalidate the dashboard page to show new product
    revalidatePath("/seller/dashboard")

    return {
      success: true,
      message: "Product added successfully!",
      product: data[0],
    }
  } catch (error) {
    console.error("Server action error:", error)
    return {
      success: false,
      message: "Failed to add product. Please try again.",
    }
  }
}

export async function getCategories() {
  try {
    const { data, error } = await supabase.from("categories").select("id, name, description").order("name")

    if (error) {
      console.error("Error fetching categories:", error)
      // Return fallback categories if database fetch fails
      return {
        success: true,
        categories: [
          { id: "1", name: "Clothing", description: "Apparel and fashion items" },
          { id: "2", name: "Footwear", description: "Shoes and boots" },
          { id: "3", name: "Accessories", description: "Bags, watches, and more" },
          { id: "4", name: "Electronics", description: "Tech gadgets and devices" },
          { id: "5", name: "Gaming", description: "Gaming accessories and gear" },
        ],
      }
    }

    return {
      success: true,
      categories: data || [],
    }
  } catch (error) {
    console.error("Error in getCategories:", error)
    return {
      success: false,
      categories: [],
    }
  }
}

export async function getProducts(sellerId?: string) {
  try {
    let query = supabase
      .from("products")
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .order("created_at", { ascending: false })

    if (sellerId) {
      query = query.eq("seller_id", sellerId)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching products:", error)
      return {
        success: false,
        products: [],
      }
    }

    return {
      success: true,
      products: data || [],
    }
  } catch (error) {
    console.error("Error in getProducts:", error)
    return {
      success: false,
      products: [],
    }
  }
}
