document.addEventListener("DOMContentLoaded", () => {
    initAudioController();
    initHardcorePuzzle();
    initPista2WithKeypad();
});

function initAudioController() {
    const audioToggle = document.getElementById("audioToggle");
    const bgMusic = document.getElementById("bgMusic");
    let isPlaying = false;
    audioToggle.addEventListener("click", () => {
        if (!isPlaying) { bgMusic.play(); isPlaying = true; }
        else { bgMusic.pause(); isPlaying = false; }
    });
}

// ----------------------------------------------------
// FASE 1: RE PUZZLE & POPUP 1
// ----------------------------------------------------
function initHardcorePuzzle() {
    const fuses = document.querySelectorAll(".btn-fuse");
    const mods = document.querySelectorAll(".btn-mod");
    const powerBar = document.getElementById("power-bar");
    const powerValue = document.getElementById("power-value");
    const circuitStatus = document.getElementById("circuit-status");
    const btnFase1 = document.getElementById("btn-fase1");

    const popOverlay = document.getElementById("error-popup-overlay");
    const popProgress = document.getElementById("pop-progress");
    const popConsole = document.getElementById("pop-console");
    const loveAlert = document.getElementById("love-file-alert");
    const btnPopupContinue = document.getElementById("btn-popup-continue");

    function calculateVoltage() {
        let baseSum = 0, multiplier = 1, subtraction = 0;
        fuses.forEach(f => { if (f.classList.contains("active")) baseSum += parseInt(f.getAttribute("data-val")); });
        mods.forEach(m => {
            if (m.classList.contains("active")) {
                const type = m.getAttribute("data-type");
                const val = parseInt(m.getAttribute("data-val"));
                if (type === "mult") multiplier *= val;
                if (type === "sub") subtraction += val;
            }
        });
        let total = (baseSum * multiplier) - subtraction;
        return total < 0 ? 0 : total;
    }

    function updateUI() {
        const currentPower = calculateVoltage();
        powerValue.innerText = currentPower + " V";
        powerBar.style.width = Math.min(currentPower, 100) + "%";

        if (currentPower === 100) {
            powerBar.style.backgroundColor = "#00ff66";
            powerValue.style.color = "#00ff66";
            circuitStatus.innerText = "✓ SOBRECARGA ALCANZADA (100V). LISTO PARA EXPULSAR.";
            circuitStatus.style.color = "#00ff66";
            btnFase1.disabled = false;
        } else {
            powerBar.style.backgroundColor = currentPower > 100 ? "#ff2233" : "#ffaa00";
            powerValue.style.color = currentPower > 100 ? "#ff2233" : "#ffaa00";
            circuitStatus.innerText = currentPower > 100 ? "⚠️ ALERTA: SOBREPASASTE LOS 100V." : "SE REQUIERE SOBRECARGA EXACTA A 100V...";
            circuitStatus.style.color = currentPower > 100 ? "#ff2233" : "#ffaa00";
            btnFase1.disabled = true;
        }
    }

    fuses.forEach(f => f.addEventListener("click", () => { f.classList.toggle("active"); updateUI(); }));
    mods.forEach(m => m.addEventListener("click", () => { m.classList.toggle("active"); updateUI(); }));

    btnFase1.addEventListener("click", () => {
        popOverlay.classList.add("active");
        let pct = 0;
        const timer = setInterval(() => {
            pct += 4;
            popProgress.style.width = pct + "%";

            if (pct === 24) popConsole.innerHTML += "&gt; Formateando sector B... ERROR<br>";
            else if (pct === 56) popConsole.innerHTML += "&gt; Escaneando archivos protegidos...<br>";
            else if (pct === 80) {
                loveAlert.classList.remove("hidden");
                popConsole.style.color = "#ff66b2";
                popConsole.innerHTML += "&gt; [AMOR_CRITICAL_FAIL]: Archivo Imborrable.<br>";
            }

            if (pct >= 100) {
                clearInterval(timer);
                btnPopupContinue.disabled = false;
            }
        }, 100);
    });

    btnPopupContinue.addEventListener("click", () => {
        popOverlay.classList.remove("active");
        document.getElementById("pista1").classList.remove("activa");
        document.getElementById("pista2").classList.add("activa");
        document.getElementById("step1").classList.remove("active");
        document.getElementById("step2").classList.add("active");

        startHintTimer(1);
    });
}

// ----------------------------------------------------
// FASE 2: TECLADO VIRTUAL, TEMPORIZADORES DE CORREO (25s) & PURGE
// ----------------------------------------------------
let hintTimer = null;

function startHintTimer(stepNum) {
    if (hintTimer) clearTimeout(hintTimer);

    hintTimer = setTimeout(() => {
        showMailHintPopup(stepNum);
    }, 25000);
}

