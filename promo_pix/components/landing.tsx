"use client"

import * as React from "react"
import { identify } from "@/api/identify"

import { siteConfig } from "@/config/site"
import { AdCopy, IdentifiedProduct, Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
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
  const [urls, setUrls] = React.useState<string[]>([])

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      if (res) {
        const { data, urls } = res
        setProducts(data)
        setUrls(urls)
      } else {
        throw new Error("No response from identify function")
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error identifying products",
        description: "An error occurred while trying to identify products.",
        duration: 4000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center py-2 sm:flex sm:flex-1 sm:items-center sm:justify-center">
      <h1 className="mb-4 text-4xl font-bold">Welcome to {siteConfig.name}</h1>
      <p className="mb-2 text-lg">{siteConfig.description}</p>
      <p className="text-md mb-4">
        Simply enter the image URLs in the text box below and click{" "}
        <span className="font-bold">&quot;Identify Products&quot;</span> to
        begin
      </p>
      <div className="m-4 grid w-full gap-2">
        <Label htmlFor="image-links">Enter image links</Label>
        <Textarea
          className="h-36 border-slate-500 dark:border-slate-50"
          placeholder="Enter image links (separate multiple images with a newline)"
          onChange={handleInputChange}
          id="image-links"
        />

        {!products && (
          <>
            <Label htmlFor="model">
              Choose the text model (default is GPT-3.5)
            </Label>
            <ModelSelect valueChange={setModel} />
          </>
        )}
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
                  urls={product.image_ids.map((id) => urls[id])}
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
