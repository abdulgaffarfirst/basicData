const scriptURL = 'https://script.google.com/macros/s/AKfycbzfPBnRKcaad_yVHAFzMqIbCB6tku-JJZH6IhHrD0zf4onTm26eGc4zcuLMLYWNgS4/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Form is submitted" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
