let currentImage = 0;

const images = [
    { // a
        image: 'images/gallery/alexander.jpeg',
        text: 'Alexander (me)'
    },
    { // l
        image: 'images/gallery/Loki.jpg',
        text: 'Loki, one of my cats.'
    },
    {// e
        image: 'images/gallery/erika.jpeg',
        text: 'Erika, my mom.'
    },
    {// x
        image: 'images/gallery/xray.png',
        text: 'xray, from when I dislocated my shoulder.'
    },
    {// a
        image: 'images/gallery/annoyed.png',
        text: 'Annoyed, he didn\'t like the turtle.'
    },
    {// n
        image: 'images/gallery/notebook.jpg',
        text: 'Notebook.'
    },
    {// d
        image: 'images/gallery/door.jpg',
        text: 'Door.'
    },
    {// e
        image: 'images/gallery/entrance.jpg',
        text: 'Entrance, to the Washington Metro Center'
    },
    {// r
        image: 'images/gallery/rotunda.jpg',
        text: 'Rotunda, the Capitol Building Rotunda.'
    },
    {// p
        image: 'images/gallery/penny.jpg',
        text: 'Penny, my other cat.'
    },
    {// r
        image: 'images/gallery/representative.jpg',
        text: 'Representative, at the time it was Alma Adams'
    },
    {// e
        image: 'images/gallery/entranceTwo.jpg',
        text: 'Entrance, This time to the White house.'
    },
    {// c
        image: 'images/gallery/capitol.jpeg',
        text: 'Capitol, where Congress is located.'
    },
    {// h
        image: 'images/gallery/hole.jpeg',
        text: 'Hole, Geyser is the ground.'
    },
    {// t
        image: 'images/gallery/tower.jpg',
        text: 'Tower, Charlotte, NC, city skyline.'
    },
    {// e
        image: 'images/gallery/exam.png',
        text: 'Exam, Calculus 2 is not fun...'
    },
    {// l
        image: 'images/gallery/lazy.jpeg',
        text: 'Lazy, my cat is very lazy.'
    }
];

const incrementSlideShow = (increment) => {
    if (increment) {
        if (currentImage + 1 === images.length) {
            currentImage = 0;
        } else {
            currentImage++;
        }
    } else {
        if (currentImage - 1 < 0) {
            currentImage = images.length - 1;
        } else {
            currentImage--;
        }
    }
};

const update = () => {
    $('#slideshow img').attr('src', images[currentImage].image).attr('alt', images[currentImage].text);
    const position = $('#position');
    const positionArray = Array.from(position.text());
    position.empty();
    let positionText = '';
    for (let i = 0; i < positionArray.length; i++) {
        if (i === currentImage) {
            positionText += `<strong>${positionArray[i]}</strong>`;
        } else {
            positionText += `${positionArray[i]}`;
        }
    }
    $('figure figcaption').text(`${positionArray[currentImage]} is for ${images[currentImage].text}`);
    position.html(positionText);
};


$('#previous').on('click', () => {
    incrementSlideShow(false);
    update();
});

$('#next').on('click', () => {
    incrementSlideShow(true);
    update();
});

$('#end').on('click', () => {
    currentImage = images.length - 1;
    update();
});
$('#first').on('click', () => {
    currentImage = 0;
    update();
});

$(document).ready(() => {
    update();
});

let slideshow;
$('#play').on('click', () => {
    if (slideshow) return;
    slideshow = setInterval(() => {
        incrementSlideShow(true);
        update();
        if (currentImage === images.length - 1) {
            clearInterval(slideshow);
            slideshow = null;
        }
    }, 750);
});
$('#stop').on('click', () => {
    clearInterval(slideshow);
    slideshow = null;
});