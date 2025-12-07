// --- SETUP FOR CANVAS FIREWORKS ---
const canvas = document.createElement("canvas");
canvas.id = "fireworksCanvas";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = 9999;

canvas.width = innerWidth;
canvas.height = innerHeight;

window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

// --- FIREWORK PARTICLES ---
const particles = [];

function spawnFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;

  const colors = ["#ff4d4d", "#ffd11a", "#66ccff", "#ff66ff", "#ffffff"];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x,
      y,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 5 + 2,
      radius: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 60
    });
  }

  // Play sound if available
  const sound = document.getElementById("fireworkSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.speed *= 0.95;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animateFireworks);
}

animateFireworks();

// --- PUBLIC FUNCTION YOU CAN CALL --- 
window.fireworks = {
  boom: spawnFirework
};