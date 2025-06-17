import { NextResponse } from 'next/server';

// Mock data
const mockOrders = [
  {
    id: 1,
    customer_id: 'cust_123',
    total_amount: 99.99,
    shipping_address: '123 Main St, City, Country',
    status: 'pending',
    created_at: new Date().toISOString()
  }
];

// GET handler to fetch orders
export async function GET() {
  return NextResponse.json({ orders: mockOrders }, { status: 200 });
}

// POST handler to create a new order
export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    
    // Create a new order with mock data
    const newOrder = {
      id: mockOrders.length + 1,
      customer_id: orderData.customer_id || 'cust_123',
      total_amount: orderData.total_amount || 0,
      shipping_address: orderData.shipping_address || 'Default Address',
      status: 'pending',
      created_at: new Date().toISOString()
    };

    // In a real implementation, this would be saved to a database
    mockOrders.push(newOrder);

    return NextResponse.json({ 
      message: 'Order created successfully',
      order: newOrder 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to create order',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400 });
  }
}

// /* eslint-disable */
// import { createClient } from "@/lib/server";

// // app/api/orders/route.ts
// export async function POST(request: Request) {
//     const supabase = await createClient();
//     const orderData = await request.json();
    
//     // Start transaction
//     const { data: order, error: orderError } = await supabase
//       .from('orders')
//       .insert({
//         customer_id: orderData.customer_id,
//         total_amount: orderData.total_amount,
//         shipping_address: orderData.shipping_address
//       })
//       .select()
//       .single();
    
//     if (orderError) {
//       return Response.json({ error: orderError.message }, { status: 400 });
//     }
    
//     // Create order items for each seller
//     const orderItems = orderData.items.map((item: { product_id: any; seller_id: any; quantity: number; unit_price: number; }) => ({
//       order_id: order.id,
//       product_id: item.product_id,
//       seller_id: item.seller_id,
//       quantity: item.quantity,
//       unit_price: item.unit_price,
//       total_price: item.quantity * item.unit_price
//     }));
    
//     const { error: itemsError } = await supabase
//       .from('order_items')
//       .insert(orderItems);
    
//     if (itemsError) {
//       return Response.json({ error: itemsError.message }, { status: 400 });
//     }
    
//     return Response.json({ order }, { status: 201 });
//   }
  
