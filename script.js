
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


// drop animation js code

const labels = [
    "UI/UX Design",
    "Website Development",
    "App Development",
    "2D/3D Animations",
    "Digital Marketing",
    "Graphic Designing",
    "Social Media Marketing",
    "Search Engine Optimization",
    "Digital & Off-Set Print"
];

const { Engine, Runner, World, Bodies } = Matter;
let engine, world, runner;
let hasFallen = false;

function startFalling() {
    if (hasFallen) return;
    hasFallen = true;

    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 0.6;

    const drop = document.querySelector('.drop');
    const container = document.querySelector('.scene');
    // const width = window.innerWidth;
    // const height = window.innerHeight * 0.7;
    const width = drop.offsetWidth;
    const height = drop.offsetHeight; // ✅ Actual section height

    // Boundaries
    const ground = Bodies.rectangle(width / 2, height + 20, width, 60, { isStatic: true });
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, { isStatic: true });
    World.add(world, [ground, leftWall, rightWall]);

    labels.forEach((text) => {
        const el = document.createElement('div');
        el.className = 'label';
        el.innerText = text;
        container.appendChild(el);

        const safePadding = width < 992 ? 80 : 150;
        const x = Math.random() * (width - safePadding * 2) + safePadding;
        const y = -Math.random() * 300 - 50;

        const body = Bodies.rectangle(x, y, el.offsetWidth, el.offsetHeight, {
            restitution: 0.2,
            friction: 0.8,
            frictionAir: 0.02,
            angle: (Math.random() - 0.5) * 0.6,
        });
        body.el = el;
        World.add(world, body);

        // Fade in effect
        setTimeout(() => { el.style.opacity = 1; }, 300);
    });

    runner = Runner.create();
    Runner.run(runner, engine);

    (function update() {
        requestAnimationFrame(update);
        world.bodies.forEach(body => {
            if (body.el) {
                body.el.style.left = body.position.x + 'px';
                body.el.style.top = body.position.y + 'px';
                body.el.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
            }
        });
    })();
}

// Scroll trigger
const section = document.querySelector('.drop');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startFalling();
            observer.disconnect();
        }
    });
}, { threshold: 0.3 });

observer.observe(section);