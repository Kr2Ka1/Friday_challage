const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const ageInput = document.querySelector('#age-input');
const phoneInput = document.querySelector('#phone-input');
const passwordInput = document.querySelector('#password-input');
const repeatPasswordInput = document.querySelector('#repeat-password-input');
const errorMessage = document.querySelector('#error-message');

form.addEventListener('submit', (e) => {
    let errors = [];

    
    errors = singUpErrors(
        nameInput.value,
        emailInput.value,
        ageInput.value,
        phoneInput.value,
        passwordInput.value,
        repeatPasswordInput.value
    );

    if (errors.length > 0) {
        
        e.preventDefault();
        errorMessage.innerText = errors.join(". ");
        errorMessage.style.color = '#f5bad6';
    } else {
       
        e.preventDefault();
        errorMessage.innerText = 'Registracija sėkminga!';
        errorMessage.style.color = '#4b9f40';

      
        setTimeout(() => {
            errorMessage.innerText = ''; 
        }, 10000);

        form.reset(); 
    }
});

function singUpErrors(name, email, age, phone, password, repeatPassword) {
    let errors = [];

    clearErrors();

    if (name === '' || name == null) {
        errors.push('Vardas yra privalomas.');
        markFieldIncorrect(nameInput);
    } else {
        const nameRegex = /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\s]{3,30}$/;
        if (!nameRegex.test(name)) {
            errors.push('Vardas turi būti nuo 3 iki 30 simbolių ir sudarytas tik iš raidžių.');
            markFieldIncorrect(nameInput);
        }
    }

    if (email === '' || email == null) {
        errors.push('El. paštas yra privalomas.');
        markFieldIncorrect(emailInput);
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('El. pašto adresas turi būti tinkamos formos.');
            markFieldIncorrect(emailInput);
        }
    }

    if (age === '' || age == null) {
        errors.push('Amžius yra privalomas.');
        markFieldIncorrect(ageInput);
    } else {
        const ageValue = parseInt(age, 10);
        if (isNaN(ageValue) || ageValue < 18 || ageValue > 120) {
            errors.push('Amžius turi būti nuo 18 iki 120 metų.');
            markFieldIncorrect(ageInput);
        }
    }

   
    if (phone === '' || phone == null) {
        errors.push('Telefono numeris yra privalomas.');
        markFieldIncorrect(phoneInput);
    } else {
        const phoneRegex = /^\+\d{3}\s\d{3}\s\d{5}$/;
        if (!phoneRegex.test(phone)) {
            errors.push('Telefono numeris turi būti formatu "+xxx xxx xxxxx".');
            markFieldIncorrect(phoneInput);
        }
    }

   
    if (password === '' || password == null) {
        errors.push('Slaptažodis yra privalomas.');
        markFieldIncorrect(passwordInput);
    } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            errors.push('Slaptažodis turi būti bent 8 simbolių, turėti didžiąją raidę, mažąją raidę, skaičių ir simbolį.');
            markFieldIncorrect(passwordInput);
        }
    }

   
    if (repeatPassword === '' || repeatPassword == null) {
        errors.push('Pakartotinas slaptažodis yra privalomas.');
        markFieldIncorrect(repeatPasswordInput);
    } else if (password !== repeatPassword) {
        errors.push('Slaptažodžiai nesutampa.');
        markFieldIncorrect(repeatPasswordInput);
    }

    return errors;
}

function markFieldIncorrect(inputElement) {
    inputElement.parentElement.classList.add('incorrect');
}

function clearErrors() {
    const inputs = [nameInput, emailInput, ageInput, phoneInput, passwordInput, repeatPasswordInput];
    inputs.forEach(input => {
        input.parentElement.classList.remove('incorrect');
    });
}


const allInputs = [nameInput, emailInput, ageInput, phoneInput, passwordInput, repeatPasswordInput];
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            errorMessage.innerText = '';
        }
    });
});


