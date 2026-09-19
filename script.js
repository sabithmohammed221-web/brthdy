document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // ELEMENTS
    // =========================

    const pages = document.querySelectorAll(".page");

    const nextButtons = document.querySelectorAll(
        ".next-button"
    );

    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");

    const yesResult = document.getElementById("yesResult");

    const finalButton = document.getElementById("finalButton");

    const music = document.getElementById("music");
    const musicButton = document.getElementById("musicButton");


    // =========================
    // CURRENT PAGE
    // =========================

    let currentPage = 0;


    // =========================
    // SHOW PAGE
    // =========================

    function showPage(number) {

        if (number < 0 || number >= pages.length) {
            return;
        }

        pages.forEach(function (page, index) {

            if (index === number) {
                page.classList.add("active");
            } else {
                page.classList.remove("active");
            }

        });

        currentPage = number;

        // Put slide content at top
        const activeContent =
            pages[number].querySelector(".content");

        if (activeContent) {
            activeContent.scrollTop = 0;
        }
    }


    // =========================
    // MUSIC
    // =========================

    function startMusic() {

        if (!music) {
            return;
        }

        music.play().catch(function () {});
    }


    if (musicButton) {

        musicButton.addEventListener("click", function () {

            if (!music) {
                return;
            }

            if (music.paused) {

                music.play()
                    .then(function () {
                        musicButton.textContent = "🔊";
                    })
                    .catch(function () {});

            } else {

                music.pause();
                musicButton.textContent = "🎵";
            }

        });

    }


    // =========================
    // NORMAL NEXT BUTTONS
    // =========================

    nextButtons.forEach(function (button) {

        // Final button has its own function
        if (button.id === "finalButton") {
            return;
        }

        button.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            startMusic();

            if (currentPage < pages.length - 1) {
                showPage(currentPage + 1);
            }

        });

    });


    // =========================
    // YES BUTTON
    // =========================

    if (yesButton) {

        yesButton.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            startMusic();

            const question =
                document.querySelector(".question");

            const questionSubtitle =
                document.querySelector(".question-subtitle");

            const answerArea =
                document.querySelector(".answer-area");


            if (question) {
                question.style.display = "none";
            }

            if (questionSubtitle) {
                questionSubtitle.style.display = "none";
            }

            if (answerArea) {
                answerArea.style.display = "none";
            }

            if (yesResult) {
                yesResult.style.display = "block";
            }

        });

    }


    // =========================
    // NO BUTTON
    // =========================

    function moveNoButton() {

        if (!noButton) {
            return;
        }

        const area =
            document.querySelector(".answer-area");

        if (!area) {
            return;
        }


        const areaWidth = area.clientWidth;
        const areaHeight = area.clientHeight;

        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;


        // Keep button completely inside area
        const maxLeft =
            Math.max(0, areaWidth - buttonWidth);

        const maxTop =
            Math.max(0, areaHeight - buttonHeight);


        const randomLeft =
            Math.floor(Math.random() * maxLeft);

        const randomTop =
            Math.floor(Math.random() * maxTop);


        noButton.style.left =
            randomLeft + "px";

        noButton.style.top =
            randomTop + "px";
    }


    if (noButton) {

        // Desktop
        noButton.addEventListener(
            "mouseenter",
            function () {
                moveNoButton();
            }
        );


        // Mobile
        noButton.addEventListener(
            "touchstart",
            function (event) {

                event.preventDefault();

                moveNoButton();

            },
            {
                passive: false
            }
        );


        // If somehow clicked
        noButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                moveNoButton();
            }
        );

    }


    // =========================
    // FINAL BUTTON
    // =========================

    if (finalButton) {

        finalButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                startMusic();

                // Slide 9
                showPage(8);

            }
        );

    }


    // =========================
    // START
    // =========================

    showPage(0);


    // =========================
    // START MUSIC AFTER USER TAP
    // =========================

    document.addEventListener(
        "click",
        function () {
            startMusic();
        },
        {
            once: true
        }
    );


    // =========================
    // RIGHT CLICK OFF
    // =========================

    document.addEventListener(
        "contextmenu",
        function (event) {
            event.preventDefault();
        }
    );

});
