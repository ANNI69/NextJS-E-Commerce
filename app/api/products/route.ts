// app/api/products/route.ts
export async function GET(request: Request) {
    return Response.json({ message: 'Get all products' });
  }
  
  export async function POST(request: Request) {
    const body = await request.json();
    // Handle product creation
    return Response.json({ message: 'Product created', data: body });
  }
  