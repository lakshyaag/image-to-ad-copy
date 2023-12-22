import * as React from "react"
import Image from "next/image"
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import AdCopyComponent from "./ad-copy-section"
import Spinner from "./spinner"

const ProductCard = ({
  product,
  model_name,
  urls,
}: {
  product: Product
  model_name: string
  urls: string[]
}) => {
  const [adCopy, setAdCopy] = React.useState<AdCopy>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const generateCopy = async () => {
    setIsLoading(true)
    try {
      const res = await generate(product, model_name)
      setAdCopy(res)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <Card className="flex flex-col rounded-lg shadow-lg lg:ml-4">
        <CardHeader className="justify-center text-center">
          <CardTitle className="text-xl lg:text-2xl">{product.name}</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="flex flex-col">
          <Carousel className="w-full" opts={{ align: "center", loop: true }}>
            <CarouselContent>
              {urls.length > 0 &&
                urls.map((url, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-2/3 overflow-hidden"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <Image
                            loader={({ src }) => src}
                            src={url}
                            width={200}
                            height={200}
                            alt={product.name}
                            className="object-cover"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <ScrollArea>
            <div className="my-2 flex h-48 flex-col gap-4 overflow-auto">
              {product.key_features?.map((feature, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="mx-2 bg-slate-200 px-4 py-2 dark:bg-slate-800"
                >
                  {feature}
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <CardDescription className="mt-2">
            {product.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            variant="default"
            onClick={() => generateCopy()}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Generate copy"}
          </Button>
        </CardFooter>
        {adCopy && <AdCopyComponent key={adCopy.name} {...adCopy} />}
      </Card>
    </div>
  )
}

export default ProductCard
