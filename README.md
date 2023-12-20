# Image to Ad Copy

This is a quick and dirty implementation of a random idea I had on a Tuesday evening. The project is about identifying products from images using GPT-4-Vision and generating ad copies for them.

## Features

- Identify products from images using AI.
- Generate ad copies for identified products.
- Store results in a structured JSON format.

## Models

We use two main models in this project:

- `Product`: Represents a product extracted from an image.
- `AdCopy`: Represents a generated ad copy for a product.

The `instructor` library makes it easy to extract structured data from images and prompts. Find out more [here](https://github.com/jxnl/instructor)

## Usage

To use this project, follow these steps:

1. Clone the repository.
2. Install the required dependencies using `pip install -r requirements.txt`.
3. Define the OpenAI API key as an environment variable named `OPENAI_API_KEY` in `.env` file.
4. Run the `app.py` script with a path to a file containing image URLs as an argument. For example, `python app.py images.txt`.

For more details, refer to the `app.py` and `models.py` files in this repository.

## Contributing

Contributions are welcome! If you have a feature request or bug report, please open an issue on this repository.
