import { siteConfig } from "@/config/site"

const { apiBaseUrl } = siteConfig

export const identify = async (
  imageLinks: string,
  endpoint: string = "identify/"
) => {
  try {
    const urls = imageLinks.split("\n")
    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ urls: urls }),
    })
    const data = await response.json()
    console.log(data)
    return { data, urls }
  } catch (error) {
    console.error("Error:", error)
  }
}
