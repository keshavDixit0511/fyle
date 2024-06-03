const carousel = document.querySelector(".carousel");
const arrowIcon = document.querySelectorAll(".wrapper i");

const contactBtn = document.querySelector(".btn");

const outerDiv = document.querySelector('.outer');

const closeIcon = document.querySelector('.ri-close-line')

const form = document.querySelector('.form');

const links = document.querySelectorAll('.content-link');


const image = document.querySelector('.content-image');


const formUrl = 'https://alqfirfbzznbnfe.form.io/contactusform';

const firstImg = carousel.querySelectorAll("img")[0];

let isDragStart = false, prevPageX, prevScrollLeft;
let firstImgWidth = firstImg.clientWidth + 14;
let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

const showHideIcons = () => {
    arrowIcon[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcon[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging");
    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
};

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop); // Handle the mouse leaving the carousel


contactBtn.addEventListener('click', () => {
    outerDiv.style.display = 'block';
})
closeIcon.addEventListener('click', () => {
    outerDiv.style.display = 'none';
})


const imageMap = {
    1: './imageofcontent1/kei.jpg',
    2: './imageofcontent1/image.png',
    3: './imageofcontent1/kei.jpg'
};

links.forEach(link => {
    link.addEventListener('click', () => {
        const linkId = link.id;
        if (imageMap[linkId]) {
            image.src = imageMap[linkId];
        }
    });
});
    

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const terms = document.getElementById('check').checked;

    const data = {
        data: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            terms: terms
        }
    };

    try {
        const response = await fetch(formUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Form submitted successfully!');
            form.reset();
        } else {
            alert('Error submitting form.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting form.');
    }
});