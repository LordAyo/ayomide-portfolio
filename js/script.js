document.addEventListener("DOMContentLoaded", function () {
    // Loading animation
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingBar = document.querySelector('.loading-bar-progress');
    const loadingText = document.querySelector('.loading-text');
    const header = document.querySelector('header');
    const content = document.querySelector('#content');
    let progress = 0;

    /**
     * Updates the loading screen progress bar and transitions to main content
     */
    function updateLoader() {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        // Add requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
            loadingBar.style.width = `${progress}%`;
            loadingText.textContent = `${Math.round(progress)}%`;
        });

        if (progress === 100) {
            setTimeout(() => {
                // Fade out loading screen
                loadingScreen.style.transition = 'opacity 0.5s ease';
                loadingScreen.style.opacity = '0';
                
                // Show content
                header.style.transition = 'opacity 0.5s ease';
                content.style.transition = 'opacity 0.5s ease';
                header.style.opacity = '1';
                content.style.opacity = '1';
                
                // Enable scrolling
                document.body.classList.add('loaded');
                
                // Remove loading screen after animation
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
                
                // Initialize other functionality
                initializeNavigation();
                initializeCards();
                setupEventListeners();
            }, 500);
        } else {
            setTimeout(updateLoader, 100);
        }
    }

    // Start the loading animation
    setTimeout(updateLoader, 500);
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
    const wheelHandler = (e) => {
        if (isNavigating) return;
        
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
    };
    
    document.addEventListener('wheel', wheelHandler, { passive: false });
    
    // Optional: Clean up event listener when needed
    // window.addEventListener('unload', () => {
    //     document.removeEventListener('wheel', wheelHandler);
    // });
}

/**
 * Handles touch swipe gestures for navigation
 */
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

/**
 * Initializes desktop dropdown and mobile navigation functionality
 */
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
