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

