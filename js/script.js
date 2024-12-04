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
