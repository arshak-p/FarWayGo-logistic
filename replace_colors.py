import os
import re

directory = "d:/c p web/farwaygo-website/src"
# Regex to match: prefix-(--color-name)
# e.g. bg-(--color-navy) -> bg-[var(--color-navy)]
# e.g. text-(--color-ink)/55 -> text-[var(--color-ink)]/55

pattern = re.compile(r'([a-zA-Z0-9_-]+)-\(--color-([a-zA-Z0-9_-]+)\)')

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = pattern.sub(r'\1-[var(--color-\2)]', content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
