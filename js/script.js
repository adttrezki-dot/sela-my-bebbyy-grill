/* =========================================================
   SELA — MY BEBBY GRILL
   Main JavaScript
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const opening = document.getElementById("opening");
const countdown = document.getElementById("countdown");
const mainContent = document.getElementById("mainContent");

const openButton = document.getElementById("openButton");
const replayButton = document.getElementById("replayButton");

const countdownNumber = document.getElementById("countdownNumber");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicPlayer =
    document.getElementById("musicPlayer");

const musicButton =
    document.getElementById("musicButton");

const particles =
    document.getElementById("particles");


/* =========================================================
   SETTINGS
========================================================= */

const particleSymbols = [
    "❤️",
    "💜",
    "💗",
    "💕",
    "🌸",
    "🌷",
    "✨",
    "✦",
    "💫"
];

let musicPlaying = false;

let particleInterval = null;


/* =========================================================
   OPEN WEBSITE
========================================================= */

openButton.addEventListener("click", startExperience);


/* =========================================================
   START EXPERIENCE
========================================================= */

async function startExperience() {

    if (
        opening.classList.contains("hidden") === false
        &&
        countdown.classList.contains("hidden")
    ) {

        opening.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

        opening.style.opacity = "0";

        opening.style.transform =
            "scale(1.08)";

        setTimeout(() => {

            opening.classList.add("hidden");

            countdown.classList.remove("hidden");

            startCountdown();

        }, 800);

    }

}


/* =========================================================
   COUNTDOWN
========================================================= */

function startCountdown() {

    const numbers = ["3", "2", "1"];

    let index = 0;

    showCountdownNumber(numbers[index]);

    const countdownTimer =
        setInterval(() => {

            index++;

            if (index < numbers.length) {

                showCountdownNumber(numbers[index]);

            } else {

                clearInterval(countdownTimer);

                finishCountdown();

            }

        }, 1000);
}


/* =========================================================
   COUNTDOWN NUMBER ANIMATION
========================================================= */

function showCountdownNumber(number) {

    countdownNumber.textContent = number;

    countdownNumber.style.animation = "none";

    void countdownNumber.offsetWidth;

    countdownNumber.style.animation =
        "countdownPulse 1s ease";
}


/* =========================================================
   FINISH COUNTDOWN
========================================================= */

function finishCountdown() {

    countdown.style.transition =
        "opacity 1s ease";

    countdown.style.opacity = "0";

    setTimeout(() => {

        countdown.classList.add("hidden");

        mainContent.classList.remove("hidden");

        musicPlayer.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        startMusic();

        startParticles();

        revealElements();

    }, 1000);

}


/* =========================================================
   MUSIC
========================================================= */

async function startMusic() {

    try {

        backgroundMusic.volume = 0.65;

        await backgroundMusic.play();

        musicPlaying = true;

        updateMusicButton();

    } catch (error) {

        console.log(
            "Musik menunggu interaksi pengguna."
        );

        musicPlaying = false;

        updateMusicButton();

    }

}


/* =========================================================
   PLAY / PAUSE
========================================================= */

musicButton.addEventListener(
    "click",
    toggleMusic
);


async function toggleMusic() {

    if (backgroundMusic.paused) {

        try {

            await backgroundMusic.play();

            musicPlaying = true;

        } catch (error) {

            console.log(
                "Musik tidak dapat diputar."
            );

        }

    } else {

        backgroundMusic.pause();

        musicPlaying = false;

    }

    updateMusicButton();

}


/* =========================================================
   MUSIC BUTTON ICON
========================================================= */

function updateMusicButton() {

    if (backgroundMusic.paused) {

        musicButton.textContent = "▶";

    } else {

        musicButton.textContent = "Ⅱ";

    }

}


/* =========================================================
   FLOATING PARTICLES
========================================================= */

function createParticle() {

    if (!particles) return;

    const particle =
        document.createElement("div");

    particle.classList.add("particle");

    particle.textContent =
        particleSymbols[
            Math.floor(
                Math.random() *
                particleSymbols.length
            )
        ];

    const size =
        Math.random() * 18 + 10;

    const left =
        Math.random() * 100;

    const duration =
        Math.random() * 7 + 7;

    const moveX =
        (Math.random() - 0.5) * 180;

    const delay =
        Math.random() * 2;

    particle.style.left =
        `${left}%`;

    particle.style.fontSize =
        `${size}px`;

    particle.style.animationDuration =
        `${duration}s`;

    particle.style.animationDelay =
        `${delay}s`;

    particle.style.setProperty(
        "--move-x",
        `${moveX}px`
    );

    particles.appendChild(particle);


    setTimeout(() => {

        particle.remove();

    }, (duration + delay) * 1000);

}


/* =========================================================
   START PARTICLES
========================================================= */

