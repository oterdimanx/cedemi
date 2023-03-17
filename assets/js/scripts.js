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
    var navbarShrink = function () {
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
    };

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


    const submitButton = document.getElementById("submitButton");
    const form         = document.querySelector("form");
    const name         = document.getElementById("yourname");
    const email        = document.getElementById("email");
    const phone        = document.getElementById("phone");
    const message      = document.getElementById("message");
    const emailRegex   = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "gm");
    let error          = true;
    let errorMesage    = "Une erreur est survenue.";

    form.addEventListener("submit", (event) => {

        if (name.value.length < 3 || name.value.length > 150) {
            console.log("Le champ nom doit avoir entre 3 et 150 caractères.");
            errorMesage = "Le champ nom doit avoir entre 3 et 150 caractères.";
            error = true;
            event.preventDefault();
            document.getElementById("nameError").style.cssText = "display : block; visibility : visible;";
        } else {
            error = false;
            errorMesage = "";
            document.getElementById("nameError").style.cssText = "display : none; visibility : hidden;";
        }

        const isValidEmail = emailRegex.test(email.value);
        if(!isValidEmail || email.validity.typeMismatch || email.validity.patternMismatch || '' === email.value.trim()) {
            event.preventDefault();
            console.log("email NOK : " + email.value);
            errorMesage = "Le champ email semble invalide, veuillez entrer une adresse mail valide.";
            error = true;
            document.getElementById("emailError").style.cssText = "display : block; visibility : visible;";
        } else {
            console.log("email OK");
            error = false;
            errorMesage = "";
            document.getElementById("emailError").style.cssText = "display : none; visibility : hidden;";
        }

        if (phone.validity.typeMismatch || phone.validity.patternMismatch || '' === phone.value.trim()) {
            event.preventDefault();
            console.log("phone NOK");
            errorMesage = "Le champ téléphone n/'est pas au bon format.";
            error = true;
            document.getElementById("phoneError").style.cssText = "display : block; visibility : visible;";
        } else {
            console.log(phone.value + " = phone");
            console.log("phone OK");
            phone.setCustomValidity("");
            errorMesage = "";
            error = false;
            document.getElementById("phoneError").style.cssText = "display : none; visibility : hidden;";
        }

        if (message.validity.typeMismatch || message.validity.patternMismatch || '' === message.value.trim()) {
            event.preventDefault();
            console.log("message NOK");
            errorMesage = "Le champ message doit comporter au minimum 15 caractères (max 850).";
            error = true;
            document.getElementById("messageError").style.cssText = "display : block; visibility : visible;";
        } else {
            console.log("message OK");
            message.setCustomValidity("");
            errorMesage = "";
            error = false;
            document.getElementById("messageError").style.cssText = "display : none; visibility : hidden;";
        }

        if( !error && "" === errorMesage) {
            console.log("NO ERRORS");

        } else {
            console.log("ERRORS");
        }

        console.log("prevent form validation");
        event.preventDefault();
    });



});
