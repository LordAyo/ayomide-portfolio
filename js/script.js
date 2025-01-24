document.addEventListener("DOMContentLoaded", function () {
    // Initialize all functionality when DOM is loaded
    initializeNavigation();
    initializeCards();
});

// Touch swipe detection with error handling
let touchStartY = 0;
let touchEndY = 0;

try {
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    });
} catch (error) {
    console.error('Error in touch event handling:', error);
}

// Wheel/trackpad detection with debouncing
let lastWheelTime = Date.now();
let wheelDelta = 0;
let isNavigating = false; // Prevent multiple navigations

if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    document.addEventListener('wheel', (e) => {
        if (isNavigating) return; // Prevent multiple triggers

        try {
            e.preventDefault();

            const currentTime = Date.now();
            const timeDiff = currentTime - lastWheelTime;
            
            if (timeDiff > 100) {
                wheelDelta = 0;
            }
            
            wheelDelta += e.deltaY;
            lastWheelTime = currentTime;

            if (wheelDelta > 100) {
                isNavigating = true; // Set flag before navigation
                window.location.href = './pages/about.html';
            }
        } catch (error) {
            console.error('Error in wheel event handling:', error);
        }
    }, { passive: false });
}

function handleSwipe() {
    if (isNavigating) return; // Prevent multiple triggers

    try {
        const swipeThreshold = 50;
        const swipeDistance = touchStartY - touchEndY;
        
        if (swipeDistance < -swipeThreshold) {
            isNavigating = true; // Set flag before navigation
            window.location.href = './pages/about.html';
        }
    } catch (error) {
        console.error('Error in swipe handling:', error);
    }
}

function initializeNavigation() {
    try {
        // Desktop Dropdown
        const dropdown = document.querySelector('.dropdown');
        if (dropdown) {
            dropdown.addEventListener('mouseenter', () => dropdown.classList.add('open'));
            dropdown.addEventListener('mouseleave', () => dropdown.classList.remove('open'));
        }

        // Mobile Navigation
        const toggleBtn = document.querySelector('.toggle_btn');
        const toggleBtnIcon = document.querySelector('.toggle_btn i');
        const dropDownMenu = document.querySelector('.mobile-dropdown');

        if (toggleBtn && dropDownMenu) {
            toggleBtn.addEventListener('click', () => {
                dropDownMenu.classList.toggle('open');
                const isOpen = dropDownMenu.classList.contains('open');
                if (toggleBtnIcon) {
                    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
                }
            });
        }
    } catch (error) {
        console.error('Error in navigation initialization:', error);
    }
}

function initializeCards() {
    try {
        const cards = document.querySelectorAll('.card');
        if (cards.length === 0) return;

        const isDevPage = window.location.pathname.includes('developerProjects');

        // Project Details Configuration
        const projectConfigs = {
            design: {
                'Baileys Boutique Redesign': {
                    link: 'https://www.figma.com/design/vtMVx5Vw56BtkLOphgeiQT/Redesign-Project?t=0ka37eozzDTePiop-1',
                    description: 'A complete redesign focused on enhancing user experience and accessibility for an e-commerce boutique.',
                    features: [
                        'Improved navigation and user flow',
                        'Enhanced visual hierarchy',
                        'Detailed product page layouts',
                        'Responsive design across devices'
                    ]
                },
                'Portfolio 1.0': {
                    link: 'https://ayomideabioye.vercel.app/index.html',
                    description: 'A personal portfolio showcasing my design process and project work.',
                    features: [
                        'Clean, modern aesthetic',
                        'Interactive design elements',
                        'Optimized user experience',
                        'Cohesive visual language'
                    ]
                },
                'NOK NOK Weather App': {
                    link: 'https://www.figma.com/design/HlY6xkSxTJawEgcLAPhId0/Climate-App?node-id=58-4320&t=atmgngT1kyz23fJ8-1',
                    description: 'A weather application designed with user experience at its core.',
                    features: [
                        'Intuitive weather data visualization',
                        'Clean interface design',
                        'Engaging micro-interactions',
                        'Accessibility considerations'
                    ]
                }
            },
            dev: {
                'Portfolio 1.0': {
                    githubLink: 'https://github.com/LordAyo/LordAyo.github.io',
                    demoLink: 'https://ayomideabioye.vercel.app/index.html',
                    description: 'A responsive personal portfolio website built from scratch using modern web technologies.',
                    features: [
                        'Responsive design using CSS Grid and Flexbox',
                        'Interactive animations with JavaScript',
                        'Custom navigation with dropdown menus',
                        'Optimized performance and accessibility'
                    ]
                },
                'Movie Hub': {
                    githubLink: 'https://github.com/LordAyo/React-Website',
                    demoLink: 'https://moviehub-lemon.vercel.app/',
                    description: 'A dynamic movie discovery platform built with React, featuring real-time movie data, search functionality, and responsive design.',
                    features: [
                        'Real-time movie data fetched via APIs',
                        'Search functionality for easy navigation',
                        'Modern UI built with React',
                        'Fully responsive design for all devices'
                    ]
                }
            }
        };

        cards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent;
            if (cardTitle === 'Coming Soon.....') return;

            const expandedContent = document.createElement('div');
            expandedContent.className = 'expanded-content';
            expandedContent.style.display = 'none';

            const projectData = isDevPage ? 
                projectConfigs.dev[cardTitle] : 
                projectConfigs.design[cardTitle];

            if (!projectData) return;

            expandedContent.innerHTML = isDevPage ? 
                createDevProjectContent(projectData) :
                createDesignProjectContent(projectData);

            card.appendChild(expandedContent);
            
            card.addEventListener('click', (event) => handleCardClick(event, card, expandedContent));
        });
    } catch (error) {
        console.error('Error in cards initialization:', error);
    }
}

function createDesignProjectContent(projectData) {
    return `
        <div class="expanded-details">
            <h4>Project Details</h4>
            <p class="detail-text">${projectData.description}</p>
            
            <h4>Key Features</h4>
            <ul class="feature-list">
                ${projectData.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <a href="${projectData.link}" class="figma-link" target="_blank">
                <img src="../images/figma.svg" alt="Figma Icon">
                View in Figma
            </a>
        </div>
    `;
}

function createDevProjectContent(projectData) {
    return `
        <div class="expanded-details">
            <h4>Project Details</h4>
            <p class="detail-text">${projectData.description}</p>
            
            <h4>Key Features</h4>
            <ul class="feature-list">
                ${projectData.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <div class="button-container">
                <a href="${projectData.githubLink}" class="github-link" target="_blank">
                    <i class="fab fa-github"></i>
                    View Code
                </a>
                <a href="${projectData.demoLink}" class="demo-link" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                    Live Demo
                </a>
            </div>
        </div>
    `;
}

function handleCardClick(event, card, expandedContent) {
    // Check if clicked element or any of its parents is a link
    let element = event.target;
    while (element) {
        if (element.tagName === 'A') {
            return;
        }
        element = element.parentElement;
    }

    const isCurrentlyExpanded = card.classList.contains('expanded');
    
    // Close all cards
    document.querySelectorAll('.card').forEach(c => {
        c.classList.remove('expanded');
        const content = c.querySelector('.expanded-content');
        if (content) content.style.display = 'none';
    });

    // Toggle current card
    if (!isCurrentlyExpanded) {
        card.classList.add('expanded');
        expandedContent.style.display = 'block';
    }
}

