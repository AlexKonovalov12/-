const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const phoneEl = document.querySelector('#form-phone');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');
const textAreaEl = document.querySelector("#textarea");
const addressEl = document.querySelector("#address");
const form = document.querySelector('.cart-form');


const checkUsername = () => {
    let valid = false;
    const min = 2,
        max = 25;
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Представьтесь, пожалуйста!');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Имя должно быть не короче ${min} и не длиннее ${max} символов.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const checkPhone = () => {
    let valid = false;
    const phoneNum = phoneEl.value.trim();

    if (!isRequired(phoneNum)) {
        showError(phoneEl, 'Введите ваш телефон!');
    } else if (!isPhoneCorrect(phoneNum)) {
        showError(phoneEl, 'Неверно введен номер телефона')
    } else {
        showSuccess(phoneEl);
        valid = true;
    }
    return valid;
};

const checkTextarea = () => {
    if (textAreaEl) {
        let valid = false;
        const text = textAreaEl.value.trim();
        if (!isRequired(text)) {
            showError(textAreaEl, 'Введите текст сообщения!');
        } else {
            showSuccess(textAreaEl);
            valid = true;
        }
        return valid;
    }
    return true
};

const checkAddress = () => {
    if (addressEl) {
        let valid = false;
        const address = addressEl.value.trim();
        if (!isRequired(address)) {
            showError(addressEl, 'Введите ваш адрес!');
        } else {
            showSuccess(addressEl);
            valid = true;
        }
        return valid;
    }
    return true
};


const checkEmail = () => {
    if (emailEl) {
        let valid = false;
        const email = emailEl.value.trim();
        if (!isRequired(email)) {
            showError(emailEl, 'Введите вашу элекстронную почту!');
        } else if (!isEmailValid(email)) {
            showError(emailEl, 'Это точно электронная почта?')
        } else {
            showSuccess(emailEl);
            valid = true;
        }
        return valid;
    }
    return true
};

const checkPassword = () => {
    if (passwordEl) {
        let valid = false;
        const password = passwordEl.value.trim();

        if (!isRequired(password)) {
            showError(passwordEl, 'Введите пароль!');
        } else if (!isPasswordSecure(password)) {
            showError(passwordEl, 'Пароль должен содержать не менее 8 символов, которые включают по крайней мере 1 символ нижнего регистра, 1 символ верхнего регистра и 1 цифру');
        } else {
            showSuccess(passwordEl);
            valid = true;
        }

        return valid;
    }
    return true
};

const checkConfirmPassword = () => {
    if (confirmPasswordEl) {
        let valid = false;
        // check confirm password
        const confirmPassword = confirmPasswordEl.value.trim();
        const password = passwordEl.value.trim();

        if (!isRequired(confirmPassword)) {
            showError(confirmPasswordEl, 'Введите пароль еще раз');
        } else if (password !== confirmPassword) {
            showError(confirmPasswordEl, 'Пароли не совпадают!');
        } else {
            showSuccess(confirmPasswordEl);
            valid = true;
        }
        return valid;
    }
    return true  
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPhoneCorrect = (phoneNum) => {
    const re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    return re.test(phoneNum);
}

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    if (checkUsername() && checkPhone() && checkEmail() && checkPassword() && checkConfirmPassword() && checkTextarea() && checkAddress()) {
        console.log('valid')
    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'form-phone':
            checkPhone();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
        case 'textarea':
            checkTextarea()
            break;
        case 'address':
            checkAddress()
            break;
    }
    const submit = document.querySelector("button[type=submit]")
    let allValid = false;
    if (checkUsername() && checkPhone() && checkEmail() && checkPassword() && checkConfirmPassword() && checkTextarea() && checkAddress()) {
        allValid = true;
    }

    if (allValid) {
        submit.removeAttribute("disabled");
        submit.classList.add("button_active")
    } else {
        submit.setAttribute("disabled", ""); 
        submit.classList.remove("button_active")
    }
}));