(function () {
    // Initialize Mermaid for Flowcharts
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            themeVariables: {
                primaryColor: '#1a6fc4',
                primaryTextColor: '#fff',
                primaryBorderColor: '#145a9e',
                lineColor: '#f4811f',
                secondaryColor: '#f4811f',
                tertiaryColor: '#e8f2fb'
            }
        });
    }

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    const trialForm = document.getElementById('trialForm');
    const currentYearSpan = document.getElementById('currentYear');

    // Modal Elements
    const modal = document.getElementById('mentorModal');
    const modalBox = document.getElementById('modalBox');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.getElementById('closeModalBtn');

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Mentor Flowchart Data
    const mentorData = {
        vyanki: {
            name: "Vyankatesh Jaware",
            borderClass: "orange-border",
            content: `
                <div class="mermaid">
                    graph TD
                    A[Child] --> B[Vyankatesh Jaware: Leadership Coach]
                    B --> C[Professional Posture]
                    B --> D[Confident Gestures]
                    B --> E[Commanding Walking Style]
                    B --> F[Discipline & Professionalism]
                    C --> G[Builds Unshakable Confidence]
                    D --> G
                    E --> G
                    F --> G
                    G --> H[Transforms into a Future Leader]
                </div>
                <p class="modal-quote">"Leadership is not about titles, it's about action, posture, and impact."</p>
            `
        },
        vaibhav: {
            name: "Vaibhav Patil",
            borderClass: "",
            content: `
                <div class="mermaid">
                    graph TD
                    A[Child] --> B[Vaibhav Patil: Strategic Mind Coach]
                    B --> C[Strategic Thinking & Resilience]
                    B --> D[Planning for Big Goals]
                    B --> E[Physical Health & Mental Wealth]
                    B --> F[Unwavering Self-Belief]
                    C --> G[Gains a Strong Mindset]
                    D --> G
                    E --> G
                    F --> G
                    G --> H[Ready to Take on Big Challenges]
                </div>
                <p class="modal-quote">"A strong mind and a healthy body are the foundations of every great success."</p>
            `
        },
        pushpa: {
            name: "Pushpalata Pimple",
            borderClass: "",
            content: `
                <div class="mermaid">
                    graph TD
                    A[Child] --> B[Pushpalata Pimple: Communication Coach]
                    B --> C[Effective Communication]
                    B --> D[Impactful Storytelling]
                    B --> E[Emotional Intelligence]
                    B --> F[Positive Social Behaviors]
                    C --> G[Builds Strong Interpersonal Skills]
                    D --> G
                    E --> G
                    F --> G
                    G --> H[Becomes an Articulate & Empathetic Person]
                </div>
                <p class="modal-quote">"Your behavior and your story are your superpowers. Let's craft them beautifully."</p>
            `
        }
    };

    // Modal Functions
    function openModal(mentorKey) {
        const data = mentorData[mentorKey];
        if (!data) return;

        modalTitle.textContent = data.name;
        modalContent.innerHTML = data.content;

        // Reset border class
        modalBox.classList.remove('orange-border');
        if (data.borderClass) {
            modalBox.classList.add(data.borderClass);
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Render the Mermaid flowchart
        if (typeof mermaid !== 'undefined') {
            try {
                mermaid.run({ nodes: [document.querySelector('.mermaid')] });
            } catch (e) {
                console.log("Mermaid render error:", e);
            }
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add click listeners to mentor cards
    document.querySelectorAll('.mentor-card[data-mentor]').forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.closest('.btn-mentor') || e.target.closest('a')) return;

            const mentorKey = this.dataset.mentor;
            openModal(mentorKey);
        });
    });

    // Close modal events
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function (e) {
        if (e.target === this) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ==================== SCROLL & NAV FUNCTIONS ====================

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

    if (hamburger) {
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
    }

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
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

    if (trialForm) {
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
    }

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

