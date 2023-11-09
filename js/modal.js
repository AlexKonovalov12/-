let enterButton = document.querySelector('.header-enter-button');
let enterModal = document.querySelector('.enter_modal');
let btnCloseModal = enterModal.querySelector('.btn-close-modal-window');
let backgroundModal = enterModal.querySelector('.modal-window-background');

enterButton.addEventListener('click', (e) => {
    document.querySelector('body').style['overflow'] = 'hidden';
    enterModal.style['display'] = 'flex';
});

btnCloseModal.addEventListener('click', (e) => {
    document.querySelector('body').style['overflow'] = 'auto';
    enterModal.style['display'] = 'none';

    // очистить форму
    enterModal.querySelectorAll('.inputs-block input').forEach(element => {
        element.value = "";
    });
});

backgroundModal.addEventListener('click', (e) => {
    document.querySelector('body').style['overflow'] = 'auto';
    enterModal.style['display'] = 'none';
});


let enterPhone = document.getElementById('enter-phone')
enterPhone.addEventListener('click', function () {
    if (enterPhone.value == '') {
        enterPhone.value = '+7'
    }
}) 

let formPhone = document.getElementById('form-phone')
formPhone.addEventListener('click', function () {
    if (formPhone.value == '') {
        formPhone.value = '+7'
    }
}) 



