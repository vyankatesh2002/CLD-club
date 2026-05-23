        (function () {
            const navbar = document.getElementById('navbar');
            const hamburger = document.getElementById('hamburger');
            const mobileMenu = document.getElementById('mobileMenu');
            const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
            const trialForm = document.getElementById('trialForm');
            const currentYearSpan = document.getElementById('currentYear');

            if (currentYearSpan) {
                currentYearSpan.textContent = new Date().getFullYear();
            }

            function handleScroll() {
                if (window.scrollY > 40) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                const sections = document.querySelectorAll('section[id]');
                let currentSectionId = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 120;
                    if (window.scrollY >= sectionTop) {
                        currentSectionId = section.getAttribute('id');
                    }
                });
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + currentSectionId) {
                        link.classList.add('active');
                    }
                });
            }
            window.addEventListener('scroll', handleScroll, { passive: true });

            hamburger.addEventListener('click', function () {
                const isActive = mobileMenu.classList.contains('active');
                if (isActive) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                } else {
                    mobileMenu.classList.add('active');
                    hamburger.classList.add('active');
                    hamburger.setAttribute('aria-expanded', 'true');
                    document.body.style.overflow = 'hidden';
                }
            });

            document.querySelectorAll('.mobile-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                });
            });

            const revealElements = document.querySelectorAll('.reveal');
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });
            revealElements.forEach(el => revealObserver.observe(el));

            trialForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const childName = document.getElementById('childName').value.trim();
                const childAge = document.getElementById('childAge').value;
                const parentName = document.getElementById('parentName').value.trim();
                const contactNumber = document.getElementById('contactNumber').value.trim();
                const area = document.getElementById('area').value.trim();
                const preferredTiming = document.getElementById('preferredTiming').value;

                if (!childName || !childAge || !parentName || !contactNumber) {
                    alert('Please fill all required fields marked with *');
                    return;
                }

                const message = `🌟 *New Free Trial Request* 🌟\n\n` +
                    `👶 *Child Name:* ${childName}\n` +
                    `🎂 *Age:* ${childAge} years\n` +
                    `👨‍👩‍👧 *Parent Name:* ${parentName}\n` +
                    `📞 *Contact:* ${contactNumber}\n` +
                    `📍 *Area:* ${area || 'Not specified'}\n` +
                    `⏰ *Preferred Timing:* ${preferredTiming || 'Not specified'}\n\n` +
                    `_Sent via Child Leadership Development Club Website_`;

                const encodedMessage = encodeURIComponent(message);
                const whatsappURL = `https://wa.me/919960340222?text=${encodedMessage}`;
                window.open(whatsappURL, '_blank', 'noopener,noreferrer');
                trialForm.reset();
                setTimeout(() => {
                    alert('Thank you! 🎉\n\nWhatsApp should open shortly with your details pre-filled. If it doesn\'t, please contact us directly.\n\nWe look forward to welcoming your child to the club!');
                }, 300);
            });

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        const navbarHeight = navbar.offsetHeight;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 16;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    }
                });
            });

            handleScroll();
        })();
    </script>

    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Child Leadership Development Club",
            "description": "Premium activity-based child personality and leadership development center in Nashik. Building confident, disciplined future leaders.",
            "image": "https://childleadershipclub.com/og-image.jpg",
            "url": "https://childleadershipclub.com",
            "telephone": "+919960340222",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Trimurti Chowk",
                "addressLocality": "Nashik",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "20.0059",
                "longitude": "73.7898"
            },
            "openingHours": "Sa,Su 09:00-18:00",
            "priceRange": "₹₹",
            "founder": {
                "@type": "Person",
                "name": "Vyankatesh Jaware",
                "jobTitle": "Trainer & Mentor",
                "url": "https://vyankatesh2002.github.io/"
            }
        }