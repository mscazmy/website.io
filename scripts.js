// Ahmed Azeez Hasan Website - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Header shrink on scroll
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
        
        lastScrollY = window.scrollY;
    });
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    const navList = nav.querySelector('.nav-list');
    
    navToggle.addEventListener('click', function() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navList.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                skillBar.style.width = level + '%';
                skillObserver.unobserve(skillBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // Copy email to clipboard
    const copyButton = document.getElementById('copy-email');
    const toast = document.getElementById('toast');
    
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const email = 'ahmed.azeez1987@gmail.com';
            
            navigator.clipboard.writeText(email).then(function() {
                // Show toast notification
                toast.classList.add('show');
                
                // Hide toast after 3 seconds
                setTimeout(function() {
                    toast.classList.remove('show');
                }, 3000);
            }).catch(function(err) {
                console.error('Failed to copy email: ', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Show toast notification
                toast.classList.add('show');
                
                // Hide toast after 3 seconds
                setTimeout(function() {
                    toast.classList.remove('show');
                }, 3000);
            });
        });
    }
    
    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
                el.textContent = '';
            });
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                document.getElementById('name-error').textContent = 'Name is required';
                document.getElementById('name-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                document.getElementById('email-error').textContent = 'Email is required';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                document.getElementById('message-error').textContent = 'Message is required';
                document.getElementById('message-error').style.display = 'block';
                isValid = false;
            } else if (message.length < 10) {
                document.getElementById('message-error').textContent = 'Message must be at least 10 characters long';
                document.getElementById('message-error').style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Prepare mailto link
                const subject = 'Website Contact - Ahmed Azeez Hasan';
                const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
                const mailtoLink = `mailto:ahmed.azeez1987@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                // Try to open default email client
                try {
                    window.location.href = mailtoLink;
                } catch (err) {
                    // If mailto is blocked, show a message
                    alert('Your email client could not be opened. Please send your message directly to ahmed.azeez1987@gmail.com');
                }
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Handle focus for accessibility
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Tab') {
            document.documentElement.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.documentElement.classList.remove('keyboard-nav');
    });
});