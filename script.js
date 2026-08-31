// ---------- Data (factual specs from icaurglobal.com, V27) ----------
var colors = [
  {name:'Desert Bronze', hex:'#a9784f'},
  {name:'Moonstone White', hex:'#ece8e2'},
  {name:'Deep Emerald Green', hex:'#0f3d2e'},
  {name:'Obsidian Black', hex:'#1a1a1a'},
  {name:'Glacier Silver', hex:'#c3c7c9'},
  {name:'Auric Gold Yellow', hex:'#cda54a'},
  {name:'Basalt Grey', hex:'#58595b'}
];

var DEFAULT_COLOR_IDX = 5;

var trims = [
  {name:'Classic', weight:2119, topSpeed:170, accel:8.9},
  {name:'Premium', weight:2355, topSpeed:180, accel:5.9},
  {name:'Flagship', weight:2355, topSpeed:180, accel:5.9}
];

var state = { colorIdx:DEFAULT_COLOR_IDX, trimIdx:0 };
var currentTrimStats = Object.assign({}, trims[0]);

var swatchGrid = document.getElementById('swatchGrid');
var trimSegmented = document.getElementById('trimSegmented');

colors.forEach(function(c, i){
  var el = document.createElement('div');
  el.className = 'swatch' + (i === DEFAULT_COLOR_IDX ? ' selected' : '');
  el.style.background = c.hex;
  el.title = c.name;
  el.addEventListener('click', function(){ selectColor(i); });
  swatchGrid.appendChild(el);
});

var pill = document.createElement('div');
pill.className = 'pill';
trimSegmented.appendChild(pill);
trims.forEach(function(t, i){
  var btn = document.createElement('button');
  btn.textContent = t.name;
  if (i === state.trimIdx) btn.classList.add('active');
  btn.addEventListener('click', function(){ selectTrim(i); });
  trimSegmented.appendChild(btn);
});

function positionPill(){
  var buttons = trimSegmented.querySelectorAll('button');
  var btn = buttons[state.trimIdx];
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

function colorSlug(name){
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-+|-+$)/g, '');
}

function updateVehicleImage(colorObj){
  var slug = colorSlug(colorObj.name);
  var exts = ['jpg', 'jpeg', 'png', 'webp'];
  var photoEl = document.getElementById('vehiclePhoto');
  var svgWrap = document.getElementById('vehicleSvgWrap');
  var idx = 0;
  function tryNext(){
    if (idx >= exts.length) {
      photoEl.style.display = 'none';
      svgWrap.style.display = 'block';
      return;
    }
    var path = 'images/v27-' + slug + '.' + exts[idx];
    idx++;
    var tester = new Image();
    tester.onload = function(){
      photoEl.src = path;
      photoEl.style.display = 'block';
      svgWrap.style.display = 'none';
    };
    tester.onerror = tryNext;
    tester.src = path;
  }
  tryNext();
}

function selectColor(i){
  state.colorIdx = i;
  document.querySelectorAll('.swatch').forEach(function(el, idx){ el.classList.toggle('selected', idx === i); });
  document.getElementById('colorName').textContent = colors[i].name;
  document.getElementById('tagColor').textContent = colors[i].name;
  document.documentElement.style.setProperty('--body-color', colors[i].hex);
  updateVehicleImage(colors[i]);
}

function selectTrim(i){
  state.trimIdx = i;
  document.querySelectorAll('.segmented button').forEach(function(el, idx){ el.classList.toggle('active', idx === i); });
  document.getElementById('trimName').textContent = trims[i].name;
  document.getElementById('tagTrim').textContent = trims[i].name;
  positionPill();
  animateValue(document.querySelector('[data-stat="weight"]'), currentTrimStats.weight, trims[i].weight, 600);
  animateValue(document.querySelector('[data-stat="topspeed"]'), currentTrimStats.topSpeed, trims[i].topSpeed, 600);
  animateValue(document.querySelector('[data-stat="accel"]'), currentTrimStats.accel, trims[i].accel, 600, 1);
  currentTrimStats = trims[i];
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

document.getElementById('hamburger').addEventListener('click', function(){
  document.getElementById('navLeft').classList.toggle('mobile-open');
});

var modalOverlay = document.getElementById('modalOverlay');
var confettiLayer = document.getElementById('confettiLayer');

document.getElementById('orderBtn').addEventListener('click', function(){
  document.getElementById('modalColor').textContent = colors[state.colorIdx].name;
  document.getElementById('modalTrim').textContent = trims[state.trimIdx].name;
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
selectColor(DEFAULT_COLOR_IDX);
