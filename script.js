
const texts = ["Web Development", "App Development", "Digital Marketing", "Graphics Designing"];
let index = 0;
let charIndex = 0;
const typeSpeed = 200; // milliseconds per letter
const eraseSpeed = 80;  // milliseconds per letter
const delayBetween = 1000; // delay before next text

const element = document.getElementById("typewriter");

function type() {
    if (charIndex < texts[index].length) {
        element.textContent += texts[index][charIndex];
        charIndex++;
        setTimeout(type, typeSpeed);
    } else {
        setTimeout(erase, delayBetween);
    }
}

function erase() {
    if (charIndex > 0) {
    element.textContent = texts[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, eraseSpeed);
    } else {
        index = (index + 1) % texts.length;
        setTimeout(type, typeSpeed);
    }
}

type(); // start animation
