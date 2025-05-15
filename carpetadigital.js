const rotatingPoint = document.getElementById('rotatingPoint');
const speedInput = document.getElementById('speedInput');

let angle = 0;
let speed = parseInt(speedInput.value);
let radius = 100;
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
  const wobble = Math.sin(angle2 * (Math.PI / 180)) * angularVelocity2 * 10; // Ajusta el factor según necesidad
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