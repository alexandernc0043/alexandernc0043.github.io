/**
 * script.js
 * Navigation helper for the site. Maps sidebar menu elements to their target links,
 * handles context-aware URL redirection for nested pages (basics, applications, reviews).
 */

// Regular expression to detect nested pages under basics/, applications/, or reviews/
// Captures the folder segment and any filename ending in .html
const regex = /((?:basics|applications|reviews|resources)\/)[^/]+\.html$/;
/**
 * Arrow function for setting the window location
 * @param location
 * @returns {*|string}
 */
const load = (location) => {
    // If the current URL matches a nested page, strip the folder and filename, then append the new location
    if (regex.test(window.location.toString())) {
        // Replace the matched segment with the base path and the provided relative link
        return window.location = window.location.toString().replace(regex, '') + location;
    }
    // For top-level pages, navigate directly to the provided link
    return window.location = location;
};

const dropdowns = document.querySelectorAll(".drop-down");

dropdowns.forEach((dropdown) => {
    const arrow = dropdown.querySelector(".arrow");
    // Smooth rotation transition for the arrow
    arrow.style.transition = "transform 0.3s ease";
    dropdown.addEventListener('mouseover', () => {
        arrow.style.transform = "rotate(180deg)";
    });
    dropdown.addEventListener('mouseleave', () => {
        arrow.style.transform = "rotate(0deg)";
    });
});


// Get the menu link element for learning
const learn = document.getElementById('learn');
// Get the menu link element for resources
const resources = document.getElementById('resources-links');
// Get the menu link element for variables
const variables = document.getElementById('variables');
// Get the menu link element for types
const types = document.getElementById('types');
// Get the menu link element for functions
const functions = document.getElementById('functions');
// Get the menu link element for classes
const classes = document.getElementById('classes');
// Get the menu link element for kmp
const kmp = document.getElementById('kmp');
// Get the menu link element for android
const android = document.getElementById('android');
const interactive = document.getElementById('interactive');

// Define mapping between DOM elements and their target link paths
[
    {element: learn, link: 'index.html'},
    {element: resources, link: 'resources/resources.html'},
    {element: variables, link: 'basics/variables.html'},
    {element: types, link: 'basics/types.html'},
    {element: functions, link: 'basics/functions.html'},
    {element: classes, link: 'basics/classes.html'},
    {element: kmp, link: 'applications/kmp.html'},
    {element: android, link: 'applications/android.html'},
    {element: interactive, link: 'resources/interactive.html'}
].forEach((item) => {
    // Attach the click handler to navigate via the load() helper
    item.element.addEventListener('click', () => {
        load(item.link);
    });
});
// End of navigation setup