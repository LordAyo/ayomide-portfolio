document.addEventListener("DOMContentLoaded", () => {
  // Initial animations when page loads
  const initialAnimatedElements = document.querySelectorAll(
    ".project-header, .project-intro"
  );
  initialAnimatedElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";

    setTimeout(() => {
      element.style.transition = "all 0.8s ease-out";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, 100 * (index + 1));
  });

  // Scroll animations setup
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2, // Trigger when 20% of element is visible
  };

  const animateElement = (element) => {
    // Animate the container
    element.classList.add("animate-visible");

    // Handle detail items animation
    const detailItems = element.querySelectorAll(".detail-item");
    if (detailItems.length) {
      detailItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, 150 * index);
      });
    }

    // Handle process steps animation
    const steps = element.querySelectorAll(".step");
    if (steps.length) {
      steps.forEach((step, index) => {
        setTimeout(() => {
          step.style.opacity = "1";
          step.style.transform = "translateY(0)";
        }, 150 * index);
      });
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("animate-visible")
      ) {
        animateElement(entry.target);

        // Optional: unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to observe
  const sections = [
    ".project-overview",
    ".project-details",
    ".process-section",
    ".project-gallery",
    ".next-project",
  ];

  sections.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      // Set initial styles
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "all 0.6s ease-out";

      // Start observing
      observer.observe(element);
    });
  });

  // Initialize detail items and steps with initial styles
  const items = document.querySelectorAll(".detail-item, .step");
  items.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.6s ease-out";
  });

  // Add smooth scroll behavior for better animation viewing
  document.documentElement.style.scrollBehavior = "smooth";
});
