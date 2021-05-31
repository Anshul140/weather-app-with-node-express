console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
const errorMsg = document.getElementById('error')

// messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    if (location === '' || location === undefined) {
        console.log('Enter a location!')
        errorMsg.innerHTML = 'No location was provided! Enter a location'
        messageTwo.innerHTML = ''
        messageOne.innerHTML = ''
    } else {
        // console.log(location)
        fetch(`/weather?address=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                    errorMsg.textContent = data.error
                    messageTwo.innerHTML = ''
                    messageOne.innerHTML = ''
                } else {
                    errorMsg.innerHTML = ''
                    messageOne.innerHTML = `${data.Location}`
                    messageTwo.innerHTML = `It's currently ${data.Description} out there <br>
                                            Current Temperature is ${data.Current_Temperature}<br>
                                            It feels like ${data.Feels_Like_Temperature} <br>
                                            Cloud cover is ${data.Cloud_Cover} <br>
                                            Humidity level is ${data.Humidity}`
                    // console.log(address)
                    // console.log(forecast)
                }
            })
    }
})
