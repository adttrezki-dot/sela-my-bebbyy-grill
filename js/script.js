/* =====================================================
   SELA — MY BEBBY GRILL
   CLEAN SCRIPT VERSION
   PART 1/3
===================================================== */


/* =====================================================
   ELEMENT SELECTOR
===================================================== */

const opening = document.getElementById("opening");
const countdown = document.getElementById("countdown");
const mainContent = document.getElementById("mainContent");

const openButton = document.getElementById("openButton");
const replayButton = document.getElementById("replayButton");
const finalReplayButton = document.getElementById("finalReplayButton");

const countdownNumber = document.getElementById("countdownNumber");

const backgroundMusic = document.getElementById("backgroundMusic");
const musicPlayer = document.getElementById("musicPlayer");
const musicButton = document.getElementById("musicButton");


/* =====================================================
   STATE
===================================================== */

let musicStarted = false;
let musicPlaying = false;


/* =====================================================
   HELPER
===================================================== */

function show(element){

    if(element){
        element.classList.remove("hidden");
    }

}


function hide(element){

    if(element){
        element.classList.add("hidden");
    }

}


/* =====================================================
   OPENING EXPERIENCE
===================================================== */

function startExperience(){

    hide(opening);

    show(countdown);


    let number = 3;

    if(countdownNumber){

        countdownNumber.textContent = number;

    }


    const timer = setInterval(()=>{


        number--;


        if(countdownNumber){

            countdownNumber.textContent = number;

        }


        if(number <= 0){

            clearInterval(timer);


            hide(countdown);

            show(mainContent);

            show(musicPlayer);


            startMusic();

            revealOnLoad();


            window.scrollTo({
                top:0,
                behavior:"smooth"
            });


        }


    },1000);


}



/* =====================================================
   OPEN BUTTON
===================================================== */

if(openButton){


    openButton.addEventListener("click",()=>{


        startExperience();


    });


}



/* =====================================================
   MUSIC SYSTEM
===================================================== */


function startMusic(){


    if(!backgroundMusic){
        return;
    }


    if(!musicStarted){

        backgroundMusic.volume = 0.7;

        backgroundMusic.play()
        .then(()=>{

            musicStarted = true;

            musicPlaying = true;

            updateMusicButton();


        })
        .catch((error)=>{

            console.log(
                "Music waiting for interaction:",
                error
            );


        });


    }


}



function toggleMusic(){


    if(!backgroundMusic){
        return;
    }


    if(backgroundMusic.paused){


        backgroundMusic.play()
        .then(()=>{

            musicPlaying = true;

            updateMusicButton();


        });



    }else{


        backgroundMusic.pause();

        musicPlaying = false;

        updateMusicButton();


    }


}



function updateMusicButton(){


    if(!musicButton){
        return;
    }


    if(musicPlaying){

        musicButton.textContent = "⏸";

    }else{

        musicButton.textContent = "▶";

    }


}



if(musicButton){


    musicButton.addEventListener(
        "click",
        toggleMusic
    );


}



/* =====================================================
   REPLAY BASIC
===================================================== */


function replayExperience(){


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


    hide(mainContent);


    setTimeout(()=>{


        startExperience();


    },800);


}



if(replayButton){


    replayButton.addEventListener(
        "click",
        replayExperience
    );


}


if(finalReplayButton){


    finalReplayButton.addEventListener(
        "click",
        replayExperience
    );


}
/* =====================================================
   PARTICLE HEARTS & FLOWERS
   PART 2/3
===================================================== */


const particles = document.getElementById("particles");


const particleSymbols = [
    "💜",
    "💗",
    "💕",
    "🌸",
    "✨"
];



function createParticle(){


    if(!particles){
        return;
    }


    const particle = document.createElement("span");


    particle.className = "floating-particle";


    particle.innerHTML =
        particleSymbols[
            Math.floor(
                Math.random() *
                particleSymbols.length
            )
        ];



    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.animationDuration =
        (5 + Math.random() * 5) + "s";



    particle.style.fontSize =
        (15 + Math.random() * 20) + "px";



    particles.appendChild(particle);



    setTimeout(()=>{

        particle.remove();

    },10000);



}



setInterval(
    createParticle,
    700
);





/* =====================================================
   SCROLL REVEAL SYSTEM
===================================================== */


const revealElements = document.querySelectorAll(
    `
    .memory-card,
    .intro-section,
    .cinematic-section,
    .letter-container,
    .collage-section,
    .ending-content,
    .final-love-content
    `
);



function revealOnScroll(){


    revealElements.forEach(element=>{


        const position =
            element.getBoundingClientRect()
            .top;


        const trigger =
            window.innerHeight * 0.85;



        if(position < trigger){

            element.classList.add(
                "show"
            );

        }



    });


}



function revealOnLoad(){


    setTimeout(()=>{

        revealOnScroll();

    },300);


}