function showMailHintPopup(stepNum) {
    const mailOverlay = document.getElementById("mail-popup-overlay");
    const mailSubject = document.getElementById("mail-subject");
    const mailIntro = document.getElementById("mail-intro-text");
    const mailText = document.getElementById("mail-answer-text");

    if (stepNum === 1) {
        mailSubject.innerText = "🗓️ Pista: Fecha Especial";
        mailIntro.innerText = "¡Mi vida! Sé que los números a veces se nos pasan, pero no quiero que te quedes atascada. Aquí tienes la fecha exacta:";
        mailText.innerHTML = `Respuesta: <strong>03-05-2026</strong><br><br><small>💌 Enviado por tu amor</small>`;
    }
    else if (stepNum === 2) {
        mailSubject.innerText = "🔍 Pista: Código Secreto";
        mailIntro.innerText = "¡Princesa! Descifrar esas letras resaltadas lleva su tiempo. Para ahorrarte el dolor de cabeza, este es el mensaje oculto:";
        mailText.innerHTML = `Respuesta: <strong>TE AMO MI PRINCESA HERMOSA</strong><br><br><small>💌 Enviado por tu amor</small>`;
    }
    else if (stepNum === 3) {
        mailSubject.innerText = "🧩 Pista: Anagrama Resuelto";
        mailIntro.innerText = "¡Amores! Esas palabras revueltas estaban super difíciles, ¿verdad? No te preocupes, yo ya las ordené para ti:";
        mailText.innerHTML = `Respuesta: <strong>FELIZ CUMPLEAÑOS MI NIÑA HERMOSA</strong><br><br><small>💌 Enviado por tu amor</small>`;
    }

    mailOverlay.classList.add("active");
}

function initPista2WithKeypad() {
    let currentStep = 1;
    let inputBuffer = "";

    const displayScreen = document.getElementById("re-input-screen");
    const substepNum = document.getElementById("substep-num");
    const sub1 = document.getElementById("subreto-1");
    const sub2 = document.getElementById("subreto-2");
    const sub3 = document.getElementById("subreto-3");

    const mailOverlay = document.getElementById("mail-popup-overlay");
    const btnMailOk = document.getElementById("btn-mail-ok");
    const btnCloseMail = document.getElementById("btn-close-mail");

    const popFase2 = document.getElementById("fase2-popup-overlay");
    const progFase2 = document.getElementById("fase2-progress");
    const consoleFase2 = document.getElementById("fase2-console");
    const karinaAlert = document.getElementById("karina-block-alert");
    const btnFase2Continue = document.getElementById("btn-fase2-continue");

    function closeMail() {
        mailOverlay.classList.remove("active");
    }

    btnMailOk.addEventListener("click", closeMail);
    btnCloseMail.addEventListener("click", closeMail);

    function updateDisplay() {
        displayScreen.innerText = inputBuffer.length > 0 ? inputBuffer : "_";
    }

    function cleanText(str) {
        return str.trim().toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ");
    }

    document.querySelectorAll(".key-btn[data-key]").forEach(btn => {
        btn.addEventListener("click", () => {
            if (inputBuffer.length < 35) {
                inputBuffer += btn.getAttribute("data-key");
                updateDisplay();
            }
        });
    });

    document.getElementById("key-del").addEventListener("click", () => {
        inputBuffer = inputBuffer.slice(0, -1);
        updateDisplay();
    });

    document.getElementById("key-enter").addEventListener("click", () => {
        const val = cleanText(inputBuffer);

        if (currentStep === 1) {
            if (val === "03-05-2026" || val === "03052026") {
                clearTimeout(hintTimer);
                sub1.classList.add("hidden");
                sub2.classList.remove("hidden");
                currentStep = 2;
                substepNum.innerText = "2";
                inputBuffer = "";
                updateDisplay();
                startHintTimer(2);
            } else {
                alert("❌ FECHA INCORRECTA. Formato requerido: 03-05-2026");
            }
        }
        else if (currentStep === 2) {
            if (val === "te amo mi princesa hermosa") {
                clearTimeout(hintTimer);
                sub2.classList.add("hidden");
                sub3.classList.remove("hidden");
                currentStep = 3;
                substepNum.innerText = "3";
                inputBuffer = "";
                updateDisplay();
                startHintTimer(3);
            } else {
                alert("❌ FRASE INCORRECTA. Revisa minuciosamente las letras resaltadas.");
            }
        }
        else if (currentStep === 3) {
            if (val === "feliz cumpleanos mi nina hermosa") {
                clearTimeout(hintTimer);
                triggerFase2PurgePopup();
            } else {
                alert("❌ ORDEN INCORRECTO. Formato: Feliz cumpleaños mi niña hermosa");
            }
        }
    });

    function triggerFase2PurgePopup() {
        popFase2.classList.add("active");
        let pct = 0;

        const timer = setInterval(() => {
            pct += 5;
            progFase2.style.width = pct + "%";

            if (pct === 20) {
                consoleFase2.innerHTML += "&gt; [PURGING]: Deleting photo_01.jpg... DONE<br>";
            } else if (pct === 50) {
                consoleFase2.innerHTML += "&gt; [PURGING]: Deleting core memories... DONE<br>";
            } else if (pct === 75) {
                consoleFase2.innerHTML += "&gt; <span style='color:#ff3333;'>[CRITICAL]: OLVIDANDO A KARINA...</span><br>";
            } else if (pct === 90) {
                clearInterval(timer);
                karinaAlert.classList.remove("hidden");
                consoleFase2.innerHTML += "&gt; <span style='color:#00ff66;'>[OVERRIDE]: LOCK_ENFORCED_BY_AROM</span><br>";
                btnFase2Continue.disabled = false;
            }
        }, 120);
    }

    btnFase2Continue.addEventListener("click", () => {
        popFase2.classList.remove("active");
        document.getElementById("pista2").classList.remove("activa");
        document.getElementById("pista3").classList.add("activa");
        document.getElementById("step2").classList.remove("active");
        document.getElementById("step3").classList.add("active");
        initPista3();
    });
}

