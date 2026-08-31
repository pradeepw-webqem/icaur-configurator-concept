// ---------- Data ----------
var colors = [
  {name:'Warm Orange', hex:'#ff6a1a'},
  {name:'Glacier White', hex:'#eef1f2'},
  {name:'Storm Silver', hex:'#b7bcc2'},
  {name:'Olive Green', hex:'#5c6a4e'},
  {name:'Gunmetal Grey', hex:'#4b4f54'},
  {name:'Carbon Black', hex:'#2a2a2e'}
];

var wheelsData = [
  {name:'21" Alloy Carbon', rim:'#3a3a3f', priceDelta:0},
  {name:'20" Matte Black', rim:'#151516', priceDelta:-15}
];

var drivetrains = [
  {name:'RWD', torque:260, power:140, accel:8.2, range:460, battery:81.76, priceDelta:-40},
  {name:'AWD', torque:292, power:155, accel:7.5, range:430, battery:81.76, priceDelta:0},
  {name:'4x4 Off-Road', torque:340, power:170, accel:8.8, range:380, battery:81.76, priceDelta:65}
];

var BASE_PRICE = 959;
var state = { colorIdx:0, wheelIdx:0, driveIdx:1 };
var currentStats = Object.assign({}, drivetrains[1]);
var currentPrice = BASE_PRICE;

var swatchGrid = document.getElementById('swatchGrid');
var wheelGrid = document.getElementById('wheelGrid');
var driveSegmented = document.getElementById('driveSegmented');

colors.forEach(function(c, i){
  var el = document.createElement('div');
  el.className = 'swatch' + (i === 0 ? ' selected' : '');
  el.style.background = c.hex;
  el.title = c.name;
  el.addEventListener('click', function(){ selectColor(i); });
  swatchGrid.appendChild(el);
});

function wheelIconSVG(rim){
  return '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="#111"/><circle cx="20" cy="20" r="10" fill="' + rim + '"/><g stroke="#777" stroke-width="2"><line x1="20" y1="10" x2="20" y2="30"/><line x1="10" y1="20" x2="30" y2="20"/><line x1="13" y1="13" x2="27" y2="27"/><line x1="13" y1="27" x2="27" y2="13"/></g><circle cx="20" cy="20" r="3" fill="#999"/></svg>';
}

wheelsData.forEach(function(w, i){
  var el = document.createElement('div');
  el.className = 'wheel-opt' + (i === 0 ? ' selected' : '');
  el.innerHTML = wheelIconSVG(w.rim);
  el.title = w.name;
  el.addEventListener('click', function(){ selectWheel(i); });
  wheelGrid.appendChild(el);
});

var pill = document.createElement('div');
pill.className = 'pill';
driveSegmented.appendChild(pill);
drivetrains.forEach(function(d, i){
  var btn = document.createElement('button');
  btn.textContent = d.name;
  if (i === state.driveIdx) btn.classList.add('active');
  btn.addEventListener('click', function(){ selectDrive(i); });
  driveSegmented.appendChild(btn);
});

function positionPill(){
  var buttons = driveSegmented.querySelectorAll('button');
  var btn = buttons[state.driveIdx];
  if (!btn) return;
  pill.style.width = btn.offsetWidth + 'px';
  pill.style.transform = 'translateX(' + (btn.offsetLeft - 4) + 'px)';
}
window.addEventListener('resize', positionPill);

