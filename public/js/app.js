console.log('Client side JS loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value

  messageOne.textContent = 'Loading Weather info'
  messageTwo.textContent = ''

  fetch('http://localhost:3000/weather?address='+location).then((response)=> {
    response.json().then( (data) => {
      if(data.error){
        return messageOne.textContent = data.error
      }
      messageOne.textContent = data.forecast.forecastLocation
      messageTwo.textContent = data.forecast.forecastText
    })
  })
})