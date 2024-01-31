document.addEventListener('DOMContentLoaded', function () {
    const cardsData = [
        { "image": "img/q1.png", "framework": 1 },
        { "image": "img/j3.png", "framework": 2 },
        { "image": "img/k4.png", "framework": 3 },
        { "image": "img/q1.png", "framework": 1 },
        { "image": "img/j3.png", "framework": 2 },
        { "image": "img/k4.png", "framework": 3 },
    ];

    const memoryGameContainer = document.querySelector('.memory-game');
    const cards = document.querySelectorAll('.memory-card');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let count = 0;

   let timerSeconds = 0;
    let timerInterval;
    const applauseAudio = new Audio('applause.mp3');
    const flipAudio = new Audio('flip.mp3');
    const correctAudio = new Audio('correct.mp3');

function updateTimer() {
    timerInterval = setInterval(() => {
        timerSeconds++;
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
        document.getElementById('timer').innerText = formattedTime;
    }, 1000);
}

// Call updateTimer to start the timer
updateTimer();


    function updateCount() {
    count++;
    const countElement = document.getElementById('count');
    countElement.innerText = count + '/3';
    setTimeout(() => {
    correctAudio.play();
     }, 500);

    // Change text color to green
    countElement.style.textShadow = ` 0px 0px 25px #71E87D`;
    countElement.style.color = '#71E87D';
    countElement.style.fontSize = '7.5vh';

    // Set a timer to change the text color back to its original state after 1000 milliseconds
    setTimeout(() => {
        countElement.style.textShadow = ''; // Reset color to its original state
        countElement.style.color = '';
        countElement.style.fontSize = '';
    }, 1000);

    if (count === 3) {
        showCongrats(); // Show congrats when all matches are made
        starsEffect();
        applauseAudio.play();
    }
}

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        this.classList.add('flip');
          flipAudio.play();

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function showCongrats() {
        setTimeout(() => {
        const congratsElement = document.getElementById('congrats');
        congratsElement.style.visibility = 'visible';
        congratsElement.style.opacity = '1';
    }, 1000);
    }


    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        setTimeout(() => {
        updateCount(); // Update count when a match is made
        resetBoard();
    }, 0);
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            flipAudio.play();
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(cardsData);

    cardsData.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.setAttribute('data-framework', card.framework);

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = card.image;
        frontFace.alt = 'Memory Card';

        const backFace = document.createElement('img');
        backFace.classList.add('back-face');
        backFace.src = 'img/back.png';
        backFace.alt = 'Memory Card';

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);

        cardElement.addEventListener('click', flipCard);
        memoryGameContainer.appendChild(cardElement);
    });

    let scaleValue = 1;
    let consecutiveClicksZoomOut = 0;
    let consecutiveClicksZoomIn = 0;
    const maxConsecutiveClicks = 3;

function updateScale(value) {
  if (value < 0 && consecutiveClicksZoomOut >= maxConsecutiveClicks) {
    return; // Do not allow more zooming out
  }

  if (value > 0 && consecutiveClicksZoomIn >= maxConsecutiveClicks) {
    return; // Do not allow more zooming in
  }

  scaleValue += value;


  // Adjust transform and transform-origin to maintain left margin
  memoryGameContainer.style.transform = `scale(${scaleValue})`;
  memoryGameContainer.style.transformOrigin = `top`;

  // Update consecutive clicks count for each button
  if (value < 0) {
    consecutiveClicksZoomOut++;
    consecutiveClicksZoomIn = -3;
  } else {
    consecutiveClicksZoomIn++;
    consecutiveClicksZoomOut = -3;
  }
}
document.getElementById('zoomout').addEventListener('click', () => updateScale(-0.2));
document.getElementById('zoomin').addEventListener('click', () => updateScale(0.2));

});


