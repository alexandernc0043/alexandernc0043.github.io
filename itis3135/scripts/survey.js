const firstName = document.getElementById("first-name");
const middleInitial = document.getElementById("middle-initial");
const lastName = document.getElementById("last-name");
const nickName = document.getElementById("nick-name");

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
const form = document.getElementById('byo-form');

let outputDiv = document.getElementById('output');

const fields = [
    firstName, middleInitial, lastName, nickName,
    mascotInput, imageInput, imageCaptionInput,
    personalBackgroundInput, professionalBackgroundInput,
    academicBackgroundInput, backgroundWebDevInput,
    computerInput, funnyThingInput, anythingInput
].filter(Boolean);

const emptyFields = () => {
    return fields.some((field) => field.value.trim() === '');
};
const agreement = () => {
    return agreementCheckbox.checked;
};

const addCourses = () => {
    const courseInputs = coursesTakingDiv.querySelectorAll('input');
    let courseList = '<ol>';
    courseInputs.forEach((course) => {
        courseList += `<li>${course.value}</li>`;
    });
    courseList += '</ol></li>';
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
        <h2>Introduction</h2>
        <h3>${firstName.value} ${middleInitial.value}. "${nickName.value}" ${lastName.value} ★ ${mascotInput.value}</h3>
        <figure>
            <img src="${URL.createObjectURL(imageInput.files[0])}" alt="${imageCaptionInput.value}">
            <figcaption><i>${imageCaptionInput.value}</i></figcaption>
        </figure>
        <li><span>Personal Background:</span> ${personalBackgroundInput.value}</li>
        <li><span>Professional Background:</span> ${professionalBackgroundInput.value}</li>
        <li><span>Academic Background:</span> ${academicBackgroundInput.value}</li>
        <li><span>Primary Computer Platform:</span> ${computerInput.value}</li>
        <li><span>Courses I'm Taking:</span>`;
    outputDiv.innerHTML += addCourses();
    outputDiv.innerHTML += `<li><span>Funny thing:</span> ${funnyThingInput.value}</li><li><span>Anything Else: </span> ${anythingInput.value}</li>`;
    form.style.display = 'none';
});

resetBtn.addEventListener('click', () => {

    if (!confirm('Do you want to reset the form?')) return;
    // fields.forEach((field) => {
    //     field.value = '';
    // });
    form.reset();
    Array.from(coursesTakingDiv.children).forEach((element) => {
        element.remove();
    });
    outputDiv.innerHTML = '';
    form.style.display = 'flex';
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

document.addEventListener('DOMContentLoaded', () => {
    const classes = ['ITIS3135', 'ITIS3200', 'ITSC3155', 'ITCS3160'];

    classes.forEach((classItem) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = classItem;

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
});