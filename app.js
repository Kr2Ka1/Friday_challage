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

    // Tikriname laukus ir renkame klaidas
    errors = singUpErrors(
        nameInput.value,
        emailInput.value,
        ageInput.value,
        phoneInput.value,
        passwordInput.value,
        repeatPasswordInput.value
    );

    if (errors.length > 0) {
        // Jei yra klaidų, rodome jas ir stabdome formos siuntimą
        e.preventDefault();
        errorMessage.innerText = errors.join(". ");
        errorMessage.style.color = '#f5bad6';
    } else {
        // Jei klaidų nėra, rodome sėkmės pranešimą
        e.preventDefault();
        errorMessage.innerText = 'Registracija sėkminga!';
        errorMessage.style.color = '#4b9f40';

        // Pranešimas išlieka 10 sekundžių
        setTimeout(() => {
            errorMessage.innerText = ''; // Išvalyti pranešimą po 10 sekundžių
        }, 10000);

        form.reset(); // Išvalome formos laukus
    }
});

function singUpErrors(name, email, age, phone, password, repeatPassword) {
    let errors = [];

    // Pašaliname klaidos klasę iš visų laukų
    clearErrors();

    // Vardas
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

    // El. paštas
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

    // Amžius
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

    // Telefonas
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

    // Slaptažodis
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

    // Pakartotinas slaptažodis
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

// Automatinis klaidų pašalinimas po taisymo
const allInputs = [nameInput, emailInput, ageInput, phoneInput, passwordInput, repeatPasswordInput];
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            errorMessage.innerText = '';
        }
    });
});







// variatas 2

// const form = document.querySelector('#form');
// const nameInput = document.querySelector('#name-input');
// const emailInput = document.querySelector('#email-input');
// const ageInput = document.querySelector('#age-input');
// const phoneInput = document.querySelector('#phone-input');
// const passwordInput = document.querySelector('#password-input');
// const repeatPasswordInput = document.querySelector('#repeat-password-input');
// const errorMessage = document.querySelector('#error-message');

// form.addEventListener('submit', (e) => {
//     let errors = [];

    
//     errors = singUpErrors(
//         nameInput.value,
//         emailInput.value,
//         ageInput.value,
//         phoneInput.value,
//         passwordInput.value,
//         repeatPasswordInput.value
//     );

    
//     if (errors.length > 0) {
//         e.preventDefault();
//         errorMessage.innerText = errors.join(". ");
//     } else {
//         errorMessage.innerText = 'Registracija sėkminga!';
//         errorMessage.style.color = 'green';
//     }
// });

// function singUpErrors(name, email, age, phone, password, repeatPassword) {
//     let errors = [];


//     clearErrors();

    
//     if (name === '' || name == null) {
//         errors.push('Vardas yra privalomas');
//         markFieldIncorrect(nameInput);
//     } else {
//         const nameRegex = /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\s]{3,30}$/;
//         if (!nameRegex.test(name)) {
//             errors.push('Vardas turi būti nuo 3 iki 30 simbolių ir sudarytas tik iš raidžių');
//             markFieldIncorrect(nameInput);
//         }
//     }

    
//     if (email === '' || email == null) {
//         errors.push('El. paštas yra privalomas');
//         markFieldIncorrect(emailInput);
//     } else {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             errors.push('El. pašto adresas turi būti tinkamos formos');
//             markFieldIncorrect(emailInput);
//         }
//     }

    
//     if (age === '' || age == null) {
//         errors.push('Amžius yra privalomas');
//         markFieldIncorrect(ageInput);
//     } else {
//         const ageValue = parseInt(age, 10);
//         if (isNaN(ageValue) || ageValue < 18 || ageValue > 120) {
//             errors.push('Amžius turi būti nuo 18 metų');
//             markFieldIncorrect(ageInput);
//         }
//     }


//     if (phone === '' || phone == null) {
//         errors.push('Telefono numeris yra privalomas');
//         markFieldIncorrect(phoneInput);
//     } else {
//         const phoneRegex = /^\+\d{3}\s\d{3}\s\d{5}$/;
//         if (!phoneRegex.test(phone)) {
//             errors.push('Telefono numeris turi būti formatu "+xxx xxx xxxxx".');
//             markFieldIncorrect(phoneInput);
//         }
//     }

   
//     if (password === '' || password == null) {
//         errors.push('Slaptažodis yra privalomas');
//         markFieldIncorrect(passwordInput);
//     } else {
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//         if (!passwordRegex.test(password)) {
//             errors.push('Slaptažodis turi būti bent 8 simbolių, turėti didžiąją raidę, mažąją raidę, skaičių ir simbolį');
//             markFieldIncorrect(passwordInput);
//         }
//     }

   
//     if (repeatPassword === '' || repeatPassword == null) {
//         errors.push('Pakartotinas slaptažodis yra privalomas');
//         markFieldIncorrect(repeatPasswordInput);
//     } else if (password !== repeatPassword) {
//         errors.push('Slaptažodžiai nesutampa');
//         markFieldIncorrect(repeatPasswordInput);
//     }

