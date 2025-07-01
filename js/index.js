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

        setTimeout(() => {
            window.location.href = "chapter1.html";
        }, 1000);
    });
});