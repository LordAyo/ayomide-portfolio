// Get the dropdown element
const dropdown = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownLink = dropdown.querySelector('.dropdown-link');

// Function to handle dropdown toggle
const toggleDropdown = (event) => {
    // Prevent the click from bubbling up to the document
    event.stopPropagation();

    // Toggle the 'open' class
    const isOpen = dropdown.classList.toggle('open');

    // Update ARIA attribute
    dropdownLink.setAttribute('aria-expanded', isOpen);
};

// Add click event listener to the dropdown
dropdown.addEventListener('click', toggleDropdown);

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    // Check if the click was outside the dropdown
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('open');
        dropdownLink.setAttribute('aria-expanded', 'false');
    }
});

// Optional: Close dropdown when pressing Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
        dropdownLink.setAttribute('aria-expanded', 'false');
    }
});