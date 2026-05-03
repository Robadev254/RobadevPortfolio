// Smooth scrolling for all navigation links
const navLinks = document.querySelectorAll('.nav-modern');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Contact CTA Button
const contactCTA = document.getElementById('contactCTA');
if (contactCTA) {
  contactCTA.addEventListener('click', function(event) {
    event.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// About button
const aboutBtn = document.getElementById('aboutBtn');
if (aboutBtn) {
  aboutBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// What I Do button
const whatDoBtn = document.getElementById('whatDoBtn');
if (whatDoBtn) {
  whatDoBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const whatiDoSection = document.getElementById('whatido');
    if (whatiDoSection) {
      whatiDoSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Skills button
const skillsBtn = document.getElementById('skillsBtn');
if (skillsBtn) {
  skillsBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Projects button
const projectsBtn = document.getElementById('projectsBtn');
if (projectsBtn) {
  projectsBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Education button
const educationBtn = document.getElementById('EducationBtn');
if (educationBtn) {
  educationBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const educationSection = document.getElementById('education');
    if (educationSection) {
      educationSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Contact button
const contactBtn = document.getElementById('contactBtn');
if (contactBtn) {
  contactBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Contact action buttons
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

    if (action === 'linkedin' || action === 'whatsapp' || action === 'twitter' || action === 'instagram') {
      window.open(destination, '_blank', 'noopener');
      return;
    }

    window.location.href = destination;
  });
});

// Current year in footer
const currentYear = document.getElementById('currentYear');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = `New Portfolio Message from ${firstName} ${lastName}`;
    const body = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      '',
      message
    ].join('\n');

    window.location.href = `mailto:robahdev254@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
