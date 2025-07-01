const popupError = document.getElementById("popup-error");
const popupSuccess = document.getElementById("popup-success");
const retryBtn = document.getElementById("retry-btn");
const nextBtn = document.getElementById("next-btn");

let dropZone = [
        [200,-5 ,317+320,105 ,false,328,18 ,null],
        [200,106,317+320,255,false,328,167,null],
    ];

function showPopup(popup) {
    popup.classList.remove("hidden");
}

function hidePopup(popup) {
    popup.classList.add("hidden");
}

retryBtn.addEventListener("click", () => {
    hidePopup(popupError);
    // Qui puoi aggiungere reset o logica per permettere di riprovare
});

nextBtn.addEventListener("click", () => {
    hidePopup(popupSuccess);
    // Qui puoi far partire il prossimo capitolo o altra azione
    window.location.href = "index.html";
});

function LastGame(container){
    container.style.display="block";

    function highlightCode() {
        const codeDiv = document.getElementById('code');
        let html = codeDiv.innerHTML;

        // 2. Evidenzia numeri e "console"
        html = html.replace(/\b(\d+)\b|\b(console)\b/g, '<span style="color: #6d2668;">$&</span>');

        // 1. Evidenzia parole chiave (for, let, if, else)
        html = html.replace(/\b(for|let |if|else)\b/g, '<span style="color: #2c8fca;">$&</span>');

        // 3. Evidenzia "log"
        html = html.replace(/\b(log)\b/g, '<span style="color: #d32937;">$&</span>');

        // 4. Evidenzia testo tra virgolette ""
        html = html.replace(/(?<![=;])"(.*?)"/g, '<span style="color: #058263;">"$1"</span>');

        codeDiv.innerHTML = html;
    }
    highlightCode();
    const button = document.getElementById("start-btn");

    button.addEventListener("click", () => {
        const risposta1  = document.querySelector('input[name="q1"]:checked')?.value;
        const risposta2  = document.querySelector('input[name="q2"]:checked')?.value;
        const risposta3  = document.querySelector('input[name="q3"]:checked')?.value;
        const risposta4  = document.querySelector('input[name="q4"]:checked')?.value;
        const risposta5  = document.querySelector('input[name="q5"]:checked')?.value;
        const risposta6  = document.querySelector('input[name="q6"]:checked')?.value;
        const risposta7  = document.querySelector('input[name="q7"]:checked')?.value;
        const risposta8  = document.querySelector('input[name="q8"]:checked')?.value;
        const risposta9  = document.querySelector('input[name="q9"]:checked')?.value;
        const risposta10 = document.querySelector('input[name="q10"]:checked')?.value;

        const ra1 = "b";
        const ra2 = "b";
        const ra3 = "b";
        const ra4 = "c";
        const ra5 = "c";
        const ra6 = "b";
        const ra7 = "c";
        const ra8 = "a";
        const ra9 = "a";
        const ra10= "c";

        if (risposta1 == ra1 && 
            risposta2 == ra2 && 
            risposta3 == ra3 && 
            risposta4 == ra4 && 
            risposta5 == ra5 &&
            risposta6 == ra6 && 
            risposta7 == ra7 && 
            risposta8 == ra8 && 
            risposta9 == ra9 && 
            risposta10== ra10  
        ){
            showPopup(popupSuccess);
            const audio= new Audio('./media/audio/success.wav');
            audio.play();
        }
        else{
            showPopup(popupError);
            const audio= new Audio('./media/audio/wrong.mp3');
            audio.play();
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const typewriter = document.getElementById("typewriter");
    const fullText = typewriter.dataset.text;
    const gameContainer = document.getElementById("last-game");

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
            LastGame(gameContainer);
        }
    };

    type();
});