function startParticles() {

    if (particleInterval) return;

    for (let i = 0; i < 18; i++) {

        setTimeout(() => {

            createParticle();

        }, i * 250);

    }

    particleInterval =
        setInterval(() => {

            createParticle();

        }, 550);

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function revealElements() {

    const elements =
        document.querySelectorAll(
            ".memory-card, " +
            ".letter-container, " +
            ".collage-section, " +
            ".ending-content"
        );


    elements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(40px)";

        element.style.transition =
            "opacity 0.9s ease, " +
            "transform 0.9s ease";

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   PARALLAX EFFECT
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        const scrollY =
            window.scrollY;

        const auroras =
            document.querySelectorAll(
                ".aurora"
            );

        auroras.forEach(
            (aurora, index) => {

                const speed =
                    0.02 +
                    (index * 0.01);

                aurora.style.transform =
                    `translateY(${scrollY * speed}px)`;

            }
        );

    },
    {
        passive: true
    }
);


/* =========================================================
   REPLAY
========================================================= */

replayButton.addEventListener(
    "click",
    replayExperience
);


function replayExperience() {

    backgroundMusic.pause();

    backgroundMusic.currentTime = 0;

    musicPlaying = false;

    updateMusicButton();


    if (particleInterval) {

        clearInterval(
            particleInterval
        );

        particleInterval = null;

    }


    particles.innerHTML = "";


    mainContent.classList.add("hidden");

    musicPlayer.classList.add("hidden");


    countdown.classList.add("hidden");

    countdown.style.opacity = "1";


    opening.classList.remove("hidden");

    opening.style.opacity = "1";

    opening.style.transform =
        "scale(1)";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    setTimeout(() => {

        startExperience();

    }, 500);

}


/* =========================================================
   CLICK HEART EFFECT
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.closest("button")
            ||
            event.target.closest("a")
        ) {
            return;
        }


        createClickHeart(
            event.clientX,
            event.clientY
        );

    }
);


function createClickHeart(x, y) {

    const heart =
        document.createElement("div");

    heart.textContent =
        Math.random() > 0.5
            ? "💜"
            : "❤️";


    heart.style.position =
        "fixed";

    heart.style.left =
        `${x}px`;

    heart.style.top =
        `${y}px`;

    heart.style.zIndex =
        "9999";

    heart.style.pointerEvents =
        "none";

    heart.style.fontSize =
        `${Math.random() * 12 + 18}px`;

    heart.style.transform =
        "translate(-50%, -50%) scale(0.5)";

    heart.style.opacity =
        "1";

    heart.style.transition =
        "all 1s ease";


    document.body.appendChild(
        heart
    );


    requestAnimationFrame(() => {

        heart.style.transform =
            `translate(
                ${Math.random() * 50 - 25}px,
                -100px
            )
            scale(1.4)`;

        heart.style.opacity =
            "0";

    });


    setTimeout(() => {

        heart.remove();

    }, 1000);

}


/* =========================================================
   PHOTO TILT EFFECT
========================================================= */

document
    .querySelectorAll(".memory-card")
    .forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                if (
                    window.innerWidth < 700
                ) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -3;

                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    3;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


/* =========================================================
   INITIAL STATE
========================================================= */

musicPlayer.classList.add(
    "hidden"
);

mainContent.classList.add(
    "hidden"
);

countdown.classList.add(
    "hidden"
);


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "💜 Sela — My Bebby Grill website loaded."
);

console.log(
    "✨ Welcome to our little story."
);


/* ==========================================
   TAHAP 6 - ANIMASI BUNGA & LOVE
   ========================================== */

(function createRomanticParticles() {

    const particles = [
        "🌸",
        "🌷",
        "💜",
        "💕",
        "💗",
        "💖",
        "✨",
        "🌸"
    ];

    function createParticle() {

        const particle = document.createElement("div");

        particle.className = "romantic-particle";

        particle.textContent =
            particles[Math.floor(Math.random() * particles.length)];

        particle.style.left =
            Math.random() * 100 + "vw";

        particle.style.fontSize =
            (14 + Math.random() * 18) + "px";

        const fallDuration =
            6 + Math.random() * 6;

        particle.style.animationDuration =
            fallDuration + "s, " +
            (2 + Math.random() * 2) + "s";

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, fallDuration * 1000);
    }

    /* Membuat partikel pertama */
    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 500);
    }

    /* Terus membuat partikel */
    setInterval(createParticle, 900);

})();


/* ==========================================
   TAHAP 9 - TOMBOL PUTAR LAGI
   ========================================== */

const finalReplayButton =
    document.getElementById("finalReplayButton");

if (finalReplayButton) {

    finalReplayButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            setTimeout(() => {

                location.reload();

            }, 700);

        }
    );

}
