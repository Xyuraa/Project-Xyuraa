/* ============================
   LOADER
============================= */
(function () {
  const bar = document.getElementById('ld-bar');
  const pct = document.getElementById('ld-pct');
  const txt = document.getElementById('ld-txt');
  const loader = document.getElementById('loader');
  const msgs = ['INITIALIZING', 'LOADING ASSETS', 'BUILDING UI', 'ALMOST READY'];
  let p = 0, ti = 0;

  const iv = setInterval(() => {
    p = Math.min(p + Math.random() * 16 + 4, 100);
    bar.style.width = p + '%';
    pct.textContent = Math.floor(p) + '%';
    if (p > 25 && ti === 0) { txt.textContent = msgs[1]; ti = 1; }
    if (p > 55 && ti === 1) { txt.textContent = msgs[2]; ti = 2; }
    if (p > 80 && ti === 2) { txt.textContent = msgs[3]; ti = 3; }
    if (p >= 100) {
      clearInterval(iv);
      pct.textContent = '100%';
      setTimeout(() => {
        loader.classList.add('ld-exit');
        setTimeout(() => loader.style.display = 'none', 900);
      }, 400);
    }
  }, 80);
})();

/* ============================
   CUSTOM CURSOR
============================= */
const cd = document.getElementById('c-dot');
const cr = document.getElementById('c-ring');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cd.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
});

(function animCursor() {
  tx += (mx - tx - 19) * 0.1;
  ty += (my - ty - 19) * 0.1;
  cr.style.transform = `translate(${tx}px, ${ty}px)`;
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .sk-card, .pj-card, .sc, .soc-row').forEach(el => {
  el.addEventListener('mouseenter', () => cr.classList.add('hov'));
  el.addEventListener('mouseleave', () => cr.classList.remove('hov'));
});

/* ============================
   MAGNETIC BUTTONS
============================= */
document.querySelectorAll('.btn-m').forEach(b => {
  b.addEventListener('mousemove', e => {
    const r = b.getBoundingClientRect();
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
  });
  b.addEventListener('mouseleave', () => b.style.transform = '');
});

/* ============================
   3D CARD TILT
============================= */
document.querySelectorAll('.sk-card, .pj-card').forEach(c => {
  c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    c.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * -10}deg) rotateY(${(x - 0.5) * 10}deg) scale(1.02)`;
    const sh = c.querySelector('.sk-shine');
    if (sh) { sh.style.setProperty('--sx', x * 100 + '%'); sh.style.setProperty('--sy', y * 100 + '%'); }
  });
  c.addEventListener('mouseleave', () => {
    c.style.transition = 'transform .5s cubic-bezier(0.16,1,0.3,1), border-color .3s, background .3s, box-shadow .4s';
    c.style.transform = '';
    setTimeout(() => c.style.transition = '', 500);
  });
});

/* ============================
   PARTICLES
============================= */
const cvs = document.getElementById('pc');
const ctx = cvs.getContext('2d');

function resizeCanvas() {
  cvs.width = cvs.offsetWidth;
  cvs.height = cvs.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * cvs.width;
    this.y = Math.random() * cvs.height;
    this.s = Math.random() * 1.4 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = -Math.random() * 0.55 - 0.2;
    this.o = Math.random() * 0.45 + 0.1;
    this.life = 0;
    this.max = Math.random() * 180 + 80;
  }
  update() { this.x += this.vx; this.y += this.vy; this.life++; if (this.life > this.max || this.y < 0) this.reset(); }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,200,255,${this.o * (1 - this.life / this.max)})`;
    ctx.fill();
  }
}

const pts = Array.from({ length: 80 }, () => new Particle());
(function animParticles() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  pts.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animParticles);
})();

/* ============================
   NAV SCROLL STATE
============================= */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 260) cur = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--cyan)' : '';
  });
});

/* ============================
   SECTION TITLE SPLIT REVEAL
============================= */
const tio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sw').forEach(w => w.classList.add('in'));
      tio.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.stitle').forEach(t => tio.observe(t));

/* ============================
   SCROLL REVEAL
============================= */
const revObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 55);
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.rv, .rvl, .rvr').forEach(el => revObs.observe(el));

/* ============================
   TEXT SCRAMBLE (Nav Logo)
============================= */
class Scramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#@0123456789';
    this.upd = this.upd.bind(this);
  }
  set(txt) {
    const old = this.el.textContent;
    const len = Math.max(old.length, txt.length);
    return new Promise(res => {
      this.q = [];
      for (let i = 0; i < len; i++) {
        const a = old[i] || '', b = txt[i] || '';
        const s = Math.floor(Math.random() * 22), e = s + Math.floor(Math.random() * 22);
        this.q.push({ a, b, s, e });
      }
      cancelAnimationFrame(this.fr);
      this.f = 0; this.res = res; this.upd();
    });
  }
  upd() {
    let out = '', done = 0;
    for (let i = 0; i < this.q.length; i++) {
      let { a, b, s, e, ch } = this.q[i];
      if (this.f >= e) { done++; out += b; }
      else if (this.f >= s) {
        if (!ch || Math.random() < 0.28) {
          ch = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.q[i].ch = ch;
        }
        out += `<span style="color:var(--cyan);opacity:.55">${ch}</span>`;
      } else { out += a; }
    }
    this.el.innerHTML = out;
    if (done === this.q.length) this.res();
    else { this.fr = requestAnimationFrame(this.upd); this.f++; }
  }
}

const logo = document.querySelector('.nav-logo');
if (logo) {
  const sc = new Scramble(logo);
  let busy = false;
  logo.addEventListener('mouseenter', () => {
    if (busy) return; busy = true;
    sc.set('</dev>').then(() => busy = false);
  });
  logo.addEventListener('mouseleave', () => {
    if (busy) return; busy = true;
    sc.set('<\u200B/dev>').then(() => busy = false);
  });
}

/* ============================
   COUNTER ANIMATION
============================= */
const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const tgt = parseInt(el.dataset.target);
    if (isNaN(tgt)) return;
    let s = null;
    const step = ts => {
      if (!s) s = ts;
      const pr = Math.min((ts - s) / 1400, 1);
      const ea = 1 - Math.pow(1 - pr, 3);
      el.textContent = Math.floor(ea * tgt) + (pr < 1 ? '...' : '+');
      if (pr < 1) requestAnimationFrame(step);
      else el.textContent = tgt + '+';
    };
    requestAnimationFrame(step);
    cio.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.sn[data-target]').forEach(el => cio.observe(el));

/* ============================
   COPY EMAIL
============================= */
function copyEmail(btn) {
  navigator.clipboard.writeText('your@email.com');
  const s = btn.querySelector('span');
  s.textContent = 'Copied! ✓';
  btn.style.cssText = 'background:var(--cyan);color:#000;border-color:var(--cyan)';
  setTimeout(() => { s.textContent = 'Copy Email'; btn.style.cssText = ''; }, 2200);
}

/* ============================
   SMOOTH ANCHOR SCROLL
============================= */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});
