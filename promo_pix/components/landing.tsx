"use client"

import * as React from "react"
import { identify } from "@/api/identify"

import { siteConfig } from "@/config/site"
import { AdCopy, IdentifiedProduct, Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

import { ModelSelect } from "./model-select"
import ProductCard from "./product-card"
import Spinner from "./spinner"

export default function Landing() {
  const { toast } = useToast()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [imageLinks, setImageLinks] = React.useState("")
  const [products, setProducts] = React.useState<IdentifiedProduct>()
  const [model, setModel] = React.useState<string>("gpt-3.5-turbo")

  const handleInputChange = (event: any) => {
    setImageLinks(event.target.value)
  }

  const onClickIdentify = async () => {
    if (!imageLinks) {
      // alert("Please enter image links")
      toast({
        variant: "destructive",
        title: "No image links",
        description: "Please enter at least 1 image link for the model to run.",
        duration: 4000,
      })
      return
    }
    setIsLoading(true)
    try {
      const res = await identify(imageLinks)
      setProducts(res)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center py-2 sm:flex sm:flex-1 sm:items-center sm:justify-center">
      <Toaster />
      <h1 className="mb-4 text-4xl font-bold">Welcome to {siteConfig.name}</h1>
      <p className="mb-4 text-lg text-gray-600">{siteConfig.description}</p>
      <div className="m-4 grid w-full gap-2">
        <Textarea
          className="h-48 border-slate-500 dark:border-slate-50"
          placeholder="Enter image links (separate multiple images with a newline)"
          onChange={handleInputChange}
        />
        <ModelSelect valueChange={setModel} />
        <Button onClick={onClickIdentify} disabled={isLoading}>
          {isLoading ? <Spinner /> : "Identify products"}
        </Button>
      </div>

      {products && (
        <>
          <Separator />
          <div className="flex w-full flex-col items-center justify-center">
            <h2 className="mt-4 text-2xl font-bold">Products</h2>
            <p className="mb-4 text-sm">Using text model: {model}</p>
            <div className="xs:grid-cols-1 grid gap-6 lg:grid-cols-3">
              {products.products?.map((product: Product) => (
                <ProductCard
                  key={product.name}
                  product={product}
                  model_name={model}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
