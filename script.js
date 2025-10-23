
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
const container = document.getElementById('scene');
const section = document.getElementById('fall-section');
const width = window.innerWidth;
const height = container.offsetHeight;

let started = false;

function startFalling() {
    if (started) return;
    started = true;

    const engine = Engine.create();
    const world = engine.world;
    world.gravity.y = 0.65;

    const ground = Bodies.rectangle(width / 2, height, width, 50, { isStatic: true });
    const leftWall = Bodies.rectangle(0, height / 2, 20, height, { isStatic: true });
    const rightWall = Bodies.rectangle(width, height / 2, 20, height, { isStatic: true });
    World.add(world, [ground, leftWall, rightWall]);

    labels.forEach((text) => {
        const el = document.createElement('div');
        el.className = 'label';
        el.innerText = text;
        container.appendChild(el);

        const x = Math.random() * (width - 200) + 100;
        const y = -Math.random() * 300 - 100;
        const body = Bodies.rectangle(x, y, el.offsetWidth, el.offsetHeight, {
            restitution: 0.12,
            friction: 1,
            frictionAir: 0.03,
            angle: (Math.random() - 0.5) * 0.8,
        });
        body.el = el;
        World.add(world, body);
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    (function update() {
        requestAnimationFrame(update);
        world.bodies.forEach(body => {
            if (body.el) {
                body.el.style.opacity = 1;
                body.el.style.left = body.position.x + 'px';
                body.el.style.top = body.position.y + 'px';
                body.el.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
            }
        });
    })();
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startFalling();
            observer.disconnect();
        }
    });
}, { threshold: 0.4 });

observer.observe(section);

window.addEventListener('resize', () => location.reload());
