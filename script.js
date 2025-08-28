// Nền sao
const starCanvas = document.getElementById("stars");
const ctx = starCanvas.getContext("2d");
starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;

const stars = Array.from({ length: 710 }, () => ({
  x: Math.random() * starCanvas.width,
  y: Math.random() * starCanvas.height,
  radius: Math.random() * 1 + 0.5,
  alpha: Math.random(),
  delta: 0.001 + Math.random() * 0.005
}));

function drawStars() {
  const gradient = ctx.createRadialGradient(
    starCanvas.width / 2, starCanvas.height / 2, 100,
    starCanvas.width / 2, starCanvas.height / 2, starCanvas.height
  );
  gradient.addColorStop(0, "#03427c");
  gradient.addColorStop(0.4, "#0b033a");
  gradient.addColorStop(1, "#000000");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, starCanvas.width, starCanvas.height);

  stars.forEach(star => {
    star.alpha += star.delta;
    if (star.alpha <= 0 || star.alpha >= 1) star.delta = -star.delta;
    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });

  ctx.globalAlpha = 2;
  requestAnimationFrame(drawStars);
}
drawStars();

// Vẽ chòm sao
const aquariusCanvas = document.getElementById("aquarius");
const aqCtx = aquariusCanvas.getContext("2d");
aquariusCanvas.width = window.innerWidth;
aquariusCanvas.height = window.innerHeight;

// Toạ độ chòm sao Bảo Bình 
const originalStars = [
   { x: 1000, y: 250 },  // [0] sao trên đầu
  { x: 830,  y: 340 },  // [1]
  { x: 700,  y: 410 },  // [2]
  { x: 600,  y: 460 },  // [3]
  { x: 640,  y: 660 },  // [4] nhánh phụ
  { x: 490,  y: 520 },  // [5]
  { x: 480,  y: 670 },  // [6]
  { x: 400,  y: 680 },  // [7]
  { x: 410,  y: 810 },  // [8]
  { x: 770,  y: 610 },  // [9] cuối nhánh phụ
  { x: 550,  y: 1040 },  // [10]
  { x: 570,  y: 890 },  // [11]
  { x: 720,  y: 850 }, // [12]
  { x: 950,  y: 900 }  // [13]
];

// Các đường kết nối giữa các sao
const connections = [
   [0, 1], [1, 2], [2, 3],         // nhánh chính trên
  [3, 5],                         // rẽ nhánh phụ lên trên
  [4, 5], [5, 6], [6, 7], [7, 8], // tiếp tục thân chính
  [8, 10], [9, 4], [10, 11],
  [11, 12], [12, 13]  
];

function drawConstellation() {
  const canvasWidth = aquariusCanvas.width;
  const canvasHeight = aquariusCanvas.height;

  const scale = 0.5;
  const constellationStars = originalStars.map(star => ({
    x: star.x * scale,
    y: star.y * scale
  }));

  const minX = Math.min(...constellationStars.map(s => s.x));
  const maxX = Math.max(...constellationStars.map(s => s.x));
  const minY = Math.min(...constellationStars.map(s => s.y));
  const maxY = Math.max(...constellationStars.map(s => s.y));
  const width = maxX - minX;
  const height = maxY - minY;

  const offsetX = (canvasWidth - width) / 2 - minX;
  const offsetY = (canvasHeight - height) / 2 - minY;

  aqCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  aqCtx.strokeStyle = "white";
  aqCtx.fillStyle = "white";
  aqCtx.lineWidth = 1.5;

  // Vẽ đường nối
  connections.forEach(([startIdx, endIdx]) => {
    const start = constellationStars[startIdx];
    const end = constellationStars[endIdx];
    aqCtx.beginPath();
    aqCtx.moveTo(start.x + offsetX, start.y + offsetY);
    aqCtx.lineTo(end.x + offsetX, end.y + offsetY);
    aqCtx.stroke();
  });

  // Vẽ sao
  constellationStars.forEach(star => {
    const x = star.x + offsetX;
    const y = star.y + offsetY;
    aqCtx.beginPath();
    aqCtx.arc(x, y, 4, 0, Math.PI * 2);
    aqCtx.fill();
  });
}

drawConstellation();

// Resize
window.addEventListener("resize", () => {
  aquariusCanvas.width = window.innerWidth;
  aquariusCanvas.height = window.innerHeight;
  
  drawConstellation();
});