/**
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
    
    // SVG Icons for social media. Using base64 to keep them self-contained.
    this.socialIcons = {
        linkedin: `data:image/svg+xml;base64,${btoa(`<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`)}`,
        twitter: `data:image/svg+xml;base64,${btoa(`<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.61.82 3.028 2.053 3.865-.76-.025-1.474-.234-2.11-.583v.062c0 2.248 1.595 4.125 3.712 4.557-.387.105-.795.162-1.22.162-.3 0-.592-.029-.875-.083.593 1.844 2.312 3.182 4.352 3.22-1.582 1.238-3.578 1.975-5.752 1.975-.375 0-.745-.022-1.112-.065 2.052 1.318 4.49 2.088 7.14 2.088 8.567 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.602.91-.658 1.7-1.475 2.323-2.41z"/></svg>`)}`,
        github: `data:image/svg+xml;base64,${btoa(`<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`)}`,
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
      github: document.getElementById('github'),

      // Image upload
      imageInput: document.getElementById('imageInput'),
      imageUpload: document.getElementById('imageUpload'),

      // QR Code
      qrCodeEnabled: document.getElementById('qrCodeEnabled'),
      qrCodeUrl: document.getElementById('qrCodeUrl'),
      qrCodeUrlGroup: document.getElementById('qrCodeUrlGroup'),

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

    const formInputs = [
      'firstName', 'lastName', 'title', 'company',
      'email', 'phone', 'website', 'linkedin', 'twitter', 'github', 'qrCodeUrl'
    ];

    formInputs.forEach(inputId => {
      const element = this.elements[inputId];
      if (element) {
        element.addEventListener('input', (e) => this.handleInputChange(e));
        element.addEventListener('blur', () => this.validateInput(element));
      }
    });

    this.elements.colorPicker?.addEventListener('input', (e) => this.handleColorChange(e));
    this.elements.colorText?.addEventListener('input', (e) => this.handleColorTextChange(e));
    
    this.elements.qrCodeEnabled?.addEventListener('change', () => {
        this.elements.qrCodeUrlGroup.style.display = this.elements.qrCodeEnabled.checked ? 'block' : 'none';
        this.updatePreview();
    });

    this.bindImageUploadEvents();

    this.elements.templateBtns?.forEach(btn => {
      btn.addEventListener('click', () => this.switchTemplate(btn.dataset.template));
    });

    this.elements.viewBtns?.forEach(btn => {
      btn.addEventListener('click', () => this.switchView(btn.dataset.view));
    });

    this.elements.copyHtmlBtn?.addEventListener('click', () => this.copySignature('html'));
    this.elements.copyTextBtn?.addEventListener('click', () => this.copySignature('text'));
    this.elements.downloadBtn?.addEventListener('click', () => this.downloadSignature());

    document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
  }

  handleInputChange(e) {
    if (e.target.maxLength > 0) this.updateCharCount(e.target);
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.updateFormData();
      this.updatePreview();
      this.updateProgress();
    }, 150);
  }

  updateCharCount(input) {
    const charCount = input.nextElementSibling;
    if (charCount?.classList.contains('char-count')) {
      charCount.textContent = `${input.value.length}/${input.maxLength}`;
    }
  }

  validateInput(input) {
    input.classList.toggle('error', !input.checkValidity());
  }

  handleColorChange(e) {
    this.elements.colorText.value = e.target.value;
    this.updatePreview();
  }

  handleColorTextChange(e) {
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
      this.elements.colorPicker.value = e.target.value;
      this.updatePreview();
    }
  }

  bindImageUploadEvents() {
    const { imageUpload, imageInput } = this.elements;
    if (!imageUpload || !imageInput) return;
    imageUpload.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', (e) => e.target.files.length && this.handleImageFile(e.target.files[0]));
    imageUpload.addEventListener('dragover', (e) => { e.preventDefault(); imageUpload.classList.add('dragover'); });
    imageUpload.addEventListener('dragleave', () => imageUpload.classList.remove('dragover'));
    imageUpload.addEventListener('drop', (e) => {
      e.preventDefault();
      imageUpload.classList.remove('dragover');
      if (e.dataTransfer.files.length) this.handleImageFile(e.dataTransfer.files[0]);
    });
  }

  async handleImageFile(file) {
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      this.showNotification('Please select a valid image file under 5MB.', 'error');
      return;
    }
    try {
      this.state.imageDataUrl = await this.readFileAsDataURL(file);
      this.updatePreview();
      this.showNotification('Image uploaded successfully!', 'success');
    } catch (error) {
      this.showNotification('Failed to upload image.', 'error');
    }
  }

  readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  switchTemplate(templateName) {
    this.state.currentTemplate = templateName;
    this.elements.templateBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.template === templateName));
    this.updatePreview();
  }

  switchView(viewName) {
    this.state.currentView = viewName;
    this.elements.viewBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.view === viewName));
    this.elements.signaturePreview.classList.toggle('mobile-view', viewName === 'mobile');
  }

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
      twitter: this.elements.twitter?.value || '',
      github: this.elements.github?.value || '',
      qrCodeEnabled: this.elements.qrCodeEnabled?.checked,
      qrCodeUrl: this.elements.qrCodeUrl?.value || ''
    };
  }

  updatePreview() {
    this.updateFormData();
    const template = this.templates[this.state.currentTemplate];
    this.elements.signatureContent.innerHTML = this.generateSignatureHTML(template);
  }

  _generateSocialLinksHtml() {
    const { formData } = this.state;
    let html = '';
    const socialNetworks = ['linkedin', 'twitter', 'github'];

    socialNetworks.forEach(network => {
        if (formData[network]) {
            html += `<a href="${formData[network]}" style="text-decoration: none; margin-right: 8px;" target="_blank" rel="noopener">
                <img width="24" height="24" src="${this.socialIcons[network]}" alt="${network} icon" />
            </a>`;
        }
    });

    return html ? `<div class="signature-social" style="margin-top: 8px; line-height: 1;">${html}</div>` : '';
  }

  _generateQrCodeHtml() {
    const { formData } = this.state;
    const qrUrl = formData.qrCodeUrl || formData.website;
    if(formData.qrCodeEnabled && qrUrl){
        return `<td style="padding-left: 15px; vertical-align: middle;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(qrUrl)}" alt="QR Code" />
        </td>`;
    }
    return '';
  }

  generateSignatureHTML(template) {
    const { formData, imageDataUrl, currentTemplate } = this.state;
    const imageSrc = imageDataUrl || (template.imageStyle !== 'hidden' ? this.placeholderImage : null);
    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'John Doe';
    
    const socialHtml = this._generateSocialLinksHtml();
    const qrCodeHtml = this._generateQrCodeHtml();

    const nameStyle = `font-size: 18px; font-weight: 600; color: ${formData.color}; margin-bottom: 4px;`;
    const titleStyle = `font-size: 14px; color: #666666; font-style: italic; margin-bottom: 6px;`;
    const companyStyle = `font-size: 16px; font-weight: ${template.companyWeight === 'bold' ? '700' : '600'}; color: #333333; margin-bottom: 4px;`;
    const contactInfo = `
        <div style="font-size: 13px; color: #666666; line-height: 1.5;">
            ${formData.phone ? `<div style="margin-bottom: 2px;"><span style="color:${formData.color};">P:</span> ${formData.phone}</div>` : ''}
            ${formData.email ? `<div style="margin-bottom: 2px;"><span style="color:${formData.color};">E:</span> <a href="mailto:${formData.email}" style="color: #666666; text-decoration: none;">${formData.email}</a></div>` : ''}
            ${formData.website ? `<div style="margin-bottom: 2px;"><span style="color:${formData.color};">W:</span> <a href="//${formData.website.replace(/https?:\/\//,'')}" style="color: #666666; text-decoration: none;" target="_blank">${formData.website}</a></div>` : ''}
        </div>
    `;

    if (currentTemplate === 'minimal') {
      return `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="font-size: 18px; font-weight: 600; color: ${formData.color};">${fullName}</div>
          ${template.showTitle && formData.title ? `<div style="${titleStyle}">${formData.title}</div>` : ''}
          ${contactInfo}
          ${socialHtml}
        </div>`;
    } 
    
    const imageCell = imageSrc && template.imageStyle !== 'hidden' ? `
      <td style="vertical-align: top; padding: 0 16px 0 0;">
        <img src="${imageSrc}" 
             style="width: 80px; height: 80px; object-fit: cover; ${template.imageStyle === 'rounded' ? 'border-radius: 50%;' : 'border-radius: 6px;'}"
             alt="Profile Picture">
      </td>` : '';

    return `<table style="border-collapse: collapse; font-family: Arial, sans-serif; color: #333333;">
        <tbody>
          <tr>
            ${imageCell}
            <td style="vertical-align: top; padding: 0; line-height: 1.4;">
              <div style="${nameStyle}">${fullName}</div>
              ${template.showTitle && formData.title ? `<div style="${titleStyle}">${formData.title}</div>` : ''}
              ${template.showCompany && formData.company ? `<div style="${companyStyle}">${formData.company}</div>` : ''}
              <div style="margin-top: 8px;"></div>
              ${contactInfo}
              ${socialHtml}
            </td>
            ${qrCodeHtml}
          </tr>
        </tbody>
      </table>`;
  }

  updateProgress() {
    const required = ['firstName', 'lastName', 'email'];
    const optional = ['title', 'company', 'phone', 'website'];
    const filledReq = required.filter(f => this.elements[f]?.value.trim()).length;
    const filledOpt = optional.filter(f => this.elements[f]?.value.trim()).length;
    const progress = ((filledReq / required.length) * 60) + ((filledOpt / optional.length) * 40);
    this.elements.progressFill.style.width = `${Math.min(progress, 100)}%`;
  }

  async copySignature(format) {
    try {
      const content = format === 'html' ? this.generateSignatureHTML(this.templates[this.state.currentTemplate]) : this.generateTextSignature();
      await navigator.clipboard.writeText(content);
      this.showCopySuccess(format === 'html' ? this.elements.copyHtmlBtn : this.elements.copyTextBtn);
    } catch (error) {
      this.showNotification('Failed to copy.', 'error');
    }
  }

  generateTextSignature() {
    const { formData } = this.state;
    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'John Doe';
    let text = `${fullName}\n`;
    if (formData.title) text += `${formData.title}\n`;
    if (formData.company) text += `${formData.company}\n---\n`;
    if (formData.phone) text += `Phone: ${formData.phone}\n`;
    if (formData.email) text += `Email: ${formData.email}\n`;
    if (formData.website) text += `Website: ${formData.website}\n`;
    if (formData.linkedin) text += `LinkedIn: ${formData.linkedin}\n`;
    if (formData.twitter) text += `Twitter: ${formData.twitter}\n`;
    if (formData.github) text += `GitHub: ${formData.github}\n`;
    if (formData.qrCodeEnabled && (formData.qrCodeUrl || formData.website)) text += `QR Code Link: ${formData.qrCodeUrl || formData.website}\n`;
    return text;
  }

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

  downloadSignature() {
    const { formData } = this.state;
    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'John Doe';
    const vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:${fullName}\nN:${formData.lastName};${formData.firstName};;;\nORG:${formData.company}\nTITLE:${formData.title}\nEMAIL:${formData.email}\nTEL:${formData.phone}\nURL:${formData.website}\nEND:VCARD`;
    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fullName.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showNotification('vCard downloaded!', 'success');
  }

  setCurrentYear() {
    this.elements.currentYear.textContent = new Date().getFullYear();
  }

  toggleTheme() {
    this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.state.theme);
    localStorage.setItem('signature-generator-theme', this.state.theme);
    this.elements.themeToggle.querySelector('.theme-icon').textContent = this.state.theme === 'dark' ? '🌞' : '🌙';
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('signature-generator-theme') || 'light';
    if (savedTheme !== this.state.theme) this.toggleTheme();
  }

  handleKeyboardShortcuts(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); this.elements.firstName?.focus(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); this.copySignature('html'); }
    if (e.key === 'Escape') { document.activeElement?.blur(); }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = { success: '#10b981', error: '#ef4444', info: '#3b82f6' };
    Object.assign(notification.style, {
      position: 'fixed', top: '20px', right: '20px', padding: '12px 20px',
      borderRadius: '8px', background: colors[type], color: 'white',
      fontWeight: '500', zIndex: '1000', transform: 'translateX(120%)',
      transition: 'transform 0.3s ease-out'
    });
    notification.textContent = message;
    document.body.appendChild(notification);
    requestAnimationFrame(() => notification.style.transform = 'translateX(0)');
    setTimeout(() => {
      notification.style.transform = 'translateX(120%)';
      notification.addEventListener('transitionend', () => notification.remove());
    }, 3000);
  }
  
  generatePlaceholderSVG() {
    return `data:image/svg+xml;base64,${btoa(`<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="80" fill="#f1f5f9" rx="8"/><circle cx="40" cy="32" r="12" fill="#cbd5e1"/><path d="M40 48c-8.8 0-16 7.2-16 16h32c0-8.8-7.2-16-16-16z" fill="#94a3b8"/></svg>`)}`;
  }

  addInitialAnimations() {
    const elements = document.querySelectorAll('.form-group, .template-btn, .preview-section');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = `opacity 0.4s ease-out ${index * 0.03}s, transform 0.4s ease-out ${index * 0.03}s`;
        requestAnimationFrame(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.signatureGenerator = new SignatureGenerator();
});
