// ===============================
// VOXO / BIRTHDAY WEBSITE
// CLEAN SCRIPT - NO DUPLICATES
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const pages = document.querySelectorAll(".page");
    const nextButtons = document.querySelectorAll(".next-button");
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");
    const yesResult = document.getElementById("yesResult");
    const finalButton = document.getElementById("finalButton");

    const music = document.getElementById("music");
    const musicButton = document.getElementById("musicButton");

    let currentPage = 0;
    let musicStarted = false;


    // ===============================
    // SHOW PAGE
    // ===============================

    function showPage(index) {

        if (index < 0 || index >= pages.length) {
            return;
        }

        pages.forEach((page, i) => {
            page.classList.toggle("active", i === index);
        });

        currentPage = index;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // ===============================
    // START MUSIC
    // ===============================

    function startMusic() {

        if (!music || musicStarted) {
            return;
        }

        music.play()
            .then(() => {
                musicStarted = true;

                if (musicButton) {
                    musicButton.textContent = "🔊";
                }
            })
            .catch(() => {
                // Browser blocked autoplay.
                // It will start after user taps music button.
            });
    }


    // ===============================
    // MUSIC BUTTON
    // ===============================

    if (musicButton && music) {

        musicButton.addEventListener("click", (event) => {

            event.stopPropagation();

            if (music.paused) {

                music.play()
                    .then(() => {
                        musicStarted = true;
                        musicButton.textContent = "🔊";
                    })
                    .catch(() => {});

            } else {

                music.pause();
                musicButton.textContent = "🎵";
            }

        });
    }


    // ===============================
    // NEXT BUTTONS
    // ===============================

    nextButtons.forEach((button) => {

        // Do NOT attach normal next action to final button.
        if (button === finalButton) {
            return;
        }

        button.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            startMusic();

            if (currentPage < pages.length - 1) {
                showPage(currentPage + 1);
            }

        });

    });


    // ===============================
    // YES BUTTON
    // ===============================

    if (yesButton) {

        yesButton.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            startMusic();

            const question = document.querySelector(".question");
            const questionSubtitle = document.querySelector(".question-subtitle");
            const answerArea = document.querySelector(".answer-area");

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


    // ===============================
    // NO BUTTON - MOVING BUTTON
    // ===============================

    function moveNoButton() {

        if (!noButton) {
            return;
        }

        const area = document.querySelector(".answer-area");

        if (!area) {
            return;
        }

        const areaRect = area.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();

        const maxX = Math.max(
            0,
            areaRect.width - buttonRect.width
        );

        const maxY = Math.max(
            0,
            areaRect.height - buttonRect.height
        );

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noButton.style.position = "absolute";
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;

    }


    // Move when mouse comes near
    if (noButton) {

        noButton.addEventListener("mouseenter", (event) => {
            event.preventDefault();
            moveNoButton();
        });


        // Mobile touch
        noButton.addEventListener("touchstart", (event) => {

            event.preventDefault();

            moveNoButton();

        }, {
            passive: false
        });


        // Prevent actual NO click
        noButton.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            moveNoButton();

        });

    }


    // ===============================
    // FINAL BUTTON
    // ===============================

    if (finalButton) {

        finalButton.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            startMusic();

            // Slide 9 = index 8
            showPage(8);

        });

    }


    // ===============================
    // START FROM SLIDE 1
    // ===============================

    showPage(0);


    // ===============================
    // START MUSIC AFTER FIRST TAP
    // ===============================

    document.addEventListener("click", () => {
        startMusic();
    }, {
        once: true
    });


    // ===============================
    // DISABLE RIGHT CLICK
    // ===============================

    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });


    // ===============================
    // DISABLE TEXT SELECTION
    // ===============================

    document.addEventListener("selectstart", (event) => {
        event.preventDefault();
    });

});
