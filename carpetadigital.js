const rotatingPoint = document.getElementById('rotatingPoint');
const speedInput = document.getElementById('speedInput');

let angle = 0;
let speed = parseInt(speedInput.value);
let radius = 160;
let lastTimestamp = 0;
let animationId;

function rotatePoint(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = (timestamp - lastTimestamp) / 1000; // Convertir a segundos
    lastTimestamp = timestamp;
    
    angle += speed * deltaTime;
    angle %= 360; // Mantener el ángulo entre 0 y 360
    
    const x = radius * Math.cos(angle * Math.PI / 180);
    const y = radius * Math.sin(angle * Math.PI / 180);
    
    rotatingPoint.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    
    animationId = requestAnimationFrame(rotatePoint);
}

// Iniciar la animación
animationId = requestAnimationFrame(rotatePoint);

// Actualizar velocidad cuando cambia el input
speedInput.addEventListener('input', function() {
    speed = parseInt(this.value) || 0;
});

// Pausar la animación cuando la pestaña no está activa para ahorrar recursos
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        cancelAnimationFrame(animationId);
    } else {
        lastTimestamp = 0; // Reiniciar el contador de tiempo
        animationId = requestAnimationFrame(rotatePoint);
    }
});


const canvas2 = document.getElementById('canvas');
const dot2 = document.getElementById('dot');
const startBtn2 = document.getElementById('startBtn');
const inputAcceleration2 = document.getElementById('inputAcceleration');

const radius2 = 102; 
let angle2 = 0;
let angularVelocity2 = 0;
let acceleration2 = 0.1; // Aceleración en grados por segundo cuadrado
let accelerating2 = true;
let lastTime2 = null;
let startTime2 = null;
let animationFrame2; 
const gradosPorRadian2 = 57.2958;

function updateDotPosition2(angle2) {
  const centerX2 = canvas2.clientWidth / 2;
  const centerY2 = canvas2.clientHeight / 2;
  const xOffset = radius2 * Math.cos(angle2 * (Math.PI / 180));
  const yOffset = radius2 * Math.sin(angle2 * (Math.PI / 180));
  // Calcula el balanceo basado en la velocidad angular
  const wobble = Math.sin(angle2 * (Math.PI / 180)) * angularVelocity2 * -7; // Ajusta el factor según necesidad
  dot2.style.transform = `translate(-50%, -50%) translate(${xOffset}px, ${yOffset}px) rotate(${wobble}deg)`;
}

updateDotPosition2(angle2);

function animate2(timestamp2) {
  if (!lastTime2) {
    lastTime2 = timestamp2;
    startTime2 = timestamp2;
  }
  const deltaTime2 = (timestamp2 - lastTime2) / 1000;
  lastTime2 = timestamp2;

  if (accelerating2) {
    angularVelocity2 += acceleration2 * deltaTime2;
    if (timestamp2 - startTime2 >= 2 * 1000) {
      accelerating2 = false;
    }
  } else { 
    angularVelocity2 *= 0.98;
    if (angularVelocity2 <= 0.0001) { 
      angularVelocity2 = 0; 
      updateDotPosition2(angle2);
      return;
    }
  }

  angle2 += angularVelocity2;
  updateDotPosition2(angle2);
  animationFrame2 = requestAnimationFrame(animate2);
}

startBtn2.addEventListener('click', () => {
    cancelAnimationFrame(animationFrame2);
    lastTime2 = null;
    startTime2 = null;
    accelerating2 = true;
  
    // Leemos el valor ingresado en el input, pero SIN reiniciar la posición
    const inputVal2 = parseFloat(inputAcceleration2.value);
    if (!isNaN(inputVal2)) {
      acceleration2 = inputVal2;
    }
  
    animationFrame2 = requestAnimationFrame(animate2);
  });

// Selecciona todas las flip cards
const flipCards = document.querySelectorAll('.flip-card-inner');

// Función para voltear tarjetas en orden con retrasos
function flipCardsInOrder(className) {
    const flipOrder = [
        [document.querySelector('.flip-card7')], // Tarjeta 7
        [document.querySelector('.flip-card1')], // Tarjeta 1
        [document.querySelector('.flip-card2')], // Tarjeta 2
        [document.querySelector('.flip-card3'), document.querySelector('.flip-card4')], // Tarjetas 3 y 4
        [document.querySelector('.flip-card5'), document.querySelector('.flip-card6')] // Tarjetas 5 y 6
    ];

    flipOrder.forEach((group, index) => {
        setTimeout(() => {
            group.forEach(card => {
                if (card) {
                    card.querySelector('.flip-card-inner').classList.toggle(className); // Alterna la clase
                }
            });
        }, index * 500); // Retraso de 500ms entre cada grupo
    });
}


document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'h') { 
        flipCardsInOrder('rotate-90'); 
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'v') { 
        flipCardsInOrder('flipped'); 
    }
});

