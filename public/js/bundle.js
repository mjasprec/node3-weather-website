const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const msgOne = document.querySelector('#message-one');
const msgTwo = document.querySelector('#message-two');


weatherForm.addEventListener('submit', (e)=>{
          e.preventDefault()
          const location = address.value;
          msgOne.textContent = 'Loading..'
          msgTwo.textContent = ''
          if(!location){
                    return msgTwo.textContent = 'Please provide an address'
          }
          fetch('http://localhost:3000/weather?address=' + location).then((response) => {
                    response.json().then((data) => {
                              if (data.error) {
                                        return msgTwo.textContent = data.error;
                              }
                              msgOne.textContent = data.location;
                              msgTwo.textContent = data.forecast;
                    })
          }) 
})