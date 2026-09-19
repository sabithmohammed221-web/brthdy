/* =====================================================
   PAGE SYSTEM
===================================================== */

const pages = document.querySelectorAll(".page");

const nextButtons =
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
            .then(function () {

                if (musicButton) {
                    musicButton.textContent = "♫";
                }

            })
            .catch(function () {

                /*
                   Some browsers block
                   automatic audio.
                   It will start after
                   a user interaction.
                */

            });

    }

}


/* =====================================================
   MUSIC BUTTON
===================================================== */

if (musicButton && music) {

    musicButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            smallVibration();

            if (music.paused) {

                music.play()
                    .then(function () {

                        musicButton.textContent =
                            "♫";

                    })
                    .catch(function () {

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

    if (
        number < 0 ||
        number >= pages.length
    ) {
        return;
    }

    pages.forEach(
        function (page, index) {

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

    currentPage = number;

}


/* =====================================================
   SMALL VIBRATION
===================================================== */

function smallVibration() {

    if (
        navigator.vibrate
    ) {

        navigator.vibrate(22);

    }

}


/* =====================================================
   NORMAL NEXT BUTTONS
===================================================== */

nextButtons.forEach(
    function (button) {

        /*
           These buttons have their
           own special functions.
        */

        if (
            button.id === "finalButton" ||
            button.id === "yesButton" ||
            button.id === "noButton"
        ) {

            return;

        }


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                smallVibration();

                startMusic();


                /*
                   Go to next slide.
                */

                if (
                    currentPage <
                    pages.length - 1
                ) {

                    showPage(
                        currentPage + 1
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

const questionBox =
    document.getElementById(
        "questionBox"
    );


/* =====================================================
   MOVE NO BUTTON
===================================================== */

function moveNoButton() {

    if (
        !noButton ||
        !answerArea
    ) {

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
       Calculate the maximum
       safe position.
    */

    const maxX =
        Math.max(
            5,
            areaWidth -
            buttonWidth -
            5
        );


    const maxY =
        Math.max(
            5,
            areaHeight -
            buttonHeight -
            5
        );


    /*
       Random position.
    */

    const randomX =
        5 +
        Math.random() *
        Math.max(
            1,
            maxX - 5
        );


    const randomY =
        5 +
        Math.random() *
        Math.max(
            1,
            maxY - 5
        );


    noButton.style.left =
        randomX + "px";

    noButton.style.top =
        randomY + "px";


    /*
       Remove the original
       centered transform.
    */

    noButton.style.transform =
        "none";

}


/* =====================================================
   DESKTOP
===================================================== */

if (noButton) {

    noButton.addEventListener(
        "mouseenter",
        function () {

            moveNoButton();

        }
    );


    /*
       Mouse pointer.
    */

    noButton.addEventListener(
        "pointerenter",
        function (event) {

            if (
                event.pointerType ===
                "mouse"
            ) {

                moveNoButton();

            }

        }
    );


    /*
       Touchscreen.
    */

    noButton.addEventListener(
        "touchstart",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            smallVibration();

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
        function (event) {

            if (
                event.pointerType ===
                "touch"
            ) {

                event.preventDefault();

            }

            smallVibration();

            moveNoButton();

        }
    );


    /*
       If somehow clicked,
       move it immediately.
    */

    noButton.addEventListener(
        "click",
        function (event) {

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
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            smallVibration();

            startMusic();


            /*
               Hide the question.
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


            if (questionBox) {

                questionBox.style.display =
                    "none";

            }


            /*
               Show the YES result.
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
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            smallVibration();

            startMusic();


            /*
               YES result is on slide 8.

               After clicking
               "Two last slides",
               go to slide 9.

               Array index:
               0 = Slide 1
               1 = Slide 2
               2 = Slide 3
               3 = Slide 4
               4 = Slide 5
               5 = Slide 6
               6 = Slide 7
               7 = Slide 8
               8 = Slide 9
               9 = Slide 10
            */

            showPage(8);

        }
    );

}


/* =====================================================
   PREVENT LONG PRESS MENU
===================================================== */

document.addEventListener(
    "contextmenu",
    function (event) {

        event.preventDefault();

    }
);


/* =====================================================
   PREVENT TEXT SELECTION
===================================================== */

document.addEventListener(
    "selectstart",
    function (event) {

        event.preventDefault();

    }
);


/* =====================================================
   PREVENT DOUBLE-TAP ZOOM
===================================================== */

let lastTouchEnd = 0;


document.addEventListener(
    "touchend",
    function (event) {

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


/* =====================================================
   EXTRA TOUCH SUPPORT
===================================================== */

document.addEventListener(
    "touchstart",
    function () {

        /*
           Keeps touch interaction
           smooth on mobile browsers.
        */

    },
    {
        passive: true
    }
);


/* =====================================================
   BUTTON VIBRATION
===================================================== */

document
    .querySelectorAll(
        "button"
    )
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    /*
                       Don't vibrate twice
                       for the NO button.
                    */

                    if (
                        button.id !==
                        "noButton"
                    ) {

                        smallVibration();

                    }

                }
            );

        }
    );
