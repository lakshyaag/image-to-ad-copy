export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "PromoPix",
  title: "PromoPix - Create Ad Copies from Product Images",
  description:
    "PromoPix is a tool that helps you create ad copies direcly from product images, eliminating the need to write ad copies manually.",
  url: "https://promo-pix-lakshyaag.vercel.app/",
  mainNav: [],
  links: {
    twitter: "https://twitter.com/lakshyaag",
    github: "https://github.com/lakshyaag/image-to-ad-copy",
  },
  apiBaseUrl:
    process.env.NODE_ENV === "production"
      ? process.env.API_BASE_URL
      : "http://127.0.0.1:5000/",
}
