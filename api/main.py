from typing import List

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import app as engine
from models import AdCopy, Product, IdentifiedProduct

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class ImageList(BaseModel):
    urls: List[str]


class ProductList(BaseModel):
    products: List[Product]
    ad_copies: List[AdCopy]


@app.get("/")
def read_root():
    return {
        "message": "Welcome to the API for the AI-Powered Marketing Assistant! Please view /docs for more information."
    }


@app.post("/test/")
def test(image_list: ImageList):
    return image_list


@app.post("/identify/", response_model=IdentifiedProduct)
def identify_product(image_list: ImageList, max_tokens: int = 1024):
    try:
        identified_products = engine.read_images(image_list.urls, max_tokens=max_tokens)
        if identified_products.error:
            raise HTTPException(status_code=404, detail=identified_products.message)
        return identified_products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/generate/", response_model=AdCopy)
def generate_copy(product: Product, model: str = "gpt-3.5-turbo"):
    try:
        ad_copy = engine.generate_ad_copy(product, model=model)
        return ad_copy
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, log_level="info", reload=True)
