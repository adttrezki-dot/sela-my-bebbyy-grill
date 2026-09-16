/* =========================================================
   SELA — A MESSAGE LEFT BEHIND
   SCRIPT.JS — VERSI STABIL
   ========================================================= */


/* =========================================================
   01. SELECT ELEMENT
   ========================================================= */

const opening = document.getElementById("opening");
const countdown = document.getElementById("countdown");
const mainContent = document.getElementById("mainContent");

const openButton = document.getElementById("openButton");
const countdownNumber = document.getElementById("countdownNumber");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicPlayer =
    document.getElementById("musicPlayer");

const musicButton =
    document.getElementById("musicButton");

const particles =
    document.getElementById("particles");

const cinematic =
    document.getElementById("cinematic");

const cinematicVideo =
    document.getElementById("cinematicVideo");

const videoTimer =
    document.getElementById("videoTimer");

const replyForm =
    document.getElementById("replyForm");

const replyStatus =
    document.getElementById("replyStatus");

const replayButton =
    document.getElementById("replayButton");


/* =========================================================
   02. STATE
   ========================================================= */

let openingStarted = false;
let cinematicStarted = false;

let musicTimeBeforeVideo = 0;
let musicWasPlayingBeforeVideo = false;


/* =========================================================
   03. HELPER
   ========================================================= */

function showElement(element) {
    if (!element) return;

    element.classList.remove("hidden");

    if (element === mainContent) {
        element.classList.add("active");
    }
}


function hideElement(element) {
    if (!element) return;

    element.classList.add("hidden");

    if (element === mainContent) {
        element.classList.remove("active");
    }
}


/* =========================================================
   04. OPENING
   ========================================================= */

function startExperience() {

    if (openingStarted) return;

    openingStarted = true;

    if (openButton) {
        openButton.disabled = true;
    }

    hideElement(opening);

    if (countdown) {
        countdown.classList.remove("hidden");
        countdown.style.display = "flex";
    }

    let number = 3;

    if (countdownNumber) {
        countdownNumber.textContent = number;
    }

    const countdownInterval = setInterval(() => {

        number--;

        if (countdownNumber) {
            countdownNumber.textContent = number;
        }

        if (number <= 0) {

            clearInterval(countdownInterval);

            finishOpening();
        }

    }, 1000);
}


/* =========================================================
   05. FINISH OPENING
   ========================================================= */

function finishOpening() {

    hideElement(countdown);

    if (countdown) {
        countdown.style.display = "none";
    }

    showElement(mainContent);

    if (mainContent) {
        mainContent.style.display = "";
    }

    if (musicPlayer) {
        musicPlayer.classList.remove("hidden");
        musicPlayer.classList.add("active");
        musicPlayer.style.display = "";
    }

    startMusic();

    window.scrollTo({
        top: 0,
        behavior: "auto"
    });

    setupRevealObserver();
}


/* =========================================================
   06. OPEN BUTTON
   ========================================================= */

if (openButton) {

    openButton.addEventListener("click", function () {

        startExperience();

    });

}


/* =========================================================
   07. MUSIC SYSTEM
   ========================================================= */

function updateMusicButton() {

    if (!musicButton || !backgroundMusic) return;

    if (backgroundMusic.paused) {

        musicButton.textContent = "▶";

        musicButton.setAttribute(
            "aria-label",
            "Putar musik"
        );

    } else {

        musicButton.textContent = "❚❚";

        musicButton.setAttribute(
            "aria-label",
            "Jeda musik"
        );
    }
}


function startMusic() {

    if (!backgroundMusic) return;

    backgroundMusic.volume = 0.7;

    const playPromise =
        backgroundMusic.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                updateMusicButton();

            })
            .catch(error => {

                console.log(
                    "Musik belum dapat diputar otomatis:",
                    error
                );

                updateMusicButton();

            });
    }
}


function toggleMusic() {

    if (!backgroundMusic) return;

    if (backgroundMusic.paused) {

        backgroundMusic.play()
            .then(() => {

                updateMusicButton();

            })
            .catch(error => {

                console.log(
                    "Musik gagal diputar:",
                    error
                );

            });

    } else {

        backgroundMusic.pause();

        updateMusicButton();
    }
}


