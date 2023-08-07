// all inputs
const allInputs = document.querySelectorAll('input')

// input
const yearInput = document.getElementById('year-input')
const monthInput = document.getElementById('month-input')
const dayInput = document.getElementById('day-input')
// result
const yearResult = document.getElementById('year-result')
const monthResult = document.getElementById('month-result')
const dayResult = document.getElementById('day-result')
// submit
const submit = document.getElementById('submit')

submit.addEventListener('click', function () {
    // submit turn into purple
    [ submit.style.borderColor, submit.style.backgroundColor ] = [ 'slateblue', 'slateblue' ];

    let year = parseInt(yearInput.value)
    let month = parseInt(monthInput.value) - 1
    let day = parseInt(dayInput.value)

    if (yearInput.value === '' || monthInput.value === '' || dayInput.value === '' || !isNormalDay(day) || !isNormalMonth(month + 1) || !isNormalYear(year)) {

        allInputs.forEach(element => {

            if (element.id === 'year-input') {

                if (element.value === '') {
                    element.classList.add('is-invalid')
                    document.getElementById('y-feedback').innerText = 'This field is required'
                } else if (!isNormalYear(+element.value)) {
                    element.classList.add('is-invalid')
                    document.getElementById('y-feedback').innerText = 'Must be in the past'
                } else {
                    element.classList.remove('is-invalid')
                }
            } else if (element.id === 'month-input') {

                if (element.value === '') {
                    element.classList.add('is-invalid')
                    document.getElementById('m-feedback').innerText = 'This field is required'
                }
                else if (!isNormalMonth(+element.value)) {
                    element.classList.add('is-invalid')
                    document.getElementById('m-feedback').innerText = 'Must be a valid month'
                } else {
                    element.classList.remove('is-invalid')
                }
            } else if (element.id === 'day-input') {

                if (element.value === '') {
                    element.classList.add('is-invalid')
                    document.getElementById('d-feedback').innerText = 'This field is required'
                } else if (!isNormalDay(+element.value)) {
                    element.classList.add('is-invalid')
                    document.getElementById('d-feedback').innerText = 'Must be a valid day'
                } else {
                    element.classList.remove('is-invalid')
                }
            }
        })

        yearResult.innerHTML = '- -'
        monthResult.innerHTML = '- -'
        dayResult.innerHTML = '- -'

    } else if (!isValidDate(year, month, day)) {

        allInputs.forEach((element, i) => {
            element.classList.add('is-invalid')
            document.getElementsByClassName('invalid-feedback')[ i ].innerText = ''
        })

        document.getElementById('y-feedback').innerText = 'Must be a valid date'

        yearResult.innerHTML = '- -'
        monthResult.innerHTML = '- -'
        dayResult.innerHTML = '- -'
    } else {

        allInputs.forEach(input => {
            input.classList.remove('is-invalid')
        })

        const birthDate = new Date(year, month, day).getTime()
        const currentTime = new Date().getTime()
        const ageInMs = currentTime - birthDate

        const ageInYears = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365))
        const ageInMonths = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 30.44) % 12)
        const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24) % 30.44)

        yearResult.innerHTML = ageInYears
        monthResult.innerHTML = ageInMonths
        dayResult.innerHTML = ageInDays
    }
})

function isValidDate(y, m, d) {
    const date = new Date(y, m, d);
    return !isNaN(date) && (date.getFullYear() === y && y > 99) && date.getMonth() === m && date.getDate() === d;
}

function isNormalYear(y) {
    return y <= new Date().getFullYear()
}
function isNormalMonth(m) {
    return m >= 1 && m <= 12
}
function isNormalDay(d) {
    return d >= 1 && d <= 31
}