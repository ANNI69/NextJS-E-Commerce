// import { createClient } from "@/lib/server";

// export async function authenticateSeller(request: Request) {
//     const supabase = await createClient();
//     const { data: { user } } = await supabase.auth.getUser();
    
//     if (!user) {
//       throw new Error('Authentication required');
//     }
    
//     const { data: seller } = await supabase
//       .from('sellers')
//       .select('id, status')
//       .eq('user_id', user.id)
//       .single();
    
//     if (!seller || seller.status !== 'active') {
//       throw new Error('Seller account not found or inactive');
//     }
    
//     return { user, seller };
//   }
  