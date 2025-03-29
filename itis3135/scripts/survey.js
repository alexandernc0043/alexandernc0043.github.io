const nameInput = document.getElementById("name");
const mascotInput = document.getElementById("mascot");
const imageInput = document.getElementById("image");
const imageCaptionInput = document.getElementById("image-caption");
const personalBackgroundInput = document.getElementById("personal-background");
const professionalBackgroundInput = document.getElementById('professional-background');
const academicBackgroundInput = document.getElementById("academic-background");
const backgroundWebDevInput = document.getElementById("background-web-dev");
const computerInput = document.getElementById("computer");
const funnyThingInput = document.getElementById("funny-thing");
const anythingInput = document.getElementById("anything");
const agreementCheckbox = document.getElementById("agreement");
const coursesTakingDiv = document.getElementById("courses-taking");
const submitBtn = document.getElementById('btn-submit');
const resetBtn = document.getElementById('btn-reset');
const addBtn = document.getElementById('add-class');

let outputDiv = document.getElementById('output');

const fields = [nameInput, mascotInput, imageInput, imageCaptionInput, personalBackgroundInput, professionalBackgroundInput, academicBackgroundInput, backgroundWebDevInput, computerInput, funnyThingInput, anythingInput];

const emptyFields = () => {
    return fields.some((field) => field.value === '');
};
const agreement = () => {
    return agreementCheckbox.checked;
};

const addCourses = () => {
    const courseInputs = coursesTakingDiv.querySelectorAll('input');
    let courseList = '<ul>';
    courseInputs.forEach((course) => {
        courseList += `<li>${course.value}</li>`;
    });
    courseList += '</ul>';
    return courseList;
};

submitBtn.addEventListener('click', () => {
    if (outputDiv.innerHTML !== '') outputDiv.innerHTML = '';

    if (emptyFields()) {
        alert('One or more fields is empty.');
        return;
    }
    if (!agreement()) {
        alert('You must check the checkbox.');
        return;
    }
    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(imageInput.files[0].type)) {
        alert('Invalid File upload, try again!');
        return;
    }


    outputDiv.innerHTML += `
        <figure>
            <img src="${URL.createObjectURL(imageInput.files[0])}" alt="${imageCaptionInput.value}">
            <figcaption><i>${imageCaptionInput.value}</i></figcaption>
        </figure>
        <p><span>Personal Background:</span> ${personalBackgroundInput.value}</p>
        <p><span>Professional Background:</span> ${professionalBackgroundInput.value}</p>
        <p><span>Academic Background:</span> ${academicBackgroundInput.value}</p>
        <p><span>Primary Computer Platform:</span> ${computerInput.value}</p>
        <p><span>Courses I'm Taking:</span></p>`;
    outputDiv.innerHTML += addCourses();
    outputDiv.innerHTML += `<p><span>Funny thing:</span> ${funnyThingInput.value}</p><p><span>Anything Else: </span> ${anythingInput.value}</p>`;
});

resetBtn.addEventListener('click', () => {
    if (!confirm('Do you want to reset the form?')) return;
    fields.forEach((field) => {
        field.value = '';
    });
    Array.from(coursesTakingDiv.children).forEach((element) => {
        element.remove();
    });
    outputDiv.innerHTML = '';
});

addBtn.addEventListener('click', () => {
    const label = document.createElement('label');
    label.textContent = 'Class: ';

    const input = document.createElement('input');
    input.type = 'text';

    const removalButton = document.createElement('button');
    removalButton.type = 'button';
    removalButton.textContent = 'Remove';

    removalButton.addEventListener('click', () => {
        label.remove();
        input.remove();
        removalButton.remove();
    });
    coursesTakingDiv.append(label);
    coursesTakingDiv.append(input);
    coursesTakingDiv.append(removalButton);
});
