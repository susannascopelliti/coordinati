// Aspettiamo che il documento sia caricato per evitare errori "null" sui bottoni
document.addEventListener("DOMContentLoaded", function() {

    // 1. DEFINIZIONE DELLE DOMANDE (Mancava il "const domande =" all'inizio)
    const domande = [
        { n: 1, testo: "Quando entri nel tuo luogo di lavoro o di studio, cosa senti più necessario?", risposte: { A: "Sentirmi parte di un gruppo e non escluso/a", B: "Capire come stanno le persone intorno a me", C: "Condividere un momento informale per iniziare bene" }},
        { n: 2, testo: "Nel corso della giornata, cosa tende a mancare di più?", risposte: { A: "Collaborazione fluida e continuità nel lavoro", B: "Un ambiente sano, sicuro e meno stressante", C: "Una pausa condivisa che interrompa il ritmo" }},
        { n: 3, testo: "Quando lavori con altre persone, quale ruolo ti viene più naturale?", risposte: { A: "Tenere insieme persone e idee", B: "Ascoltare e far emergere le diverse voci", C: "Creare connessione anche senza troppe parole" }},
        { n: 4, testo: "Un buon ambiente di lavoro o studio, per te, è soprattutto uno spazio che…", risposte: { A: "Favorisce il lavorare vicini e il creare insieme", B: "Protegge il benessere e l’equilibrio di tutti", C: "Permette momenti di vicinanza informale" }},
        { n: 5, testo: "Alla fine della giornata, cosa senti più importante?", risposte: { A: "Aver costruito qualcosa insieme agli altri", B: "Aver gestito bene pressioni e carichi emotivi", C: "Aver recuperato energie condividendo una pausa" }}
    ];

    let risposteUtente = [];

    // 2. GESTIONE TASTO START
    const startBtn = document.getElementById("start-btn");
    if (startBtn) {
        startBtn.addEventListener("click", function() {
            document.getElementById("start-card").style.display = "none";
            document.getElementById("question-card").style.display = "block";
            mostraDomanda(0);
        });
    }

    // 3. FUNZIONE PER MOSTRARE LE DOMANDE
    function mostraDomanda(index) {
        const q = domande[index];
        const numElem = document.getElementById("question-number");
        const textElem = document.getElementById("question-text");
        const container = document.getElementById("answer-buttons");

        if (numElem) numElem.innerText = `DOMANDA ${q.n}`;
        if (textElem) textElem.innerText = q.testo;
        if (container) {
            container.innerHTML = "";
            for (let scelta in q.risposte) {
                const btn = document.createElement("button");
                btn.innerText = q.risposte[scelta];
                btn.className = "quiz-btn";
                btn.onclick = () => registraRisposta(scelta);
                container.appendChild(btn);
            }
        }
    }

    // 4. FUNZIONE PER REGISTRARE LE RISPOSTE
    function registraRisposta(scelta) {
        risposteUtente.push(scelta);
        if (risposteUtente.length < domande.length) {
            mostraDomanda(risposteUtente.length);
        } else {
            calcolaRisultato();
        }
    }

    function calcolaRisultato() {
        const conteggio = { A: 0, B: 0, C: 0 };
        risposteUtente.forEach(r => conteggio[r]++);

        const Q1 = risposteUtente[0], Q2 = risposteUtente[1], Q3 = risposteUtente[2], Q4 = risposteUtente[3], Q5 = risposteUtente[4];
        
        // Default
        let finale = { nome: "CoMarking®", motto: "Mettere in evidenza l’altro", img: "evidf.png", url: "comarking.html" };

        // LOGICA AREA COMUNICAZIONE (A=2, B=2)
        if (conteggio.A === 2 && conteggio.B === 2) {
            if (Q3 === 'A') finale = { nome: "CoSpeaking®", motto: "Passare parola", img: "micrf.png", url: "cospeaking.html" };
            else if (Q5 === 'A') finale = { nome: "CoWriting®", motto: "Condividere le idee", img: "pennaf.png", url: "cowriting.html" };
            else if (Q4 === 'A') finale = { nome: "CoDrawing®", motto: "Creare insieme", img: "matitf.png", url: "codrawing.html" };
            else if (conteggio.C === 1 && Q1 === 'C') finale = { nome: "CoClick®", motto: "Sintonizzarsi", img: "mousef.png", url: "coclick.html" };
        }
        // AREA SPAZI (A=2, C=2)
        else if (conteggio.A === 2 && conteggio.C === 2) {
            if (Q4 === 'A') finale = { nome: "CoBadge®", motto: "Condividere gli spazi",  img: "badgef.png", url: "cobadge.html" };
            else if (Q4 === 'C') finale = { nome: "CoSitting®", motto: "Lavorare vicini vicini",  img: "sitf.png", url: "cositting.html" };
        }
        // AREA RELAZIONE (Prevalenza A)
        else if (conteggio.A >= 3) {
            if (Q2 === 'A' || Q3 === 'A') finale = { nome: "CoCutting®", motto: "Non tagliare fuori l’altro", img: "forbicif.png", url: "cocutting.html" };
            else if (Q1 === 'A' && Q4 === 'A') finale = { nome: "CoWalking®", motto: "Andare di pari passo",  img: "ciabattef.png", url: "cowalking.html" };
            else if (Q5 === 'A') finale = { nome: "CoScotch®", motto: "Unire pezzi separati",  img: "scotchf.png", url: "coscotch.html" };
        }
        // AREA CURA (Prevalenza B)
        else if (conteggio.B >= 3) {
            if (conteggio.B >= 4) finale = { nome: "CoScrubs®", motto: "Esserci sempre per gli altri",  img: "camicif.png", url: "coscrubs.html" }; 
            else if (Q1 === 'B') finale = { nome: "CoHearing®", motto: "Imparare ad ascoltare",  img: "stetof.png", url: "cohearing.html" };
            else if (Q3 === 'B') finale = { nome: "CoListening®", motto: "Ascoltare tutte le voci",  img: "cuffiettef.png", url: "colistening.html" };
            else if (Q4 === 'B') finale = { nome: "CoMask®", motto: "Proteggersi a vicenda",  img: "maskf.png", url: "comask.html" };
            else if (Q5 === 'B') finale = { nome: "CoPressure®", motto: "Gestire lo stress",  img: "pressf.png", url: "copressure.html" };
            else if (Q2 === 'B') finale = { nome: "CoSanitizer®", motto: "Ambiente sano",  img: "cosanitizerf.png", url: "cosanitizer.html" };
        }
        // AREA ENERGIA (Prevalenza C)
        else if (conteggio.C >= 3) {
            if (Q1 === 'C') finale = { nome: "CoCup®", motto: "Iniziare la giornata insieme",  img: "cupf.png", url: "cocup.html"};
            else if (Q2 === 'C') finale = { nome: "CoDrinking®", motto: "Condividere la pausa",  img: "drinkf.png", url: "codrink.html" };
            // Nota: CoCoffee nel tuo HTML era linkato a prodotto_7.html
            else if (Q5 === 'C') finale = { nome: "CoCoffee®", motto: "Recuperare energie insieme",  img: "coffeef.png", url: "cocoffee.html" };
            else if (Q3 === 'C') finale = { nome: "CoEating®", motto: "Connettersi anche senza parlare",  img: "posatef.png", url: "coeating.html" };
        }

        // MOSTRA I RISULTATI E IMPOSTA IL LINK
        document.getElementById("question-card").style.display = "none";
        document.getElementById("result-card").style.display = "flex"; // Usa flex per centrare bene
        
        document.getElementById("object-title").innerText = finale.nome;
        document.getElementById("object-motto").innerText = finale.motto;
        
        // Imposta immagine
        const imgElement = document.getElementById("object-image");
        imgElement.src = "assets/oggetti/" + finale.img; 

        // NUOVO: Imposta il link
        const linkElement = document.getElementById("result-link");
        linkElement.href = finale.url;
    }
});