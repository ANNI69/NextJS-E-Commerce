import { supabase } from "./client"

export interface AuthUser {
  id: string
  email: string
  role: "seller" | "customer"
}

export interface Seller {
  id: string
  email: string
  business_name: string
  first_name: string
  last_name: string
  phone?: string
  is_verified: boolean
  is_active: boolean
}

export interface Customer {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  is_verified: boolean
  is_active: boolean
}

// Check if user exists in sellers table
export async function getSellerByEmail(email: string): Promise<Seller | null> {
  try {
    const { data, error } = await supabase.from("sellers").select("*").eq("email", email).eq("is_active", true).single()

    if (error || !data) {
      return null
    }

    return data as Seller
  } catch (error) {
    console.error("Error fetching seller:", error)
    return null
  }
}

// Check if user exists in customers table
export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  try {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("email", email)
      .eq("is_active", true)
      .single()

    if (error || !data) {
      return null
    }

    return data as Customer
  } catch (error) {
    console.error("Error fetching customer:", error)
    return null
  }
}

// Get current authenticated user from Supabase Auth
export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    return user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Check if current user is a valid seller
export async function getCurrentSeller(): Promise<Seller | null> {
  try {
    const user = await getCurrentUser()
    if (!user?.email) {
      return null
    }

    return await getSellerByEmail(user.email)
  } catch (error) {
    console.error("Error getting current seller:", error)
    return null
  }
}

// Check if current user is a valid customer
export async function getCurrentCustomer(): Promise<Customer | null> {
  try {
    const user = await getCurrentUser()
    if (!user?.email) {
      return null
    }

    return await getCustomerByEmail(user.email)
  } catch (error) {
    console.error("Error getting current customer:", error)
    return null
  }
}

// Sign in user and verify they exist in database
export async function signInSeller(email: string, password: string) {
  try {
    // First check if seller exists in database
    const seller = await getSellerByEmail(email)
    if (!seller) {
      return {
        success: false,
        message: "Seller account not found or inactive",
      }
    }

    if (!seller.is_verified) {
      return {
        success: false,
        message: "Please verify your email address before signing in",
      }
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
      }
    }

    return {
      success: true,
      user: data.user,
      seller,
    }
  } catch (error) {
    console.error("Error signing in seller:", error)
    return {
      success: false,
      message: "An unexpected error occurred",
    }
  }
}

// Sign in customer
export async function signInCustomer(email: string, password: string) {
  try {
    // First check if customer exists in database
    const customer = await getCustomerByEmail(email)
    if (!customer) {
      return {
        success: false,
        message: "Customer account not found or inactive",
      }
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
      }
    }

    return {
      success: true,
      user: data.user,
      customer,
    }
  } catch (error) {
    console.error("Error signing in customer:", error)
    return {
      success: false,
      message: "An unexpected error occurred",
    }
  }
}

// Sign out user
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out:", error)
      return false
    }
    return true
  } catch (error) {
    console.error("Error signing out:", error)
    return false
  }
}

// Register new seller
export async function registerSeller(sellerData: {
  email: string
  password: string
  firstName: string
  lastName: string
  businessName: string
  phone?: string
}) {
  try {
    // First create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: sellerData.email,
      password: sellerData.password,
    })

    if (authError) {
      return {
        success: false,
        message: authError.message,
      }
    }

    // Then create seller record
    const { data: sellerRecord, error: sellerError } = await supabase
      .from("sellers")
      .insert([
        {
          email: sellerData.email,
          first_name: sellerData.firstName,
          last_name: sellerData.lastName,
          business_name: sellerData.businessName,
          phone: sellerData.phone,
          is_verified: false, // Will be verified via email
          is_active: true,
        },
      ])
      .select()
      .single()

    if (sellerError) {
      // If seller creation fails, we should clean up the auth user
      // But Supabase doesn't allow deleting users from client side
      console.error("Error creating seller record:", sellerError)
      return {
        success: false,
        message: "Failed to create seller account",
      }
    }

    return {
      success: true,
      message: "Account created successfully! Please check your email to verify your account.",
      user: authData.user,
      seller: sellerRecord,
    }
  } catch (error) {
    console.error("Error registering seller:", error)
    return {
      success: false,
      message: "An unexpected error occurred",
    }
  }
}
