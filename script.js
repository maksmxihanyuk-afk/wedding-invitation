const intro=document.querySelector('#intro');
const openButton=document.querySelector('#openInvite');
const musicToggle=document.querySelector('#musicToggle');
const backgroundMusic=document.querySelector('#backgroundMusic');
backgroundMusic.volume=.28;

async function startMusic(){
  try{
    await backgroundMusic.play();
    musicToggle.classList.remove('muted');
    musicToggle.setAttribute('aria-label','Выключить музыку');
  }catch(error){
    musicToggle.classList.add('muted');
    musicToggle.setAttribute('aria-label','Включить музыку');
  }
}
function stopMusic(){
  backgroundMusic.pause();
  musicToggle.classList.add('muted');
  musicToggle.setAttribute('aria-label','Включить музыку');
}
musicToggle.addEventListener('click',()=>backgroundMusic.paused?startMusic():stopMusic());
openButton.addEventListener('click',()=>{
  intro.classList.add('hidden');
  document.body.style.overflow='auto';
  sessionStorage.setItem('inviteOpened','1');
  startMusic();
});
if(sessionStorage.getItem('inviteOpened'))intro.classList.add('hidden');else document.body.style.overflow='hidden';

const wedding=new Date('2026-09-11T12:00:00+05:00');
function tick(){let d=Math.max(0,wedding-new Date());const units=[864e5,36e5,6e4,1e3];['days','hours','minutes','seconds'].forEach((id,i)=>{const n=Math.floor(d/units[i]);document.getElementById(id).textContent=String(n).padStart(2,'0');d%=units[i];});}tick();setInterval(tick,1000);
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
const form=document.querySelector('#rsvpForm');form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);localStorage.setItem('wedding-rsvp',JSON.stringify({name:data.get('name'),attendance:data.get('attendance'),drinks:data.getAll('drink'),comment:data.get('comment'),savedAt:new Date().toISOString()}));form.style.display='none';document.querySelector('#thanks').classList.add('show');});
