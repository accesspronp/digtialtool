
document.querySelectorAll('.wish').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
  });
});
