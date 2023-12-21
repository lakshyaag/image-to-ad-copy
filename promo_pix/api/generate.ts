import { siteConfig } from "@/config/site"
import { Product } from "@/lib/types"

const { apiBaseUrl } = siteConfig

export const generate = async (
  product: Product,
  endpoint: string = "/generate/"
) => {
  try {
    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error("Error:", error)
  }
}
