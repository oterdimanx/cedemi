/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    const navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // contact form submission
    const lang         = document.URL.includes('fr_en') ? 'en' : 'fr';
    const submitButton = document.getElementById('submitButton');
    const form         = document.querySelector('form');
    const reason       = document.getElementById('reason');
    const name         = document.getElementById('yourname');
    const email        = document.getElementById('email');
    const phone        = document.getElementById('phone');
    const message      = document.getElementById('message');
    const emailRegex   = new RegExp(/^\b[a-zA-Z0-9._%+-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'm');
    let arrayMsgs      = [];
    let error          = true;
    let functionLocation = 'localhost' === location.hostname ? 'http://localhost:8888/.netlify/functions/sendContactMail' : '/.netlify/functions/sendContactMail';
    let msg            = '';

    form.addEventListener('submit', (event) => {

        const isValidEmail = emailRegex.test(email.value);

        if (name.value.length < 3 || name.value.length > 150) {
            msg = 'fr' === lang ? 'Le champ nom doit avoir entre 3 et 150 caractères.' : 'the name field must contain between 3 and 150 characters.';
            arrayMsgs.push(msg);
            error = true;
            event.preventDefault();
            document.getElementById('nameError').style.cssText = 'display : block; visibility : visible;';
            msg = '';
        } else {
            error = false;
            document.getElementById('nameError').style.cssText = 'display : none; visibility : hidden;';
        }

        if (reason.value.length < 3 || reason.value.length > 150) {
            msg = 'fr' === lang ? 'Le champ raison sociale doit avoir entre 3 et 150 caractères.' : 'the Company Name field must contain between 3 and 150 characters.';
            arrayMsgs.push(msg);
            error = true;
            event.preventDefault();
            document.getElementById('reasonError').style.cssText = 'display : block; visibility : visible;';
            msg = '';
        } else {
            error = false;
            document.getElementById('reasonError').style.cssText = 'display : none; visibility : hidden;';
        }

        if(!isValidEmail || email.validity.typeMismatch || '' === email.value.trim()) { // || email.validity.patternMismatch
            msg = 'fr' === lang ? 'Le champ email semble invalide, veuillez entrer une adresse mail valide.' : 'the Email field doesn\'t appear to be valid. Please provide a valid email address.';
            arrayMsgs.push(msg);
            error = true;
            event.preventDefault();
            document.getElementById('emailError').style.cssText = 'display : block; visibility : visible;';
            msg = '';
        } else {
            error = false;
            document.getElementById('emailError').style.cssText = 'display : none; visibility : hidden;';
        }

        if (phone.validity.typeMismatch || phone.validity.patternMismatch || '' === phone.value.trim()) {
            event.preventDefault();
            msg = 'fr' === lang ? 'Le format du champ téléphone est incorrect.' : 'The Phone field is not valid.';
            arrayMsgs.push(msg);
            error = true;
            document.getElementById('phoneError').style.cssText = 'display : block; visibility : visible;';
            msg = '';
        } else {
            phone.setCustomValidity('');
            error = false;
            document.getElementById('phoneError').style.cssText = 'display : none; visibility : hidden;';
        }

        if (message.validity.typeMismatch || message.validity.patternMismatch || '' === message.value.trim() || message.value.length < 15 || message.value.length > 850) {
            event.preventDefault();
            msg = 'fr' === lang ? 'Le champ message doit comporter au minimum 15 caractères (max 850).' : 'The Message field must contain at least 15 characters (850 max).';
            arrayMsgs.push(msg);
            error = true;
            document.getElementById('messageError').style.cssText = 'display : block; visibility : visible;';
            msg = '';
        } else {
            //console.log('message OK');
            message.setCustomValidity('');
            error = false;
            document.getElementById('messageError').style.cssText = 'display : none; visibility : hidden;';
        }

        if( !error && 0 === arrayMsgs.length) {
            fetch(functionLocation, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                },
                body: JSON.stringify(
                    {
                        'name':name.value,
                        'reason':reason.value,
                        'phone':phone.value,
                        'email':email.value,
                        'message':message.value
                    }
                )
            })
            .then(res => {
                //console.log("Request complete! response:", res);
                if('OK' === res.statusText){
                    document.getElementById('form-wrapper').className = 'd-none';
                    submitButton.style.cssText = 'display : none; visibility : hidden;';
                    document.getElementById('submitSuccessMessage').className = 'form-success';
                }
            })
            .then(data => {
                console.log('Success: ', data);
            });
        } else {
            console.log('ERRORS');
        }

        arrayMsgs = [];
        event.preventDefault();
    });
});
