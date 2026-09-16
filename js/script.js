```javascript
/* =========================================================
   SELA — A MESSAGE LEFT BEHIND
   SCRIPT.JS
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

let musicPlaying = false;
let musicStarted = false;

let cinematicStarted = false;
let cinematicPlaying = false;

let countdownRunning = false;

let savedMusicTime = 0;


/* =========================================================
   03. BASIC HELPERS
   ========================================================= */

function showElement(element) {
    if (!element) return;

    element.style.display = "";
}

function hideElement(element) {
    if (!element) return;

    element.style.display = "none";
}


/* =========================================================
   04. INITIAL STATE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (countdown) {
        countdown.style.display = "none";
    }

    if (mainContent) {
        mainContent.style.display = "none";
    }

    if (musicPlayer) {
        musicPlayer.classList.remove("active");
    }

    if (backgroundMusic) {
        backgroundMusic.volume = 0.7;
        backgroundMusic.currentTime = 0;
    }

    if (cinematicVideo) {
        cinematicVideo.volume = 0.7;
    }

    updateMusicButton();

});


/* =========================================================
   05. OPENING SYSTEM
   ========================================================= */

function startExperience() {

    if (countdownRunning) {
        return;
    }

    countdownRunning = true;


    /* Hide opening */

    if (opening) {
        opening.classList.add("hidden");
    }


    /* Show countdown */

    if (countdown) {
        countdown.style.display = "flex";
    }


    let number = 3;

    if (countdownNumber) {
        countdownNumber.textContent = number;
    }


    const countdownInterval =
        setInterval(() => {

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
   06. FINISH OPENING
   ========================================================= */

function finishOpening() {

    countdownRunning = false;


    /* Hide countdown */

    if (countdown) {
        countdown.style.display = "none";
    }


    /* Show main content */

    if (mainContent) {
        mainContent.style.display = "block";
        mainContent.classList.add("active");
    }


    /* Show music player */

    if (musicPlayer) {
        musicPlayer.classList.add("active");
    }


    /* Start music */

    startMusic();


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    /* Start observing */

    observeRevealElements();

}


/* =========================================================
   07. OPEN BUTTON
   ========================================================= */

if (openButton) {

    openButton.addEventListener(
        "click",
        startExperience
    );

}


/* =========================================================
   08. MUSIC SYSTEM
   ========================================================= */

function startMusic() {

    if (!backgroundMusic) {
        return;
    }


    /*
     * Jangan mengubah currentTime di sini.
     *
     * Dengan begitu ketika musik di-resume
     * setelah video, musik tetap berada
     * pada posisi sebelumnya.
     */

    const playPromise =
        backgroundMusic.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicStarted = true;
                musicPlaying = true;

                updateMusicButton();

            })
            .catch((error) => {

                /*
                 * Browser dapat memblokir autoplay.
                 * Ini tidak boleh membuat website rusak.
                 */

                console.log(
                    "Music autoplay blocked:",
                    error
                );

                musicStarted = true;
                musicPlaying = false;

                updateMusicButton();

            });

    }

}


/* =========================================================
   09. MUSIC BUTTON
   ========================================================= */

function toggleMusic() {

    if (!backgroundMusic) {
        return;
    }


    if (backgroundMusic.paused) {

        backgroundMusic
            .play()
            .then(() => {

                musicPlaying = true;
                musicStarted = true;

                updateMusicButton();

            })
            .catch((error) => {

                console.log(
                    "Music play failed:",
                    error
                );

            });

    } else {

        backgroundMusic.pause();

        musicPlaying = false;

        updateMusicButton();

    }

}


if (musicButton) {

    musicButton.addEventListener(
        "click",
        toggleMusic
    );

}


/* =========================================================
   10. MUSIC BUTTON UI
   ========================================================= */

function updateMusicButton() {

    if (!musicButton) {
        return;
    }


    if (
        backgroundMusic &&
        !backgroundMusic.paused
    ) {

        musicButton.textContent = "Ⅱ";

        musicButton.setAttribute(
            "aria-label",
            "Jeda musik"
        );

    } else {

        musicButton.textContent = "♫";

        musicButton.setAttribute(
            "aria-label",
            "Putar musik"
        );

    }

}


/* =========================================================
   11. MUSIC EVENTS
   ========================================================= */

if (backgroundMusic) {

    backgroundMusic.addEventListener(
        "play",
        () => {

            musicPlaying = true;

            updateMusicButton();

        }
    );


    backgroundMusic.addEventListener(
        "pause",
        () => {

            musicPlaying = false;

            updateMusicButton();

        }
    );

}


/* =========================================================
   12. PARTICLES
   ========================================================= */

const particleList = [
    "🤍",
    "💜",
    "✨",
    "✦",
    "🌸"
];


function createParticle() {

    if (!particles) {
        return;
    }


    const particle =
        document.createElement("div");


    particle.className =
        "particle";


    particle.textContent =
        particleList[
            Math.floor(
                Math.random() *
                particleList.length
            )
        ];


    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.setProperty(
        "--move-x",
        (
            Math.random() * 120 - 60
        ) + "px"
    );


    const duration =
        7 + Math.random() * 6;


    particle.style.animationDuration =
        duration + "s";


    particle.style.fontSize =
        (
            11 +
            Math.random() * 13
        ) + "px";


    particles.appendChild(
        particle
    );


    setTimeout(() => {

        particle.remove();

    }, (duration + 1) * 1000);

}


setInterval(
    createParticle,
    750
);


/* =========================================================
   13. SCROLL REVEAL
   ========================================================= */

let revealObserver = null;


function observeRevealElements() {

    if (revealObserver) {
        return;
    }


    const elements =
        document.querySelectorAll(
            ".message-card, " +
            ".cinematic-content, " +
            ".cinematic-video-wrapper, " +
            ".letter-container, " +
            ".final-love-content, " +
            ".reply-container, " +
            ".ending-content"
        );


    if (!elements.length) {
        return;
    }


    revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("reveal");

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    elements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

}


/* =========================================================
   14. CINEMATIC SYSTEM
   ========================================================= */

function startCinematic() {

    if (
        cinematicStarted ||
        !cinematicVideo
    ) {

        return;

    }


    cinematicStarted = true;


    /*
     * SIMPAN POSISI MUSIK
     *
     * Ini sangat penting.
     */

    if (backgroundMusic) {

        savedMusicTime =
            backgroundMusic.currentTime;


        backgroundMusic.pause();

        musicPlaying = false;

        updateMusicButton();

    }


    /*
     * Reset video
     */

    cinematicVideo.currentTime = 0;

    cinematicVideo.volume = 0.7;


    /*
     * Countdown video
     */

    runVideoCountdown();

}


/* =========================================================
   15. VIDEO COUNTDOWN
   ========================================================= */

function runVideoCountdown() {

    if (!videoTimer) {

        playCinematicVideo();

        return;

    }


    let number = 3;


    videoTimer.style.display =
        "flex";


    videoTimer.textContent =
        number;


    const interval =
        setInterval(() => {

            number--;

            if (videoTimer) {

                videoTimer.textContent =
                    number;

            }


            if (number <= 0) {

                clearInterval(interval);


                if (videoTimer) {

                    videoTimer.style.display =
                        "none";

                }


                playCinematicVideo();

            }

        }, 1000);

}


/* =========================================================
   16. PLAY CINEMATIC VIDEO
   ========================================================= */

function playCinematicVideo() {

    if (!cinematicVideo) {
        return;
    }


    cinematicPlaying = true;


    cinematicVideo
        .play()
        .then(() => {

            const wrapper =
                cinematicVideo
                    .closest(
                        ".cinematic-video-wrapper"
                    );


            if (wrapper) {

                wrapper.classList
                    .add("video-light");

            }

        })
        .catch((error) => {

            /*
             * Kalau autoplay video gagal,
             * website tetap berjalan.
             */

            console.log(
                "Video autoplay blocked:",
                error
            );


            cinematicPlaying = false;


            /*
             * Karena video gagal mulai,
             * musik dikembalikan.
             */

            resumeMusic();

        });

}


/* =========================================================
   17. CINEMATIC OBSERVER
   ========================================================= */

if (cinematic) {

    const cinematicObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting &&
                            entry.intersectionRatio >= 0.5
                        ) {

                            startCinematic();

                        }

                    }
                );

            },
            {
                threshold: [0.5]
            }
        );


    cinematicObserver.observe(
        cinematic
    );

}


/* =========================================================
   18. VIDEO ENDED
   ========================================================= */

if (cinematicVideo) {

    cinematicVideo.addEventListener(
        "ended",
        () => {

            cinematicPlaying = false;


            /*
             * Hapus efek video
             */

            const wrapper =
                cinematicVideo
                    .closest(
                        ".cinematic-video-wrapper"
                    );


            if (wrapper) {

                wrapper.classList
                    .remove("video-light");

            }


            /*
             * KEMBALIKAN MUSIK
             */

            resumeMusic();

        }
    );

}


/* =========================================================
   19. RESUME MUSIC
   ========================================================= */

function resumeMusic() {

    if (!backgroundMusic) {
        return;
    }


    /*
     * Pastikan posisi musik
     * tetap pada posisi sebelum video.
     */

    backgroundMusic.currentTime =
        savedMusicTime;


    backgroundMusic
        .play()
        .then(() => {

            musicPlaying = true;

            updateMusicButton();

        })
        .catch((error) => {

            console.log(
                "Music resume blocked:",
                error
            );

            musicPlaying = false;

            updateMusicButton();

        });

}


/* =========================================================
   20. REPLAY EXPERIENCE
   ========================================================= */

function resetExperience() {

    cinematicStarted = false;
    cinematicPlaying = false;

    savedMusicTime = 0;


    /*
     * Reset video
     */

    if (cinematicVideo) {

        cinematicVideo.pause();

        cinematicVideo.currentTime = 0;

    }


    /*
     * Reset music
     */

    if (backgroundMusic) {

        backgroundMusic.pause();

        backgroundMusic.currentTime = 0;

        musicPlaying = false;

    }


    /*
     * Hide main content
     */

    if (mainContent) {

        mainContent.classList.remove(
            "active"
        );

        mainContent.style.display =
            "none";

    }


    /*
     * Hide music player
     */

    if (musicPlayer) {

        musicPlayer.classList.remove(
            "active"
        );

    }


    /*
     * Reset revealed elements
     */

    document
        .querySelectorAll(
            ".reveal"
        )
        .forEach(
            (element) => {

                element.classList
                    .remove("reveal");

            }
        );


    /*
     * Show opening
     */

    if (opening) {

        opening.classList.remove(
            "hidden"
        );

    }


    /*
     * Scroll top
     */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    updateMusicButton();

}


if (replayButton) {

    replayButton.addEventListener(
        "click",
        resetExperience
    );

}


/* =========================================================
   21. REPLY FORM
   ========================================================= */

if (replyForm) {

    replyForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "replyName"
                    )
                    ?.value
                    .trim();


            const message =
                document
                    .getElementById(
                        "replyMessage"
                    )
                    ?.value
                    .trim();


            if (!message) {

                if (replyStatus) {

                    replyStatus.textContent =
                        "Tulis pesanmu terlebih dahulu.";

                }

                return;

            }


            /*
             * BELUM DIKIRIM KE SERVER.
             *
             * Nanti bagian ini kita sambungkan
             * ke layanan form/database.
             */

            console.log(
                "Reply:",
                {
                    name: name || "Tanpa nama",
                    message: message
                }
            );


            if (replyStatus) {

                replyStatus.textContent =
                    "Pesanmu sudah siap dikirim. " +
                    "Fitur penyimpanan akan kita hubungkan " +
                    "di tahap berikutnya.";

            }

        }
    );

}


/* =========================================================
   22. CLICK HEART EFFECT
   ========================================================= */

document.addEventListener(
    "click",
    (event) => {

        /*
         * Jangan membuat heart ketika
         * klik pada input atau textarea.
         */

        if (
            event.target.closest(
                "input, textarea, button, video"
            )
        ) {

            return;

        }


        const heart =
            document.createElement(
                "div"
            );


        heart.className =
            "click-heart";


        heart.textContent =
            "🤍";


        heart.style.left =
            event.clientX + "px";


        heart.style.top =
            event.clientY + "px";


        document.body.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 900);

    }
);


/* =========================================================
   23. PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        /*
         * Tidak mengubah posisi musik.
         * Browser sendiri yang menangani
         * playback ketika tab tidak aktif.
         */

        updateMusicButton();

    }
);


/* =========================================================
   24. SAFETY CHECK
   ========================================================= */

window.addEventListener(
    "error",
    (event) => {

        console.log(
            "Website error:",
            event.message
        );

    }
);
```
