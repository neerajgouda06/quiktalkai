
const menu=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#primary-nav');
function closeMenu(returnFocus=false){menu?.setAttribute('aria-expanded','false');navigation?.classList.remove('is-open');if(returnFocus)menu?.focus();}
menu?.addEventListener('click',()=>{const opening=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(opening));navigation.classList.toggle('is-open',opening);});
navigation?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true')closeMenu(true);});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
window.matchMedia('(min-width: 901px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
document.querySelectorAll('audio').forEach(audio=>audio.addEventListener('error',()=>{const status=audio.parentElement.querySelector('[data-audio-status]');if(status){status.hidden=false;status.textContent='The recording could not load. You can still read the conversation below.';}}));


document.documentElement.classList.add("js");
