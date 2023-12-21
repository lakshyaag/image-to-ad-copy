"use client"

import * as React from "react"
import { identify } from "@/api/identify"

import { siteConfig } from "@/config/site"
import { AdCopy, IdentifiedProduct, Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import ProductCard from "./product-card"

export default function Landing() {
  const [imageLinks, setImageLinks] = React.useState("")
  const [products, setProducts] = React.useState<IdentifiedProduct>()
  // const products = {
  //   products: [
  //     {
  //       name: "High-Top Basketball Sneakers",
  //       key_features: [
  //         "High-Top Design",
  //         "Basketball Sneakers",
  //         "Iconic Branding",
  //         "Black and White Color Scheme",
  //       ],
  //       description:
  //         "A pair of black and white high-top basketball sneakers with iconic branding.",
  //     },
  //     {
  //       name: "White High-Top Sneakers",
  //       key_features: [
  //         "High-Top Design",
  //         "Minimalist Style",
  //         "All-White Color",
  //         "Versatile Footwear",
  //       ],
  //       description:
  //         "A pair of all-white high-top sneakers with a minimalist design.",
  //     },
  //     {
  //       name: "White High-Top Sneakers",
  //       key_features: [
  //         "High-Top Design",
  //         "Minimalist Style",
  //         "All-White Color",
  //         "Versatile Footwear",
  //       ],
  //       description:
  //         "A pair of all-white high-top sneakers with a minimalist design.",
  //     },
  //     {
  //       name: "White High-Top Sneakers",
  //       key_features: [
  //         "High-Top Design",
  //         "Minimalist Style",
  //         "All-White Color",
  //         "Versatile Footwear",
  //       ],
  //       description:
  //         "A pair of all-white high-top sneakers with a minimalist design.",
  //     },
  //   ],
  //   error: false,
  //   message: null,
  // }

  const handleInputChange = (event: any) => {
    setImageLinks(event.target.value)
  }

  const onClickGenerate = async () => {
    try {
      const res = await identify(imageLinks)
      setProducts(res)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col items-center sm:flex sm:flex-1 sm:items-center sm:justify-center py-2">
      <h1 className="mb-4 text-4xl font-bold">Welcome to {siteConfig.name}</h1>
      <p className="mb-8 text-lg text-gray-600">{siteConfig.description}</p>
      <div className="m-4 grid w-full gap-2">
        <Textarea
          placeholder="Enter image links (separate multiple images with a newline)"
          onChange={handleInputChange}
        />
        <Button onClick={onClickGenerate}>Generate!</Button>
      </div>

      {products && (
        <>
          <Separator />
          <div className="flex w-full flex-col items-center justify-center">
            <h2 className="my-4 text-2xl font-bold">Products identified</h2>
            <div className="xs:grid-cols-1 grid gap-6 lg:grid-cols-3">
              {products.products?.map((product: Product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
