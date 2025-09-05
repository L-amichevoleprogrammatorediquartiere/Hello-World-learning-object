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
    // top: `${50 + index * 70}px`,
    // left: `${30 + index * 70}px`,
    for(let i=0; i<dropZone.length; i++){
        dropZone[i][4]=false;
        dropZone[i][7].style.top = `${70 + i * 70}px`;
        dropZone[i][7].style.left= `${50 + i * 100}px`;
    }
});

nextBtn.addEventListener("click", () => {
    hidePopup(popupSuccess);
    // Qui puoi far partire il prossimo capitolo o altra azione

    //Command for LMS platform
    //api.LMSFinish("");

    window.location.href = "chapter5.html";
});

function LoopGame(container) {
    container.style.display="block";

    function makeDraggable(element) {

        let isDragging = false;
        let offsetX, offsetY;

        //<div style="position: absolute; left: 317px; top:0px; width:320px; height: 97px; border: 2px solid white;"></div>
        //<div style="position: absolute; left: 317px; top:100px; width:320px; height: 97px; border: 2px solid white;"></div>
        //<div style="position: absolute; left: 317px; top:200px; width:320px; height: 97px; border: 2px solid white;"></div>

        // Stile durante il trascinamento
        element.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return; // Ignora click non sinistro
            
            for(let zone of dropZone){
                if (element==zone[7]){
                    zone[4] = false; // occupied = true
                    zone[7] = null; // assegna l'elemento
                }
            }
            
            isDragging = true;

            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;

            element.style.cursor = 'grabbing';
            element.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            element.style.zIndex = '1000';
            element.style.transition = 'none'; // Disabilita animazioni durante il drag
        });

        // Trascinamento
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            let x = e.clientX - offsetX - container.getBoundingClientRect().left;
            let y = e.clientY - offsetY - container.getBoundingClientRect().top;

            // Limita il movimento entro i bordi del contenitore
            x = Math.max(0, Math.min(x, container.offsetWidth - element.offsetWidth));
            y = Math.max(0, Math.min(y, container.offsetHeight - element.offsetHeight));

            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            console.log(x,y);
        });

        // Fine trascinamento
        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            const audio= new Audio('./media/audio/key.wav');
            audio.play();
            isDragging = false;

            element.style.cursor = 'grab';
            element.style.boxShadow = '';
            element.style.zIndex = '0';
            element.style.transition = 'left 0.2s, top 0.2s'; // Ripristina animazione fluida

            let x = e.clientX - offsetX - container.getBoundingClientRect().left;
            let y = e.clientY - offsetY - container.getBoundingClientRect().top;

            // Limita il movimento entro i bordi del contenitore
            x = Math.max(0, Math.min(x, container.offsetWidth - element.offsetWidth));
            y = Math.max(0, Math.min(y, container.offsetHeight - element.offsetHeight));

            for (let zone of dropZone) {
                const [x1, y1, x2, y2, occupied, xf, yf, assignedElement] = zone; // Aggiungi assignedElement
                if (!occupied) {
                    if((x > x1 && x < x2) && (y > y1 && y < y2)) {
                        element.style.left = `${xf}px`;
                        element.style.top = `${yf}px`;
                        console.log("assegnato", element.dataset);
                        
                        // Modifica direttamente l'array originale
                        zone[4] = true; // occupied = true
                        zone[7] = element; // assegna l'elemento
                        
                        console.log(zone[4]);

                        break; // Esci dal ciclo dopo aver assegnato
                    }
                }
            }

            //qui controllo  se sono tutte occupate
            let alloccupied=true;
            for (let zone of dropZone){
                if (zone[4] == false){
                    alloccupied=false;
                    break;
                }
            }
            console.log("sono tutti occupati si o no?",alloccupied, dropZone);
            //si sono tutte occupate controlla se 
            if(alloccupied){
                let correct=true;
                for(let i=0; i<dropZone.length; i++){
                    if(i==0){
                        if(dropZone[i][7].dataset.key=="for"){
                            
                        }
                        else{
                            correct=false;
                            break;
                        }
                    }
                }
                if (correct){
                    showPopup(popupSuccess);

                    //Command for LMS platform
                    //api.LMSSetValue("cmi.core.score.raw", "100");
                    //api.LMSSetValue("cmi.core.lesson_status", "completed");

                    const audio= new Audio('./media/audio/success.wav');
                    audio.play();
                }
                else{
                    showPopup(popupError);

                    //Command for LMS platform
                    //api.LMSSetValue("cmi.core.score.raw", "0");
                    //api.LMSSetValue("cmi.core.lesson_status", "incomplete");

                    const audio= new Audio('./media/audio/wrong.mp3');
                    audio.play();
                }
            }
        });

        // Impedisce il trascinamento accidentale di immagini o testo
        element.addEventListener('dragstart', (e) => e.preventDefault());
    }

    const keyword = ["for", "while"];

    // Mischia le parole chiave
    const shuffled = keyword.sort(() => Math.random() - 0.5);

    shuffled.forEach((kw, index) => {
        const div = document.createElement("div");
        div.classList.add("draggable");
        div.setAttribute("draggable", "true");
        div.dataset.key = kw;
        div.textContent = kw;

        // STILE
        Object.assign(div.style, {
            position: "absolute",
            top: `${70 + index * 70}px`,   // posizionamento verticale a scaletta
            left: `${50 + index * 100}px`,  // posizionamento orizzontale a scaletta
            width: "20%",
            height: "14%",
            backgroundColor: "#cce5ff",
            border: "2px solid #004085",
            borderRadius: "10px",
            fontFamily: "Press Start 2P",
            fontSize: "12px",
            color: "#004085",
            textAlign: "center",
            lineHeight: "50px",
            cursor: "grab",
            userSelect: "none",
        });

        makeDraggable(div);
        container.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const typewriter = document.getElementById("typewriter");
    const fullText = typewriter.dataset.text;
    const gameContainer = document.getElementById("loop-game");

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
            LoopGame(gameContainer);
        }
    };

    type();
});