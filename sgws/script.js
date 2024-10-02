document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = new Date(document.getElementById('date').value);
    const time = document.getElementById('time').value;
    const duration = document.getElementById('duration').value;
    const consentChecked = document.getElementById('consent').checked;

    const errors = validateForm(name, phone, date, time, duration, consentChecked);

    if (errors.length === 0) {
        const startDateTime = new Date(date);
        const [hours, minutes] = time.split(':');
        startDateTime.setHours(hours, minutes);

        const message = `
            Бронирование успешно!
            Имя: ${name}
            Телефон: ${phone}
            Дата: ${date.toLocaleDateString()}
            Время: ${time}
            Длительность: ${duration} часов
        `;
        document.getElementById('successMessage').innerText = message;
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('bookingForm').reset();
        document.getElementById('consent').checked = true;
    } else {
        displayErrors(errors);
    }
});

function validateForm(name, phone, date, time, duration, consentChecked) {
    const errors = [];

    if (!/^[а-яА-ЯЁё\s]+$/.test(name)) {
        errors.push({ field: 'name', message: 'Имя должно содержать только кириллицу.' });
    }
    if (phone.length !== 11) {
        errors.push({ field: 'phone', message: 'Телефон должен содержать 11 цифр.' });
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date < tomorrow) {
        errors.push({ field: 'date', message: 'Дата должна быть не ранее следующего дня.' });
    }
    if (!duration) {
        errors.push({ field: 'duration', message: 'Выберите длительность бронирования.' });
    }
    if (!consentChecked) {
        errors.push({ field: 'consent', message: 'Вы должны согласиться с правилами.' });
    }

    return errors;
}

function displayErrors(errors) {
    errors.forEach(error => {
        const errorElement = document.getElementById(`${error.field}Error`);
        errorElement.innerText = error.message;
    });
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.innerText = '';
    });
    document.getElementById('successMessage').style.display = 'none';
}