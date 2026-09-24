/**
 * SOVA SKINCARE — Luxury Gift Card & Certificate System
 * Includes: Interactive Designer (Nominal Only), Cryptographic Code Generator,
 * High-Res Canvas & 1-Page jsPDF Exporter, Auto-Download & Loss Protection,
 * Direct Email Dispatch Link, and Offline jsQR Camera Scanner & Validator.
 */

(function () {
  'use strict';

  // ===== STORAGE KEYS =====
  const STORAGE_KEY = 'sova_gift_certificates';
  const MY_VOUCHERS_KEY = 'sova_my_certificates';

  // ===== PRE-SEED DEMO CERTIFICATES =====
  function initStorage() {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        const now = new Date();
        const expires = new Date();
        expires.setFullYear(now.getFullYear() + 1);

        const demoCards = [
          {
            code: 'SOVA-DEMO-2026-A1',
            amount: 100,
            toName: 'Юлия (Yulia)',
            fromName: 'Александр',
            message: 'С днем рождения! Сияй и наслаждайся моментами истинной заботы!',
            email: 'demo@sova-skincare.com',
            theme: 'obsidian',
            status: 'active',
            createdAt: now.toISOString(),
            expiresAt: expires.toISOString(),
            redeemedAt: null,
            isTest: true
          },
          {
            code: 'SOVA-USED-2026-B2',
            amount: 80,
            toName: 'Елена (Elena)',
            fromName: 'Коллеги',
            message: 'Прекрасного отдыха и сияния!',
            email: 'elena@example.com',
            theme: 'champagne',
            status: 'redeemed',
            createdAt: new Date(now.getTime() - 7 * 86400000).toISOString(),
            expiresAt: expires.toISOString(),
            redeemedAt: new Date(now.getTime() - 86400000).toISOString(),
            isTest: true
          }
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(demoCards));
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function getCertificates() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveCertificates(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save certificates:', e);
    }
  }

  function getMyVouchers() {
    try {
      return JSON.parse(localStorage.getItem(MY_VOUCHERS_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveMyVoucher(cert) {
    try {
      const list = getMyVouchers();
      const existingIdx = list.findIndex(c => c.code === cert.code);
      if (existingIdx !== -1) {
        list[existingIdx] = cert;
      } else {
        list.unshift(cert);
      }
      localStorage.setItem(MY_VOUCHERS_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save to my vouchers:', e);
    }
  }

  function findCertificate(code) {
    if (!code) return null;
    const cleanCode = code.trim().toUpperCase();
    const list = getCertificates();
    return list.find(c => c.code.toUpperCase() === cleanCode) || null;
  }

  // ===== CRYPTOGRAPHIC CODE GENERATOR WITH CHECKSUM =====
  function generateSecureCode() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    const randomBytes = new Uint8Array(8);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(randomBytes);
    } else {
      for (let i = 0; i < 8; i++) {
        randomBytes[i] = Math.floor(Math.random() * 256);
      }
    }

    let part1 = '';
    let part2 = '';
    for (let i = 0; i < 4; i++) {
      part1 += chars[randomBytes[i] % chars.length];
    }
    for (let i = 4; i < 8; i++) {
      part2 += chars[randomBytes[i] % chars.length];
    }

    // Checksum
    let sum = 0;
    for (let i = 0; i < 4; i++) sum += part1.charCodeAt(i) * (i + 1);
    for (let i = 0; i < 4; i++) sum += part2.charCodeAt(i) * (i + 5);

    const check1 = chars[sum % chars.length];
    const check2 = chars[Math.floor(sum / chars.length) % chars.length];

    return `SOVA-${part1}-${part2}-${check1}${check2}`;
  }

  function verifyChecksum(code) {
    if (!code) return false;
    const clean = code.trim().toUpperCase();
    const match = clean.match(/^SOVA-([2-9A-Z]{4})-([2-9A-Z]{4})-([2-9A-Z]{2})$/);
    if (!match) return false;

    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    const p1 = match[1];
    const p2 = match[2];
    const checks = match[3];

    let sum = 0;
    for (let i = 0; i < 4; i++) sum += p1.charCodeAt(i) * (i + 1);
    for (let i = 0; i < 4; i++) sum += p2.charCodeAt(i) * (i + 5);

    const expected1 = chars[sum % chars.length];
    const expected2 = chars[Math.floor(sum / chars.length) % chars.length];

    return checks[0] === expected1 && checks[1] === expected2;
  }

  // ===== AUDIO FEEDBACK (WEB AUDIO API) =====
  function playAudioTone(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.setValueAtTime(164.81, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // AudioContext muted/unsupported
    }
  }

  // ===== STATE MANAGEMENT =====
  const state = {
    amount: 100,
    customAmount: null,
    toName: '',
    fromName: '',
    message: '',
    email: '',
    theme: 'obsidian', // 'obsidian', 'champagne', 'emerald'
    isTestMode: true // 0.00 € for owner test
  };

  let activeCertificate = null;
  let isSuccessModalActive = false;

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ===== UI UPDATE FOR PREVIEW CARD =====
  function updatePreviewCard() {
    const cardEl = document.getElementById('gcPreviewCard');
    if (!cardEl) return;

    cardEl.className = `gc-card gc-theme-${state.theme}`;

    const valueEl = document.getElementById('gcCardValue');
    const subtitleEl = document.getElementById('gcCardSubtitle');
    const toEl = document.getElementById('gcCardTo');
    const fromEl = document.getElementById('gcCardFrom');
    const msgEl = document.getElementById('gcCardMsg');
    const priceDisplay = document.getElementById('gcOrderPrice');
    const buyBtnText = document.getElementById('gcBuyBtnText');

    const currentPrice = state.customAmount || state.amount || 100;
    if (valueEl) valueEl.textContent = `${currentPrice} €`;
    if (subtitleEl) subtitleEl.textContent = 'GIFT VOUCHER · SOVA SKINCARE';

    if (toEl) toEl.textContent = state.toName.trim() || 'Anna';
    if (fromEl) fromEl.textContent = state.fromName.trim() || 'Maxim';
    if (msgEl) {
      const msg = state.message.trim() || 'Wishing you radiant beauty, peaceful relaxation, and joyful moments at SOVA SKINCARE!';
      msgEl.textContent = msg;
    }

    if (priceDisplay) {
      if (state.isTestMode) {
        priceDisplay.innerHTML = `<span class="gc-price-original">${currentPrice} €</span> <span class="gc-price-test">0.00 €</span>`;
      } else {
        priceDisplay.textContent = `${currentPrice} €`;
      }
    }

    if (buyBtnText) {
      const lang = (typeof currentLang !== 'undefined' ? currentLang : 'ru');
      if (state.isTestMode) {
        buyBtnText.textContent = lang === 'lv'
          ? 'Noformēt dāvanu karti (0.00 €)'
          : lang === 'en'
            ? 'Issue Gift Certificate (0.00 €)'
            : 'Оформить подарочную карту (0.00 €)';
      } else {
        buyBtnText.textContent = lang === 'lv'
          ? `Pirkt dāvanu karti (${currentPrice} €)`
          : lang === 'en'
            ? `Purchase Gift Card (${currentPrice} €)`
            : `Купить подарочную карту (${currentPrice} €)`;
      }
    }
  }

  // ===== GOLD LUXURY CONFETTI ANIMATION =====
  function fireLuxuryConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'gcConfettiCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '99999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#C8A882', '#A07850', '#DFC9A8', '#FFFFFF', '#E6C687', '#91683D'];
    const particles = [];
    const count = 95;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 220,
        y: canvas.height / 2 + (Math.random() - 0.5) * 120,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 1.2) * 15,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        opacity: 1,
        gravity: 0.35,
        decay: 0.012
      });
    }

    let animationId;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.vRot;
        p.opacity -= p.decay;

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
          ctx.restore();
        }
      });

      if (alive) {
        animationId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationId);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    }
    render();
  }

  // ===== SINGLE-PAGE HIGH-RES CANVAS CERTIFICATE GENERATOR =====
  async function generateCertificateCanvas(cert, qrDataUrl) {
    const canvas = document.createElement('canvas');
    // A5 proportional 300dpi: 1754 x 1240
    canvas.width = 1754;
    canvas.height = 1240;
    const ctx = canvas.getContext('2d');

    // Background Gradient based on theme
    const theme = cert.theme || 'obsidian';
    let bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    if (theme === 'champagne') {
      bgGrad.addColorStop(0, '#FAF7F2');
      bgGrad.addColorStop(0.5, '#F1E9DB');
      bgGrad.addColorStop(1, '#E4D5BE');
    } else if (theme === 'emerald') {
      bgGrad.addColorStop(0, '#1E3B2E');
      bgGrad.addColorStop(0.5, '#12261E');
      bgGrad.addColorStop(1, '#0A1712');
    } else {
      // Obsidian Gold (Default)
      bgGrad.addColorStop(0, '#24201C');
      bgGrad.addColorStop(0.5, '#161412');
      bgGrad.addColorStop(1, '#0C0B0A');
    }

    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Color tokens for text & lines
    const isLight = theme === 'champagne';
    const goldPrimary = isLight ? '#9E7B4F' : '#DFC9A8';
    const goldAccent = isLight ? '#7C5B32' : '#C5A880';
    const textColorPrimary = isLight ? '#2B231D' : '#F7F2EC';
    const textColorMuted = isLight ? '#6E5D4F' : '#A39281';

    // Outer & Inner Borders
    ctx.strokeStyle = goldAccent;
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    ctx.strokeStyle = goldPrimary;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(66, 66, canvas.width - 132, canvas.height - 132);

    // Corner Ornaments
    const corners = [
      [50, 50],
      [canvas.width - 50, 50],
      [50, canvas.height - 50],
      [canvas.width - 50, canvas.height - 50]
    ];
    ctx.fillStyle = goldPrimary;
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Top Header: SOVA Brand
    ctx.textAlign = 'center';
    ctx.font = 'bold 64px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = goldPrimary;
    ctx.fillText('S O V A', canvas.width / 2, 175);

    ctx.font = '18px "Montserrat", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillStyle = textColorMuted;
    ctx.fillText('SKINCARE  ·  RĪGA', canvas.width / 2, 215);

    // Divider line
    ctx.strokeStyle = goldAccent;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 160, 245);
    ctx.lineTo(canvas.width / 2 + 160, 245);
    ctx.stroke();

    // Gift Voucher Title
    ctx.font = 'bold 24px "Montserrat", sans-serif';
    ctx.fillStyle = goldAccent;
    ctx.fillText('OFFICIAL GIFT VOUCHER', canvas.width / 2, 305);

    // Large Amount
    ctx.font = 'bold 110px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = textColorPrimary;
    ctx.fillText(`${cert.amount} €`, canvas.width / 2, 420);

    // For & From Section
    ctx.textAlign = 'center';
    ctx.font = '22px "Montserrat", sans-serif';
    ctx.fillStyle = textColorMuted;
    ctx.fillText('FOR / KAM / ДЛЯ', canvas.width / 2, 495);

    ctx.font = 'italic bold 44px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = goldPrimary;
    ctx.fillText(cert.toName || 'Anna', canvas.width / 2, 545);

    ctx.font = '19px "Montserrat", sans-serif';
    ctx.fillStyle = textColorMuted;
    ctx.fillText(`FROM / NO KĀ / ОТ:  ${cert.fromName || 'Maxim'}`, canvas.width / 2, 595);

    // Personal Message
    if (cert.message) {
      ctx.font = 'italic 24px "Cormorant Garamond", Georgia, serif';
      ctx.fillStyle = textColorPrimary;
      const words = cert.message.split(' ');
      let line = '';
      let y = 670;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 1200 && n > 0) {
          ctx.fillText(`«${line.trim()}»`, canvas.width / 2, y);
          line = words[n] + ' ';
          y += 36;
          if (y > 740) break;
        } else {
          line = testLine;
        }
      }
      if (line.trim() && y <= 740) {
        ctx.fillText(`«${line.trim()}»`, canvas.width / 2, y);
      }
    }

    // Lower Section: Details on Left, QR Code on Right
    ctx.textAlign = 'left';

    // Security Code Box
    const boxX = 110;
    const boxY = 890;
    const boxW = 860;
    const boxH = 240;

    ctx.fillStyle = isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.03)';
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.strokeStyle = isLight ? 'rgba(158, 123, 79, 0.3)' : 'rgba(223, 201, 168, 0.2)';
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    ctx.font = '17px "Montserrat", sans-serif';
    ctx.fillStyle = textColorMuted;
    ctx.fillText('SECURITY CODE / DROŠĪBAS KODS / КОД БЕЗОПАСНОСТИ', boxX + 30, boxY + 45);

    ctx.font = 'bold 36px monospace';
    ctx.fillStyle = goldPrimary;
    ctx.fillText(cert.code, boxX + 30, boxY + 95);

    const expDate = new Date(cert.expiresAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    ctx.font = '20px "Montserrat", sans-serif';
    ctx.fillStyle = textColorPrimary;
    ctx.fillText(`Valid until / Derīga līdz: ${expDate}`, boxX + 30, boxY + 150);

    ctx.font = '18px "Montserrat", sans-serif';
    ctx.fillStyle = textColorMuted;
    ctx.fillText('📍 Tallinas iela 95, Rīga · dikidi.net/1447376 · @sova_skincare', boxX + 30, boxY + 195);

    // QR Code on the right
    if (qrDataUrl) {
      try {
        const qrImg = new Image();
        qrImg.src = qrDataUrl;
        await new Promise((resolve, reject) => {
          qrImg.onload = resolve;
          qrImg.onerror = reject;
        });

        const qrSize = 220;
        const qrX = canvas.width - 110 - qrSize;
        const qrY = 900;

        // White background padding for QR
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20);
        ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

        ctx.strokeStyle = goldAccent;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20);

        ctx.textAlign = 'center';
        ctx.font = '14px "Montserrat", sans-serif';
        ctx.fillStyle = textColorMuted;
        ctx.fillText('SCAN TO VERIFY', qrX + qrSize / 2, qrY + qrSize + 30);
      } catch (err) {
        console.warn('QR image drawing failed:', err);
      }
    }

    return canvas;
  }

  // ===== DOWNLOAD CERTIFICATE AS EXACT 1-PAGE PDF =====
  async function downloadCertificatePdf(cert) {
    if (!cert) cert = activeCertificate;
    if (!cert) return;

    try {
      const verifyUrl = `${window.location.origin}${window.location.pathname}?voucher=${encodeURIComponent(cert.code)}`;
      let qrDataUrl = '';
      if (typeof QRCode !== 'undefined') {
        qrDataUrl = await QRCode.toDataURL(verifyUrl, {
          width: 300,
          margin: 1,
          color: { dark: '#141210', light: '#FFFFFF' }
        });
      }

      const canvas = await generateCertificateCanvas(cert, qrDataUrl);

      // Check jsPDF availability
      if (window.jspdf && window.jspdf.jsPDF) {
        const { jsPDF } = window.jspdf;
        // A5 landscape: 210mm x 148mm
        const doc = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a5'
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        // Strictly 1 single image placed at 0, 0 filling 210 x 148 mm!
        doc.addImage(imgData, 'JPEG', 0, 0, 210, 148, undefined, 'FAST');
        doc.save(`SOVA-Certificate-${cert.code}.pdf`);
      } else {
        // Fallback: direct high-res PNG download
        const a = document.createElement('a');
        a.download = `SOVA-Certificate-${cert.code}.png`;
        a.href = canvas.toDataURL('image/png');
        a.click();
      }
    } catch (e) {
      console.error('PDF generation error:', e);
      // Fallback: window.print
      window.print();
    }
  }

  // ===== ISSUE CERTIFICATE & MODAL DISPLAY =====
  async function issueCertificate() {
    const toName = state.toName.trim() || 'Anna';
    const fromName = state.fromName.trim() || 'Maxim';
    const message = state.message.trim() || 'Wishing you radiant beauty, peaceful relaxation, and joyful moments at SOVA SKINCARE!';
    const email = state.email.trim() || 'client@sova-skincare.com';
    const amount = state.customAmount || state.amount || 100;

    const code = generateSecureCode();
    const now = new Date();
    const expires = new Date();
    expires.setFullYear(now.getFullYear() + 1);

    const certificate = {
      code,
      amount,
      toName,
      fromName,
      message,
      email,
      theme: state.theme,
      status: 'active',
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      redeemedAt: null,
      isTest: state.isTestMode
    };

    activeCertificate = certificate;

    // 1. Save in global registry
    const list = getCertificates();
    list.unshift(certificate);
    saveCertificates(list);

    // 2. Save in client's personal vault (loss prevention)
    saveMyVoucher(certificate);

    // 3. Audio & Confetti
    playAudioTone('success');
    fireLuxuryConfetti();

    // 4. Populate Success Modal
    await renderCertificateInModal(certificate);

    // 5. Open Success Modal
    const modal = document.getElementById('giftCardSuccessModal');
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      isSuccessModalActive = true;
    }

    // 6. Update Saved Voucher Banner on the site
    checkSavedVouchers();

    // 7. Auto-Download PDF after 700ms so user has it saved instantly!
    setTimeout(() => {
      downloadCertificatePdf(certificate);
    }, 700);
  }

  async function renderCertificateInModal(cert) {
    const codeEl = document.getElementById('gcSuccessCode');
    const codeDisplayEl = document.getElementById('gcSuccessCodeDisplay');
    const toEl = document.getElementById('gcSuccessTo');
    const fromEl = document.getElementById('gcSuccessFrom');
    const msgEl = document.getElementById('gcSuccessMsg');
    const valEl = document.getElementById('gcSuccessValue');
    const subEl = document.getElementById('gcSuccessSub');
    const expEl = document.getElementById('gcSuccessExpiry');
    const qrContainer = document.getElementById('gcSuccessQr');
    const cardWrapper = document.getElementById('gcSuccessCard');
    const emailDisplay = document.getElementById('gcSuccessEmailDisplay');
    const sendEmailBtn = document.getElementById('gcSendEmailBtn');

    if (codeEl) codeEl.textContent = cert.code;
    if (codeDisplayEl) codeDisplayEl.textContent = cert.code;
    if (toEl) toEl.textContent = cert.toName;
    if (fromEl) fromEl.textContent = cert.fromName;
    if (msgEl) msgEl.textContent = cert.message;
    if (valEl) valEl.textContent = `${cert.amount} €`;
    if (subEl) subEl.textContent = 'GIFT VOUCHER · SOVA SKINCARE';

    const expDate = new Date(cert.expiresAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    if (expEl) expEl.textContent = expDate;

    if (cardWrapper) {
      cardWrapper.className = `gc-card gc-theme-${cert.theme || 'obsidian'}`;
    }

    if (emailDisplay) {
      emailDisplay.textContent = cert.email || 'client@sova-skincare.com';
    }

    // Setup direct Email link
    if (sendEmailBtn) {
      const voucherUrl = `${window.location.origin}${window.location.pathname}?voucher=${encodeURIComponent(cert.code)}`;
      const emailSubject = encodeURIComponent(`✨ Ваш подарочный сертификат SOVA SKINCARE — ${cert.code}`);
      const emailBody = encodeURIComponent(
        `Здравствуйте, ${cert.toName}!\n\n` +
        `Вам оформлен подарочный сертификат SOVA SKINCARE:\n` +
        `• Номинал: ${cert.amount} €\n` +
        `• От кого: ${cert.fromName}\n` +
        `• Код безопасности: ${cert.code}\n` +
        `• Действителен до: ${expDate}\n` +
        (cert.message ? `• Пожелание: "${cert.message}"\n` : '') +
        `\nОткрыть сертификат онлайн:\n${voucherUrl}\n\n` +
        `Салон SOVA SKINCARE:\n` +
        `📍 Tallinas iela 95, Rīga\n` +
        `Онлайн-запись: https://dikidi.net/1447376\n` +
        `Instagram: https://instagram.com/sova_skincare\n`
      );
      sendEmailBtn.href = `mailto:${encodeURIComponent(cert.email || '')}?subject=${emailSubject}&body=${emailBody}`;
    }

    // Generate QR Code with direct voucher URL
    if (qrContainer && typeof QRCode !== 'undefined') {
      qrContainer.innerHTML = '';
      const voucherUrl = `${window.location.origin}${window.location.pathname}?voucher=${encodeURIComponent(cert.code)}`;
      try {
        const qrDataUrl = await QRCode.toDataURL(voucherUrl, {
          width: 220,
          margin: 1,
          color: { dark: '#1C1815', light: '#FFFFFF' }
        });
        const img = document.createElement('img');
        img.src = qrDataUrl;
        img.alt = `QR Code: ${cert.code}`;
        img.className = 'gc-qr-img';
        qrContainer.appendChild(img);
      } catch (err) {
        console.error('QR code generation failed:', err);
      }
    }
  }

  // ===== CHECK SAVED VOUCHERS BANNER =====
  function checkSavedVouchers() {
    const banner = document.getElementById('gcSavedBanner');
    if (!banner) return;

    const myVouchers = getMyVouchers();
    if (!myVouchers || myVouchers.length === 0) {
      banner.style.display = 'none';
      return;
    }

    const latest = myVouchers[0];
    const codeEl = document.getElementById('gcSavedBannerCode');
    const amountEl = document.getElementById('gcSavedBannerAmount');

    if (codeEl) codeEl.textContent = latest.code;
    if (amountEl) amountEl.textContent = `${latest.amount} €`;

    banner.style.display = 'block';

    const openBtn = document.getElementById('gcOpenSavedBtn');
    if (openBtn) {
      openBtn.onclick = async () => {
        activeCertificate = latest;
        await renderCertificateInModal(latest);
        const modal = document.getElementById('giftCardSuccessModal');
        if (modal) {
          modal.classList.add('active');
          modal.setAttribute('aria-hidden', 'false');
          document.body.classList.add('modal-open');
          isSuccessModalActive = true;
        }
      };
    }

    const dismissBtn = document.getElementById('gcDismissSavedBtn');
    if (dismissBtn) {
      dismissBtn.onclick = () => {
        banner.style.display = 'none';
      };
    }
  }

  // ===== SCANNER & VALIDATION SYSTEM =====
  let cameraStream = null;
  let scanAnimationFrame = null;

  function openScannerModal(initialCode = '') {
    const modal = document.getElementById('giftCardScannerModal');
    if (!modal) return;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    const resultBox = document.getElementById('gcScanResult');
    if (resultBox) resultBox.style.display = 'none';

    if (initialCode) {
      switchScannerTab('manual');
      const input = document.getElementById('gcManualCodeInput');
      if (input) input.value = initialCode.toUpperCase();
      validateCode(initialCode);
    } else {
      switchScannerTab('camera');
      startCamera();
    }
  }

  function closeScannerModal() {
    stopCamera();
    const modal = document.getElementById('giftCardScannerModal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }
  }

  function switchScannerTab(tab) {
    const tabCam = document.getElementById('gcTabCamera');
    const tabMan = document.getElementById('gcTabManual');
    const viewCam = document.getElementById('gcViewCamera');
    const viewMan = document.getElementById('gcViewManual');

    if (tab === 'camera') {
      if (tabCam) tabCam.classList.add('active');
      if (tabMan) tabMan.classList.remove('active');
      if (viewCam) viewCam.style.display = 'block';
      if (viewMan) viewMan.style.display = 'none';
      startCamera();
    } else {
      if (tabMan) tabMan.classList.add('active');
      if (tabCam) tabCam.classList.remove('active');
      if (viewMan) viewMan.style.display = 'block';
      if (viewCam) viewCam.style.display = 'none';
      stopCamera();
      const input = document.getElementById('gcManualCodeInput');
      if (input) input.focus();
    }
  }

  async function startCamera() {
    const video = document.getElementById('gcScannerVideo');
    const errorMsg = document.getElementById('gcCameraError');
    if (!video) return;

    if (cameraStream) stopCamera();

    try {
      if (errorMsg) errorMsg.style.display = 'none';
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      cameraStream = stream;
      video.srcObject = stream;
      video.setAttribute('playsinline', 'true');
      await video.play();
      requestAnimationFrame(scanVideoFrame);
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      if (errorMsg) {
        errorMsg.style.display = 'block';
        errorMsg.textContent = 'Камера недоступна. Пожалуйста, используйте ручной ввод кода.';
      }
      switchScannerTab('manual');
    }
  }

  function stopCamera() {
    if (scanAnimationFrame) {
      cancelAnimationFrame(scanAnimationFrame);
      scanAnimationFrame = null;
    }
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      cameraStream = null;
    }
  }

  function scanVideoFrame() {
    const video = document.getElementById('gcScannerVideo');
    if (!video || !cameraStream) return;

    if (video.readyState === video.HAVE_ENOUGH_DATA && typeof jsQR !== 'undefined') {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      if (qrCode && qrCode.data) {
        let detectedCode = qrCode.data.trim();
        if (detectedCode.includes('?verify=')) {
          const match = detectedCode.match(/[?&]verify=([^&#]+)/);
          if (match) detectedCode = decodeURIComponent(match[1]);
        }
        if (detectedCode.includes('?voucher=')) {
          const match = detectedCode.match(/[?&]voucher=([^&#]+)/);
          if (match) detectedCode = decodeURIComponent(match[1]);
        }

        stopCamera();
        validateCode(detectedCode);
        return;
      }
    }

    scanAnimationFrame = requestAnimationFrame(scanVideoFrame);
  }

  // Validate Code
  function validateCode(rawCode) {
    if (!rawCode) return;
    const code = rawCode.trim().toUpperCase();
    const resultBox = document.getElementById('gcScanResult');
    if (!resultBox) return;

    resultBox.style.display = 'block';

    const badgeEl = document.getElementById('gcResultBadge');
    const titleEl = document.getElementById('gcResultTitle');
    const detailsEl = document.getElementById('gcResultDetails');
    const redeemBtn = document.getElementById('gcRedeemBtn');

    const cert = findCertificate(code);
    const isValidFormat = verifyChecksum(code);

    if (!cert && !isValidFormat) {
      playAudioTone('error');
      badgeEl.className = 'gc-status-badge gc-status-invalid';
      badgeEl.textContent = 'НЕ ДЕЙСТВИТЕЛЕН / INVALID';
      titleEl.textContent = 'Сертификат не найден';
      detailsEl.innerHTML = `<p class="gc-result-err-text">Код <strong>${escapeHtml(code)}</strong> не существует или контрольная сумма не совпадает. Проверьте правильность ввода.</p>`;
      if (redeemBtn) redeemBtn.style.display = 'none';
      return;
    }

    if (!cert && isValidFormat) {
      playAudioTone('error');
      badgeEl.className = 'gc-status-badge gc-status-invalid';
      badgeEl.textContent = 'НЕ НАЙДЕН В БАЗЕ';
      titleEl.textContent = 'Сертификат с верным кодом не найден';
      detailsEl.innerHTML = `<p class="gc-result-err-text">Код <strong>${escapeHtml(code)}</strong> имеет правильный формат, но отсутствует в текущем реестре.</p>`;
      if (redeemBtn) redeemBtn.style.display = 'none';
      return;
    }

    // Found in registry
    if (cert.status === 'redeemed') {
      playAudioTone('error');
      badgeEl.className = 'gc-status-badge gc-status-redeemed';
      badgeEl.textContent = 'УЖЕ ПОГАШЕН / ALREADY REDEEMED';
      titleEl.textContent = `${cert.amount} € · Подарочный номинал SOVA`;

      const redeemedDate = cert.redeemedAt ? new Date(cert.redeemedAt).toLocaleString() : 'Ранее';
      detailsEl.innerHTML = `
        <div class="gc-result-warn-box">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <div>
            <strong>ВНИМАНИЕ:</strong> Этот сертификат уже был использован и повторному погашению не подлежит!
            <div class="gc-result-date">Дата погашения: <strong>${escapeHtml(redeemedDate)}</strong></div>
          </div>
        </div>
        <div class="gc-result-info-grid">
          <div><span class="gc-info-lbl">Получатель:</span> <strong>${escapeHtml(cert.toName)}</strong></div>
          <div><span class="gc-info-lbl">Даритель:</span> <strong>${escapeHtml(cert.fromName)}</strong></div>
          <div><span class="gc-info-lbl">Код:</span> <code>${escapeHtml(cert.code)}</code></div>
        </div>
      `;
      if (redeemBtn) redeemBtn.style.display = 'none';
    } else {
      // ACTIVE!
      playAudioTone('success');
      badgeEl.className = 'gc-status-badge gc-status-active';
      badgeEl.textContent = 'ДЕЙСТВИТЕЛЕН / ACTIVE & VALID';
      titleEl.textContent = `${cert.amount} € · Подарочный номинал SOVA`;

      const expDate = new Date(cert.expiresAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
      const issueDate = new Date(cert.createdAt).toLocaleDateString();

      detailsEl.innerHTML = `
        <div class="gc-result-info-grid">
          <div><span class="gc-info-lbl">Получатель:</span> <strong>${escapeHtml(cert.toName)}</strong></div>
          <div><span class="gc-info-lbl">От кого:</span> <strong>${escapeHtml(cert.fromName)}</strong></div>
          <div><span class="gc-info-lbl">Действителен до:</span> <strong>${escapeHtml(expDate)}</strong></div>
          <div><span class="gc-info-lbl">Дата выпуска:</span> <strong>${escapeHtml(issueDate)}</strong></div>
        </div>
        ${cert.message ? `<div class="gc-result-msg-box">«${escapeHtml(cert.message)}»</div>` : ''}
      `;

      if (redeemBtn) {
        redeemBtn.style.display = 'inline-flex';
        redeemBtn.setAttribute('data-target-code', cert.code);
        redeemBtn.textContent = 'Погасить сертификат (использовать)';
        redeemBtn.disabled = false;
      }
    }
  }

  // Redeem Action
  function redeemCurrentCertificate(code) {
    if (!code) return;
    const cert = findCertificate(code);
    if (!cert) return;

    if (cert.status === 'redeemed') {
      alert('Этот сертификат уже был погашен ранее!');
      return;
    }

    cert.status = 'redeemed';
    cert.redeemedAt = new Date().toISOString();

    const list = getCertificates();
    const idx = list.findIndex(c => c.code.toUpperCase() === code.toUpperCase());
    if (idx !== -1) {
      list[idx] = cert;
      saveCertificates(list);
    }

    // Also update in personal vault if present
    saveMyVoucher(cert);

    playAudioTone('success');
    fireLuxuryConfetti();

    validateCode(code);
    checkSavedVouchers();
  }

  // ===== INITIALIZATION & DOM EVENTS =====
  document.addEventListener('DOMContentLoaded', () => {
    initStorage();

    const chipBtns = document.querySelectorAll('.gc-chip-btn');
    const customAmountInput = document.getElementById('gcCustomAmountInput');
    const toInput = document.getElementById('gcToName');
    const fromInput = document.getElementById('gcFromName');
    const msgInput = document.getElementById('gcMessage');
    const emailInput = document.getElementById('gcEmail');
    const themeBtns = document.querySelectorAll('.gc-theme-btn');
    const buyBtn = document.getElementById('gcBuyBtn');

    // Amount Chips
    chipBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        chipBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const val = btn.getAttribute('data-amount');
        if (val === 'custom') {
          if (customAmountInput) {
            customAmountInput.style.display = 'block';
            customAmountInput.focus();
            state.customAmount = parseInt(customAmountInput.value, 10) || 120;
          }
        } else {
          if (customAmountInput) customAmountInput.style.display = 'none';
          state.amount = parseInt(val, 10);
          state.customAmount = null;
        }
        updatePreviewCard();
      });
    });

    if (customAmountInput) {
      customAmountInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.customAmount = val > 0 ? val : 100;
        updatePreviewCard();
      });
    }

    // Text Inputs
    if (toInput) {
      toInput.addEventListener('input', (e) => {
        state.toName = e.target.value;
        updatePreviewCard();
      });
    }
    if (fromInput) {
      fromInput.addEventListener('input', (e) => {
        state.fromName = e.target.value;
        updatePreviewCard();
      });
    }
    if (msgInput) {
      msgInput.addEventListener('input', (e) => {
        state.message = e.target.value;
        updatePreviewCard();
      });
    }
    if (emailInput) {
      emailInput.addEventListener('input', (e) => {
        state.email = e.target.value;
      });
    }

    // Theme Swatches
    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.theme = btn.getAttribute('data-theme') || 'obsidian';
        updatePreviewCard();
      });
    });

    // Buy Button
    if (buyBtn) {
      buyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        issueCertificate();
      });
    }

    // Modal Close
    const successModal = document.getElementById('giftCardSuccessModal');
    const successClose = document.getElementById('gcSuccessCloseBtn');
    const successBackdrop = document.getElementById('gcSuccessBackdrop');
    const downloadPdfBtn = document.getElementById('gcDownloadPdfBtn');
    const copyBtn = document.getElementById('gcCopyBtn');
    const testInScannerBtn = document.getElementById('gcTestInScannerBtn');

    function closeSuccess() {
      if (successModal) {
        successModal.classList.remove('active');
        successModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        isSuccessModalActive = false;
      }
    }

    if (successClose) successClose.addEventListener('click', closeSuccess);
    if (successBackdrop) successBackdrop.addEventListener('click', closeSuccess);

    // Download PDF Action
    if (downloadPdfBtn) {
      downloadPdfBtn.addEventListener('click', (e) => {
        e.preventDefault();
        downloadCertificatePdf(activeCertificate);
      });
    }

    // Copy Code Action
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const codeEl = document.getElementById('gcSuccessCode');
        if (codeEl && navigator.clipboard) {
          navigator.clipboard.writeText(codeEl.textContent.trim()).then(() => {
            const original = copyBtn.innerHTML;
            copyBtn.innerHTML = '<span>✓ Скопировано!</span>';
            setTimeout(() => { copyBtn.innerHTML = original; }, 2000);
          });
        }
      });
    }

    // Test in Scanner Shortcut
    if (testInScannerBtn) {
      testInScannerBtn.addEventListener('click', () => {
        const codeEl = document.getElementById('gcSuccessCode');
        const code = codeEl ? codeEl.textContent.trim() : '';
        closeSuccess();
        setTimeout(() => {
          openScannerModal(code);
        }, 300);
      });
    }

    // Scanner Triggers
    const openScannerBtns = document.querySelectorAll('.open-gc-scanner-trigger');
    openScannerBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openScannerModal();
      });
    });

    const scannerClose = document.getElementById('gcScannerCloseBtn');
    const scannerBackdrop = document.getElementById('gcScannerBackdrop');
    if (scannerClose) scannerClose.addEventListener('click', closeScannerModal);
    if (scannerBackdrop) scannerBackdrop.addEventListener('click', closeScannerModal);

    // Scanner Tabs
    const tabCam = document.getElementById('gcTabCamera');
    const tabMan = document.getElementById('gcTabManual');
    if (tabCam) tabCam.addEventListener('click', () => switchScannerTab('camera'));
    if (tabMan) tabMan.addEventListener('click', () => switchScannerTab('manual'));

    // Manual Verify Form
    const manualForm = document.getElementById('gcManualForm');
    const manualInput = document.getElementById('gcManualCodeInput');
    if (manualForm && manualInput) {
      manualForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateCode(manualInput.value);
      });

      const sampleDemoBtn = document.getElementById('gcSampleDemoBtn');
      const sampleUsedBtn = document.getElementById('gcSampleUsedBtn');
      if (sampleDemoBtn) {
        sampleDemoBtn.addEventListener('click', () => {
          manualInput.value = 'SOVA-DEMO-2026-A1';
          validateCode('SOVA-DEMO-2026-A1');
        });
      }
      if (sampleUsedBtn) {
        sampleUsedBtn.addEventListener('click', () => {
          manualInput.value = 'SOVA-USED-2026-B2';
          validateCode('SOVA-USED-2026-B2');
        });
      }
    }

    // Redeem Button
    const redeemBtn = document.getElementById('gcRedeemBtn');
    if (redeemBtn) {
      redeemBtn.addEventListener('click', () => {
        const code = redeemBtn.getAttribute('data-target-code');
        if (code) redeemCurrentCertificate(code);
      });
    }

    // Safety: Prevent accidental tab closure if user has just issued a card
    window.addEventListener('beforeunload', (e) => {
      if (isSuccessModalActive) {
        e.preventDefault();
        e.returnValue = 'Вы ещё не сохранили ваш сертификат!';
        return e.returnValue;
      }
    });

    // Check if opened via URL param ?voucher=... (open voucher) or ?verify=... (open scanner)
    const urlParams = new URLSearchParams(window.location.search);
    const voucherParam = urlParams.get('voucher');
    const verifyParam = urlParams.get('verify');

    if (voucherParam) {
      const found = findCertificate(voucherParam);
      if (found) {
        setTimeout(async () => {
          activeCertificate = found;
          await renderCertificateInModal(found);
          const modal = document.getElementById('giftCardSuccessModal');
          if (modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            isSuccessModalActive = true;
          }
        }, 500);
      }
    } else if (verifyParam) {
      setTimeout(() => {
        openScannerModal(verifyParam);
      }, 500);
    }

    // Check for saved vouchers banner
    checkSavedVouchers();

    // Initial render
    updatePreviewCard();
  });

  // Global Export
  window.SovaGiftCards = {
    getCertificates,
    saveCertificates,
    findCertificate,
    issueCertificate,
    downloadCertificatePdf,
    openScannerModal,
    validateCode,
    redeemCurrentCertificate,
    updateLanguage: updatePreviewCard
  };

})();