// ----------------------------------------------------
// FASE 3: PUZZLE DESLIZANTE, POPUPS DE IMÁGENES Y CORREO FINAL
// ----------------------------------------------------
function initPista3() {
    const board = document.getElementById("puzzle-board-4x4");
    const savedPopup = document.getElementById("saved-files-popup-overlay");
    const finalMailPopup = document.getElementById("final-mail-popup-overlay");
    const btnUnlockVideo = document.getElementById("btn-unlock-video");
    const videoContainer = document.getElementById("video-container");
    const personalVideo = document.getElementById("my-personal-video");

    const solvedState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
    let tiles = [...solvedState];

    function shuffleTiles() {
        for (let i = 0; i < 80; i++) {
            const emptyIdx = tiles.indexOf("");
            const possibleMoves = [];

            if (emptyIdx % 4 > 0) possibleMoves.push(emptyIdx - 1);
            if (emptyIdx % 4 < 3) possibleMoves.push(emptyIdx + 1);
            if (emptyIdx >= 4) possibleMoves.push(emptyIdx - 4);
            if (emptyIdx < 12) possibleMoves.push(emptyIdx + 4);

            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            tiles[emptyIdx] = tiles[randomMove];
            tiles[randomMove] = "";
        }
    }

    function renderBoard() {
        board.innerHTML = "";
        const tileSize = board.clientWidth / 4;

        tiles.forEach((tile, index) => {
            const div = document.createElement("div");
            div.className = "puzzle-tile-4x4";

            if (tile === "") {
                div.style.opacity = "0";
                div.style.cursor = "default";
            } else {
                const row = Math.floor((tile - 1) / 4);
                const col = (tile - 1) % 4;
                div.style.backgroundPosition = `-${col * tileSize}px -${row * tileSize}px`;
                div.innerText = tile;
                div.addEventListener("click", () => moveTile(index));
            }
            board.appendChild(div);
        });
    }

    function moveTile(index) {
        const emptyIndex = tiles.indexOf("");
        const validMoves = [index - 1, index + 1, index - 4, index + 4];

        if (validMoves.includes(emptyIndex)) {
            if (index % 4 === 0 && emptyIndex === index - 1) return;
            if (index % 4 === 3 && emptyIndex === index + 1) return;

            tiles[emptyIndex] = tiles[index];
            tiles[index] = "";
            renderBoard();
            checkWin();
        }
    }

    function checkWin() {
        if (tiles.every((val, i) => val === solvedState[i])) {
            // 1. Mostrar Pop-up de Imágenes Salvadas
            setTimeout(() => {
                savedPopup.classList.add("active");

                // 2. Se ocultan las imágenes tras 4 segundos
                setTimeout(() => {
                    savedPopup.classList.remove("active");

                    // 3. Despliega el Pop-up de Correo con "Ver Archivo Encriptado"
                    setTimeout(() => {
                        finalMailPopup.classList.add("active");
                    }, 400);

                }, 4000);
            }, 300);
        }
    }

    // Evento para revelar y reproducir tu video al presionar el botón
    if (btnUnlockVideo) {
        btnUnlockVideo.addEventListener("click", () => {
            btnUnlockVideo.classList.add("hidden");
            videoContainer.classList.remove("hidden");
            if (personalVideo) {
                personalVideo.play();
            }
        });
    }

    shuffleTiles();
    renderBoard();
}
