document.addEventListener("DOMContentLoaded", function () {
    // Select the dropdown element
    const dropdown = document.querySelector('.dropdown');

    if (dropdown) {
        // Add event listeners for mouse enter and mouse leave
        dropdown.addEventListener('mouseenter', function () {
            dropdown.classList.add('open');
        });

        dropdown.addEventListener('mouseleave', function () {
            dropdown.classList.remove('open');
        });
    }
});



const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.mobile-dropdown');

if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
        if (dropDownMenu) {
            dropDownMenu.classList.toggle('open');
            const isOpen = dropDownMenu.classList.contains('open');

            if (toggleBtnIcon) {
                toggleBtnIcon.classList = isOpen
                    ? 'fa-solid fa-xmark'
                    : 'fa-solid fa-bars';
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Create expandable content container
        const expandedContent = document.createElement('div');
        expandedContent.className = 'expanded-content';
        expandedContent.style.display = 'none';
        
        // Add content specific to each card
        const cardTitle = card.querySelector('h3').textContent;
        const figmaLinks = {
            'Baileys Boutique Redesign': 'https://www.figma.com/design/vtMVx5Vw56BtkLOphgeiQT/Redesign-Project?t=0ka37eozzDTePiop-1',
            'Portfolio 1.0': 'https://ayomideabioye.vercel.app/index.html',
            'NOK NOK Weather App': 'https://www.figma.com/design/HlY6xkSxTJawEgcLAPhId0/Climate-App?node-id=58-4320&t=atmgngT1kyz23fJ8-1'
        };
        
        expandedContent.innerHTML = `
            <div class="expanded-details">
                <h4>Project Details</h4>
                <p class="detail-text">This project focused on creating an intuitive and engaging user experience through careful consideration of user needs and modern design principles.</p>
                
                <h4>Key Features</h4>
                <ul class="feature-list">
                    <li>Responsive design across all devices</li>
                    <li>Accessibility-first approach</li>
                    <li>Interactive prototypes</li>
                </ul>
                
                <a href="${figmaLinks[cardTitle]}" class="figma-link" target="_blank">
                    <img src="../images/figma.svg" alt="Figma Icon">
                    View in Figma
                </a>
            </div>
        `;
        
        card.appendChild(expandedContent);
        
        card.addEventListener('click', () => {
            const isExpanded = expandedContent.style.display === 'block';
            
            // Reset all cards
            cards.forEach(c => {
                c.classList.remove('expanded');
                c.querySelector('.expanded-content').style.display = 'none';
            });
            
            if (!isExpanded) {
                card.classList.add('expanded');
                expandedContent.style.display = 'block';
            }
        });
    });
});

