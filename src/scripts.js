const year = document.querySelector('#year');
const workDay = document.querySelector('#workDay');
const dayName = document.querySelector('#dayName');
const month = document.querySelector('#month');
const day = document.querySelector('#day');
const progressBar = document.querySelectorAll('.progressBarValue');

const change = number => `${Math.floor(number)}.${number.toString().includes('.') ? number.toString().split('.')[1][0] : 0}`;

function updateProgress() {
    const date = new Date();
    const months = [31, 28 + (date.getFullYear() % 4 === 0 || date.getFullYear() % 400 === 0 && date.getFullYear() % 100 !== 0 ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const yearProgress = (() => {
        let sum = 0;

        months.forEach((month, index) => sum += index < date.getMonth() ? month : index === date.getMonth() ? date.getDate() : 0);

        sum--;
        sum += (date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) / 24;

        const yearDays = (date.getFullYear() % 4 === 0 || date.getFullYear() % 400 === 0 && date.getFullYear() % 100 !== 0 ? 366 : 365);

        return sum / yearDays * 100;
    })()

    if (yearProgress === 0) alert('Feliz ano novo!');

    year.textContent = `${change(yearProgress)}%`;
    year.setAttribute('title', `${yearProgress}%`);
    progressBar[0].style.width = `${yearProgress}%`;

    monthProgress = (() => {
        let sum = date.getDate() - 1;

        sum += (date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) / 24;

        return sum / months[date.getMonth()] * 100;
    })();

    month.textContent = `${change(monthProgress)}%`;
    month.setAttribute('title', `${monthProgress}%`);
    progressBar[1].style.width = `${monthProgress}%`;

    dayProgress = ((date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) / 24) * 100;

    day.textContent = `${change(dayProgress)}%`;
    day.setAttribute('title', `${dayProgress}%`);
    progressBar[2].style.width = `${dayProgress}%`;

    workDayProgress = (() => {
        let num = 0;

        if (date.getHours() < 6) dayName.textContent = 'Madrugada';
        else if (date.getHours() < 12) {
            dayName.textContent = 'Manhã';
            num = 6;
        } else if (date.getHours() < 18) {
            dayName.textContent = 'Tarde';
            num = 12;
        } else {
            dayName.textContent = 'Noite';
            num = 18;
        }

        return (date.getHours() - num + date.getMinutes() / 60 + date.getSeconds() / 3600) / 6 * 100;
    })()

    workDay.textContent = `${change(workDayProgress)}%`;
    workDay.setAttribute('title', `${workDayProgress}%`);
    progressBar[3].style.width = `${workDayProgress}%`;
}

window.onload = () => {
    document.querySelector('.lds-ring').style.display = 'none';
    document.querySelector('.progressContainer').style.display = 'block';
    setInterval(updateProgress, 1);
}