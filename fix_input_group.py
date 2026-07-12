import re

with open('login.html', 'r') as f:
    content = f.read()

# Find the password section and update the input-group div to have position relative
pattern = r'(<h4 class="golden-text">\s*Your password.*?</h4>\s*<div class="input-group">)'
replacement = r'\1'.replace('<div class="input-group">', '<div class="input-group" style="position: relative;">')

# Use a more specific pattern to find and replace
content = re.sub(
    r'(<h4 class="golden-text">\s*Your password.*?</h4>\s*)<div class="input-group">',
    r'\1<div class="input-group" style="position: relative;">',
    content,
    flags=re.DOTALL
)

with open('login.html', 'w') as f:
    f.write(content)

print("Fixed input-group positioning for eye icon!")

# Verify the changes
with open('login.html', 'r') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if 'Your password' in line:
            print(f"Found 'Your password' at line {i+1}")
            for j in range(max(0, i-2), min(len(lines), i+15)):
                print(f"Line {j+1}: {lines[j].rstrip()}")
            break
