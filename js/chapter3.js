const popupError = document.getElementById("popup-error");
const popupSuccess = document.getElementById("popup-success");
const retryBtn = document.getElementById("retry-btn");
const nextBtn = document.getElementById("next-btn");

const snow = document.getElementById("snowman");
const temp = document.getElementById("temp");
let temperature=5;

function showPopup(popup) {
    popup.classList.remove("hidden");
}

function hidePopup(popup) {
    popup.classList.add("hidden");
}

retryBtn.addEventListener("click", () => {
    hidePopup(popupError);
    // Qui puoi aggiungere reset o logica per permettere di riprovare
    temperature=5;
    snow.src="media/image/snow-game/snowman.png";
    temp.innerHTML=temperature + "°";
});

nextBtn.addEventListener("click", () => {
    hidePopup(popupSuccess);
    // Qui puoi far partire il prossimo capitolo o altra azione
    window.location.href = "chapter4.html";
});

function SnowGame(container){
    
    container.style.display="block";

    const plus = document.getElementById("plus");
    const minus = document.getElementById("minus");

    plus.addEventListener("click", () => {
        temperature++;
        temp.innerHTML=temperature + "°";
        const audio= new Audio('./media/audio/drip.wav');
        audio.play();
        setTimeout(() => {
            snow.src="media/image/snow-game/melted.png";
            setTimeout(() => {
                showPopup(popupError);
                const audio= new Audio('./media/audio/wrong.mp3');
                audio.play();
            }, 1100);
        }, 400);
    });

    minus.addEventListener("click", () => {
        temperature--;
        temp.innerHTML=temperature + "°";
        setTimeout(() => {
            showPopup(popupSuccess);
            const audio= new Audio('./media/audio/success.wav');
            audio.play();
        }, 1200);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const typewriter = document.getElementById("typewriter");
    const fullText = typewriter.dataset.text;
    const gameContainer = document.getElementById("snow-game");

    let index = 0;
    const typingSpeed = 0; // ms tra ogni carattere

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
        } 
        else {
            SnowGame(gameContainer);
        }
    };

    type();
});