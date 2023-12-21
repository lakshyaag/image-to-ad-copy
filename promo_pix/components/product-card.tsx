import * as React from "react"
import { generate } from "@/api/generate"

import { AdCopy, Product } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import AdCopyComponent from "./ad-copy-section"

const ProductCard = ({ product }: { product: Product }) => {
  const generateCopy = async () => {
    try {
      const res = await generate(product)
      setAdCopy(res)
    } catch (err) {
      console.log(err)
    }
  }
  const [adCopy, setAdCopy] = React.useState<AdCopy>()

  // const adCopy: AdCopy = {
  //   headline: "Elevate Your Game with High-Top Basketball Sneakers",
  //   ad_copy:
  //     "Introducing our latest innovation in basketball footwear - the High-Top Basketball Sneakers. Designed to enhance your performance on the court, these sneakers feature a high-top design that provides excellent ankle support and stability. With their iconic branding, you'll stand out from the crowd and make a statement. The black and white color scheme adds a touch of style to your game. Don't miss out on the opportunity to take your basketball skills to the next level. Get your pair of High-Top Basketball Sneakers today!",
  //   name: "High-Top Basketball Sneakers",
  // }

  return (
    <div className="flex flex-col">
      <Card className="ml-4 flex flex-col overflow-hidden rounded-lg shadow-lg">
        <CardHeader className="h-24 overflow-auto">
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="my-2 flex h-48 flex-col flex-wrap gap-4 overflow-auto">
            {product.key_features?.map((feature, index) => (
              <Badge key={index} variant="secondary" className="mx-2 px-4 py-2">
                {feature}
              </Badge>
            ))}
          </div>
          <CardDescription className="mt-2">
            {product.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="default" onClick={() => generateCopy()}>
            Generate copy!
          </Button>
        </CardFooter>
        {adCopy && <AdCopyComponent key={adCopy.name} {...adCopy} />}
      </Card>
    </div>
  )
}

export default ProductCard
