/* eslint-disable */
import { createClient } from "@/lib/server";

// app/api/orders/route.ts
export async function POST(request: Request) {
    const supabase = await createClient();
    const orderData = await request.json();
    
    // Start transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: orderData.customer_id,
        total_amount: orderData.total_amount,
        shipping_address: orderData.shipping_address
      })
      .select()
      .single();
    
    if (orderError) {
      return Response.json({ error: orderError.message }, { status: 400 });
    }
    
    // Create order items for each seller
    const orderItems = orderData.items.map((item: { product_id: any; seller_id: any; quantity: number; unit_price: number; }) => ({
      order_id: order.id,
      product_id: item.product_id,
      seller_id: item.seller_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.quantity * item.unit_price
    }));
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) {
      return Response.json({ error: itemsError.message }, { status: 400 });
    }
    
    return Response.json({ order }, { status: 201 });
  }
  