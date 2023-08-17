const url = 'https://api.openweathermap.org/data/2.5/weather?'
const APIkey = 'aee547fe9e226d61c52670c75b774740'
const btn = document.querySelector('#searchBtn')
let lon, lat

const weather = () => {
  const cityname = document.querySelector('#input').value
  const limit = 1

  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=${limit}&appid=${APIkey}`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      lon = data[0].lon
      lat = data[0].lat

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&limit=${limit}&units=metric`
      )
        .then((res) => res.json())
        .then((forecastData) => {
          console.log(forecastData)

          const weatherCode = forecastData.list[0].weather[0].id
          const feelsLike = forecastData.list[0].main.feels_like
          const forecastContainer = document.querySelector('#forecastContainer')
          forecastContainer.innerHTML = ''

          const forecast = forecastData.list[0]

          const forecastElement = document.createElement('div')
          const temperatureInK = forecast.main.temp
          // let temperature = (temperatureInK - 273.15).toFixed(2)
          const weather = forecast.weather[0].description
          const weatherDescription = forecast.weather[0].description
          forecastContainer.className = ''

          if (weatherCode >= 200 && weatherCode < 300) {
            forecastContainer.classList.add('thunderstorm')
          } else if (weatherCode >= 300 && weatherCode < 400) {
            forecastContainer.classList.add('drizzle')
          } else if (weatherCode >= 500 && weatherCode < 600) {
            forecastContainer.classList.add('rain')
          } else if (weatherCode >= 600 && weatherCode < 700) {
            forecastContainer.classList.add('snow')
          } else if (weatherCode >= 700 && weatherCode < 800) {
            forecastContainer.classList.add('atmosphere')
          } else if (weatherCode === 800) {
            forecastContainer.classList.add('clear-sky')
          } else if (weatherCode > 800) {
            forecastContainer.classList.add('clouds')
          }

          forecastElement.innerHTML = `
            <h2>Temperature: ${temperatureInK} °C</h2>
            <h4>Feels like: ${feelsLike} °C
            <h2>Weather: ${weather}</h2>
            `
          forecastContainer.appendChild(forecastElement)
        })
    })
    .catch((error) => {
      console.log('Error fetching forecast data:', error)
    })

    .catch((error) => {
      console.error('Error fetching location data:', error)
    })
}

btn.addEventListener('click', (element) => {
  element.preventDefault()
  weather()
})