window.addEventListener(
    "scroll",
    revealOnScroll
);





/* =====================================================
   CLICK HEART EFFECT
===================================================== */


document.addEventListener(
    "click",
    (event)=>{


        const heart =
            document.createElement("span");



        heart.className =
            "click-heart";


        heart.innerHTML =
            "💜";



        heart.style.left =
            event.clientX + "px";


        heart.style.top =
            event.clientY + "px";



        document.body.appendChild(
            heart
        );



        setTimeout(()=>{


            heart.remove();


        },1200);



    }
);





/* =====================================================
   PHOTO TILT DESKTOP
===================================================== */


const tiltCards =
document.querySelectorAll(
    ".memory-card"
);



tiltCards.forEach(card=>{


    card.addEventListener(
        "mousemove",
        (event)=>{


            if(window.innerWidth < 768){
                return;
            }



            const rect =
            card.getBoundingClientRect();



            const x =
            event.clientX - rect.left;



            const y =
            event.clientY - rect.top;



            const centerX =
            rect.width / 2;



            const centerY =
            rect.height / 2;



            const rotateX =
            (y-centerY) / 20;



            const rotateY =
            (centerX-x) / 20;



            card.style.transform =
            `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.03)
            `;


        }
    );



    card.addEventListener(
        "mouseleave",
        ()=>{


            card.style.transform =
            "";



        }
    );


});
/* =====================================================
   CINEMATIC MEMORY SYSTEM
   PART 3/3
===================================================== */


const cinematic =
document.getElementById("cinematic");


const cinematicVideo =
document.getElementById("cinematicVideo");


const videoTimer =
document.getElementById("videoTimer");


const alwaysLove =
document.querySelector(".always-love");



let cinematicPlayed = false;



/* =====================================================
   MUSIC FADE SYSTEM
===================================================== */


function fadeMusic(targetVolume, duration = 1500){


    if(!backgroundMusic){
        return;
    }


    const startVolume =
        backgroundMusic.volume;


    const difference =
        targetVolume - startVolume;


    const steps = 30;


    const stepTime =
        duration / steps;


    let currentStep = 0;



    const fade =
    setInterval(()=>{


        currentStep++;


        backgroundMusic.volume =
        startVolume +
        (
            difference *
            (currentStep / steps)
        );



        if(currentStep >= steps){

            clearInterval(fade);

            backgroundMusic.volume =
            targetVolume;

        }



    }, stepTime);


}





/* =====================================================
   VIDEO COUNTDOWN
===================================================== */


function startVideoCountdown(){


    return new Promise(resolve=>{


        let count = 3;


        if(videoTimer){

            videoTimer.textContent =
            count;

        }



        const timer =
        setInterval(()=>{


            count--;



            if(videoTimer){

                videoTimer.textContent =
                count;

            }



            if(count <= 0){


                clearInterval(timer);


                resolve();



            }



        },1000);



    });



}





/* =====================================================
   START CINEMATIC
===================================================== */


async function playCinematic(){



    if(cinematicPlayed){
        return;
    }



    cinematicPlayed = true;



    await startVideoCountdown();



    if(backgroundMusic){


        fadeMusic(
            0.3,
            2000
        );


    }




    if(cinematicVideo){


        cinematicVideo.muted = true;
        cinematicVideo.volume =
        0.7;



        cinematicVideo.play()
        .catch(error=>{

            console.log(
                "Video autoplay blocked:",
                error
            );

        });



    }



}





/* =====================================================
   OBSERVER CINEMATIC
===================================================== */


if(cinematic){


    const cinematicObserver =
    new IntersectionObserver(
        entries=>{


            entries.forEach(entry=>{


                if(
                    entry.isIntersecting
                ){

                    playCinematic();

                }


            });


        },
        {
            threshold:0.45
        }
    );



    cinematicObserver.observe(
        cinematic
    );



}





/* =====================================================
   VIDEO FINISH
===================================================== */


if(cinematicVideo){


    cinematicVideo.addEventListener(
        "ended",
        ()=>{


            if(alwaysLove){


                alwaysLove.classList.add(
                    "show"
                );


                setTimeout(()=>{


                    alwaysLove.classList.remove(
                        "show"
                    );


                },3000);


            }



            if(backgroundMusic){


                // pastikan musik aktif lagi

                backgroundMusic.volume = 0.3;



                const resumeMusic = async ()=>{


                    try{


                        await backgroundMusic.play();



                        fadeMusic(
                            0.7,
                            2500
                        );


                    }
                    catch(error){


                        console.log(
                            "Music resume failed:",
                            error
                        );


                    }


                };



                resumeMusic();



            }


        }
    );


}

/* =====================================================
   INITIAL CHECK
===================================================== */


window.addEventListener(
    "load",
    ()=>{


        revealOnScroll();



    }
);
