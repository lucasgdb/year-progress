const year = document.querySelector('#year'),
  workDay = document.querySelector('#workDay'),
  dayName = document.querySelector('#dayName'),
  month = document.querySelector('#month'),
  day = document.querySelector('#day'),
  progressBar = document.querySelectorAll('.progressBarValue')

function updateProgress() {
  const date = new Date(),
    months = [31, 28 + (date.getFullYear() % 4 === 0 || date.getFullYear() % 400 === 0 && date.getFullYear() % 100 !== 0 ? 1 : 0),
      31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ],
    yearProgress = (() => {
      let sum = 0
      months.forEach((month, index) => {
        sum += index < date.getMonth() ? month : index === date.getMonth() ? date.getDate() : 0
      })

      sum--;
      sum += (date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) / 24

      const yearDays = (date.getFullYear() % 4 === 0 || date.getFullYear() % 400 === 0 && date.getFullYear() % 100 !== 0 ? 366 : 365)
      return sum / yearDays * 100
    })()

  if (yearProgress === 0) alert('Feliz ano novo!')

  year.textContent = `${Math.floor(yearProgress)}%`
  year.setAttribute('title', `${yearProgress}%`)
  progressBar[0].style.width = `${yearProgress}%`

  monthProgress = (() => {
    let sum = date.getDate() - 1

    sum += (date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) / 24

    return sum / months[date.getMonth()] * 100
  })()

  month.textContent = `${Math.floor(monthProgress)}%`
  month.setAttribute('title', `${monthProgress}%`)
  progressBar[1].style.width = `${monthProgress}%`

  dayProgress = ((date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) / 24) * 100

  day.textContent = `${Math.floor(dayProgress)}%`
  day.setAttribute('title', `${dayProgress}%`)
  progressBar[2].style.width = `${dayProgress}%`

  workDayProgress = (() => {
    let num = 0
    if (date.getHours() < 6)
      dayName.textContent = 'Madrugada'
    else if (date.getHours() < 12) {
      dayName.textContent = 'Manhã'
      num = 6
    } else if (date.getHours() < 18) {
      dayName.textContent = 'Tarde'
      num = 12
    } else {
      dayName.textContent = 'Noite'
      num = 18
    }
    return (date.getHours() - num + date.getMinutes() / 60 + date.getSeconds() / 3600) / 6 * 100
  })()

  workDay.textContent = `${Math.floor(workDayProgress)}%`
  workDay.setAttribute('title', `${workDayProgress}%`)
  progressBar[3].style.width = `${workDayProgress}%`
}

updateProgress()

window.onload = function () {
  document.querySelector('.lds-ring').style.display = 'none'
  document.querySelector('.progressContainer').style.display = 'block'
  const second = new Date().getSeconds(),
    interval = setInterval(() => {
      if (new Date().getSeconds() !== second) {
        updateProgress()
        setInterval(updateProgress, 1000)
        clearInterval(interval)
      }
    }, 1)
}