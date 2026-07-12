import re

with open('login.html', 'r') as f:
    content = f.read()

# First, make the input-group relative positioned
content = re.sub(
    r'(<h4 class="golden-text">\s*Your password.*?<div class="input-group">)',
    r'\1'.replace('<div class="input-group">', '<div class="input-group" style="position: relative;">'),
    content,
    flags=re.DOTALL
)

# Now add the eye icon button after the password input
password_input_pattern = r'(<input\s+type="password"\s+name="password"\s+id="login-password"[^>]*/>)'
replacement = r'''\1
                                <button type="button" class="password-toggle" onclick="togglePassword('login-password', 'login-eye-icon')" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #d4af37; cursor: pointer; z-index: 10; padding: 5px;">
                                    <svg id="login-eye-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                    </svg>
                                </button>'''

content = re.sub(password_input_pattern, replacement, content)

with open('login.html', 'w') as f:
    f.write(content)

print("Eye icon added successfully to login page!")