document.querySelectorAll('.flip-card-inner').forEach(card => {
    card.addEventListener('click', function () {
        this.classList.toggle('flipped');
    });
});

const flipCard1 = document.querySelector('.flip-card1');
const flipCard2 = document.querySelector('.flip-card2');
const flipCard1Inner = flipCard1.querySelector('.flip-card-inner');
const flipCard2Inner = flipCard2.querySelector('.flip-card-inner');

// Evita que el click en input o botón dentro de flip-card1 o flip-card2 voltee la tarjeta
document.querySelectorAll('.flip-card1 input, .flip-card1 button, .flip-card2 input, .flip-card2 button').forEach(el => {
    el.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
// Evento para flip-card1 (ya lo tienes)
flipCard1.addEventListener('click', function () {
    flipCard1.classList.toggle('expanded');
    flipCard1Inner.classList.toggle('flipped');

    if (flipCard1.classList.contains('expanded')) {
        flipCard2.classList.add('shrink');
        setTimeout(() => {
            flipCard2.classList.add('hide');
            flipCard2.classList.remove('shrink');
        }, 500);
    } else {
        flipCard2.classList.remove('hide');
        setTimeout(() => {
            flipCard2.classList.remove('shrink');
        }, 10);
    }
});

// Evento para flip-card2 (nuevo)
flipCard2.addEventListener('click', function () {
    flipCard2.classList.toggle('expanded');
    flipCard2Inner.classList.toggle('flipped');

    if (flipCard2.classList.contains('expanded')) {
        flipCard1.classList.add('shrink');
        setTimeout(() => {
            flipCard1.classList.add('hide');
            flipCard1.classList.remove('shrink');
        }, 500);
    } else {
        flipCard1.classList.remove('hide');
        setTimeout(() => {
            flipCard1.classList.remove('shrink');
        }, 10);
    }
});

const flipCard3 = document.querySelector('.flip-card3');
const flipCard4 = document.querySelector('.flip-card4');
const flipCard4Inner = flipCard4.querySelector('.flip-card-inner');

// Evita que el click en input o botón dentro de flip-card4 voltee la tarjeta
document.querySelectorAll('.flip-card4 input, .flip-card4 button').forEach(el => {
    el.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

flipCard4.addEventListener('click', function () {
    flipCard4.classList.toggle('expanded');
    flipCard4Inner.classList.toggle('flipped');

    if (flipCard4.classList.contains('expanded')) {
        flipCard3.classList.add('shrink-up');
        setTimeout(() => {
            flipCard3.classList.add('hide');
            flipCard3.classList.remove('shrink-up');
        }, 500);
    } else {
        flipCard3.classList.remove('hide');
        setTimeout(() => {
            flipCard3.classList.remove('shrink-up');
        }, 10);
    }
});

const flipCard5 = document.querySelector('.flip-card5');
const flipCard6 = document.querySelector('.flip-card6');
const flipCard5Inner = flipCard5.querySelector('.flip-card-inner');
const flipCard6Inner = flipCard6.querySelector('.flip-card-inner');

// Evita que el click en input o botón dentro de flip-card5 o flip-card6 voltee la tarjeta
document.querySelectorAll('.flip-card5 input, .flip-card5 button, .flip-card6 input, .flip-card6 button').forEach(el => {
    el.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

// Evento para flip-card5
flipCard5.addEventListener('click', function () {
    const video6 = flipCard6.querySelector('video');
    flipCard5.classList.toggle('expanded');
    flipCard5Inner.classList.toggle('flipped');

    if (flipCard5.classList.contains('expanded')) {
        if (video6) video6.style.display = 'none'; // Oculta el video6 antes de encoger flipCard6
        flipCard6.classList.add('shrink-up');
        setTimeout(() => {
            flipCard6.classList.add('hide');
            flipCard6.classList.remove('shrink-up');
        }, 500);
    } else {
        flipCard6.classList.remove('hide');
        setTimeout(() => {
            flipCard6.classList.remove('shrink-up');
            const video5 = flipCard5.querySelector('video');
            if (video6) video6.style.display = '';
            if (video5) video5.style.display = '';
        }, 10);
    }
});

// Evento para flip-card6
flipCard6.addEventListener('click', function () {
    const video5 = flipCard5.querySelector('video');
    flipCard6.classList.toggle('expanded');
    flipCard6Inner.classList.toggle('flipped');

    if (flipCard6.classList.contains('expanded')) {
        if (video5) video5.style.display = 'none'; // Oculta el video5 antes de encoger flipCard5
        flipCard5.classList.add('shrink-up');
        setTimeout(() => {
            flipCard5.classList.add('hide');
            flipCard5.classList.remove('shrink-up');
        }, 500);
    } else {
        flipCard5.classList.remove('hide');
        setTimeout(() => {
            flipCard5.classList.remove('shrink-up');
            const video6 = flipCard6.querySelector('video');
            if (video5) video5.style.display = '';
            if (video6) video6.style.display = '';
        }, 10);
    }
});