if (musicButton) {

    musicButton.addEventListener(
        "click",
        toggleMusic
    );

}


if (backgroundMusic) {

    backgroundMusic.addEventListener(
        "play",
        updateMusicButton
    );

    backgroundMusic.addEventListener(
        "pause",
        updateMusicButton
    );

}


/* =========================================================
   08. PARTICLES
   ========================================================= */

function createParticle() {

    if (!particles) return;

    const particle =
        document.createElement("span");

    const symbols = [
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

    particle.textContent =
        symbols[
            Math.floor(
                Math.random() * symbols.length
            )
        ];

    particle.className = "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        (6 + Math.random() * 8) + "s";

    particle.style.animationDelay =
        Math.random() * 4 + "s";

    particle.style.fontSize =
        (10 + Math.random() * 12) + "px";

    particles.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    }, 15000);
}


function startParticles() {

    if (!particles) return;

    for (let i = 0; i < 18; i++) {

        setTimeout(
            createParticle,
            i * 250
        );

    }

    setInterval(
        createParticle,
        700
    );
}


startParticles();


/* =========================================================
   09. SCROLL REVEAL
   ========================================================= */

let revealObserver = null;


function setupRevealObserver() {

    if (revealObserver) return;

    const revealElements =
        document.querySelectorAll(
            ".reveal, .message-card, .cinematic-content, .letter-card, .final-card, .reply-card"
        );

    if (!revealElements.length) return;

    revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });
}


/* =========================================================
   10. CINEMATIC VIDEO
   ========================================================= */

function startCinematic() {

    if (!cinematicVideo) return;

    if (cinematicStarted) return;

    cinematicStarted = true;

    /* -----------------------------------------
       Simpan posisi musik
       ----------------------------------------- */

    if (backgroundMusic) {

        musicTimeBeforeVideo =
            backgroundMusic.currentTime;

        musicWasPlayingBeforeVideo =
            !backgroundMusic.paused;

        backgroundMusic.pause();
    }


    /* -----------------------------------------
       Reset video
       ----------------------------------------- */

    cinematicVideo.currentTime = 0;

    cinematicVideo.muted = false;

    cinematicVideo.volume = 0.7;


    /* -----------------------------------------
       Countdown video
       ----------------------------------------- */

    if (videoTimer) {

        videoTimer.classList.remove("hidden");

        videoTimer.style.display = "flex";

        let number = 3;

        videoTimer.textContent = number;

        const timer =
            setInterval(() => {

                number--;

                if (number > 0) {

                    videoTimer.textContent =
                        number;

                } else {

                    clearInterval(timer);

                    videoTimer.classList.add(
                        "hidden"
                    );

                    videoTimer.style.display =
                        "none";

                    playCinematicVideo();
                }

            }, 1000);

    } else {

        playCinematicVideo();

    }
}


function playCinematicVideo() {

    if (!cinematicVideo) return;

    const playPromise =
        cinematicVideo.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                console.log(
                    "Cinematic video started."
                );

            })
            .catch(error => {

                console.log(
                    "Video autoplay gagal:",
                    error
                );

                cinematicStarted = false;

                resumeMusic();

            });
    }
}


function resumeMusic() {

    if (!backgroundMusic) return;

    /*
       Musik hanya dilanjutkan kalau memang
       sedang bermain sebelum video dimulai.
    */

    if (!musicWasPlayingBeforeVideo) {

        return;
    }

    try {

        backgroundMusic.currentTime =
            musicTimeBeforeVideo;

    } catch (error) {

        console.log(
            "Tidak dapat mengembalikan posisi musik:",
            error
        );

    }


    const playPromise =
        backgroundMusic.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                updateMusicButton();

            })
            .catch(error => {

                console.log(
                    "Musik gagal dilanjutkan:",
                    error
                );

                updateMusicButton();

            });
    }
}


/* =========================================================
   11. VIDEO ENDED
   ========================================================= */

if (cinematicVideo) {

    cinematicVideo.addEventListener(
        "ended",
        function () {

            console.log(
                "Cinematic video selesai."
            );

            resumeMusic();

            cinematicStarted = false;

        }
    );


    cinematicVideo.addEventListener(
        "error",
        function () {

            console.log(
                "Cinematic video mengalami error."
            );

            cinematicStarted = false;

            resumeMusic();

        }
    );

}


