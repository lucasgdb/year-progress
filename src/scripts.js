const year = document.querySelector('#year'),
  workDay = document.querySelector('#workDay'),
  dayName = document.querySelector('#dayName'),
  month = document.querySelector('#month'),
  day = document.querySelector('#day'),
  progressBar = document.querySelectorAll('.progressBarValue');

function updateProgress() {
  const date = new Date(),
    months = [31, 28 + (date.getFullYear() % 4 === 0 || date.getFullYear() % 400 === 0 && date.getFullYear() % 100 !== 0 ? 1 : 0),
      31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];
  yearProgress = (() => {
    let sum = 0;
    months.forEach((month, index) => {
      sum += index < date.getMonth() ? month : index === date.getMonth() ? date.getDate() : 0;
    });

    sum--;
    sum += (date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) / 24;

    const yearDays = (date.getFullYear() % 4 === 0 || date.getFullYear() % 400 === 0 && date.getFullYear() % 100 !== 0 ? 366 : 365);
    return sum / yearDays * 100;
  })();

  if (yearProgress === 0) alert('Happy new year!')

  year.textContent = `${toFixed(yearProgress)}%`;
  year.setAttribute('title', `${yearProgress}%`);
  progressBar[0].style.width = `${yearProgress}%`;

  monthProgress = (() => {
    let sum = date.getDate() - 1;

    sum += (date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) / 24;

    return sum / months[date.getMonth()] * 100;
  })();

  month.textContent = `${toFixed(monthProgress)}%`;
  month.setAttribute('title', `${monthProgress}%`);
  progressBar[1].style.width = `${monthProgress}%`;

  dayProgress = ((date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) / 24) * 100;

  day.textContent = `${toFixed(dayProgress)}%`;
  day.setAttribute('title', `${dayProgress}%`);
  progressBar[2].style.width = `${dayProgress}%`;

  workDayProgress = (() => {
    let num = 0;
    if (date.getHours() < 6)
      dayName.textContent = 'Dawn';
    else if (date.getHours() < 12) {
      dayName.textContent = 'Morning';
      num = 6
    } else if (date.getHours() < 18) {
      dayName.textContent = 'Evening';
      num = 12
    } else {
      dayName.textContent = 'Night';
      num = 18
    }
    return (date.getHours() - num + date.getMinutes() / 60 + date.getSeconds() / 3600) / 6 * 100
  })();

  workDay.textContent = `${toFixed(workDayProgress)}%`;
  workDay.setAttribute('title', `${workDayProgress}%`);
  progressBar[3].style.width = `${workDayProgress}%`
}

function toFixed(number) {
  let num = number.toString().substring(0, number.toString().indexOf('.') + 3);
  return (num.length !== 5 && num.length !== 4) ? number.toFixed(2) : num;
}

window.onload = function () {
  document.querySelector('.lds-ring').style.display = 'none';
  document.querySelector('.progressContainer').style.display = 'block';
  setInterval(updateProgress, 1)
}