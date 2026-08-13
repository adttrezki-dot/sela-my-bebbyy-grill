/* =====================================================
   SELA — MY BEBBY GRILL
   CLEAN SCRIPT FINAL
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


/* MUSIC */

const backgroundMusic =
document.getElementById("backgroundMusic");

const musicPlayer =
document.getElementById("musicPlayer");

const musicButton =
document.getElementById("musicButton");


/* PARTICLES */

const particles =
document.getElementById("particles");


/* CINEMATIC */

const cinematic =
document.getElementById("cinematic");

const cinematicVideo =
document.getElementById("cinematicVideo");

const videoTimer =
document.getElementById("videoTimer");

const alwaysLove =
document.querySelector(".always-love");



/* =====================================================
   STATE
===================================================== */


let musicPlaying = false;

let musicStarted = false;

let cinematicPlayed = false;

let cinematicObserverActive = false;



/* =====================================================
   BASIC HELPERS
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



    let count = 3;



    if(countdownNumber){

        countdownNumber.textContent = count;

    }



    const timer = setInterval(()=>{


        count--;



        if(countdownNumber){

            countdownNumber.textContent = count;

        }



        if(count <= 0){


            clearInterval(timer);



            hide(countdown);


            show(mainContent);


            show(musicPlayer);



            startMusic();



            window.scrollTo({

                top:0,

                behavior:"smooth"

            });



            revealOnScroll();



        }



    },1000);



}





/* =====================================================
   OPEN BUTTON
===================================================== */


if(openButton){


    openButton.addEventListener(
        "click",
        ()=>{


            startExperience();


        }
    );


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


        .catch(error=>{


            console.log(
                "Music waiting:",
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



    }

    else{


        backgroundMusic.pause();


        musicPlaying = false;


        updateMusicButton();


    }


}




function updateMusicButton(){


    if(!musicButton){

        return;

    }



    musicButton.textContent =
    musicPlaying
    ?
    "⏸"
    :
    "▶";


}




if(musicButton){


    musicButton.addEventListener(
        "click",
        toggleMusic
    );


}
/* =====================================================
   PARTICLES SYSTEM
===================================================== */


const particleIcons = [

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



    const item =
    document.createElement("div");



    item.className =
 "particle floating-heart";


    item.textContent =
    particleIcons[
        Math.floor(
            Math.random()
            *
            particleIcons.length
        )
    ];



    item.style.left =
    Math.random()*100 + "%";



    item.style.animationDuration =
    (5 + Math.random()*6)
    +
    "s";



    item.style.fontSize =
    (12 + Math.random()*20)
    +
    "px";



    particles.appendChild(item);



    setTimeout(()=>{


        item.remove();


    },12000);



}





function startParticles(){


    setInterval(()=>{


        createParticle();


    },500);



}



if(particles){

    startParticles();

}



/* =====================================================
   SCROLL REVEAL
===================================================== */


function revealOnScroll(){


    const elements =
    document.querySelectorAll(
        ".memory-card, .letter-container, .collage-item, .cinematic-content, .cinematic-video-wrapper, .ending-content, .final-love-content"
    );



    const observer =
    new IntersectionObserver(

        entries=>{


            entries.forEach(entry=>{


                if(entry.isIntersecting){


                    entry.target.classList.add(
                        "show"
                    );


                }


            });


        },

        {

            threshold:0.2

        }

    );



    elements.forEach(element=>{


        observer.observe(element);


    });


}



document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        revealOnScroll();


    }
);





/* =====================================================
   CLICK HEART EFFECT
===================================================== */


document.addEventListener(
    "click",
    (event)=>{


        const heart =
        document.createElement("div");



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


        },1000);



    }
);





/* =====================================================
   PHOTO TILT DESKTOP
===================================================== */


const memoryCards =
document.querySelectorAll(
    ".memory-card"
);



memoryCards.forEach(card=>{


    card.addEventListener(
        "mousemove",
        (e)=>{


            if(window.innerWidth < 768){

                return;

            }



            const rect =
            card.getBoundingClientRect();



            const x =
            e.clientX - rect.left;



            const y =
            e.clientY - rect.top;



            const rotateY =
            ((x / rect.width)-0.5)
            * 10;



            const rotateX =
            ((y / rect.height)-0.5)
            * -10;



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
   CINEMATIC SYSTEM
===================================================== */


function fadeMusic(
    target,
    duration
){


    if(!backgroundMusic){

        return;

    }



    const start =
    backgroundMusic.volume;



    const step =
    50;



    const change =
    (target-start)
    /
    (duration/step);



    const fade =
    setInterval(()=>{


        backgroundMusic.volume += change;



        if(
            (change < 0 &&
            backgroundMusic.volume <= target)

            ||

            (change > 0 &&
            backgroundMusic.volume >= target)

        ){


            backgroundMusic.volume =
            target;



            clearInterval(fade);


        }



    },step);



}
/* =====================================================
   CINEMATIC VIDEO SYSTEM
===================================================== */


function startCinematic(){


    if(!cinematicVideo){

        return;

    }



    if(cinematicPlayed){

        return;

    }



    cinematicPlayed = true;



    if(backgroundMusic){


        fadeMusic(
            0.,
            1500
        );


    }



    cinematicVideo.currentTime = 0;


    cinematicVideo.volume = 0.7;



    startVideoCountdown();



}





function startVideoCountdown(){


    if(!videoTimer){


        playVideo();


        return;


    }



    let count = 3;



    videoTimer.textContent =
    count;



    const timer =
    setInterval(()=>{


        count--;



        if(videoTimer){

            videoTimer.textContent =
            count;

        }



        if(count <= 0){


            clearInterval(timer);



            videoTimer.style.display =
            "none";



            playVideo();



        }



    },1000);



}




function playVideo(){


    if(!cinematicVideo){

        return;

    }


    cinematicVideo.style.display = "block";


    cinematicVideo.muted = false;


    cinematicVideo.volume = 0.7;


    cinematicVideo.play()

    .then(()=>{


        console.log(
            "Video playing"
        );


    })

    .catch(error=>{


        console.log(
            "Video gagal:",
            error
        );


    });


}





if(cinematic){


    const cinematicObserver =
    new IntersectionObserver(

        entries=>{


            entries.forEach(entry=>{


                if(entry.isIntersecting){


                    startCinematic();



                }


            });


        },

        {

            threshold:0.4

        }

    );



    cinematicObserver.observe(
        cinematic
    );


}





/* VIDEO FINISH */


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


                fadeMusic(
                    0.7,
                    2500
                );


            }



        }

    );


}





/* =====================================================
   REPLAY EXPERIENCE
===================================================== */


function resetExperience(){



    cinematicPlayed =
    false;



    if(cinematicVideo){


        cinematicVideo.pause();


        cinematicVideo.currentTime =
        0;


    }



    if(backgroundMusic){


        backgroundMusic.pause();


        backgroundMusic.currentTime =
        0;


        backgroundMusic.volume =
        0.7;


        musicStarted =
        false;


        musicPlaying =
        false;



        updateMusicButton();



    }




    hide(mainContent);


    show(opening);



    window.scrollTo({

        top:0,

        behavior:"instant"

    });



}




if(replayButton){


    replayButton.addEventListener(
        "click",
        ()=>{


            resetExperience();


        }

    );


}




if(finalReplayButton){


    finalReplayButton.addEventListener(
        "click",
        ()=>{


            resetExperience();


        }

    );


}




/* =====================================================
   INITIAL SETUP
===================================================== */


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        hide(mainContent);


        hide(countdown);



        if(backgroundMusic){


            backgroundMusic.volume =
            0.7;


        }



    }
);
