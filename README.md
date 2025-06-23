# SignatureStudio ✉️

> **Professional email signatures in seconds**

A modern, clean, and intuitive email signature generator that helps professionals create stunning email signatures without any design experience.

[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen)](https://yourusername.github.io/signature-studio)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/yourusername/signature-studio)

## ✨ Features

### 🎨 **Beautiful Templates**
- **Modern**: Clean, contemporary design with rounded elements
- **Classic**: Traditional professional layout
- **Minimal**: Clean, distraction-free design
- **Corporate**: Formal business-oriented style

### 🖼️ **Smart Image Handling**
- Drag & drop image upload
- Automatic image optimization
- Multiple image styles (rounded, square, hidden)
- 5MB file size limit with compression

### 🎯 **Real-time Preview**
- Live preview as you type
- Desktop and mobile view modes
- Instant visual feedback
- Progress tracking

### 🌙 **Modern UX**
- Light and dark theme support
- Responsive design for all devices
- Smooth animations and transitions
- Keyboard shortcuts for power users

### 📤 **Multiple Export Options**
- **HTML**: Copy formatted signature for email clients
- **Text**: Plain text version for mobile apps
- **vCard**: Download contact information

### ⚡ **Performance Optimized**
- Vanilla JavaScript (no frameworks)
- Debounced input handling
- CSS-driven animations
- Optimized for Core Web Vitals

## 🚀 Live Demo

**[Try SignatureStudio →](https://yourusername.github.io/signature-studio)**

## 📸 Screenshots

### Desktop View
![Desktop Interface](https://via.placeholder.com/800x600/2563eb/ffffff?text=SignatureStudio+Desktop)

### Mobile Responsive
![Mobile Interface](https://via.placeholder.com/400x800/2563eb/ffffff?text=SignatureStudio+Mobile)

### Dark Mode
![Dark Mode](https://via.placeholder.com/800x600/1a1a1a/ffffff?text=SignatureStudio+Dark+Mode)

## 🛠️ Tech Stack

- **HTML5**: Semantic, accessible markup
- **CSS3**: Modern features with CSS Grid/Flexbox
- **Vanilla JavaScript**: ES6+ with modern web APIs
- **No Dependencies**: Lightweight and fast

## 📁 Project Structure

```
signature-studio/
├── index.html              # Main application
├── css/
│   └── styles.css         # All styles with CSS variables
├── js/
│   └── app.js            # Application logic
├── assets/               # Static assets
│   ├── icons/
│   └── images/
└── README.md            # Project documentation
```

## 🔧 Local Development

### Prerequisites
- Modern web browser
- Local web server (optional)

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/signature-studio.git
cd signature-studio

# Option 1: Open directly in browser
open index.html

# Option 2: Use local server (recommended)
python -m http.server 8000
# or
npx serve .
```

Visit `http://localhost:8000` in your browser.

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | ≥ 70    |
| Firefox | ≥ 65    |
| Safari  | ≥ 12    |
| Edge    | ≥ 79    |

## 🎯 Usage Guide

### 1. **Choose Your Template**
Select from 4 professionally designed templates that suit your style.

### 2. **Upload Your Photo**
Drag and drop your profile picture or click to browse. Images are automatically optimized.

### 3. **Fill Your Details**
Enter your name, title, company, and contact information. Watch the preview update in real-time.

### 4. **Customize Colors**
Use the color picker to match your brand colors.

### 5. **Copy & Use**
Click "Copy HTML" and paste into your email client using Ctrl+Shift+V (or Cmd+Shift+V on Mac).

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Enter` | Copy HTML signature |
| `Ctrl/Cmd + K` | Focus first input field |
| `Escape` | Clear current focus |

## 🎨 Customization

### CSS Variables
The entire design system is built with CSS custom properties for easy customization:

```css
:root {
  --primary-color: #2563eb;
  --accent-color: #0ea5e9;
  --text-primary: #0f172a;
  --bg-primary: #ffffff;
  /* ... more variables */
}
```

### Adding New Templates
1. Define template in `js/app.js`:
```javascript
this.templates = {
  yourTemplate: { 
    imageStyle: 'rounded', 
    layout: 'horizontal' 
  }
};
```

2. Add template button in HTML
3. Style in CSS if needed

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Follow existing code style
2. Test on multiple browsers
3. Ensure responsive design
4. Add comments for complex logic
5. Update documentation

### Reporting Issues
Please use GitHub Issues with:
- Clear description
- Browser and version
- Steps to reproduce
- Expected vs actual behavior

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- Design inspiration from modern web applications
- Icons from emoji set
- Built with modern web standards
- Crafted by [Dee7 Studio](https://dee7studio.com)

## 🔗 Links

- **Live Demo**: [https://yourusername.github.io/signature-studio](https://yourusername.github.io/signature-studio)
- **Report Bug**: [GitHub Issues](https://github.com/yourusername/signature-studio/issues)
- **Request Feature**: [GitHub Issues](https://github.com/yourusername/signature-studio/issues)
- **Portfolio**: [Dee7 Studio](https://dee7studio.com)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/signature-studio&type=Date)](https://star-history.com/#yourusername/signature-studio&Date)

---

<div align="center">

**Made with ❤️ by [Dee7 Studio](https://dee7studio.com)**

If this project helped you, please consider giving it a ⭐️!

</div>
