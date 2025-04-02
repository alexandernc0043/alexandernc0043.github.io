const basics = document.getElementById('basics');
const applications = document.getElementById('applications');
const basicsDropdown = document.getElementById('basics-dropdown');
const applicationsDropdown = document.getElementById('applications-dropdown');

const dropdowns = [
    {
        button: basics,
        dropdown: basicsDropdown
    },
    {
        button: applications,
        dropdown: applicationsDropdown
    }
];

dropdowns.forEach((it) => {
    it.button.addEventListener('click', () => {
        console.log(it.button.innerText + ' clicked');
        it.dropdown.style.display = 'flex';
        it.dropdown.addEventListener('mouseleave', () => it.dropdown.style.display = 'none');
    });
});