// app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_self_URL || 'https://aventrek.com';

import { getAllProducts } from "@/lib/products"; // returns id, updatedAt
//import { getAllCategories } from "@/lib/categories"; // optional, if you want category pages

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: `${BASE_URL}/`, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/Legal/terms-of-access`, lastModified: new Date(), priority: 0.5 },
    { url: `${BASE_URL}/Legal/terms-of-sale`, lastModified: new Date(), priority: 0.5 },
    { url: `${BASE_URL}/Legal/privacy-policy`, lastModified: new Date(), priority: 0.5 },
    { url: `${BASE_URL}/Legal/shipping-and-returns`, lastModified: new Date(), priority: 0.5 },
    { url: `${BASE_URL}/sitemap`, lastModified: new Date(), priority: 0.3 },
  ];

  // dynamic product pages
    const products = await getAllProducts();
  const productUrls = products.map(prod => ({
    url: `${BASE_URL}/products/${prod.id}`,
    lastModified: prod.updatedAt,
    priority: 0.7,
  }));

  // optional: category pages
{/*}
  const categories = await getAllCategories();
  const categoryUrls = categories.map(cat => ({
    url: `${BASE_URL}/categories/${cat.slug}`,
    lastModified: cat.updatedAt,
    priority: 0.6,
  }));
*/}
  return [
    ...staticPages,
    ...productUrls,
    //...categoryUrls,
  ];
}
