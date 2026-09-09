/* =====================================================
   PAGE SYSTEM
===================================================== */

const pages =
    document.querySelectorAll(".page");

const buttons =
    document.querySelectorAll(".next-button");

let currentPage = 0;


/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");


function startMusic() {

    if (!music) {
        return;
    }

    const playPromise =
        music.play();

    if (playPromise !== undefined) {

        playPromise
            .then(function() {

                if (musicButton) {
                    musicButton.textContent =
                        "♫";
                }

            })
            .catch(function() {

                console.log(
                    "Music waiting for user interaction."
                );

            });

    }

}


/* =====================================================
   MUSIC BUTTON
===================================================== */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            event.stopPropagation();


            if (music.paused) {

                music.play()
                    .then(function() {

                        musicButton.textContent =
                            "♫";

                    })
                    .catch(function() {

                        console.log(
                            "Music could not play."
                        );

                    });

            } else {

                music.pause();

                musicButton.textContent =
                    "♪";

            }

        }
    );

}


/* =====================================================
   SHOW PAGE
===================================================== */

function showPage(number) {

    pages.forEach(
        function(page, index) {

            if (index === number) {

                page.classList.add(
                    "active"
                );

            } else {

                page.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =====================================================
   NORMAL BUTTONS
===================================================== */

buttons.forEach(
    function(button) {

        /*
           Skip the special buttons.
        */

        if (
            button.id === "yesButton" ||
            button.id === "noButton" ||
            button.id === "finalButton"
        ) {
            return;
        }


        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                startMusic();


                if (
                    currentPage <
                    pages.length - 1
                ) {

                    currentPage++;

                    showPage(
                        currentPage
                    );

                }

            }
        );

    }
);


/* =====================================================
   YES / NO ELEMENTS
===================================================== */

const noButton =
    document.getElementById(
        "noButton"
    );

const yesButton =
    document.getElementById(
        "yesButton"
    );

const answerArea =
    document.getElementById(
        "answerArea"
    );

const yesResult =
    document.getElementById(
        "yesResult"
    );

const questionLabel =
    document.getElementById(
        "questionLabel"
    );

const questionText =
    document.getElementById(
        "questionText"
    );

const questionSubtitle =
    document.getElementById(
        "questionSubtitle"
    );

const questionContent =
    document.querySelector(
        ".question-page .content"
    );


/* =====================================================
   MOVE NO BUTTON
===================================================== */

function moveNoButton() {

    if (!noButton || !answerArea) {
        return;
    }


    const areaWidth =
        answerArea.clientWidth;

    const areaHeight =
        answerArea.clientHeight;


    const buttonWidth =
        noButton.offsetWidth;

    const buttonHeight =
        noButton.offsetHeight;


    /*
       Keep the button completely
       inside the answer area.
    */

    const maxX =
        Math.max(
            5,
            areaWidth - buttonWidth - 5
        );

    const maxY =
        Math.max(
            5,
            areaHeight - buttonHeight - 5
        );


    const randomX =
        5 +
        Math.random() *
        (maxX - 5);

    const randomY =
        5 +
        Math.random() *
        (maxY - 5);


    noButton.style.left =
        randomX + "px";

    noButton.style.top =
        randomY + "px";

    noButton.style.transform =
        "none";

}


/* =====================================================
   DESKTOP NO BUTTON
===================================================== */

if (noButton) {

    noButton.addEventListener(
        "mouseenter",
        function() {

            moveNoButton();

        }
    );


    /*
       Touchscreen:
       move immediately when touched.
    */

    noButton.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            moveNoButton();

        },
        {
            passive: false
        }
    );


    /*
       Pointer devices.
    */

    noButton.addEventListener(
        "pointerdown",
        function(event) {

            if (
                event.pointerType ===
                "touch"
            ) {

                event.preventDefault();

            }

            moveNoButton();

        }
    );


    /*
       If somehow clicked,
       immediately move again.
    */

    noButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            moveNoButton();

        }
    );

}


/* =====================================================
   YES BUTTON
===================================================== */

if (yesButton) {

    yesButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            startMusic();


            /*
               Completely remove the
               question from the screen.
            */

            if (questionLabel) {

                questionLabel.style.display =
                    "none";

            }


            if (questionText) {

                questionText.style.display =
                    "none";

            }


            if (questionSubtitle) {

                questionSubtitle.style.display =
                    "none";

            }


            if (answerArea) {

                answerArea.style.display =
                    "none";

            }


            /*
               Center the result.
            */

            if (questionContent) {

                questionContent.classList.add(
                    "result-active"
                );

            }


            /*
               Show result.
            */

            if (yesResult) {

                yesResult.classList.add(
                    "show"
                );

            }

        }
    );

}


/* =====================================================
   FINAL BUTTON
===================================================== */

const finalButton =
    document.getElementById(
        "finalButton"
    );


if (finalButton) {

    finalButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            currentPage = 4;

            showPage(
                currentPage
            );

        }
    );

}


/* =====================================================
   PREVENT LONG PRESS MENU
===================================================== */

document.addEventListener(
    "contextmenu",
    function(event) {

        event.preventDefault();

    }
);


/* =====================================================
   PREVENT DOUBLE-TAP ZOOM ON BUTTONS
===================================================== */

let lastTouchEnd = 0;

document.addEventListener(
    "touchend",
    function(event) {

        const now =
            Date.now();

        if (
            now - lastTouchEnd <= 300
        ) {

            event.preventDefault();

        }

        lastTouchEnd = now;

    },
    {
        passive: false
    }
);
