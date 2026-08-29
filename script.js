/* The Catalogue Wall — gallery behaviour.
   One signature interaction: a single continuous lamp band lies across the wall
   at reading height. Everything that reacts to the pointer or the scroll reads
   that one light source; nothing lights itself. */

document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* --- Rooms: which page am I standing in --------------------- */

function getPageName(pathname) {
  const page = pathname.split('/').filter(Boolean).pop();
  return page || 'index.html';
}

function scrollToElement(selector) {
  const targetElement = document.querySelector(selector);

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: reduceMotion.matches ? 'auto' : 'smooth',
      block: 'start'
    });
  }
}

const currentPage = getPageName(window.location.pathname);

document.querySelectorAll('.room').forEach(link => {
  const href = link.getAttribute('href');

  if (!href) {
    return;
  }

  const targetUrl = new URL(href, window.location.href);
  const targetPage = getPageName(targetUrl.pathname);
  const isSamePage = targetPage === currentPage;

  if (isSamePage && !targetUrl.hash) {
    link.classList.add('here');
    link.setAttribute('aria-current', 'page');
  }

  link.addEventListener('click', function (event) {
    if (isSamePage && targetUrl.hash) {
      event.preventDefault();
      scrollToElement(targetUrl.hash);
      closeRooms();
    }
  });
});

/* --- Rooms drawer (narrow viewports) ------------------------ */

const roomsToggle = document.getElementById('roomsToggle');
const rooms = document.getElementById('rooms');

function closeRooms() {
  if (roomsToggle && rooms) {
    roomsToggle.setAttribute('aria-expanded', 'false');
    rooms.classList.remove('open');
  }
}

if (roomsToggle && rooms) {
  roomsToggle.addEventListener('click', function () {
    const open = roomsToggle.getAttribute('aria-expanded') === 'true';
    roomsToggle.setAttribute('aria-expanded', String(!open));
    rooms.classList.toggle('open', !open);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeRooms();
    }
  });
}

/* --- The lamp: the one light on the wall -------------------- */

const lamp = document.querySelector('.lamp');
const labels = Array.from(document.querySelectorAll('.label'));
const plates = Array.from(document.querySelectorAll('.vitrine-plate'));

let lampY = window.innerHeight * 0.4;
let pointerY = null;
let lampFrame = 0;

function paintLamp() {
  lampFrame = 0;

  const viewport = window.innerHeight;
  const scrolled = window.scrollY;
  const documentHeight = Math.max(
    document.documentElement.scrollHeight - viewport,
    1
  );
  /* With no pointer, the band drifts from a third down the wall to two thirds
     across the length of the document, so it reads as one lamp being walked
     past rather than a per-card effect. */
  const drift = Math.min(Math.max(scrolled / documentHeight, 0), 1);
  const target = pointerY === null ? viewport * (0.34 + drift * 0.32) : pointerY;

  lampY += (target - lampY) * 0.16;

  if (lamp) {
    lamp.style.setProperty('--lamp-y', `${lampY.toFixed(1)}px`);
  }

  /* Label stock lights when the band crosses it. */
  labels.forEach(label => {
    const box = label.getBoundingClientRect();
    const lit = lampY > box.top - 60 && lampY < box.bottom + 60;
    label.classList.toggle('lit', lit);
  });

  /* Glass tilts its sheen toward wherever the band currently is. */
  plates.forEach(plate => {
    const box = plate.getBoundingClientRect();
    const centre = box.top + box.height / 2;
    const offset = Math.min(Math.max((lampY - centre) / viewport, -1), 1);
    plate.style.setProperty('--sheen', `${(offset * 26).toFixed(1)}deg`);
  });

  if (Math.abs(target - lampY) > 0.4) {
    lampFrame = window.requestAnimationFrame(paintLamp);
  }
}

function requestLamp() {
  if (!lampFrame) {
    lampFrame = window.requestAnimationFrame(paintLamp);
  }
}

if (lamp && !reduceMotion.matches) {
  window.addEventListener('scroll', requestLamp, { passive: true });
  window.addEventListener('resize', requestLamp);

  window.addEventListener(
    'pointermove',
    function (event) {
      if (event.pointerType === 'touch') {
        return;
      }
      pointerY = event.clientY;
      requestLamp();
    },
    { passive: true }
  );

  document.addEventListener('pointerleave', function () {
    pointerY = null;
    requestLamp();
  });

  requestLamp();
}

