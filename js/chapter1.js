let animationRunning = false;

const popupError = document.getElementById("popup-error");
const popupSuccess = document.getElementById("popup-success");
const retryBtn = document.getElementById("retry-btn");
const nextBtn = document.getElementById("next-btn");

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
});

function startAnimationSequence(sequence) {
    const layer = document.getElementById("animation-layer");

    // Parte la sequenza passo per passo
    executeNextStep(sequence, 0);
}

function executeNextStep(sequence, index) {
    if (index >= sequence.length) return; // finita la sequenza

    const step = sequence[index];

    // Scegli la funzione corretta in base alla frase
    switch (step) {
        case "Accendi la macchinetta del caffè":
            accendiMacchinetta(() => executeNextStep(sequence, index + 1));
            break;
        case "Posiziona la tazza sotto l'erogatore":
            posizionaTazza(() => executeNextStep(sequence, index + 1));
            break;
        case "Premi il pulsante per far uscire il caffè":
            erogaCaffe(() => executeNextStep(sequence, index + 1));
            break;
        case "Aggiungi lo zucchero":
            aggiungiZucchero(() => executeNextStep(sequence, index + 1));
            break;
        case "Mescola bene il caffè con il cucchiaino":
            mescolaCaffe(() => executeNextStep(sequence, index + 1));
            break;
        default:
            console.warn("Step sconosciuto:", step);
            executeNextStep(sequence, index + 1);
    }
}


function accendiMacchinetta(callback) {
    const audio= new Audio('./media/audio/turnon.mp3');
    audio.play();
    const macchina = document.getElementById("macchinetta");
    macchina.src = "media/image/coffe-game/machinettaon.png";

    if (!macchina) {
        console.error("Macchinetta non trovata!");
        callback();
        return;
    }

    // Cambia l'immagine dopo una breve pausa
    setTimeout(() => {
        callback();
    }, 1000);
}

function posizionaTazza(callback) {
    const layer = document.getElementById("animation-layer");

    const tazza = document.createElement("img");
    tazza.src = "media/image/coffe-game/tazza.png";
    tazza.style.position = "absolute";
    tazza.style.top = "45%";
    tazza.style.left = "110%"; // parte fuori schermo a destra
    tazza.style.width = "100px";
    tazza.style.transition = "left 0.7s ease-in-out";

    layer.appendChild(tazza);

    // Forza il reflow per far partire la transizione
    tazza.offsetWidth; 

    // Ora spostiamo la tazza alla posizione finale
    tazza.style.left = "36%";

    // Quando la transizione finisce, chiamiamo il callback
    setTimeout(() => {
        callback();
    }, 1000);
}

function erogaCaffe(callback) {
    const audio= new Audio('./media/audio/drip.wav');
    audio.play();
    const layer = document.getElementById("animation-layer");

    const caffe = document.createElement("img");
    caffe.src = "media/image/coffe-game/caffe.png";
    caffe.style.scale = "0.3";
    caffe.style.position = "absolute";
    caffe.style.top = "50.5%";
    caffe.style.left = "37.2%"; // parte fuori schermo a destra
    caffe.style.width = "100px";
    caffe.style.transition = "left 0.7s ease-in-out";

    layer.appendChild(caffe);

    setTimeout(() => {
        caffe.classList.add("hidden");
        callback();
    }, 1500);
}

function aggiungiZucchero(callback) {
    const layer = document.getElementById("animation-layer");

    const zucchero = document.createElement("img");
    zucchero.src = "media/image/coffe-game/spoonon.png";
    zucchero.style.position = "absolute";
    zucchero.style.top = "51%";
    zucchero.style.left = "-10%"; // parte fuori schermo a sinistra
    zucchero.style.width = "100px";
    zucchero.style.transform = "scale(0.3)";
    zucchero.style.transition = "left 0.7s ease-in-out";  // correggi qui

    layer.appendChild(zucchero);

    // Forza il reflow per far partire la transizione
    zucchero.offsetWidth; 

    // Ora spostiamo il cucchiaio alla posizione finale (da sinistra a destra)
    zucchero.style.left = "38%";

    zucchero.addEventListener("transitionend", () => {
        zucchero.src = "media/image/coffe-game/spoonoff.png";
        setTimeout(() => {
            zucchero.classList.add("hidden");
            callback();
        }, 1500);
    }, { once: true });
}

function mescolaCaffe(callback) {
    const layer = document.getElementById("animation-layer");

    const spoon = document.createElement("img");
    spoon.src = "media/image/coffe-game/spoon.png";
    spoon.style.position = "absolute";
    spoon.style.top = "45%";  // sopra la tazza (regola se serve)
    spoon.style.left = "39%"; // punto di partenza (stesso left tazza)
    spoon.style.width = "80px";
    spoon.style.transform = "scale(0.15) translateX(0)";
    spoon.style.transition = "transform 0.5s ease-in-out";

    layer.appendChild(spoon);

    // Crea l'audio
    const audio = new Audio("media/audio/spoon.wav");

    function playAudioThenNext(next) {
        audio.currentTime = 0;
        audio.play();
        audio.onended = next;
    }

    // Primo movimento: sposta a destra di 50px mantenendo scale
    requestAnimationFrame(() => {
        spoon.offsetWidth;
        spoon.style.transform = "scale(0.15) translateX(50px)";
    });

    spoon.addEventListener("transitionend", function handler() {
        // Suona audio quando arriva a destra
        playAudioThenNext(() => {
            spoon.removeEventListener("transitionend", handler);

            // Torna indietro
            spoon.style.transform = "scale(0.15) translateX(0)";

            spoon.addEventListener("transitionend", function handlerBack() {
                spoon.removeEventListener("transitionend", handlerBack);
                // Suona audio al ritorno
                playAudioThenNext(() => {
                    layer.removeChild(spoon);
                    animationRunning=false;
                    showPopup(popupSuccess);
                    callback();
                });
            }, { once: true });
        });
    }, { once: true });
}


