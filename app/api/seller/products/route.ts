// app/api/seller/products/route.ts
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const productData = await request.json();
  
  // Get seller ID
  const { data: seller } = await supabase
    .from('sellers')
    .select('id')
    .eq('user_id', user.id)
    .single();
  
  if (!seller) {
    return Response.json({ error: 'Seller not found' }, { status: 404 });
  }
  
  // Create product
  const { data: product, error } = await supabase
    .from('products')
    .insert({
      ...productData,
      seller_id: seller.id
    })
    .select()
    .single();
  
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  
  return Response.json({ product }, { status: 201 });
}