/* --- Entrance: records rise onto the wall once -------------- */

const risers = document.querySelectorAll('.rise');

if (risers.length && 'IntersectionObserver' in window && !reduceMotion.matches) {
  risers.forEach(el => el.classList.add('waiting'));

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        const group = entry.target.parentElement
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target)
          : 0;
        entry.target.style.setProperty(
          '--rise-delay',
          `${Math.min(group, 6) * 70}ms`
        );
        entry.target.classList.add('shown');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );

  risers.forEach(el => observer.observe(el));
} else {
  risers.forEach(el => el.classList.add('shown'));
}

/* --- Deep-link buttons (preserved) -------------------------- */

const contactDestinations = {
  phone: 'tel:+254798348149',
  whatsapp: 'https://wa.me/254798348149',
  linkedin: 'https://www.linkedin.com/in/anthony-robert-5a5290227/',
  twitter: 'https://x.com/roba_254',
  instagram: 'https://www.instagram.com/robahdev?igsh=MXdjMG0wbms0Z2U4bQ=='
};

document.querySelectorAll('[data-contact-action]').forEach(button => {
  button.addEventListener('click', function () {
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

/* --- Dispatch: the Gmail handoff, unchanged in substance ----
   There is no server. The form composes the message and opens Gmail; the
   copy says so, and the fallback button exists for blocked popups. */

const portfolioEmail = 'robahdev254@gmail.com';

function createMailFallback(form) {
  const fallback = document.createElement('div');
  fallback.className = 'mail-fallback';
  fallback.hidden = true;

  const text = document.createElement('p');
  text.className = 'mail-fallback-text';
  text.textContent = 'If Gmail did not open, use this button instead.';

  const actions = document.createElement('div');
  actions.className = 'mail-fallback-actions';

  const gmailLink = document.createElement('a');
  gmailLink.className = 'act act-ink';
  gmailLink.target = '_blank';
  gmailLink.rel = 'noopener';
  gmailLink.textContent = 'Open Gmail';

  actions.append(gmailLink);
  fallback.append(text, actions);
  form.append(fallback);

  return { fallback, gmailLink };
}

function getMailFallback(form) {
  const existing = form.querySelector('.mail-fallback');

  if (existing) {
    return {
      fallback: existing,
      gmailLink:
        existing.querySelector('[data-mail-provider="gmail"]') ||
        existing.querySelector('a')
    };
  }

  const fallback = createMailFallback(form);
  fallback.gmailLink.dataset.mailProvider = 'gmail';
  return fallback;
}

function buildEmailBody(name, email, message) {
  return [`Name: ${name}`, `Email: ${email}`, `Message: ${message}`].join('\n');
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
  contactForm.addEventListener('submit', function (event) {
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
    const subject = name ? `Portfolio enquiry — ${name}` : 'Portfolio enquiry';
    const body = buildEmailBody(name, email, message);
    const links = buildMailLinks(portfolioEmail, subject, body);
    const fallback = getMailFallback(contactForm);

    fallback.gmailLink.href = links.gmail;
    fallback.gmailLink.onclick = function (fallbackEvent) {
      fallbackEvent.preventDefault();
      window.open(links.gmail, '_blank', 'noopener');
    };

    if (formStatus) {
      formStatus.className = 'dispatch-status';
      formStatus.textContent = 'Opening Gmail with your message ready to send...';
    }

    if (submitButton) {
      submitButton.disabled = true;
    }

    fallback.fallback.hidden = true;
    const gmailWindow = window.open(links.gmail, '_blank', 'noopener');

    window.setTimeout(function () {
      if (submitButton) {
        submitButton.disabled = false;
      }

      if (formStatus) {
        formStatus.className = gmailWindow
          ? 'dispatch-status success'
          : 'dispatch-status error';
        formStatus.textContent = gmailWindow
          ? 'Gmail opened with your message ready to send.'
          : 'Your browser blocked the Gmail popup. Use the Gmail button below.';
      }

      fallback.fallback.hidden = Boolean(gmailWindow);
    }, 800);
  });
}
