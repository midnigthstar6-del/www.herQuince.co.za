
document.addEventListener('DOMContentLoaded', function () {

    let cartCount = Number(localStorage.getItem('herQuinceCartCount')) || 0;

    const cartDisplay = document.getElementById('cart-count');

    if (cartDisplay) {
        cartDisplay.textContent = cartCount;
    }

    document.querySelectorAll('.card button').forEach(function (button) {

        button.addEventListener('click', function () {

            cartCount++;

            localStorage.setItem('herQuinceCartCount', cartCount);

            if (cartDisplay) {
                cartDisplay.textContent = cartCount;
            }

            alert('Item successfully added to your basket!');

        });

    });

    const searchInput = document.getElementById('product-search');

    if (searchInput) {

        searchInput.addEventListener('input', function () {

            const searchValue = searchInput.value.toLowerCase();

            const products = document.querySelectorAll('main .card');

            let found = 0;

            products.forEach(function (product) {

                const productName = product.textContent.toLowerCase();

                if (productName.includes(searchValue)) {

                    product.hidden = false;
                    found++;

                } else {

                    product.hidden = true;

                }

            });

            const status = document.getElementById('search-status');

            if (status) {
                status.textContent = found + ' matching products found.';
            }

        });

    }

document.querySelectorAll('[data-product-tab]').forEach(function(button) {

    button.addEventListener('click', function() {

        const category = button.getAttribute('data-product-tab');

        const dresses = document.getElementById('dress-products');
        const crowns = document.getElementById('crown-products');

        if (category === 'all') {
            dresses.hidden = false;
            crowns.hidden = false;
        }

        else if (category === 'dresses') {
            dresses.hidden = false;
            crowns.hidden = true;
        }

        else if (category === 'crowns') {
            dresses.hidden = true;
            crowns.hidden = false;
        }

    });

});

    const lightbox = document.createElement('div');

    lightbox.id = 'image-lightbox';

    lightbox.innerHTML = `
        <button type="button" id="lightbox-close">Close ×</button>
        <img src="" alt="Enlarged image">
    `;

    document.body.appendChild(lightbox);

    const enlargedImage = lightbox.querySelector('img');

    document.querySelectorAll('main img').forEach(function (image) {

        image.addEventListener('click', function () {

            enlargedImage.src = image.src;

            enlargedImage.alt = image.alt || 'Enlarged image';

            lightbox.classList.add('open');

        });

    });

    document.getElementById('lightbox-close').addEventListener('click', function () {

        lightbox.classList.remove('open');

        enlargedImage.src = '';

    });

    lightbox.addEventListener('click', function (event) {

        if (event.target === lightbox) {

            lightbox.classList.remove('open');

            enlargedImage.src = '';

        }

    });

    document.addEventListener('keydown', function (event) {

        if (event.key === 'Escape') {

            lightbox.classList.remove('open');

            enlargedImage.src = '';

        }

    });

    document.querySelectorAll('main h2').forEach(function (heading) {

        const answer = heading.nextElementSibling;

        if (/^\d+\./.test(heading.textContent.trim()) &&
            answer && answer.tagName === 'P') {

            const button = document.createElement('button');

            button.textContent = heading.textContent;

            button.className = 'faq-question';

            button.type = 'button';

            button.setAttribute('aria-expanded', 'false');

            const content = document.createElement('div');

            content.className = 'faq-answer';

            content.hidden = true;

            let current = answer;

            while (current && current.tagName !== 'H2') {

                const next = current.nextElementSibling;

                content.appendChild(current);

                current = next;

            }

            const section = document.createElement('section');

            section.className = 'faq-item';

            section.appendChild(button);

            section.appendChild(content);

            heading.replaceWith(section);

            button.addEventListener('click', function () {

                const isOpen = button.getAttribute('aria-expanded') === 'true';

                button.setAttribute('aria-expanded', !isOpen);

                content.hidden = isOpen;

            });

        }

    });

    const emailAddress = 'ST10515777@rcconnect.edu.za';

    function handleForm(formId, statusId, subject) {

        const form = document.getElementById(formId);

        if (!form) return;

        form.addEventListener('submit', function (event) {

            event.preventDefault();

            const status = document.getElementById(statusId);

            if (!form.checkValidity()) {

                form.reportValidity();

                if (status) {
                    status.textContent = 'Please complete all required fields correctly.';
                }

                return;

            }

            const formData = new FormData(form);

            let message = '';

            formData.forEach(function (value, key) {

                message += key + ': ' + value + '\n';

            });

            const name = formData.get('name');

            const mailSubject = subject + ' - ' + name;

            const mailLink =
                'mailto:' + emailAddress +
                '?subject=' + encodeURIComponent(mailSubject) +
                '&body=' + encodeURIComponent(message);

            if (status) {

                status.textContent =
                    'Your email application will open. Please press Send to submit your message.';

            }

            window.location.href = mailLink;

        });

    }

    handleForm(
        'contact-form',
        'contact-status',
        'Her Quince Contact Message'
    );

    handleForm(
        'enquiry-form',
        'enquiry-status',
        'Her Quince Product Enquiry'
    );

});