// Nav background on scroll
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile burger (simple toggle showing links stacked)
const burger = document.getElementById('burger');
const links = document.querySelector('nav.links');
burger.addEventListener('click', () => {
  const open = links.style.display === 'flex';
  links.style.display = open ? 'none' : 'flex';
  links.style.cssText += open ? '' : 'position:fixed;top:70px;left:0;right:0;background:#1b1512;flex-direction:column;padding:24px 6vw;gap:20px;';
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Sun arc tracker
const path = document.getElementById('sunPath');
const dot = document.getElementById('sunDot');
const pathLength = path.getTotalLength();
function updateSun(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = Math.min(Math.max(scrollTop / docHeight, 0), 1);
  const point = path.getPointAtLength(pct * pathLength);
  dot.setAttribute('cx', point.x);
  dot.setAttribute('cy', point.y);
}
window.addEventListener('scroll', updateSun);
window.addEventListener('resize', updateSun);
updateSun();

// Testimonial carousel
const slides = document.querySelectorAll('.t-slide');
const dotsWrap = document.getElementById('tDots');
let current = 0;
slides.forEach((_, i) => {
  const b = document.createElement('button');
  if (i === 0) b.classList.add('active');
  b.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(b);
});
const dots = dotsWrap.querySelectorAll('button');
function goTo(i){
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = i;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}
setInterval(() => { goTo((current + 1) % slides.length); }, 5500);
