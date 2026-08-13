/* =====================================================
   SELA — MY BEBBY GRILL
   STABLE SCRIPT VERSION
   PART 1/3
===================================================== */


/* ===============================
   SELECT ELEMENT
================================ */

const opening = document.getElementById("opening");
const countdown = document.getElementById("countdown");
const mainContent = document.getElementById("mainContent");

const openButton = document.getElementById("openButton");

const countdownNumber =
document.getElementById("countdownNumber");


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

const alwaysLove =
document.querySelector(".always-love");


const replayButton =
document.getElementById("replayButton");

const finalReplayButton =
document.getElementById("finalReplayButton");



/* ===============================
   STATE
================================ */

let musicStarted = false;

let musicPlaying = false;

let cinematicStarted = false;

let videoCountdownRunning = false;




/* ===============================
   HELPER
================================ */


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





/* ===============================
   OPENING SYSTEM
================================ */


function startExperience(){


    hide(opening);


    show(countdown);



    let number = 3;



    if(countdownNumber){

        countdownNumber.textContent = number;

    }



    const timer =
    setInterval(()=>{


        number--;



        if(countdownNumber){

            countdownNumber.textContent =
            number;

        }



        if(number <= 0){


            clearInterval(timer);



            hide(countdown);



            show(mainContent);



            show(musicPlayer);



            startMusic();



            window.scrollTo({

                top:0,

                behavior:"smooth"

            });


        }



    },1000);



}




if(openButton){


    openButton.addEventListener(
        "click",
        ()=>{


            startExperience();


        }
    );


}





/* ===============================
   INITIAL STATE
================================ */


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        hide(countdown);


        hide(mainContent);



        if(backgroundMusic){


            backgroundMusic.volume =
            0.7;


        }



    }
);
/* =====================================================
   MUSIC SYSTEM
===================================================== */


function startMusic(){


    if(!backgroundMusic){

        return;

    }



    if(musicStarted){

        return;

    }



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




if(musicButton){


    musicButton.addEventListener(
        "click",
        toggleMusic
    );


}





/* =====================================================
   PARTICLE SYSTEM
===================================================== */


const particleList = [

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



    const particle =
    document.createElement("div");



    particle.className =
    "floating-particle";



    particle.innerHTML =
    particleList[
        Math.floor(
            Math.random()
            *
            particleList.length
        )
    ];



    particle.style.left =
    Math.random()*100 + "%";



    particle.style.fontSize =
    (15 + Math.random()*20)
    +
    "px";



    particle.style.animationDuration =
    (5 + Math.random()*5)
    +
    "s";



    particles.appendChild(
        particle
    );



    setTimeout(()=>{


        particle.remove();


    },10000);



}





function startParticles(){


    setInterval(()=>{


        createParticle();


    },600);



}




if(particles){


    startParticles();


}






/* =====================================================
   SCROLL REVEAL
===================================================== */


function startReveal(){


    const targets =
    document.querySelectorAll(

        ".memory-card," +
        ".collage-item," +
        ".letter-container," +
        ".cinematic-content," +
        ".cinematic-video-wrapper," +
        ".ending-content," +
        ".final-love-content"

    );



    const observer =
    new IntersectionObserver(

        entries=>{


            entries.forEach(
                entry=>{


                    if(entry.isIntersecting){


                        entry.target.classList.add(
                            "show"
                        );


                    }


                }
            );


        },

        {

            threshold:0.2

        }

    );



    targets.forEach(
        item=>{


            observer.observe(item);


        }
    );


}



document.addEventListener(
    "DOMContentLoaded",
    startReveal
);





/* =====================================================
   PHOTO TILT DESKTOP
===================================================== */


const cards =
document.querySelectorAll(
    ".memory-card"
);



cards.forEach(card=>{


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



            const rotateY =
            ((x / rect.width)-0.5)
            * 8;



            const rotateX =
            ((y / rect.height)-0.5)
            * -8;



            card.style.transform =
            `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
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
   CINEMATIC VIDEO SYSTEM
===================================================== */


function startCinematic(){


    if(!cinematicVideo){

        return;

    }



    if(cinematicStarted){

        return;

    }



    cinematicStarted = true;



    // turunkan musik ketika video mulai

    if(backgroundMusic){


        backgroundMusic.volume = 0.15;


    }




    cinematicVideo.currentTime = 0;


    cinematicVideo.volume = 0.7;



    runVideoCountdown();


}




function runVideoCountdown(){


    if(videoCountdownRunning){

        return;

    }



    videoCountdownRunning = true;



    if(!videoTimer){


        playCinematicVideo();

        return;


    }



    let count = 3;



    videoTimer.style.display =
    "block";



    videoTimer.textContent =
    count;



    const timer =
    setInterval(()=>{


        count--;



        videoTimer.textContent =
        count;



        if(count <= 0){


            clearInterval(timer);



            videoTimer.style.display =
            "none";



            playCinematicVideo();



        }



    },1000);



}





function playCinematicVideo(){


    if(!cinematicVideo){

        return;

    }



    cinematicVideo.play()

    .then(()=>{


        console.log(
            "Video started"
        );


    })

    .catch(error=>{


        console.log(
            "Video blocked:",
            error
        );


    });



}





if(cinematic){


    const videoObserver =
    new IntersectionObserver(

        entries=>{


            entries.forEach(entry=>{


                if(entry.isIntersecting){


                    startCinematic();


                }


            });



        },

        {

            threshold:0.5

        }

    );



    videoObserver.observe(
        cinematic
    );


}




/* ===============================
   VIDEO END
================================ */


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


                backgroundMusic.volume =
                0.7;



                musicPlaying = true;


                updateMusicButton();


                backgroundMusic.play()

                .catch(error=>{


                    console.log(
                        "Music resume blocked:",
                        error
                    );


                });



            }



        }
    );


}






/* =====================================================
   REPLAY SYSTEM
===================================================== */


function resetExperience(){



    cinematicStarted =
    false;



    videoCountdownRunning =
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

        behavior:"smooth"

    });


}





if(replayButton){


    replayButton.addEventListener(
        "click",
        resetExperience
    );


}




if(finalReplayButton){


    finalReplayButton.addEventListener(
        "click",
        resetExperience
    );


}





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


        },1200);



    }
);
