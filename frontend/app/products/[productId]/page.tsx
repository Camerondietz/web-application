"use client";
import { usePathname } from "next/navigation";

export default async function productdetails({
    params,
}: {
    params: Promise<{productId: string }>;
}) {
    const productId = (await params).productId;
    const pathname = usePathname();
    return(
    <>
    <h2>{pathname}</h2>
    <h1>
        Details about Product {productId}
    </h1>
    </>
    )
}