// ---------- year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- dark / light mode ----------
const toggle = document.getElementById('themeToggle');
const root = document.documentElement;
const saved = null; // no localStorage per project constraints; session-only toggle
let isLight = false;

toggle.addEventListener('click', () => {
  isLight = !isLight;
  root.setAttribute('data-theme', isLight ? 'light' : 'dark');
  toggle.textContent = isLight ? '◑' : '◐';
});

// ---------- terminal boot / typing effect ----------
const cmdEl = document.getElementById('typedCmd');
const outputEl = document.getElementById('typedOutput');
const cursorEl = document.getElementById('typeCursor');

const command = 'whoami --verbose';
const outputLines = [
  ['name', 'Beka Gorgiladze'],
  ['role', 'Computer Science Student'],
  ['focus', 'Systems, Backend, Java, SQL, C#'],
  ['university', 'Kutaisi International University'],
  ['status', 'open to internships']
];

function typeCommand(text, el, speed, done){
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length){
      clearInterval(timer);
      if (done) done();
    }
  }, speed);
}

function printOutput(lines){
  let i = 0;
  function next(){
    if (i >= lines.length) return;
    const [k, v] = lines[i];
    const row = document.createElement('div');
    row.innerHTML = `<span class="k">${k.padEnd(11,' ')}</span><span class="v">${v}</span>`;
    outputEl.appendChild(row);
    i++;
    setTimeout(next, 220);
  }
  next();
}

// respect reduced motion
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReduced){
  cmdEl.textContent = command;
  printOutputInstant();
} else {
  typeCommand(command, cmdEl, 55, () => {
    setTimeout(() => printOutput(outputLines), 300);
  });
}

function printOutputInstant(){
  outputLines.forEach(([k, v]) => {
    const row = document.createElement('div');
    row.innerHTML = `<span class="k">${k.padEnd(11,' ')}</span><span class="v">${v}</span>`;
    outputEl.appendChild(row);
  });
}