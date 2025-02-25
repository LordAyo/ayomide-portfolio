document.addEventListener("DOMContentLoaded", function () {
  // Initialize navigation for all pages
  initializeNavigation();

  // Only run the loading animation if we're on the index page and it's the first visit
  if (
    (window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "/" ||
      window.location.pathname.endsWith("/")) &&
    !localStorage.getItem("hasVisited")
  ) {
    try {
      window.isLoading = true;

      // Loading animation
      const loadingScreen = document.querySelector(".loading-screen");
      const loadingBar = document.querySelector(".loading-bar-progress");
      const loadingText = document.querySelector(".loading-text");
      const header = document.querySelector("header");
      const content = document.querySelector("#content");

      // Check if elements exist
      if (
        !loadingScreen ||
        !loadingBar ||
        !loadingText ||
        !header ||
        !content
      ) {
        console.error("Required elements not found");
        return;
      }

      let progress = 0;

      function updateLoader() {
        try {
          progress += 5; // Increased increment for faster loading

          if (progress > 100) {
            progress = 100;

            // Fade out loading screen
            loadingScreen.style.transition = "opacity 0.5s ease";
            loadingScreen.style.opacity = "0";

            // Show content
            header.style.transition = "opacity 0.5s ease";
            content.style.transition = "opacity 0.5s ease";
            header.style.opacity = "1";
            content.style.opacity = "1";

            // Enable scrolling and start animations
            document.body.classList.add("loaded");

            // Remove loading screen after animation
            setTimeout(() => {
              loadingScreen.remove();
              // Restart all animations
              document
                .querySelectorAll('[style*="animation"]')
                .forEach((element) => {
                  element.style.animationPlayState = "running";
                });
            }, 500);

            window.isLoading = false;

            // Set visited flag in localStorage
            localStorage.setItem("hasVisited", "true");
            return;
          }

          // Update the loading bar and text
          loadingBar.style.width = `${progress}%`;
          loadingText.textContent = `${Math.round(progress)}%`;

          // Schedule next update with shorter delay
          setTimeout(updateLoader, 30);
        } catch (error) {
          console.error("Error in updateLoader:", error);
        }
      }

      // Start the loading animation with shorter initial delay
      setTimeout(updateLoader, 200);
    } catch (error) {
      console.error("Error initializing loader:", error);
      // Fallback: Show content if loader fails
      document.querySelector("header").style.opacity = "1";
      document.querySelector("#content").style.opacity = "1";
      document.querySelector(".loading-screen")?.remove();
    }
  } else {
    // If not first visit, immediately show content
    const header = document.querySelector("header");
    const content = document.querySelector("#content");
    const loadingScreen = document.querySelector(".loading-screen");

    if (header) header.style.opacity = "1";
    if (content) content.style.opacity = "1";
    if (loadingScreen) loadingScreen.remove();

    document.body.classList.add("loaded");
  }

  // Initialize animations for project details page
  if (document.querySelector(".project-content")) {
    initializeProjectAnimations();
  }
});

/**
 * Initializes desktop dropdown and mobile navigation functionality
 */
function initializeNavigation() {
  try {
    // Desktop Dropdown
    const dropdown = document.querySelector(".dropdown");
    if (dropdown) {
      dropdown.addEventListener("mouseenter", () =>
        dropdown.classList.add("open")
      );
      dropdown.addEventListener("mouseleave", () =>
        dropdown.classList.remove("open")
      );
    }

    // Mobile Navigation
    const toggleBtn = document.querySelector(".toggle_btn");
    const toggleBtnIcon = document.querySelector(".toggle_btn i");
    const dropDownMenu = document.querySelector(".mobile-dropdown");

    if (toggleBtn && dropDownMenu) {
      toggleBtn.onclick = function () {
        dropDownMenu.classList.toggle("open");
        toggleBtnIcon.classList.toggle("fa-bars");
        toggleBtnIcon.classList.toggle("fa-xmark");
      };
    }
  } catch (error) {
    console.error("Error in navigation initialization:", error);
  }
}

// Carousel functionality
function initializeCarousel(carouselWrapper) {
  if (!carouselWrapper) return;

  const carousel = carouselWrapper.querySelector(".carousel");
  const cards = carousel.querySelectorAll(".card");
  const indicators = carouselWrapper.querySelectorAll(".indicator");
  const prevBtn = carouselWrapper.querySelector(".carousel-btn.prev");
  const nextBtn = carouselWrapper.querySelector(".carousel-btn.next");

  let currentIndex = 0;
  const totalCards = cards.length;

  // Add click handlers to cards
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("active")) {
        const projectId = card.getAttribute("data-project-id");
        if (projectId) {
          window.location.href = `../pages/projects/${projectId}.html`;
        }
      }
    });
  });

  function updateCarousel() {
    // Update transform
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update active states
    cards.forEach((card, index) => {
      card.classList.toggle("active", index === currentIndex);
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  // Event Listeners
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => goToSlide(index));
  });

  // Initialize
  updateCarousel();

  // Optional: Auto-play
  let autoplayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
  }, 5000);

  // Pause autoplay on hover
  carouselWrapper.addEventListener("mouseenter", () => {
    clearInterval(autoplayInterval);
  });

  // Resume autoplay when mouse leaves
  carouselWrapper.addEventListener("mouseleave", () => {
    autoplayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalCards;
      updateCarousel();
    }, 5000);
  });
}

// Initialize carousel for the current page
const carouselWrapper = document.querySelector(".carousel-wrapper");
if (carouselWrapper) {
  initializeCarousel(carouselWrapper);
}

function initializeProjectAnimations() {
  // Initial load animations
  const initialElements = document.querySelectorAll(
    ".project-header, .project-intro"
  );
  initialElements.forEach((element) => {
    element.style.opacity = "0";
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.animation = "fadeIn 0.8s ease-out forwards";
    }, 100);
  });

  // Scroll-triggered animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add appropriate animation based on element type
        if (entry.target.classList.contains("project-overview")) {
          entry.target.style.animation = "fadeIn 0.8s ease-out forwards";
        }

        if (entry.target.classList.contains("detail-item")) {
          const delay = entry.target.dataset.animationDelay || "0s";
          entry.target.style.animation = `slideUp 0.6s ease-out ${delay} forwards`;
        }

        if (entry.target.classList.contains("step")) {
          const delay = entry.target.dataset.animationDelay || "0s";
          entry.target.style.animation = `slideUp 0.6s ease-out ${delay} forwards`;
        }

        if (entry.target.classList.contains("project-gallery")) {
          entry.target.style.animation = "fadeIn 1s ease-out forwards";
        }

        if (entry.target.classList.contains("next-project")) {
          entry.target.style.animation = "slideUp 0.8s ease-out forwards";
        }

        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Set initial states and add animation delays
  const detailItems = document.querySelectorAll(".detail-item");
  detailItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.dataset.animationDelay = `${index * 0.2}s`;
    observer.observe(item);
  });

  const processSteps = document.querySelectorAll(".step");
  processSteps.forEach((step, index) => {
    step.style.opacity = "0";
    step.dataset.animationDelay = `${index * 0.2}s`;
    observer.observe(step);
  });

  // Observe other elements
  const scrollElements = document.querySelectorAll(`
    .project-overview,
    .project-gallery,
    .next-project
  `);

  scrollElements.forEach((element) => {
    element.style.opacity = "0";
    observer.observe(element);
  });
}

// Add these keyframe animations if they're not already in your CSS
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);