function CoffeGame(container){
    container.classList.remove("hidden");
    
    const instructions = [
        "Accendi la macchinetta del caffè",
        "Posiziona la tazza sotto l'erogatore",
        "Premi il pulsante per far uscire il caffè",
        "Aggiungi lo zucchero",
        "Mescola bene il caffè con il cucchiaino"
    ];

    const validSequences = [
        [
            "Accendi la macchinetta del caffè",
            "Posiziona la tazza sotto l'erogatore",
            "Premi il pulsante per far uscire il caffè",
            "Aggiungi lo zucchero",
            "Mescola bene il caffè con il cucchiaino"
        ],
        [
            "Accendi la macchinetta del caffè",
            "Posiziona la tazza sotto l'erogatore",
            "Aggiungi lo zucchero",
            "Premi il pulsante per far uscire il caffè",
            "Mescola bene il caffè con il cucchiaino"
        ],
        [
            "Posiziona la tazza sotto l'erogatore",
            "Accendi la macchinetta del caffè",
            "Premi il pulsante per far uscire il caffè",
            "Aggiungi lo zucchero",
            "Mescola bene il caffè con il cucchiaino"
        ],
        [
            "Posiziona la tazza sotto l'erogatore",
            "Accendi la macchinetta del caffè",
            "Aggiungi lo zucchero",
            "Premi il pulsante per far uscire il caffè",
            "Mescola bene il caffè con il cucchiaino"
        ]
    ];


    /*sequenze accettabili:
        -macchinetta, tazza, caffe, zucchero, mescola
        -macchinetta, tazza, zucchero, caffe, mescola
        -tazza, macchinetta, caffe, zucchero, mescola
        -tazza, macchinetta, zucchero, caffe, mescola  */


    // Funzione per mescolare un array (Fisher-Yates shuffle)
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    const shuffledInstructions = shuffle([...instructions]); // copia e mescola

    // Prendi il div che conterrà le istruzioni sparse
    const instructionsContainer = document.getElementById("left-panel");


    function handleDragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.effectAllowed = "move";
    }

    function handleDragOver(e) {
        e.preventDefault(); // Necessario per consentire il drop
    }

    function addDragEvents(el) {
        el.setAttribute("draggable", "true");
        el.addEventListener("dragstart", handleDragStart);
        el.addEventListener("dragover", handleDragOver);
        el.addEventListener("drop", handleDrop);
    }

    function handleDrop(e) {
        e.preventDefault();
        if (e.target.classList.contains("instruction-item") && e.target !== draggedItem) {
            const draggedText = draggedItem.dataset.text;
            const targetText = e.target.dataset.text;

            // Trova gli indici degli elementi nell'array
            const draggedIndex = shuffledInstructions.indexOf(draggedText);
            const targetIndex = shuffledInstructions.indexOf(targetText);

            // Swap nell'array
            [shuffledInstructions[draggedIndex], shuffledInstructions[targetIndex]] = [shuffledInstructions[targetIndex], shuffledInstructions[draggedIndex]];

            // Clona entrambi per fare swap
            const draggedClone = draggedItem.cloneNode(true);
            const targetClone = e.target.cloneNode(true);

            // Sostituisci i nodi
            instructionsContainer.replaceChild(draggedClone, e.target);
            instructionsContainer.replaceChild(targetClone, draggedItem);

            // Riassegna eventi drag & drop
            addDragEvents(draggedClone);
            addDragEvents(targetClone);
        }
    }


    // Pulisci il contenitore (in caso ci fosse già qualcosa)
    instructionsContainer.innerHTML = "";

    // Crea e appendi ogni istruzione mescolata
    shuffledInstructions.forEach(text => {
        const div = document.createElement("div");
        div.dataset.text = text;
        div.textContent = text;
        div.classList.add("instruction-item");
        div.setAttribute("draggable", "true");

        // Eventi drag & drop
        div.addEventListener("dragstart", handleDragStart);
        div.addEventListener("dragover", handleDragOver);
        div.addEventListener("drop", handleDrop);

        instructionsContainer.appendChild(div);
    });
    
    const button = document.getElementById("start-btn");

    button.addEventListener("click", () => {
        const isCorrect = validSequences.some(seq =>
            seq.every((text, index) => text === shuffledInstructions[index])
        );
        if (isCorrect) {
            if (!animationRunning){
                animationRunning=true;
                startAnimationSequence(shuffledInstructions);
            }
        } else {
            if (!animationRunning){
                showPopup(popupError);
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const typewriter = document.getElementById("typewriter");
    const fullText = typewriter.dataset.text;
    const gameContainer = document.getElementById("coffe-game");

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
            CoffeGame(gameContainer);
        }
    };

    type();   
});

