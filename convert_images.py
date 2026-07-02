import os
from PIL import Image

def convert_to_webp(input_path, output_path, quality=85):
    try:
        with Image.open(input_path) as img:
            img.save(output_path, 'WEBP', quality=quality)
        print(f"Successfully converted {input_path} to {output_path}")
        os.remove(input_path)
    except Exception as e:
        print(f"Failed to convert {input_path}: {e}")

convert_to_webp("d:\\colourparrot\\Farwaygo.com\\track.png", "d:\\colourparrot\\Farwaygo.com\\public\\images\\track.webp", 80)
convert_to_webp("d:\\colourparrot\\Farwaygo.com\\flight.png", "d:\\colourparrot\\Farwaygo.com\\public\\images\\flight.webp", 80)
