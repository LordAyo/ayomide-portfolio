document.addEventListener("DOMContentLoaded", function () {
    // Initialize all functionality when DOM is loaded
    initializeNavigation();
    initializeCards();
});

function initializeNavigation() {
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
}

function initializeCards() {
    const cards = document.querySelectorAll('.card');
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
    // Prevent click event when clicking links
    if (event.target.tagName === 'A' || event.target.parentElement.tagName === 'A') {
        event.stopPropagation();
        return;
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