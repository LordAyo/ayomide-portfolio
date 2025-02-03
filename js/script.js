document.addEventListener("DOMContentLoaded", function () {
    // Add this line at the top of the DOMContentLoaded callback
    window.isLoading = true;
    
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
                
                // Enable scrolling and start animations
                document.body.classList.add('loaded');
                
                // Remove loading screen after animation
                setTimeout(() => {
                    loadingScreen.remove();
                    
                    // Restart all animations
                    document.querySelectorAll('[style*="animation"]').forEach(element => {
                        element.style.animationPlayState = 'running';
                    });
                }, 500);
                
                window.isLoading = false;
                
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
        // Add this check at the start of wheelHandler
        if (isNavigating || window.isLoading) return;
        
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
    // Add this check at the start of handleSwipe
    if (isNavigating || window.isLoading) return;

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

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    let currentIndex = 0;
    const totalCards = cards.length;

    function updateCarousel() {
        // Update transform
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active states
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Initialize
    updateCarousel();

    // Optional: Auto-play
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }, 5000);
});
