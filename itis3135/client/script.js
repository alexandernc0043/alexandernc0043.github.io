const regex = /((?:basics|applications)\/)[^/]+\.html$/;
const load = (location) => {
    if (regex.test(window.location.toString())){
        return window.location = window.location.toString().replace(regex, '') + location;
    }
    return window.location = location;
};


const basicLinks = {
    variables: 'basics/variables.html',
    types: 'basics/types.html',
    functions: 'basics/functions.html',
    classes: 'basics/classes.html'
};
const mainLinks = {
    index: 'index.html',
    resources: 'resources.html'
};
const applicationLinks = {
  kmp: 'applications/kmp.html',
  android: 'applications/android.html'
};