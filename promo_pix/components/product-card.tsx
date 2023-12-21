import { Product } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg ml-4">
      <CardHeader className="flex flex-col justify-between leading-normal">
        <div>
          <h3 className="text-xl font-bold">{product.name}</h3>
        </div>
      </CardHeader>
      {product.key_features && (
        <div className="mt-1 flex flex-wrap px-6">
          {product.key_features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="mb-2 mr-2">
              {feature}
            </Badge>
          ))}
        </div>
      )}
      <CardContent className="px-6 py-4">
        <p className="text-md leading-none">{product.description}</p>
      </CardContent>
    </Card>
  )
}

export default ProductCard
