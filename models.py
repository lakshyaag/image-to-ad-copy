from pydantic import BaseModel, Field
from typing import Optional, List


class Product(BaseModel):
    """
    Represents a product extracted from an image using AI.

    The product attributes are dynamically determined based on the content
    of the image and the AI's interpretation. This class serves as a structured
    representation of the identified product characteristics.
    """

    name: str = Field(
        description="A generic name for the product.", example="Headphones"
    )
    key_features: Optional[list[str]] = Field(
        description="A list of key features of the product that stand out.",
        example=["Wireless", "Noise Cancellation"],
        default=None,
    )

    description: Optional[str] = Field(
        description="A description of the product.",
        example="Wireless headphones with noise cancellation.",
        default=None,
    )

    def generate_prompt(self):
        prompt = f"Product: {self.name}\n"
        if self.description:
            prompt += f"Description: {self.description}\n"
        if self.key_features:
            prompt += f"Key Features: {', '.join(self.key_features)}\n"
        return prompt

    def __repr__(self):
        return self.generate_prompt()


class IdentifiedProduct(BaseModel):
    """
    Represents a list of products identified in the images.
    """

    products: Optional[List[Product]] = Field(
        description="A list of products identified by the AI.",
        example=[
            Product(
                name="Headphones",
                description="Wireless headphones with noise cancellation.",
                key_features=["Wireless", "Noise Cancellation"],
            )
        ],
        default=None,
    )

    error: bool = Field(default=False)
    message: Optional[str] = Field(default=None)

    def __bool__(self):
        return self.products is not None and len(self.products) > 0


class AdCopy(BaseModel):
    """
    Represents a generated ad copy.
    """

    headline: str = Field(
        description="A short, catchy, and memorable headline for the given product. The headline should invoke curiosity and interest in the product.",
        example="Wireless Headphones",
    )
    ad_copy: str = Field(
        description="A long-form advertisement copy for the given product. This will be used in campaigns to promote the product with a persuasive message and a call-to-action with the objective of driving sales.",
        example="""
        "Experience the ultimate sound quality with our wireless headphones, featuring high-definition audio, noise-cancellation, and a comfortable, ergonomic design for all-day listening."
        """,
    )
    name: str = Field(
        description="The name of the product being advertised.",
        example="Headphones",
    )

    def __str__(self):
        return f"{self.name}: \n" + "-" * 100 + f"{self.headline}\n{self.ad_copy}"

    def __repr__(self):
        return str(self)
