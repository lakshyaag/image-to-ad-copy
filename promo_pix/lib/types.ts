export interface Product {
  name: string
  key_features?: string[]
  description?: string
  image_ids: number[]
}

export interface IdentifiedProduct {
  products?: Product[]
  error: boolean
  message?: string
}

export interface AdCopy {
  headline: string
  ad_copy: string
  name: string
}
