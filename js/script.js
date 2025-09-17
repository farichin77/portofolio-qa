// script.js
   AOS.init({
      duration: 800,
      once: true
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

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

    // Typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    const phrases = [
      "QA Engineer",
      "Manual Testing",
      "Automation Testing"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

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
        isEnd = true;
        isDeleting = true;
        setTimeout(typeWriter, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, 500);
      } else {
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, speed);
      }
    }

    // Start the typewriter effect
    setTimeout(typeWriter, 1000);

    // Initialize particles.js
    window.onload = function() {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 45,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#F0F4F8" /* Mengubah warna partikel menjadi primary-light */
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.8,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 10,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 220,
                    "color": "#F0F4F8", /* Warna yang cocok dengan partikel (primary-light) */
                    "opacity": 0.4,
                    "width": 1.8
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 200,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    };

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
         const href = this.getAttribute('href');
    if (href.startsWith('#') && href.length > 1) { 
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Contact Form Functionality with Formspree
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }
    
    const submitBtn = document.getElementById('submit-btn');
    const buttonText = submitBtn?.querySelector('.button-text');
    const buttonSpinner = submitBtn?.querySelector('.button-spinner');
    const formStatus = document.getElementById('form-status');
    
    // Function to show form status message
    function showFormStatus(message, type = 'error') {
        if (!formStatus) return;
        
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        // Reset styles
        formStatus.style.padding = '12px';
        formStatus.style.borderRadius = '4px';
        formStatus.style.margin = '1rem 0';
        formStatus.style.transition = 'all 0.3s ease';
        
        if (type === 'success') {
            formStatus.style.backgroundColor = '#d4edda';
            formStatus.style.color = '#155724';
            formStatus.style.border = '1px solid #c3e6cb';
        } else {
            formStatus.style.backgroundColor = '#f8d7da';
            formStatus.style.color = '#721c24';
            formStatus.style.border = '1px solid #f5c6cb';
        }
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 10000);
    }
    
    // Form submission handler
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        if (buttonText) buttonText.style.display = 'none';
        if (buttonSpinner) buttonSpinner.style.display = 'inline';
        if (submitBtn) submitBtn.disabled = true;
        
        try {
            const formData = new FormData(contactForm);
            
            // Simple client-side validation
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const subject = formData.get('_subject')?.trim();
            const message = formData.get('message')?.trim();
            
            if (!name || !email || !subject || !message) {
                throw new Error('Mohon lengkapi semua field yang wajib diisi.');
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error('Format email tidak valid.');
            }
            
            // Submit the form
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            if (response.ok) {
                showFormStatus('Pesan berhasil dikirim! Mengarahkan ke halaman terima kasih...', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Redirect to thank you page after a short delay
                setTimeout(() => {
                    const nextPage = contactForm.querySelector('[name="_next"]')?.value || 'thank-you.html';
                    window.location.href = nextPage;
                }, 2000);
                
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('Form submission error:', errorData);
                
                // Handle specific Formspree errors
                if (errorData.errors) {
                    const errorMessages = Object.values(errorData.errors).flat();
                    throw new Error(errorMessages.join(', '));
                } else {
                    throw new Error('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.');
                }
            }
            
        } catch (error) {
            console.error('Form submission failed:', error);
            showFormStatus(error.message || 'Terjadi kesalahan. Silakan coba lagi nanti.');
            
        } finally {
            // Reset button state
            if (buttonText) buttonText.style.display = 'inline';
            if (buttonSpinner) buttonSpinner.style.display = 'none';
            if (submitBtn) submitBtn.disabled = false;
        }
    });
    
    // Add real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (!this.checkValidity()) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
        
        // Add focus styles
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Add form reset handler
    contactForm.addEventListener('reset', function() {
        formInputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
    });
});
