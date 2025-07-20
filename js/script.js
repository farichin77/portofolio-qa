document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true
    });
  }

  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Typewriter effect
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const phrases = [
      "QA Engineer",
      "Manual Testing",
      "Automation Testing"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => {
          isDeleting = true;
          typeWriter();
        }, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, 500);
      } else {
        const typeSpeed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, typeSpeed);
      }
    }
    
    // Start the typewriter effect
    setTimeout(typeWriter, 1000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const buttonText = submitBtn.querySelector('.button-text');
      const buttonSpinner = submitBtn.querySelector('.button-spinner');
      const formStatus = document.getElementById('form-status');
      
      // Show loading state
      buttonText.style.display = 'none';
      buttonSpinner.style.display = 'inline-flex';
      submitBtn.disabled = true;
      
      try {
        const formData = new FormData(this);
        const response = await fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Form submitted successfully
          formStatus.textContent = 'Pesan berhasil dikirim! Saya akan segera menghubungi Anda.';
          formStatus.style.display = 'block';
          formStatus.style.backgroundColor = '#d4edda';
          formStatus.style.color = '#155724';
          this.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Error:', error);
        formStatus.textContent = 'Terjadi kesalahan. Silakan coba lagi nanti atau hubungi melalui email.';
        formStatus.style.display = 'block';
        formStatus.style.backgroundColor = '#f8d7da';
        formStatus.style.color = '#721c24';
      } finally {
        // Reset button state
        buttonText.style.display = 'inline';
        buttonSpinner.style.display = 'none';
        submitBtn.disabled = false;
        
        // Hide status message after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }
    });
  }
});
