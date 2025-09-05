//Command for LMS platform
//function getAPIHandle() {
//    let win = window;
//    while (win) {
//        try {
//            if (win.API) return win.API; // SCORM 1.2
//        } catch (err) {}
//        if (win.parent && win.parent !== win) {
//            win = win.parent;
//        } else {
//            break;
//        }
//    }
//    if (window.opener && window.opener.API) {
//        return window.opener.API;
//    }
//    return null;
//}
//const api = getAPIHandle();
//window.onload = function () {
//    api.LMSInitialize("");
//};

document.addEventListener("DOMContentLoaded", () => {
    const typewriter = document.getElementById("typewriter");
    const fullText = typewriter.dataset.text;
    const startBtn = document.getElementById("start-btn");

    let index = 0;
    const typingSpeed = 10; // ms tra ogni carattere

    const playClickSound = () => {
        const click = new Audio('./media/audio/key.wav');
        click.volume = 0.2; // opzionale: regola il volume
        click.play().catch(() => {}); // evita errori su autoplay
    };

    const type = () => {
        if (index < fullText.length) {
        typewriter.textContent += fullText.charAt(index);

        if (fullText.charAt(index) == ' ' || fullText.charAt(index) == '\n') {
            playClickSound();
        }

        index++;
        setTimeout(type, typingSpeed);
        } else {
        startBtn.classList.remove("hidden");
        }
    };

    type();



    const button = document.getElementById("start-btn");
    const coin = document.getElementById("coin-animation");

    button.addEventListener("click", () => {
        coin.classList.remove("hidden");
        void coin.offsetWidth; // forza il reflow per far partire l’animazione
        coin.classList.add("drop");

        const audio = document.getElementById("coin-sound");
        
        setTimeout(() => {
            audio.volume = 1;
            audio.play();
        }, 500);

        //Command for LMS platform
        //api.LMSSetValue("cmi.core.lesson_status", "completed");

        setTimeout(() => {

            //Command for LMS platform
            //api.LMSFinish("");

            window.location.href = "chapter1.html";
        }, 1000);
    });
});