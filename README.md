# Hello World Learning Object

**Learning Object interattivo di base per l’insegnamento della programmazione**

Questo progetto è un **Learning Object (LO)** web-based, progettato per piattaforme **LMS compatibili SCORM** (testato solo su **SCORM Cloud**) . Guida l’utente attraverso i concetti fondamentali della programmazione, con capitoli tematici e mini-quiz interattivi.

---

## Script `package.py` per creare pacchetto SCORM

Lanciando il comando
```
python package.py
```
Stamperà qualcosa del tipo:
```
✅ LMS commands sbloccati in 6 file JS, totale blocchi modificati: 6
✅ Creato: /Hello-World-learning-object/Hello-World-LO.zip
✅ Cartella '/Hello-World-learning-object/Hello-World-LO' eliminata con tutto il contenuto
```
Copierà il contenuto della cartella di lavoro escludendo `.git` e `README.md` e modificando tutti i file `js` in cui abbiamo dei pezzi di codice del tipo:
```
//Command for LMS platform
//api.LMSSetValue("cmi.core.lesson_status", "completed");
```
e lo script toglierà i commenti rendendo quindi il codice compatibile con una piattaforma LMS. A seguito di ciò comprimerà la cartella copia (con modifiche) creando il file `Hello-World-LO.zip` che può essere tranquillamente caricato su una piattaforma LMS (es. **SCORM Cloud**). Ed infine cancellerà la cartella `Hello-World-LO`

---

## 📖 Contenuto dei Capitoli

### Capitolo 1 – Cos’è un programma e un algoritmo
- Introduzione alla programmazione
- Differenza tra programma e algoritmo
- Esempio quotidiano: fare il caffè


### Capitolo 2 – Le variabili
- Cosa sono le variabili
- Sintassi per dichiararle e usarle (**JavaScript**)
- Tipi base: numero, stringa, booleano


### Capitolo 3 – Le condizioni (`if`, `else`)
- Logica dei rami condizionali
- Sintassi `if`, `else if`, `else`
- Operatori di confronto: `==`, `<`, `>`, `!=`, `&&`, `||`


### Capitolo 4 – I cicli (`for`, `while`)
- Differenze tra `for` e `while`
- Esempi base: stampa numeri, conteggi, somme
- Importanza del criterio di uscita


### Capitolo 5 – Metti tutto insieme
- Riepilogo: variabili + condizioni + cicli
- Mini-programma completo

---

## ⚙️ Struttura del progetto

```
Hello-World-learning-object/
│
├── chapters/
│ └── style.css
│
├── js/ 
│ ├── chapter1.js
│ ├── chapter2.js
│ ├── chapter3.js
│ ├── chapter4.js
│ ├── chapter5.js
│ └── index.js
│
├── media/
│ ├── audio/
│ └── image/
│
├── metadata/
│ └── metadata.xml
│
├── index.html
├── chapter1.html
├── chapter2.html
├── chapter3.html
├── chapter4.html
├── chapter5.html
├── imsmaifest.xml
├── package.py
└── README.md # Questo file
```

## 💡 Note
- Compatibile con **SCORM Cloud** non testato per altri
---

## 🛠️ Tecnologie utilizzate
- HTML5
- CSS3
- JavaScript (vanilla)
- SCORM 1.2/2004 compatibility

