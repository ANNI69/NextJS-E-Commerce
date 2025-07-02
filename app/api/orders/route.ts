/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { productId, quantity } = await request.json()

}

