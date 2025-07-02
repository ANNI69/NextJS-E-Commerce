"use client"
import { Suspense } from "react";
import ShopPageClient from "./ShopPageClient";

export default function Page() {
  return <Suspense>
    <ShopPageClient />;
  </Suspense>
}
