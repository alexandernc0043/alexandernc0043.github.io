const regex = /((?:basics|applications)\/)[^/]+\.html$/;
const load = (location) => {
    if (regex.test(window.location.toString())) {
        return window.location = window.location.toString().replace(regex, '') + location;
    }
    return window.location = location;
};
const learn = document.getElementById('learn');
const resources = document.getElementById('resources');
const variables = document.getElementById('variables');
const types = document.getElementById('types');
const functions = document.getElementById('functions');
const classes = document.getElementById('classes');
const kmp = document.getElementById('kmp');
const android = document.getElementById('android');

[
    {element: learn, link: 'index.html'},
    {element: resources, link: 'resources.html'},
    {element: variables, link: 'basics/variables.html'},
    {element: types, link: 'basics/types.html'},
    {element: functions, link: 'basics/functions.html'},
    {element: classes, link: 'basics/classes.html'},
    {element: kmp, link: 'applications/kmp.html'},
    {element: android, link: 'applications/android.html'}
].forEach((item) => {
    item.element.addEventListener('click', () => {
        load(item.link);
    });
});