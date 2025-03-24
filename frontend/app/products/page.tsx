'use client'
import Link from "next/link";

import { useState, useEffect } from 'react'
 
export default function products() {
  //const [products, setproducts] = useState(null)
 /*
  useEffect(() => {
    async function fetchproducts() {
      const res = await fetch('https://api.vercel.app/blog')
      const data = await res.json()
      setproducts(data)
    }
    fetchproducts()
  }, [])
*/
  let products = [{id: 1, title:'wrench'}, {id: 2, title:'hammer'}]
 
  if (!products) return <div>Loading...</div>
 
  return (
    <>
    <h1>
        Products
    </h1>
    <ul>
      {products.map((post) => (
        <li key={post.id}>
        <Link href={`/products/${post.id}`}>product {post.id}</Link>
        <p>{post.title}</p>
        </li>
      ))}
    </ul>
    </>
  )
}