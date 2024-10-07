window.onload = function() {

// -------------------------- EXERCICI 3 --------------------------

    const divTaula = document.getElementById('taula_propietats');

    const taula = document.createElement('table');
    taula.border = "1";

    const propietats = [
        "Valor màxim que pot tenir un número JS",
        "Altura total de la pantalla",
        "Altura interna de la finestra",
        "URL de la web"
    ];

    const valors = [
        Number.MAX_VALUE,
        window.screen.height,
        window.innerHeight,
        window.location.href
    ];

    for (let i = 0; i < propietats.length; i++) {
        const fila = document.createElement('tr');

        const columnaPropietat = document.createElement('td');
        columnaPropietat.textContent = propietats[i];
        fila.appendChild(columnaPropietat);

        const columnaValor = document.createElement('td');
        columnaValor.textContent = valors[i];
        fila.appendChild(columnaValor);

        taula.appendChild(fila);
    }

    divTaula.appendChild(taula);

    // -------------------------- EXERCICI 4 --------------------------

    let countdown;
    let timeLeft;
    let isPaused = false;

    const timeDisplay = document.getElementById("timeDisplay");
    const startBtn = document.getElementById("startBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const stopBtn = document.getElementById("stopBtn");
    const alarm = document.getElementById("alarm");

    function formatTime(minutes, seconds) {
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startCountdown() {
        const minutes = parseInt(document.getElementById("minuts").value);
        const seconds = parseInt(document.getElementById("segons").value);
        timeLeft = (minutes * 60) + seconds;

        if (!countdown) {
            countdown = setInterval(updateCountdown, 1000);
        }
        isPaused = false;
    }

    function pauseCountdown() {
        if (isPaused) {
            countdown = setInterval(updateCountdown, 1000);
            isPaused = false;
        } else {
            clearInterval(countdown);
            countdown = null;
            isPaused = true;
        }
    }

    function stopCountdown() {
        clearInterval(countdown);
        countdown = null;
        isPaused = false;
        timeLeft = 0;
        timeDisplay.textContent = formatTime(0, 0);
        alarm.pause();
        alarm.currentTime = 0;
    }

    function updateCountdown() {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            countdown = null;
            timeDisplay.textContent = "00:00";
            alarm.play();
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeDisplay.textContent = formatTime(minutes, seconds);
        }
    }

    startBtn.addEventListener("click", startCountdown);
    pauseBtn.addEventListener("click", pauseCountdown);
    stopBtn.addEventListener("click", stopCountdown);

    // -------------------------- EXERCICI 5 --------------------------

    const rellotge = document.getElementById("rellotge");
    const alarmHour = document.getElementById("alarmHour");
    const alarmMinute = document.getElementById("alarmMinute");
    const alarmSecond = document.getElementById("alarmSecond");
    const setAlarmBtn = document.getElementById("setAlarmBtn");
    const stopAlarmBtn = document.getElementById("stopAlarmBtn");
    const musicSelect = document.getElementById("musicSelect");
    const alarmVolume = document.getElementById("alarmVolume");
    const playMusicBtn = document.getElementById("playMusicBtn");
    const stopMusicBtn = document.getElementById("stopMusicBtn");
    const alarmSound = document.getElementById("alarmSound");

    let alarmTime = null;
    let alarmSet = false;

    function actualitzaRellotge() {
        const ara = new Date();
        const hores = String(ara.getHours()).padStart(2, '0');
        const minuts = String(ara.getMinutes()).padStart(2, '0');
        const segons = String(ara.getSeconds()).padStart(2, '0');
        rellotge.textContent = `${hores}:${minuts}:${segons}`;

        if (alarmSet && `${hores}:${minuts}:${segons}` === alarmTime) {
            alarmSound.play();
            alarmSet = false;
        }
    }

    setAlarmBtn.addEventListener("click", function() {
        const hores = String(alarmHour.value).padStart(2, '0');
        const minuts = String(alarmMinute.value).padStart(2, '0');
        const segons = String(alarmSecond.value).padStart(2, '0');
        alarmTime = `${hores}:${minuts}:${segons}`;
        alarmSet = true;
        alert(`Alarma establerta per les ${alarmTime}`);
    });

    stopAlarmBtn.addEventListener("click", function() {
        alarmSet = false;
        alarmSound.pause();
        alarmSound.currentTime = 0;
        alert("Alarma aturada");
    });

    musicSelect.addEventListener("change", function() {
        alarmSound.src = musicSelect.value;
    });

    alarmVolume.addEventListener("input", function() {
        alarmSound.volume = alarmVolume.value;
    });

    playMusicBtn.addEventListener("click", function() {
        alarmSound.play();
    });

    stopMusicBtn.addEventListener("click", function() {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    });

    setInterval(actualitzaRellotge, 1000);

}
