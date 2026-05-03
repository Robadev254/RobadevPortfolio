function getPageName(pathname) {
  const page = pathname.split('/').filter(Boolean).pop();
  return page || 'index.html';
}

function scrollToElement(selector) {
  const targetElement = document.querySelector(selector);

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

const currentPage = getPageName(window.location.pathname);
const navLinks = document.querySelectorAll('.nav-modern');

navLinks.forEach(link => {
  const href = link.getAttribute('href');

  if (!href) {
    return;
  }

  const targetUrl = new URL(href, window.location.href);
  const targetPage = getPageName(targetUrl.pathname);
  const isSamePage = targetPage === currentPage;

  if (isSamePage && !targetUrl.hash) {
    link.classList.add('active');
  }

  link.addEventListener('click', function(event) {
    if (isSamePage && targetUrl.hash) {
      event.preventDefault();
      scrollToElement(targetUrl.hash);
    }
  });
});

const exploreCTA = document.getElementById('exploreCTA');
if (exploreCTA) {
  exploreCTA.addEventListener('click', function(event) {
    event.preventDefault();
    scrollToElement('#about-preview');
  });
}

const contactCTA = document.getElementById('contactCTA');
if (contactCTA) {
  contactCTA.addEventListener('click', function(event) {
    event.preventDefault();

    if (document.getElementById('contact')) {
      scrollToElement('#contact');
      return;
    }

    window.location.href = 'contact.html';
  });
}

const contactDestinations = {
  phone: 'tel:+254798348149',
  whatsapp: 'https://wa.me/254798348149',
  linkedin: 'https://www.linkedin.com/in/anthony-robert-5a5290227/',
  twitter: 'https://x.com/roba_254',
  instagram: 'https://www.instagram.com/robahdev?igsh=MXdjMG0wbms0Z2U4bQ=='
};

document.querySelectorAll('[data-contact-action]').forEach(button => {
  button.addEventListener('click', function() {
    const action = this.getAttribute('data-contact-action');
    const destination = contactDestinations[action];

    if (!destination) {
      return;
    }

    if (action === 'phone') {
      window.location.href = destination;
      return;
    }

    window.open(destination, '_blank', 'noopener');
  });
});

const currentYear = document.getElementById('currentYear');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const portfolioEmail = 'robahdev254@gmail.com';

function createMailFallback(contactForm) {
  const fallback = document.createElement('div');
  fallback.className = 'mail-fallback';
  fallback.hidden = true;

  const text = document.createElement('p');
  text.className = 'mail-fallback-text';
  text.textContent = 'If Gmail did not open, use this button instead.';

  const actions = document.createElement('div');
  actions.className = 'mail-fallback-actions';

  const gmailLink = document.createElement('a');
  gmailLink.className = 'btn btn-outline-neon';
  gmailLink.target = '_blank';
  gmailLink.rel = 'noopener';
  gmailLink.textContent = 'Open Gmail';

  actions.append(gmailLink);
  fallback.append(text, actions);
  contactForm.append(fallback);

  return {
    fallback,
    gmailLink
  };
}

function getMailFallback(contactForm) {
  const existing = contactForm.querySelector('.mail-fallback');

  if (existing) {
    return {
      fallback: existing,
      gmailLink: existing.querySelector('[data-mail-provider="gmail"]') || existing.querySelector('a')
    };
  }

  const fallback = createMailFallback(contactForm);
  fallback.gmailLink.dataset.mailProvider = 'gmail';
  return fallback;
}

function buildEmailBody(name, email, message) {
  return [
    `Name: ${name}`,
    `Email: ${email}`,
    `Message: ${message}`
  ].join('\n');
}

function buildMailLinks(to, subject, body) {
  const encodedTo = encodeURIComponent(to);
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return {
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`
  };
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('formStatus');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = 'Contact Form Submission';
    const body = buildEmailBody(name, email, message);
    const links = buildMailLinks(portfolioEmail, subject, body);
    const fallback = getMailFallback(contactForm);

    fallback.gmailLink.href = links.gmail;
    fallback.gmailLink.onclick = function(fallbackEvent) {
      fallbackEvent.preventDefault();
      window.open(links.gmail, '_blank', 'noopener');
    };

    if (formStatus) {
      formStatus.className = 'form-status';
      formStatus.textContent = 'Opening Gmail with your message ready to send...';
    }

    if (submitButton) {
      submitButton.disabled = true;
    }

    fallback.fallback.hidden = true;
    const gmailWindow = window.open(links.gmail, '_blank', 'noopener');

    window.setTimeout(function() {
      if (submitButton) {
        submitButton.disabled = false;
      }

      if (formStatus) {
        formStatus.className = gmailWindow ? 'form-status success' : 'form-status error';
        formStatus.textContent = gmailWindow
          ? 'Gmail opened with your message ready to send.'
          : 'Your browser blocked the Gmail popup. Use the Gmail button below.';
      }

      fallback.fallback.hidden = Boolean(gmailWindow);
    }, 800);
  });
}