function animateValue(el, start, end, duration, decimals){
  decimals = decimals || 0;
  var startTime = performance.now();
  function tick(now){
    var progress = Math.min((now - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var value = start + (end - start) * eased;
    el.textContent = decimals ? value.toFixed(decimals) : Math.round(value);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function updateStats(newStats){
  animateValue(document.querySelector('[data-stat="torque"]'), currentStats.torque, newStats.torque, 600);
  animateValue(document.querySelector('[data-stat="battery"]'), currentStats.battery, newStats.battery, 600, 2);
  animateValue(document.querySelector('[data-stat="range"]'), currentStats.range, newStats.range, 600);
  animateValue(document.querySelector('[data-stat="accel"]'), currentStats.accel, newStats.accel, 600, 1);
  animateValue(document.querySelector('[data-stat="power"]'), currentStats.power, newStats.power, 600);
  currentStats = newStats;
}

function updatePrice(){
  var newPrice = BASE_PRICE + wheelsData[state.wheelIdx].priceDelta + drivetrains[state.driveIdx].priceDelta;
  var priceEl = document.getElementById('priceValue');
  animateValue(priceEl, currentPrice, newPrice, 500);
  currentPrice = newPrice;
}

function selectColor(i){
  state.colorIdx = i;
  document.querySelectorAll('.swatch').forEach(function(el, idx){ el.classList.toggle('selected', idx === i); });
  document.getElementById('colorName').textContent = colors[i].name;
  document.getElementById('tagColor').textContent = colors[i].name;
  document.documentElement.style.setProperty('--body-color', colors[i].hex);
}

function selectWheel(i){
  state.wheelIdx = i;
  document.querySelectorAll('.wheel-opt').forEach(function(el, idx){ el.classList.toggle('selected', idx === i); });
  document.getElementById('wheelName').textContent = wheelsData[i].name;
  document.documentElement.style.setProperty('--wheel-rim', wheelsData[i].rim);
  updatePrice();
}

function selectDrive(i){
  state.driveIdx = i;
  document.querySelectorAll('.segmented button').forEach(function(el, idx){ el.classList.toggle('active', idx === i); });
  document.getElementById('driveName').textContent = drivetrains[i].name;
  document.getElementById('tagDrive').textContent = drivetrains[i].name;
  positionPill();
  updateStats(drivetrains[i]);
  updatePrice();
}

var vehicleStage = document.getElementById('vehicleStage');
document.getElementById('rotateLeft').addEventListener('click', function(){ vehicleStage.classList.toggle('flipped'); });
document.getElementById('rotateRight').addEventListener('click', function(){ vehicleStage.classList.toggle('flipped'); });

var playSpin = document.getElementById('playSpin');
playSpin.addEventListener('click', function(){
  var spinning = vehicleStage.classList.toggle('spinning');
  playSpin.innerHTML = spinning ? '&#10074;&#10074;' : '&#9654;';
  playSpin.classList.toggle('active', spinning);
});

var financeToggle = document.getElementById('financeToggle');
var financeDropdown = document.getElementById('financeDropdown');
financeToggle.addEventListener('click', function(e){
  e.stopPropagation();
  financeToggle.classList.toggle('open');
  financeDropdown.classList.toggle('open');
});
document.addEventListener('click', function(e){
  if (!financeToggle.contains(e.target) && !financeDropdown.contains(e.target)) {
    financeToggle.classList.remove('open');
    financeDropdown.classList.remove('open');
  }
});

document.getElementById('hamburger').addEventListener('click', function(){
  document.getElementById('navLeft').classList.toggle('mobile-open');
});

var modalOverlay = document.getElementById('modalOverlay');
var confettiLayer = document.getElementById('confettiLayer');

document.getElementById('orderBtn').addEventListener('click', function(){
  document.getElementById('modalColor').textContent = colors[state.colorIdx].name;
  document.getElementById('modalDrive').textContent = drivetrains[state.driveIdx].name;
  document.getElementById('modalPrice').textContent = currentPrice;
  modalOverlay.classList.add('show');
  launchConfetti();
});

document.getElementById('modalClose').addEventListener('click', function(){
  modalOverlay.classList.remove('show');
  confettiLayer.innerHTML = '';
});

function launchConfetti(){
  confettiLayer.innerHTML = '';
  var colorsPool = ['#ff6a1a', '#ff8a4d', '#ffd166', '#ffffff', '#4dd6a8'];
  for (var i = 0; i < 60; i++) {
    var piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colorsPool[Math.floor(Math.random() * colorsPool.length)];
    piece.style.animationDuration = (2 + Math.random() * 1.5) + 's';
    piece.style.animationDelay = (Math.random() * 0.4) + 's';
    piece.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
    confettiLayer.appendChild(piece);
  }
}

positionPill();
document.documentElement.style.setProperty('--body-color', colors[0].hex);
document.documentElement.style.setProperty('--wheel-rim', wheelsData[0].rim);
