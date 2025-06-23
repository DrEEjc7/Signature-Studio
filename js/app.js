/**
   * Generate signature HTML with template-specific styling
   */
  generateSignatureHTML(template) {
    const { formData, imageDataUrl } = this.state;
    const imageSrc = imageDataUrl || (template.imageStyle !== 'hidden' ? this.placeholderImage : null);
    
    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'John Doe';
    
    // Generate social links
    let socialHtml = '';
    if (formData.linkedin) {
      socialHtml += `<a href="${formData.linkedin}" class="social-link" target="_blank" rel="noopener">💼</a>`;
    }
    if (formData.twitter) {
      socialHtml += `<a href="${formData.twitter}" class="social-link" target="_blank" rel="noopener">🐦</a>`;
    }
    if (socialHtml) {
      socialHtml = `<div class="signature-social" style="margin-top: 8px; display: flex; gap: 8px;">${socialHtml}</div>`;
    }

    // Template-specific styling
    const nameStyle = `font-size: 18px; font-weight: 600; color: ${formData.color}; margin-bottom: 4px;`;
    const titleStyle = template.showTitle ? `font-size: 14px; color: #666666; font-style: italic; margin-bottom: 6px;` : '';
    const companyStyle = template.showCompany ? `font-size: 16px; font-weight: ${template.companyWeight === 'bold' ? '700' : '600'}; color: ${formData.color}; margin-bottom: 4px;` : '';
    
    // Different layouts for different templates
    if (template.layout === 'vertical') {
      // Corporate and Minimal vertical layout
      const imageCell = imageSrc && template.imageStyle !== 'hidden' ? `
        <div style="text-align: center; margin-bottom: 12px/**
 * Modern Email Signature Generator
 * Clean, modular JavaScript architecture
 */

class SignatureGenerator {
  constructor() {
    this.state = {
      theme: 'light',
      currentTemplate: 'modern',
      currentView: 'desktop',
      imageDataUrl: null,
      formData: {},
      isLoading: false
    };

    this.templates = {
      modern: { 
        imageStyle: 'rounded', 
        layout: 'horizontal',
        showTitle: true,
        showCompany: true,
        companyWeight: 'normal'
      },
      classic: { 
        imageStyle: 'square', 
        layout: 'horizontal',
        showTitle: true,
        showCompany: true,
        companyWeight: 'normal'
      },
      minimal: { 
        imageStyle: 'hidden', 
        layout: 'vertical',
        showTitle: false,
        showCompany: false,
        companyWeight: 'normal'
      },
      corporate: { 
        imageStyle: 'square', 
        layout: 'vertical',
        showTitle: true,
        showCompany: true,
        companyWeight: 'bold'
      }
    };

    this.placeholderImage = this.generatePlaceholderSVG();
    this.debounceTimer = null;

    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.cacheElements();
    this.loadTheme();
    this.bindEvents();
    this.updatePreview();
    this.updateProgress();
    this.setCurrentYear();
    
    // Add loading animation on init
    this.addInitialAnimations();
  }

  /**
   * Cache DOM elements for better performance
   */
  cacheElements() {
    // Form elements
    this.elements = {
      // Theme
      themeToggle: document.getElementById('themeToggle'),
      
      // Form inputs
      firstName: document.getElementById('firstName'),
      lastName: document.getElementById('lastName'),
      title: document.getElementById('title'),
      company: document.getElementById('company'),
      email: document.getElementById('email'),
      phone: document.getElementById('phone'),
      website: document.getElementById('website'),
      colorPicker: document.getElementById('colorPicker'),
      colorText: document.getElementById('colorText'),
      linkedin: document.getElementById('linkedin'),
      twitter: document.getElementById('twitter'),
      
      // Image upload
      imageInput: document.getElementById('imageInput'),
      imageUpload: document.getElementById('imageUpload'),
      
      // Preview
      signaturePreview: document.getElementById('signaturePreview'),
      signatureContent: document.getElementById('signatureContent'),
      progressFill: document.getElementById('progressFill'),
      
      // Buttons
      copyHtmlBtn: document.getElementById('copyHtmlBtn'),
      copyTextBtn: document.getElementById('copyTextBtn'),
      downloadBtn: document.getElementById('downloadBtn'),
      
      // Footer
      currentYear: document.getElementById('currentYear'),
      
      // Template and view buttons
      templateBtns: document.querySelectorAll('.template-btn'),
      viewBtns: document.querySelectorAll('.view-btn')
    };
  }

  /**
   * Bind all event listeners
   */
  bindEvents() {
    // Theme toggle
    this.elements.themeToggle?.addEventListener('click', () => this.toggleTheme());

    // Form inputs with debounced updates
    const formInputs = [
      'firstName', 'lastName', 'title', 'company', 
      'email', 'phone', 'website', 'linkedin', 'twitter'
    ];
    
    formInputs.forEach(inputId => {
      const element = this.elements[inputId];
      if (element) {
        element.addEventListener('input', (e) => this.handleInputChange(e));
        element.addEventListener('blur', () => this.validateInput(element));
      }
    });

    // Color inputs
    this.elements.colorPicker?.addEventListener('input', (e) => this.handleColorChange(e));
    this.elements.colorText?.addEventListener('input', (e) => this.handleColorTextChange(e));

    // Image upload
    this.bindImageUploadEvents();

    // Template selection
    this.elements.templateBtns?.forEach(btn => {
      btn.addEventListener('click', () => this.switchTemplate(btn.dataset.template));
    });

    // View toggle
    this.elements.viewBtns?.forEach(btn => {
      btn.addEventListener('click', () => this.switchView(btn.dataset.view));
    });

    // Export buttons
    this.elements.copyHtmlBtn?.addEventListener('click', () => this.copySignature('html'));
    this.elements.copyTextBtn?.addEventListener('click', () => this.copySignature('text'));
    this.elements.downloadBtn?.addEventListener('click', () => this.downloadSignature());

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
  }

  /**
   * Handle input changes with debouncing
   */
  handleInputChange(event) {
    const { target } = event;
    this.updateCharCount(target);
    
    // Debounce preview updates for better performance
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.updateFormData();
      this.updatePreview();
      this.updateProgress();
    }, 150);
  }

  /**
   * Update character count display
   */
  updateCharCount(input) {
    const charCount = input.nextElementSibling;
    if (charCount?.classList.contains('char-count')) {
      const current = input.value.length;
      const max = input.maxLength;
      charCount.textContent = `${current}/${max}`;
      
      // Add warning class if near limit
      charCount.classList.toggle('warning', current > max * 0.8);
    }
  }

  /**
   * Validate individual input
   */
  validateInput(input) {
    const isValid = input.checkValidity();
    input.classList.toggle('error', !isValid);
    
    if (!isValid) {
      this.showInputError(input);
    }
    
    return isValid;
  }

  /**
   * Show input error message
   */
  showInputError(input) {
    const errorMsg = input.parentElement.querySelector('.error-message');
    if (errorMsg) {
      errorMsg.style.display = 'block';
      setTimeout(() => {
        errorMsg.style.display = 'none';
      }, 3000);
    }
  }

  /**
   * Handle color picker changes
   */
  handleColorChange(event) {
    const color = event.target.value;
    this.elements.colorText.value = color;
    this.updatePreview();
  }

  /**
   * Handle color text input changes
   */
  handleColorTextChange(event) {
    const color = event.target.value;
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      this.elements.colorPicker.value = color;
      this.updatePreview();
    }
  }

  /**
   * Bind image upload events
   */
  bindImageUploadEvents() {
    const { imageUpload, imageInput } = this.elements;
    
    if (!imageUpload || !imageInput) return;

    // Click to upload
    imageUpload.addEventListener('click', () => imageInput.click());

    // File input change
    imageInput.addEventListener('change', (e) => {
      if (e.target.files.length) {
        this.handleImageFile(e.target.files[0]);
      }
    });

    // Drag and drop
    imageUpload.addEventListener('dragover', (e) => {
      e.preventDefault();
      imageUpload.classList.add('dragover');
    });

    imageUpload.addEventListener('dragleave', () => {
      imageUpload.classList.remove('dragover');
    });

    imageUpload.addEventListener('drop', (e) => {
      e.preventDefault();
      imageUpload.classList.remove('dragover');
      
      if (e.dataTransfer.files.length) {
        this.handleImageFile(e.dataTransfer.files[0]);
      }
    });
  }

  /**
   * Handle image file upload
   */
  async handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
      this.showNotification('Please select an image file', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      this.showNotification('Image size must be less than 5MB', 'error');
      return;
    }

    try {
      this.state.imageDataUrl = await this.readFileAsDataURL(file);
      this.updatePreview();
      this.showNotification('Image uploaded successfully', 'success');
    } catch (error) {
      this.showNotification('Failed to upload image', 'error');
      console.error('Image upload error:', error);
    }
  }

  /**
   * Read file as data URL
   */
  readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Switch template
   */
  switchTemplate(templateName) {
    this.state.currentTemplate = templateName;
    
    // Update active button
    this.elements.templateBtns?.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.template === templateName);
    });
    
    this.updatePreview();
    this.showNotification(`Switched to ${templateName} template`, 'info');
  }

  /**
   * Switch view (desktop/mobile)
   */
  switchView(viewName) {
    this.state.currentView = viewName;
    
    // Update active button
    this.elements.viewBtns?.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });
    
    // Update preview container
    this.elements.signaturePreview?.classList.toggle('mobile-view', viewName === 'mobile');
    
    this.showNotification(`Switched to ${viewName} view`, 'info');
  }

  /**
   * Update form data state
   */
  updateFormData() {
    this.state.formData = {
      firstName: this.elements.firstName?.value || '',
      lastName: this.elements.lastName?.value || '',
      title: this.elements.title?.value || '',
      company: this.elements.company?.value || '',
      email: this.elements.email?.value || '',
      phone: this.elements.phone?.value || '',
      website: this.elements.website?.value || '',
      color: this.elements.colorPicker?.value || '#2563eb',
      linkedin: this.elements.linkedin?.value || '',
      twitter: this.elements.twitter?.value || ''
    };
  }

  /**
   * Update signature preview
   */
  updatePreview() {
    this.updateFormData();
    const template = this.templates[this.state.currentTemplate];
    const html = this.generateSignatureHTML(template);
    
    if (this.elements.signatureContent) {
      this.elements.signatureContent.innerHTML = html;
      this.elements.signatureContent.classList.add('fade-in');
    }
  }

  /**
   * Generate signature HTML with template-specific styling
   */
  generateSignatureHTML(template) {
    const { formData, imageDataUrl } = this.state;
    const imageSrc = imageDataUrl || (template.imageStyle !== 'hidden' ? this.placeholderImage : null);
    
    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'John Doe';
    
    // Generate social links
    let socialHtml = '';
    if (formData.linkedin) {
      socialHtml += `<a href="${formData.linkedin}" class="social-link" target="_blank" rel="noopener">💼</a>`;
    }
    if (formData.twitter) {
      socialHtml += `<a href="${formData.twitter}" class="social-link" target="_blank" rel="noopener">🐦</a>`;
    }
    if (socialHtml) {
      socialHtml = `<div class="signature-social" style="margin-top: 8px; display: flex; gap: 8px;">${socialHtml}</div>`;
    }

    // Template-specific styling
    const nameStyle = `font-size: 18px; font-weight: 600; color: ${formData.color}; margin-bottom: 4px;`;
    const titleStyle = template.showTitle && formData.title ? `font-size: 14px; color: #666666; font-style: italic; margin-bottom: 6px;` : '';
    const companyStyle = template.showCompany && formData.company ? `font-size: 16px; font-weight: ${template.companyWeight === 'bold' ? '700' : '600'}; color: ${formData.color}; margin-bottom: 4px;` : '';
    
    // Template-specific layouts
    if (template.layout === 'vertical' || this.state.currentTemplate === 'corporate') {
      // Vertical layout for Corporate template
      return `
        <div style="font-family: Arial, sans-serif; line-height: 1.4; text-align: center;">
          ${imageSrc && template.imageStyle !== 'hidden' ? `
            <div style="margin-bottom: 12px;">
              <img src="${imageSrc}" 
                   style="width: 60px; height: 60px; object-fit: cover; ${template.imageStyle === 'rounded' ? 'border-radius: 50%;' : 'border-radius: 4px;'}"
                   alt="Profile Picture">
            </div>
          ` : ''}
          <div style="${nameStyle}">${fullName}</div>
          ${template.showTitle && formData.title ? `<div style="${titleStyle}">${formData.title}</div>` : ''}
          ${template.showCompany && formData.company ? `<div style="${companyStyle}">${formData.company}</div>` : ''}
          <div style="font-size: 13px; color: #666666; margin-top: 8px;">
            ${formData.email ? `<div style="margin-bottom: 2px;">📧 ${formData.email}</div>` : ''}
            ${formData.phone ? `<div style="margin-bottom: 2px;">📱 ${formData.phone}</div>` : ''}
            <div style="margin-bottom: 2px;">🌐 ${formData.website || 'www.company.com'}</div>
          </div>
          ${socialHtml}
        </div>
      `;
    } else if (this.state.currentTemplate === 'minimal') {
      // Minimal template - text only, very clean
      return `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <div style="font-size: 18px; font-weight: 600; color: ${formData.color}; margin-bottom: 2px;">
            ${fullName}
          </div>
          <div style="font-size: 13px; color: #666666;">
            ${formData.email ? `${formData.email}` : ''}
            ${formData.email && formData.phone ? ' • ' : ''}
            ${formData.phone ? `${formData.phone}` : ''}
            ${(formData.email || formData.phone) ? ' • ' : ''}
            ${formData.website || 'www.company.com'}
          </div>
          ${socialHtml}
        </div>
      `;
    } else {
      // Horizontal layout for Modern and Classic templates
      const imageCell = imageSrc ? `
        <td style="vertical-align: top; padding: 0 16px 0 0; width: 80px;">
          <img src="${imageSrc}" 
               style="width: 70px; height: 70px; object-fit: cover; ${template.imageStyle === 'rounded' ? 'border-radius: 50%;' : 'border-radius: 6px;'}"
               alt="Profile Picture">
        </td>
      ` : '';

      return `
        <table style="border-collapse: collapse; font-family: Arial, sans-serif;">
          <tbody>
            <tr>
              ${imageCell}
              <td style="vertical-align: top; padding: 0; line-height: 1.4;">
                <div style="${nameStyle}">${fullName}</div>
                ${template.showTitle && formData.title ? `<div style="${titleStyle}">${formData.title}</div>` : ''}
                ${template.showCompany && formData.company ? `<div style="${companyStyle}">${formData.company}</div>` : ''}
                <div style="font-size: 13px; color: #666666;">
                  ${formData.email ? `<div style="margin-bottom: 2px;">📧 ${formData.email}</div>` : ''}
                  ${formData.phone ? `<div style="margin-bottom: 2px;">📱 ${formData.phone}</div>` : ''}
                  <div style="margin-bottom: 2px;">🌐 ${formData.website || 'www.company.com'}</div>
                </div>
                ${socialHtml}
              </td>
            </tr>
          </tbody>
        </table>
      `;
    }
  }

  /**
   * Update progress bar
   */
  updateProgress() {
    const requiredFields = ['firstName', 'lastName', 'email'];
    const optionalFields = ['title', 'company', 'phone', 'website'];
    
    const filledRequired = requiredFields.filter(field => 
      this.elements[field]?.value.trim()
    ).length;
    
    const filledOptional = optionalFields.filter(field => 
      this.elements[field]?.value.trim()
    ).length;
    
    const progress = ((filledRequired / requiredFields.length) * 60) + 
                    ((filledOptional / optionalFields.length) * 40);
    
    if (this.elements.progressFill) {
      this.elements.progressFill.style.width = `${Math.min(progress, 100)}%`;
    }
  }

  /**
   * Copy signature to clipboard
   */
  async copySignature(format) {
    try {
      let content;
      
      if (format === 'html') {
        const template = this.templates[this.state.currentTemplate];
        content = this.generateSignatureHTML(template);
      } else {
        content = this.generateTextSignature();
      }
      
      await navigator.clipboard.writeText(content);
      this.showCopySuccess(format === 'html' ? this.elements.copyHtmlBtn : this.elements.copyTextBtn);
      this.showNotification(`${format.toUpperCase()} signature copied to clipboard`, 'success');
      
    } catch (error) {
      this.showNotification('Failed to copy signature', 'error');
      console.error('Copy error:', error);
    }
  }

  /**
   * Generate text-only signature
   */
  generateTextSignature() {
    const { formData } = this.state;
    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'John Doe';
    
    let text = `${fullName}\n`;
    if (formData.title) text += `${formData.title}\n`;
    if (formData.company) text += `${formData.company}\n`;
    text += '---\n';
    if (formData.email) text += `Email: ${formData.email}\n`;
    if (formData.phone) text += `Phone: ${formData.phone}\n`;
    text += `Website: ${formData.website || 'www.company.com'}\n`;
    if (formData.linkedin) text += `LinkedIn: ${formData.linkedin}\n`;
    if (formData.twitter) text += `Twitter: ${formData.twitter}\n`;
    
    return text;
  }

  /**
   * Show copy success animation
   */
  showCopySuccess(button) {
    if (!button) return;
    
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="btn-icon">✅</span> Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('copied');
    }, 2000);
  }

  /**
   * Download signature as vCard
   */
  downloadSignature() {
    const { formData } = this.state;
    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'John Doe';
    
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${fullName}
N:${formData.lastName};${formData.firstName};;;
ORG:${formData.company}
TITLE:${formData.title}
EMAIL:${formData.email}
TEL:${formData.phone}
URL:${formData.website}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `${fullName.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    this.showNotification('vCard downloaded successfully', 'success');
  }

  /**
   * Handle socket connection (placeholder)
   */
  handleSocketConnection() {
    this.showNotification('Socket connection feature coming soon!', 'info');
    
    // Placeholder for WebSocket connection
    console.log('Socket connection initiated...');
  }

  /**
   * Set current year in footer
   */
  setCurrentYear() {
    const currentYear = new Date().getFullYear();
    if (this.elements.currentYear) {
      this.elements.currentYear.textContent = currentYear;
    }
  }

  /**
   * Toggle theme
   */
  toggleTheme() {
    this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.state.theme);
    localStorage.setItem('signature-generator-theme', this.state.theme);
    
    // Update theme toggle button
    const icon = this.elements.themeToggle?.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = this.state.theme === 'dark' ? '🌞' : '🌙';
    }
    
    this.showNotification(`Switched to ${this.state.theme} mode`, 'info');
  }

  /**
   * Load saved theme
   */
  loadTheme() {
    const savedTheme = localStorage.getItem('signature-generator-theme') || 'light';
    this.state.theme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle button
    const icon = this.elements.themeToggle?.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = savedTheme === 'dark' ? '🌞' : '🌙';
    }
  }

  /**
   * Handle keyboard shortcuts
   */
  handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + K to focus search (if implemented)
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      // Focus first input
      this.elements.firstName?.focus();
    }
    
    // Ctrl/Cmd + Enter to copy HTML signature
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      this.copySignature('html');
    }
    
    // Escape to clear focus
    if (event.key === 'Escape') {
      document.activeElement?.blur();
    }
  }

  /**
   * Show notification
   */
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      background: type === 'error' ? '#ef4444' : 
                 type === 'success' ? '#10b981' : 
                 type === 'warning' ? '#f59e0b' : '#3b82f6',
      color: 'white',
      fontWeight: '500',
      fontSize: '14px',
      zIndex: '1000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      maxWidth: '300px',
      wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  /**
   * Generate placeholder SVG
   */
  generatePlaceholderSVG() {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="80" fill="#f1f5f9" rx="8"/>
        <circle cx="40" cy="32" r="12" fill="#cbd5e1"/>
        <path d="M40 48c-8.8 0-16 7.2-16 16h32c0-8.8-7.2-16-16-16z" fill="#94a3b8"/>
      </svg>
    `)}`;
  }

  /**
   * Add initial animations
   */
  addInitialAnimations() {
    const elements = [
      this.elements.signaturePreview,
      ...document.querySelectorAll('.form-group'),
      ...document.querySelectorAll('.template-btn')
    ];
    
    elements.forEach((el, index) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 50);
      }
    });
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.signatureGenerator = new SignatureGenerator();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && window.signatureGenerator) {
    // Refresh preview when page becomes visible
    window.signatureGenerator.updatePreview();
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.signatureGenerator) {
    // Debounce resize handler
    clearTimeout(window.signatureGenerator.resizeTimer);
    window.signatureGenerator.resizeTimer = setTimeout(() => {
      window.signatureGenerator.updatePreview();
    }, 250);
  }
});
