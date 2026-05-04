/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
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

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
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

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const submitButton = document.getElementById('submitButton');
        const successMessage = document.getElementById('submitSuccessMessage');
        const errorMessage = document.getElementById('submitErrorMessage');
        const fields = Array.from(contactForm.querySelectorAll('input, textarea'));

        const toggleFieldState = field => {
            if (field.checkValidity()) {
                field.classList.remove('is-invalid');
            } else {
                field.classList.add('is-invalid');
            }
        };

        const setMessageVisibility = (element, visible) => {
            if (!element) {
                return;
            }
            element.classList.toggle('d-none', !visible);
        };

        fields.forEach(field => {
            field.addEventListener('input', () => toggleFieldState(field));
            field.addEventListener('blur', () => toggleFieldState(field));
        });

        contactForm.addEventListener('submit', submitEvent => {
            submitEvent.preventDefault();

            setMessageVisibility(successMessage, false);
            setMessageVisibility(errorMessage, false);

            let hasInvalidField = false;
            fields.forEach(field => {
                toggleFieldState(field);
                if (!field.checkValidity()) {
                    hasInvalidField = true;
                }
            });

            const recipientEmail = (contactForm.dataset.recipientEmail || '').trim();
            const recipientConfigured = recipientEmail;

            if (hasInvalidField || !recipientConfigured) {
                setMessageVisibility(errorMessage, true);
                return;
            }

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            const subject = `Website Contact from ${name}`;
            const body = [
                `Name: ${name}`,
                `Email: ${email}`,
                `Phone: ${phone}`,
                '',
                'Message:',
                message
            ].join('\n');

            const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            if (submitButton) {
                submitButton.disabled = true;
            }

            setMessageVisibility(successMessage, true);
            window.open(gmailComposeUrl, '_blank');

            window.setTimeout(() => {
                contactForm.reset();
                fields.forEach(field => field.classList.remove('is-invalid'));
                if (submitButton) {
                    submitButton.disabled = false;
                }
            }, 500);
        });
    }

});
