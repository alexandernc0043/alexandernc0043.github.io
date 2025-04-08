let currentImage = 0;

const images = [
    {
        image: 'images/gallery/Alexander.jpeg',
        text: 'Alexander'
    },
    {
        image: 'images/gallery/Loki.jpg',
        text: 'Loki (One of my cats)'
    },
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
    $('figure figcaption').text(images[currentImage].text);
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