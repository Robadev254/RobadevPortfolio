/**
 * Anthony Mwongela Portfolio — Interactive Engine
 * Responsive Navigation, Project Inquiry Builder, Copy Feedback & Scroll Reveals
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initContactComposer();
  initClipboardButtons();
  initYearStamp();
});

/* --- Mobile Navigation & Accessibility --------------------- */
function initNavigation() {
  const toggleBtn = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (!toggleBtn || !navMenu) return;

  function toggleMenu(open) {
    const shouldOpen = typeof open === 'boolean' ? open : !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', shouldOpen);
    toggleBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });

  // Close on link click
  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMenu(false);
      }
    });
  });
}

/* --- Scroll Reveal Animations ----------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-up');
  if (!animatedElements.length) return;

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported or reduced motion is preferred
    animatedElements.forEach((el) => el.classList.add('visible'));
  }
}

/* --- Interactive Contact Form & Inquiry Composer ----------- */
function initContactComposer() {
  const form = document.getElementById('inquiryForm');
  const pills = document.querySelectorAll('.topic-pill-btn');
  const messageInput = document.getElementById('inquiryMessage');
  const topicInput = document.getElementById('inquiryTopic');

  const topicTemplates = {
    'Full-Stack Web App':
      "Hi Anthony,\n\nI'm looking to build a full-stack web application. Here is an overview of what we need:\n- Project Goal: \n- Target Timeline: \n- Preferred Tech Stack / Requirements: \n\nLet's connect to discuss scope and timelines.",
    'Frontend Redesign':
      "Hi Anthony,\n\nWe have an existing website/application that needs a modern, polished, and accessible frontend redesign.\n- Current site/app link: \n- Key improvements needed: \n- Timeline: \n\nLooking forward to hearing your thoughts.",
    'API & Backend System':
      "Hi Anthony,\n\nI'm reaching out regarding backend architecture / API design.\n- Requirements: \n- Database & Infrastructure: \n- Timeline: \n\nLet me know your availability for a quick discovery chat.",
    'Full-Time / Contract Role':
      "Hi Anthony,\n\nI came across your portfolio and would love to discuss an engineering opportunity with our team.\n- Role Title: Software Engineer\n- Company / Team: \n- Location / Remote status: \n\nWhen would be a good time for a brief call?",
    'General Consultation':
      "Hi Anthony,\n\nI'd like to schedule a technical consultation to discuss:\n- Topic: \n- Questions / Context: \n\nBest regards,",
  };

  if (pills.length && messageInput) {
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');

        const selectedTopic = pill.getAttribute('data-topic') || pill.textContent.trim();
        if (topicInput) topicInput.value = selectedTopic;

        // Auto-fill template if message is empty or matches another template
        const currentVal = messageInput.value.trim();
        const isTemplate = Object.values(topicTemplates).some((t) => t.trim() === currentVal);

        if (!currentVal || isTemplate) {
          messageInput.value = topicTemplates[selectedTopic] || '';
        }
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('inquiryName')?.value.trim() || '';
      const email = document.getElementById('inquiryEmail')?.value.trim() || '';
      const topic = topicInput?.value || document.querySelector('.topic-pill-btn.active')?.textContent.trim() || 'General Inquiry';
      const message = messageInput?.value.trim() || '';

      if (!message) {
        alert('Please enter a brief message before submitting.');
        return;
      }

      const subject = encodeURIComponent(`[Portfolio Inquiry] ${topic} — from ${name || 'Client'}`);
      const body = encodeURIComponent(`From: ${name} (${email})\nTopic: ${topic}\n\n${message}`);

      // Compose Gmail URL
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=robahdev254@gmail.com&su=${subject}&body=${body}`;
      const mailtoUrl = `mailto:robahdev254@gmail.com?subject=${subject}&body=${body}`;

      // Try opening Gmail compose in new tab; fallback to standard mailto
      const win = window.open(gmailUrl, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = mailtoUrl;
      }

      const statusEl = document.getElementById('formStatus');
      if (statusEl) {
        statusEl.innerHTML = `
          <div style="margin-top: 1rem; padding: 0.85rem; border-radius: 8px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #6ee7b7; font-size: 0.9rem;">
            ✓ Opening email compose. If your browser blocked the window, <a href="${mailtoUrl}" style="text-decoration: underline; color: #fff; font-weight: bold;">click here to open in your mail app</a>.
          </div>
        `;
      }
    });
  }
}

/* --- Clipboard Copy Actions ------------------------------- */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span>Copied! ✓</span>`;
        btn.style.color = 'var(--primary-light)';

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    });
  });
}

/* --- Dynamic Year Stamp ----------------------------------- */
function initYearStamp() {
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach((el) => {
    el.textContent = currentYear;
  });
}