/* =========================================================
   12. CINEMATIC OBSERVER
   ========================================================= */

function setupCinematicObserver() {

    if (!cinematic) return;

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        entry.intersectionRatio >= 0.35
                    ) {

                        startCinematic();

                    }

                });

            },
            {
                threshold: [0.35]
            }
        );

    observer.observe(cinematic);
}


setupCinematicObserver();


/* =========================================================
   13. REPLY FORM
   ========================================================= */

if (replyForm) {

    replyForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const nameInput =
                document.getElementById(
                    "replyName"
                );

            const messageInput =
                document.getElementById(
                    "replyMessage"
                );

            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";

            const message =
                messageInput
                    ? messageInput.value.trim()
                    : "";


            if (!message) {

                if (replyStatus) {

                    replyStatus.textContent =
                        "Silakan tulis pesan terlebih dahulu.";

                }

                return;
            }


            /*
               Untuk sekarang respons hanya ditampilkan
               secara lokal karena belum ada backend.
            */

            console.log(
                "Reply:",
                {
                    name: name,
                    message: message
                }
            );


            if (replyStatus) {

                replyStatus.textContent =
                    "Pesanmu sudah ditulis. Terima kasih sudah menyempatkan waktu.";

            }


            replyForm.reset();

        }
    );

}


/* =========================================================
   14. REPLAY
   ========================================================= */

function replayExperience() {

    /* Reset state */

    openingStarted = false;
    cinematicStarted = false;

    musicTimeBeforeVideo = 0;
    musicWasPlayingBeforeVideo = false;


    /* Stop video */

    if (cinematicVideo) {

        cinematicVideo.pause();

        try {

            cinematicVideo.currentTime = 0;

        } catch (error) {

            console.log(error);

        }
    }


    /* Stop music */

    if (backgroundMusic) {

        backgroundMusic.pause();

        try {

            backgroundMusic.currentTime = 0;

        } catch (error) {

            console.log(error);

        }
    }


    /* Hide main content */

    hideElement(mainContent);

    if (mainContent) {

        mainContent.style.display =
            "none";

    }


    /* Hide music player */

    if (musicPlayer) {

        musicPlayer.classList.remove(
            "active"
        );

        musicPlayer.classList.add(
            "hidden"
        );

        musicPlayer.style.display =
            "none";

    }


    /* Reset countdown */

    hideElement(countdown);

    if (countdown) {

        countdown.style.display =
            "none";

    }


    if (countdownNumber) {

        countdownNumber.textContent =
            "3";

    }


    /* Show opening */

    showElement(opening);

    if (opening) {

        opening.style.display =
            "";

    }


    if (openButton) {

        openButton.disabled = false;

    }


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "auto"
    });

}


if (replayButton) {

    replayButton.addEventListener(
        "click",
        replayExperience
    );

}


/* =========================================================
   15. CLICK HEART EFFECT
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const target =
            event.target.closest(
                "button, a"
            );

        if (!target) return;

        if (
            target === musicButton ||
            target === openButton ||
            target === replayButton
        ) {
            return;
        }


        const heart =
            document.createElement("span");

        heart.textContent = "💜";

        heart.style.position =
            "fixed";

        heart.style.left =
            event.clientX + "px";

        heart.style.top =
            event.clientY + "px";

        heart.style.pointerEvents =
            "none";

        heart.style.zIndex =
            "9999";

        heart.style.fontSize =
            "18px";

        heart.style.animation =
            "heartFloat 1s ease-out forwards";

        document.body.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 1000);

    }
);


/* =========================================================
   16. PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    function () {

        if (!backgroundMusic) return;

        if (
            document.hidden &&
            !backgroundMusic.paused
        ) {

            backgroundMusic.pause();

        }

    }
);


/* =========================================================
   17. ERROR LOGGER
   ========================================================= */

window.addEventListener(
    "error",
    function (event) {

        console.log(
            "Website error:",
            event.message
        );

    }
);


window.addEventListener(
    "unhandledrejection",
    function (event) {

        console.log(
            "Unhandled promise:",
            event.reason
        );

    }
);


/* =========================================================
   18. INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SELA — A MESSAGE LEFT BEHIND loaded."
        );

        updateMusicButton();

    }
);
