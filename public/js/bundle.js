const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const msgOne = document.querySelector('#message-1');
const msgTwo = document.querySelector('#message-2');
const msgThree = document.querySelector('#message-3');
const msgFour = document.querySelector('#message-4');
const msgFive = document.querySelector('#message-5');
const msgSix = document.querySelector('#message-6');

weatherForm.addEventListener('submit', (e)=>{
          e.preventDefault()
          const location = address.value;
          msgOne.textContent = 'Loading..'
          msgTwo.textContent = ''
          if(!location){
                    return msgTwo.textContent = 'Please provide an address'
          }
          fetch('/weather?address=' + location).then((response) => {
                    response.json().then((data) => {
                              if (data.error) {
                                        return msgTwo.textContent = data.error;
                              }
                              msgOne.textContent = 'Location: ' + data.location;
                              msgTwo.textContent = 'Summary: ' + data.summary;
                              msgThree.textContent = 'Temperature: ' + data.temperature;
                              msgFour.textContent = 'Highest Temperature: ' + data.tempHigh;
                              msgFive.textContent = 'Lowest Temperature: ' + data.tempLow;
                              msgSix.textContent = 'Humidity: ' + data.humidity;
                    })
          }) 
})