//     return errors;
// }

// function markFieldIncorrect(inputElement) {
//     inputElement.parentElement.classList.add('incorrect');
// }

// function clearErrors() {
//     const inputs = [nameInput, emailInput, ageInput, phoneInput, passwordInput, repeatPasswordInput];
//     inputs.forEach(input => {
//         input.parentElement.classList.remove('incorrect');
//     });
// }


// const allInputs = [nameInput, emailInput, ageInput, phoneInput, passwordInput, repeatPasswordInput];
// allInputs.forEach(input => {
//     input.addEventListener('input', () => {
//         if (input.parentElement.classList.contains('incorrect')) {
//             input.parentElement.classList.remove('incorrect');
//             errorMessage.innerText = '';
//         }
//     });
// });







// varinatas 1 mn

// const form = document.querySelector('#form');
// const nameInput = document.querySelector('#name-input');
// const emailInput = document.querySelector('#email-input');
// const ageInput = document.querySelector('#age-input');
// const phoneInput = document.querySelector('#phone-input');
// const passwordInput = document.querySelector('#password-input');
// const repeatPasswordInput = document.querySelector('#repeat-password-input');
// const errorMessage = document.querySelector('#error-message')



// form.addEventListener('submit', (e) => {
//     let errors = []

//     if(nameInput){
//         errors = singUpErrors( nameInput.value, emailInput.value, ageInput.value, phoneInput.value, passwordInput.value, repeatPasswordInput.value)
//     }
//     if(errors.length > 0){
//         e.preventDefault()
//         errorMessage.innerText = errors.join(". ")
//     }
// })

// function singUpErrors(name, email, age, phone, password, repeatPassword){
//     let errors = []
//     if(name === '' || name == null){
//         errors.push('Vardas privalomas')
//         nameInput.parentElement.classList.add('incorrect')
//     }
//     const nameRegex = /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\s]{3,30}$/;
//     if (!nameRegex.test(name)) {
//         errors.push('Vardardo ilgis turi būti sudarytas iš mažiausiai 3 simbolių.');
//         nameInput.parentElement.classList.add('incorrect');
//     }


//     if(email === '' || email == null){
//         errors.push('El. paštas privalomas')
//         emailInput.parentElement.classList.add('incorrect')
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//     errors.push('El. pašto adresas turi būti tinkamos formos');
//     emailInput.parentElement.classList.add('incorrect');
//     }


//     if(age === '' || age == null){
//         errors.push('Amžius privalomas')
//         ageInput.parentElement.classList.add('incorrect')
//     }
//     if(age < 18 || age > 120){
//         errors.push('Netinkamas amžius - registracija tik nuo 18')
//         ageInput.parentElement.classList.add('incorrect')
//     }


//     if(phone === '' || phone == null){
//         errors.push('Telefono numeris privalomas')
//         phoneInput.parentElement.classList.add('incorrect')
//     }
//     const phoneRegex = /^\+\d{3}\s\d{3}\s\d{5}$/;
//     if (!phoneRegex.test(phone)) {
//         errors.push('Telefono numeris turi būti formatu "+xxx xxx xxxxx"');
//         phoneInput.parentElement.classList.add('incorrect');
//     }



//     if(password === '' || password == null){
//         errors.push('Slaptažodis privalomas')
//         passwordInput.parentElement.classList.add('incorrect')
//     }
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!passwordRegex.test(password)) {
//         errors.push('Slaptažodyje turi būti bent 8 simboliai, viena didžioji raidė, viena mažoji raidė, vienas skaičius ir specialus simbolis');
//         passwordInput.parentElement.classList.add('incorrect');
//     }


//     if(password !== repeatPassword){
//         errors.push('Slaptažodis nesutampa')
//         passwordInput.parentElement.classList.add('incorrect')
//         repeatPasswordInput.parentElement.classList.add('incorrect')
//     }
//     return errors;
// }

// const allInputs = [nameInput, emailInput, ageInput, phoneInput, passwordInput, repeatPasswordInput]
// allInputs.forEach(input => {
//     input.addEventListener('input', () => {
//         if(input.parentElement.classList.contains('incorrect')){
//             input.parentElement.classList.remove('incorrect')
//             errorMessage.innerText = ''
//         }
//     })
// })








