// app/api/products/[productId]/route.ts
export async function GET(
    request: Request,
    { params }: { params: Promise<{ productId: string }> }
  ) {
    const { productId } = await params;
    // Fetch specific product
    return Response.json({ productId });
  }
  