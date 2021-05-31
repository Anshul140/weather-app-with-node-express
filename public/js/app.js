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
        errorMsg.textContent = 'Enter a location!'
    } else {
        // console.log(location)
        fetch(`http://localhost:3000/weather?address=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                    errorMsg.textContent = data.error
                } else {
                    const address = data.Location
                    const forecast = `It's currently ${data.Description} in ${location}. Current Temperature is ${data.Current_Temperature}. Rain Probability is ${data.Cloud_Cover}`

                    messageOne.textContent = `${address}`
                    messageTwo.textContent = `${forecast}`
                    console.log(address)
                    console.log(forecast)
                }
            })
    }
})
