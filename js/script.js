```javascript
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

let countdownRunning = false;

let musicPlaying = false;
let musicStarted = false;

let cinematicStarted = false;
let cinematicPlaying = false;

let savedMusicTime = 0;
let musicWasPlayingBeforeVideo = false;

let revealObserver = null;
let cinematicObserver = null;


/* =========================================================
   03. INITIAL STATE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
     * Opening tampil.
     */
    if (opening) {
        opening.classList.remove("hidden");
        opening.style.display = "";
    }


    /*
     * Countdown disembunyikan.
     */
    if (countdown) {
        countdown.classList.add("hidden");
    }


    /*
     * Konten utama disembunyikan.
     */
    if (mainContent) {
        mainContent.classList.add("hidden");
        mainContent.classList.remove("active");
    }


    /*
     * Music player disembunyikan.
     */
    if (musicPlayer) {
        musicPlayer.classList.add("hidden");
        musicPlayer.classList.remove("active");
    }


    /*
     * Musik.
     */
    if (backgroundMusic) {
        backgroundMusic.volume = 0.7;
        backgroundMusic.currentTime = 0;
    }


    /*
     * Video.
     */
    if (cinematicVideo) {
        cinematicVideo.volume = 0.7;
        cinematicVideo.currentTime = 0;
    }


    updateMusicButton();

    createParticle();

    setupCinematicObserver();

});


/* =========================================================
   04. OPENING EXPERIENCE
   ========================================================= */

function startExperience() {

    /*
     * Jangan menjalankan countdown dua kali.
     */
    if (countdownRunning) {
        return;
    }


    countdownRunning = true;


    /*
     * Sembunyikan opening.
     */
    if (opening) {
        opening.classList.add("hidden");
    }


    /*
     * Tampilkan countdown.
     */
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

    countdownRunning = false;


    /*
     * Sembunyikan countdown.
     */
    if (countdown) {
        countdown.classList.add("hidden");
    }


    /*
     * Tampilkan main content.
     *
     * class hidden DIHAPUS.
     * Ini penting karena CSS memakai !important.
     */
    if (mainContent) {

        mainContent.classList.remove("hidden");

        mainContent.classList.add("active");

        mainContent.style.display = "";

    }


    /*
     * Tampilkan music player.
     */
    if (musicPlayer) {

        musicPlayer.classList.remove("hidden");

        musicPlayer.classList.add("active");

        musicPlayer.style.display = "";

    }


    /*
     * Mulai musik.
     */
    startMusic();


    /*
     * Kembali ke bagian paling atas.
     */
    window.scrollTo({
        top: 0,
        behavior: "auto"
    });


    /*
     * Aktifkan scroll reveal.
     */
    observeRevealElements();

}


/* =========================================================
   06. OPEN BUTTON
   ========================================================= */

if (openButton) {

    openButton.addEventListener("click", (event) => {

        event.preventDefault();

        startExperience();

    });

}


/* =========================================================
   07. MUSIC SYSTEM
   ========================================================= */

function startMusic() {

    if (!backgroundMusic) {
        return;
    }


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
                 * Autoplay dapat ditolak browser.
                 * Website tetap berjalan.
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
   08. MUSIC TOGGLE
   ========================================================= */

function toggleMusic() {

    if (!backgroundMusic) {
        return;
    }


    if (backgroundMusic.paused) {

        backgroundMusic
            .play()
            .then(() => {

                musicStarted = true;
                musicPlaying = true;

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
   09. MUSIC UI
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
   10. MUSIC EVENTS
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


    backgroundMusic.addEventListener(
        "ended",
        () => {

            musicPlaying = false;

            updateMusicButton();

        }
    );

}


/* =========================================================
   11. PARTICLES
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


    particle.className = "particle";


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


/*
 * Partikel berjalan terus.
 */
setInterval(
    createParticle,
    750
);


/* =========================================================
   12. SCROLL REVEAL
   ========================================================= */

function observeRevealElements() {

    /*
     * Observer lama tidak perlu dibuat ulang.
     */
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


    /*
     * Browser lama yang tidak mendukung
     * IntersectionObserver tidak boleh
     * membuat website berhenti.
     */
    if (!("IntersectionObserver" in window)) {

        elements.forEach((element) => {

            element.classList.add("reveal");

        });

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
   13. CINEMATIC OBSERVER
   ========================================================= */

function setupCinematicObserver() {

    if (
        !cinematic ||
        !cinematicVideo
    ) {
        return;
    }


    if (!("IntersectionObserver" in window)) {
        return;
    }


    cinematicObserver =
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
   14. START CINEMATIC
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
     * Simpan posisi musik.
     */
    if (backgroundMusic) {

        savedMusicTime =
            backgroundMusic.currentTime;

        musicWasPlayingBeforeVideo =
            !backgroundMusic.paused;


        /*
         * Hentikan musik ketika video mulai.
         */
        backgroundMusic.pause();

        musicPlaying = false;

        updateMusicButton();

    }


    /*
     * Reset video.
     */
    cinematicVideo.pause();

    cinematicVideo.currentTime = 0;

    cinematicVideo.volume = 0.7;


    /*
     * Countdown video.
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


    videoTimer.classList.remove("hidden");

    videoTimer.style.display = "flex";

    videoTimer.textContent = number;


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

                    videoTimer.classList.add(
                        "hidden"
                    );

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


    const playPromise =
        cinematicVideo.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                const wrapper =
                    cinematicVideo.closest(
                        ".cinematic-video-wrapper"
                    );


                if (wrapper) {

                    wrapper.classList.add(
                        "video-light"
                    );

                }

            })
            .catch((error) => {

                console.log(
                    "Video autoplay blocked:",
                    error
                );


                cinematicPlaying = false;


                /*
                 * Video gagal diputar.
                 * Musik dikembalikan.
                 */
                cinematicStarted = false;

                resumeMusic();

            });

    }

}


/* =========================================================
   17. VIDEO EVENTS
   ========================================================= */

if (cinematicVideo) {

    /*
     * Video mulai.
     */
    cinematicVideo.addEventListener(
        "play",
        () => {

            cinematicPlaying = true;

        }
    );


    /*
     * Video pause.
     */
    cinematicVideo.addEventListener(
        "pause",
        () => {

            /*
             * Jangan dianggap selesai.
             * Event ended ditangani terpisah.
             */

            if (!cinematicVideo.ended) {

                cinematicPlaying = false;

            }

        }
    );


    /*
     * Video selesai.
     */
    cinematicVideo.addEventListener(
        "ended",
        () => {

            cinematicPlaying = false;


            const wrapper =
                cinematicVideo.closest(
                    ".cinematic-video-wrapper"
                );


            if (wrapper) {

                wrapper.classList.remove(
                    "video-light"
                );

            }


            /*
             * Musik kembali dari posisi
             * sebelum video dimulai.
             */
            resumeMusic();

        }
    );

}


/* =========================================================
   18. RESUME MUSIC
   ========================================================= */

function resumeMusic() {

    if (!backgroundMusic) {
        return;
    }


    /*
     * Kembalikan posisi musik.
     */
    try {

        backgroundMusic.currentTime =
            savedMusicTime;

    } catch (error) {

        console.log(
            "Unable to restore music position:",
            error
        );

    }


    /*
     * Kalau musik memang sedang berjalan
     * sebelum video, lanjutkan.
     */
    if (!musicWasPlayingBeforeVideo) {

        musicPlaying = false;

        updateMusicButton();

        return;

    }


    backgroundMusic
        .play()
        .then(() => {

            musicPlaying = true;

            musicStarted = true;

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
   19. REPLAY EXPERIENCE
   ========================================================= */

function resetExperience() {

    countdownRunning = false;

    cinematicStarted = false;
    cinematicPlaying = false;

    savedMusicTime = 0;
    musicWasPlayingBeforeVideo = false;


    /*
     * Reset video.
     */
    if (cinematicVideo) {

        cinematicVideo.pause();

        cinematicVideo.currentTime = 0;

        cinematicVideo.volume = 0.7;

    }


    /*
     * Hapus efek video.
     */
    if (cinematicVideo) {

        const wrapper =
            cinematicVideo.closest(
                ".cinematic-video-wrapper"
            );


        if (wrapper) {

            wrapper.classList.remove(
                "video-light"
            );

        }

    }


    /*
     * Reset music.
     */
    if (backgroundMusic) {

        backgroundMusic.pause();

        backgroundMusic.currentTime = 0;

        musicPlaying = false;

    }


    /*
     * Sembunyikan main content.
     */
    if (mainContent) {

        mainContent.classList.remove(
            "active"
        );

        mainContent.classList.add(
            "hidden"
        );

    }


    /*
     * Sembunyikan music player.
     */
    if (musicPlayer) {

        musicPlayer.classList.remove(
            "active"
        );

        musicPlayer.classList.add(
            "hidden"
        );

    }


    /*
     * Reset semua reveal.
     */
    document
        .querySelectorAll(".reveal")
        .forEach((element) => {

            element.classList.remove(
                "reveal"
            );

        });


    /*
     * Reset video timer.
     */
    if (videoTimer) {

        videoTimer.classList.add(
            "hidden"
        );

    }


    /*
     * Tampilkan opening.
     */
    if (opening) {

        opening.classList.remove(
            "hidden"
        );

    }


    /*
     * Reset countdown.
     */
    if (countdownNumber) {

        countdownNumber.textContent = "3";

    }


    if (countdown) {

        countdown.classList.add(
            "hidden"
        );

    }


    /*
     * Kembali ke atas.
     */
    window.scrollTo({
        top: 0,
        behavior: "auto"
    });


    updateMusicButton();

}


if (replayButton) {

    replayButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            resetExperience();

        }
    );

}


/* =========================================================
   20. REPLY FORM
   ========================================================= */

if (replyForm) {

    replyForm.addEventListener(
        "submit",
        (event) => {

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


            /*
             * Pesan kosong.
             */
            if (!message) {

                if (replyStatus) {

                    replyStatus.textContent =
                        "Tulis pesanmu terlebih dahulu.";

                }

                return;

            }


            /*
             * Untuk sekarang belum dikirim
             * ke server/database.
             *
             * Data hanya ditampilkan di console.
             */
            console.log(
                "Reply:",
                {
                    name:
                        name || "Tanpa nama",

                    message:
                        message
                }
            );


            if (replyStatus) {

                replyStatus.textContent =
                    "Pesanmu sudah diterima di halaman ini. " +
                    "Penyimpanan online akan kita sambungkan " +
                    "setelah bagian utama website sudah stabil.";

            }


            /*
             * Bersihkan textarea.
             */
            if (messageInput) {

                messageInput.value = "";

            }

        }
    );

}


/* =========================================================
   21. CLICK HEART EFFECT
   ========================================================= */

document.addEventListener(
    "click",
    (event) => {

        /*
         * Jangan membuat heart ketika
         * klik input, textarea, button atau video.
         */
        if (
            event.target.closest(
                "input, textarea, button, video"
            )
        ) {

            return;

        }


        const heart =
            document.createElement("div");


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
   22. PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        updateMusicButton();

    }
);


/* =========================================================
   23. ERROR LOGGER
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


/* =========================================================
   24. PROMISE ERROR LOGGER
   ========================================================= */

window.addEventListener(
    "unhandledrejection",
    (event) => {

        console.log(
            "Unhandled promise:",
            event.reason
        );

    }
);
```
