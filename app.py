import json
import logging
import os
import sys
from typing import List, Tuple

import instructor
from dotenv import find_dotenv, load_dotenv
from openai import OpenAI
from rich import print as rprint

from models import AdCopy, IdentifiedProduct, Product

load_dotenv(find_dotenv())

# Add logger
logging.basicConfig()
logger = logging.getLogger("app")
logger.setLevel("INFO")


client_image = instructor.patch(
    OpenAI(api_key=os.getenv("OPENAI_API_KEY")), mode=instructor.Mode.MD_JSON
)
client_copy = instructor.patch(
    OpenAI(api_key=os.getenv("OPENAI_API_KEY")), mode=instructor.Mode.FUNCTIONS
)


def read_images(image_urls: List[str]) -> IdentifiedProduct:
    """
    Given a list of image URLs, identify the products in the images.
    """

    logger.info(f"Identifying products in images... {len(image_urls)} images")

    return client_image.chat.completions.create(
        model="gpt-4-vision-preview",
        response_model=IdentifiedProduct,
        max_tokens=1024,
        temperature=0,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Identify products using the given images and generate key features for each product.",
                    },
                    *[
                        {"type": "image_url", "image_url": {"url": url}}
                        for url in image_urls
                    ],
                ],
            }
        ],
    )


def generate_ad_copy(product: Product) -> AdCopy:
    """
    Given a product, generate an ad copy for the product.
    """

    logger.info(f"Generating ad copy for product: {product.name}")

    return client_copy.chat.completions.create(
        model="gpt-4-1106-preview",
        response_model=AdCopy,
        temperature=0.3,
        messages=[
            {
                "role": "system",
                "content": "You are an expert marketing assistant for all products. Your task is to generate an advertisement copy for a product using the name, description, and key features.",
            },
            {"role": "user", "content": product.generate_prompt()},
        ],
    )


def run(images: List[str]) -> Tuple[List[Product], List[AdCopy]]:
    """
    Given a list of images, identify the products in the images and generate ad copy for each product.
    """

    identified_products: IdentifiedProduct = read_images(images)
    ad_copies = []

    if identified_products.error:
        rprint(f"[red]Error: {identified_products.message}[/red]")
        return []

    if not identified_products:
        rprint("[yellow]No products identified.[/yellow]")
        return []

    for product in identified_products.products:
        ad_copy: AdCopy = generate_ad_copy(product)
        ad_copies.append(ad_copy)

    return identified_products.products, ad_copies


if __name__ == "__main__":
    # Run logger
    logger.info("Starting app...")

    if len(sys.argv) != 2:
        print("Usage: python app.py <path_to_image_list_file>")
        sys.exit(1)

    image_file = sys.argv[1]
    with open(image_file, "r") as file:
        logger.info(f"Reading images from file: {image_file}")
        try:
            image_list = file.read().splitlines()
            logger.info(f"{len(image_list)} images read from file: {image_file}")
        except Exception as e:
            logger.error(f"Error reading images from file: {image_file}")
            logger.error(e)
            sys.exit(1)

    products, ad_copies = run(image_list)

    rprint(f"[green]{len(products)} products identified:[/green]")
    for product, ad_copy in zip(products, ad_copies):
        rprint(f"[green]{product}[/green]")
        rprint(f"[blue]Ad Copy: {ad_copy.ad_copy}[/blue]")

    logger.info("Writing results to file...")

    with open("results.json", "w") as f:
        json.dump(
            {
                "products": [prod.model_dump() for prod in products],
                "ad_copies": [ad.model_dump() for ad in ad_copies],
            },
            f,
            indent=4,
        )
