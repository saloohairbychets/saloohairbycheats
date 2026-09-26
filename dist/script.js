
        // DOM Elements
        const loader = document.getElementById('loader');
        const header = document.getElementById('header');
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
        const testimonialSlides = document.getElementById('testimonialSlides');
        const sliderDots = document.querySelectorAll('.slider-dot');
        const scrollTopBtn = document.getElementById('scrollTop');
        const particlesContainer = document.getElementById('particles');
        
        // Loader
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 800);
        });
        
        // Create floating particles
        function createParticles() {
            const particleCount = 20;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random size between 2px and 6px
                const size = Math.random() * 4 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random animation delay and duration
                const delay = Math.random() * 5;
                const duration = Math.random() * 10 + 10;
                particle.style.animationDelay = `${delay}s`;
                particle.style.animationDuration = `${duration}s`;
                
                // Random color variation
                const colors = ['#d4b8a0', '#c9a96e', '#e9ccbb'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.background = color;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Initialize particles
        createParticles();
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Scroll to top button
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
            
            // Animate elements on scroll
            animateOnScroll();
        });
        
        // Mobile Menu Toggle
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        menuOverlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Mobile Dropdown Toggles
        mobileDropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const dropdown = toggle.nextElementSibling;
                toggle.classList.toggle('active');
                dropdown.classList.toggle('active');
            });
        });
        
        // Testimonial Slider
        let currentSlide = 0;
        const totalSlides = document.querySelectorAll('.testimonial-slide').length;
        
        function showSlide(index) {
            if (index >= totalSlides) currentSlide = 0;
            else if (index < 0) currentSlide = totalSlides - 1;
            else currentSlide = index;
            
            testimonialSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            sliderDots.forEach((dot, i) => {
                if (i === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Dot click events
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Auto slide testimonial
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
        
        // Scroll to top
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if(this.getAttribute('href') === '#') return;
                
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    mobileMenu.classList.remove('active');
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });
        
        // Animate elements on scroll
        function animateOnScroll() {
            const elements = document.querySelectorAll('.service-card, .about-text, .about-image, .stat-item, .gender-card');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if(elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Set initial state for animation
        document.querySelectorAll('.service-card, .about-text, .about-image, .stat-item, .gender-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
        
        // Initialize animations
        window.addEventListener('load', () => {
            animateOnScroll();
        });
        
        // Navbar active link highlighting
        const navLinks = document.querySelectorAll('.nav-list a, .mobile-nav-list a');
        const sections = document.querySelectorAll('section[id]');
        
        function highlightNavLink() {
            let scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', highlightNavLink);
        
        // Text reveal animation
        const revealElements = document.querySelectorAll('.reveal-text');
        
        function checkReveal() {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('revealed');
                }
            });
        }
        
        window.addEventListener('scroll', checkReveal);
        window.addEventListener('load', checkReveal);

        // Add this to your existing <script> section
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Magnetic effect for the Book Now button (Optional Luxury Touch)
const bookBtn = document.querySelector('.nav-book-btn');
if(bookBtn) {
    bookBtn.addEventListener('mousemove', (e) => {
        const rect = bookBtn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        bookBtn.style.transform = `translate(${(x - rect.width/2) / 5}px, ${(y - rect.height/2) / 5}px) scale(1.05)`;
    });
    
    bookBtn.addEventListener('mouseleave', () => {
        bookBtn.style.transform = `translate(0px, 0px) scale(1)`;
    });
}


//men js

    // // DOM Elements
    //     const loader = document.getElementById('loader');
    //     const header = document.getElementById('header');
    //     const menuToggle = document.getElementById('menuToggle');
    //     const mobileMenu = document.getElementById('mobileMenu');
    //     const menuOverlay = document.getElementById('menuOverlay');
    //     const menuGrid = document.getElementById('menuGrid');
    //     const scrollTopBtn = document.getElementById('scrollTop');
        
        window.addEventListener('load', () => {
            setTimeout(() => { loader.classList.add('hidden'); menuGrid.classList.add('active'); }, 1000);
            revealOnScroll();
        });
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) header.classList.add('scrolled'); else header.classList.remove('scrolled');
            if (window.scrollY > 500) scrollTopBtn.classList.add('active'); else scrollTopBtn.classList.remove('active');
            revealOnScroll();
        });

        menuToggle.addEventListener('click', () => { mobileMenu.classList.add('active'); menuOverlay.classList.add('active'); document.body.style.overflow = 'hidden'; });
        menuOverlay.addEventListener('click', () => { mobileMenu.classList.remove('active'); menuOverlay.classList.remove('active'); document.body.style.overflow = 'auto'; });

        function filterMenu(category, btn) {
            const blocks = document.querySelectorAll('.category-block');
            const btns = document.querySelectorAll('.filter-nav button');
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            blocks.forEach(block => {
                block.classList.add('hidden');
                if (category === 'all' || block.getAttribute('data-cat') === category) {
                    setTimeout(() => { block.classList.remove('hidden'); block.classList.add('revealed'); }, 100);
                }
            });
        }

        scrollTopBtn.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

        function revealOnScroll() {
            document.querySelectorAll('.category-block').forEach(el => { if(el.getBoundingClientRect().top < window.innerHeight/1.2) el.classList.add('revealed'); });
        }
    



        //women js

        // const loader = document.getElementById('loader');
        // const header = document.getElementById('header');
        // const menuToggle = document.getElementById('menuToggle');
        // // const mobileMenu = document.getElementById('mobileMenu');
        // const menuOverlay = document.getElementById('menuOverlay');
        const menuGrid = document.getElementById('menuGrid');
        // const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('load', () => {
            setTimeout(() => { loader.classList.add('hidden'); menuGrid.classList.add('active'); }, 800);
            revealOnScroll();
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) header.classList.add('scrolled'); else header.classList.remove('scrolled');
            if (window.scrollY > 500) scrollTopBtn.classList.add('active'); else scrollTopBtn.classList.remove('active');
            revealOnScroll();
        });

        menuToggle.addEventListener('click', () => { mobileMenu.classList.add('active'); menuOverlay.classList.add('active'); document.body.style.overflow = 'hidden'; });
        menuOverlay.addEventListener('click', () => { mobileMenu.classList.remove('active'); menuOverlay.classList.remove('active'); document.body.style.overflow = 'auto'; });

        function filterMenu(category, btn) {
            const blocks = document.querySelectorAll('.category-block');
            const btns = document.querySelectorAll('.filter-nav button');
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            blocks.forEach(block => {
                block.classList.add('hidden');
                if (category === 'all' || block.getAttribute('data-cat') === category) {
                    setTimeout(() => { block.classList.remove('hidden'); block.classList.add('revealed'); }, 50);
                }
            });
        }

        scrollTopBtn.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

        function revealOnScroll() {
            document.querySelectorAll('.category-block').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight / 1.2) el.classList.add('revealed');
            });
        }