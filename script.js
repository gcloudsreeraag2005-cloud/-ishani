const canvas = document.querySelector("#confetti");
const ctx = canvas.getContext("2d");
const toast = document.querySelector("#toast");
const buttons = [document.querySelector("#surpriseButton"), document.querySelector("#finalButton")];

let confetti = [];
let animationFrame;
let messageIndex = 0;
const colors = ["#b84d64", "#f6b78e", "#d59a45", "#fff8f0", "#873143"];
const messages = [
  "Happy 21st, my love. You are my favorite everything.",
  "Secret line: I still get a little happier every time I see your face.",
  "Another secret: your smile is my favorite place to come back to.",
  "Birthday truth: I am so proud of you, and so lucky that I get to love you.",
  "One more: every version of the future looks better with you in it."
];

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}

function makePiece() {
  return {
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * window.innerHeight * 0.4,
    size: 7 + Math.random() * 9,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 2.4 + Math.random() * 4,
    rotation: Math.random() * Math.PI,
    spin: -0.16 + Math.random() * 0.32,
    drift: -1.5 + Math.random() * 3
  };
}

function drawConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  confetti = confetti.filter((piece) => piece.y < window.innerHeight + 30);
  for (const piece of confetti) {
    piece.y += piece.speed;
    piece.x += piece.drift;
    piece.rotation += piece.spin;

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 3, piece.size, piece.size * 0.62);
    ctx.restore();
  }

  if (confetti.length) {
    animationFrame = requestAnimationFrame(drawConfetti);
  } else {
    cancelAnimationFrame(animationFrame);
  }
}

function showToast() {
  toast.textContent = messages[messageIndex % messages.length];
  messageIndex += 1;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 4300);
}

function celebrate() {
  resizeCanvas();
  confetti = Array.from({ length: 180 }, makePiece);
  cancelAnimationFrame(animationFrame);
  drawConfetti();
  showToast();
}

buttons.forEach((button) => button.addEventListener("click", celebrate));
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
