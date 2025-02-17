/**
 * This script manages the responsive behavior of the navigation menu
 * and controls the visibility of the footer based on scroll direction.
 * It's designed to enhance user experience on both desktop and mobile devices.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Select key DOM elements
    const menuBar = document.querySelector('.menu-bar');
    const navLinks = document.querySelector('.nav-links');
    const footer = document.querySelector('footer');

    // Toggle mobile menu visibility when menu bar is clicked
    menuBar.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Initialize variable to track scroll position
    let lastScrollTop = 0;

    // Add scroll event listener to control footer visibility
    window.addEventListener('scroll', () => {
        // Get current scroll position, using a cross-browser compatible method
        let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Compare current scroll position with last recorded position
        if (currentScrollTop < lastScrollTop) {
            // User is scrolling up, show footer
            footer.classList.remove('hide');
        } else {
            // User is scrolling down, hide footer
            footer.classList.add('hide');
        }

        // Update last scroll position for next comparison
        lastScrollTop = currentScrollTop;
    });
});