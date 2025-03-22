from google import genai

from google.genai import types

from PIL import Image

from io import BytesIO

import base64

API_KEY = "AIzaSyD1ILbPJK0Df2GsQqa5eAxutiLZ85sRFVA"

# Initialize client with API key

client = genai.Client(api_key=API_KEY)



# Prompt for image generation

contents = ('Hi, can you create a generated contract preview')

try:

    # Generate image content

    response = client.models.generate_content(

        model="gemini-2.0-flash-exp-image-generation",

        contents=contents,

        config=types.GenerateContentConfig(

            response_modalities=['Text', 'Image']

        )

    )

    # Process response

    for part in response.candidates[0].content.parts:

        if hasattr(part, 'text') and part.text is not None:

            print(part.text)  # Print text response if available

        elif hasattr(part, 'inline_data') and part.inline_data is not None:

            image_data = BytesIO(part.inline_data.data)

            image = Image.open(image_data)

            image.save("gemini_native_image.png")

            image.show()

except Exception as e:

    print(f"Error generating image: {e}")