document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.bookingForm');
    const teaContainer = document.querySelector('#tea-container');
    const serviceContainer = document.querySelector('#service-container');
    const teaCatalogContainer = document.querySelector('#tea-catalog-container');

    const createTeaCard = (tea) => {
        const card = document.createElement('div');
        card.className = 'cardCollection';

        const img = document.createElement('img');
        img.src = tea.image;
        img.alt = 'чай';
        img.width = 498;

        const cardInner = document.createElement('div');
        cardInner.className = 'card';

        const name = document.createElement('p');
        name.className = 'nameCard';
        name.textContent = tea.name;

        const country = document.createElement('p');
        country.className = 'country';
        country.textContent = tea.country;

        const desc = document.createElement('p');
        desc.className = 'descCard';
        desc.textContent = tea.description;

        cardInner.appendChild(name);
        cardInner.appendChild(country);
        cardInner.appendChild(desc);

        const link = document.createElement('a');
        link.href = tea.link;

        const btn = document.createElement('button');
        btn.className = 'detailBtn';
        btn.textContent = 'Подробнее';
        
        link.appendChild(btn);

        card.appendChild(img);
        card.appendChild(cardInner);
        card.appendChild(link);

        return card;
    };

    if (teaContainer) {
        fetch('/api/teas')
            .then(response => response.json())
            .then(teas => {
                teaContainer.textContent = '';
                teas.slice(0, 3).forEach(tea => {
                    teaContainer.appendChild(createTeaCard(tea));
                });
            })
            .catch(err => console.error('Ошибка загрузки чая:', err));
    }

    if (teaCatalogContainer) {
        fetch('/api/teas')
            .then(response => response.json())
            .then(teas => {
                teaCatalogContainer.textContent = '';
                for (let i = 0; i < teas.length; i += 3) {
                    const row = document.createElement('div');
                    row.className = 'cards';
                    const chunk = teas.slice(i, i + 3);
                    chunk.forEach(tea => {
                        row.appendChild(createTeaCard(tea));
                    });
                    teaCatalogContainer.appendChild(row);
                }
            })
            .catch(err => console.error('Ошибка загрузки каталога чая:', err));
    }

    if (serviceContainer) {
        fetch('/api/services')
            .then(response => response.json())
            .then(services => {
                serviceContainer.textContent = '';
                services.forEach((service, index) => {
                    const block = document.createElement('div');
                    block.className = 'ceremonyBlock';
                    
                    const isEven = index % 2 === 1;
                    const infoClass = isEven ? 'ceremonyInfo1' : 'ceremonyInfo';
                    
                    const infoDiv = document.createElement('div');
                    infoDiv.className = infoClass;

                    const descCeremony = document.createElement('div');
                    descCeremony.className = 'descCeremony';

                    const title = document.createElement('p');
                    title.className = 'titleCeremony';
                    title.textContent = service.title;

                    const text = document.createElement('p');
                    text.className = 'textCeremony';
                    text.textContent = service.description;

                    descCeremony.appendChild(title);
                    descCeremony.appendChild(text);

                    const infoCeremony = document.createElement('div');
                    infoCeremony.className = 'infoCeremony';

                    const detailCeremony = document.createElement('div');
                    detailCeremony.className = 'detailCeremony';

                    const durationP = document.createElement('p');
                    durationP.className = 'detail';
                    const durationSpan = document.createElement('span');
                    durationSpan.className = 'green';
                    durationSpan.textContent = 'Длительность: ';
                    durationP.appendChild(durationSpan);
                    durationP.appendChild(document.createTextNode(service.duration));

                    const priceP = document.createElement('p');
                    priceP.className = 'detail';
                    const priceSpan = document.createElement('span');
                    priceSpan.className = 'green';
                    priceSpan.textContent = 'Цена: ';
                    priceP.appendChild(priceSpan);
                    priceP.appendChild(document.createTextNode(service.price));

                    detailCeremony.appendChild(durationP);
                    detailCeremony.appendChild(priceP);

                    const link = document.createElement('a');
                    link.href = service.link;

                    const btn = document.createElement('button');
                    btn.className = 'detailBtn';
                    btn.textContent = 'Подробнее';
                    
                    link.appendChild(btn);

                    infoCeremony.appendChild(detailCeremony);
                    infoCeremony.appendChild(link);

                    infoDiv.appendChild(descCeremony);
                    infoDiv.appendChild(infoCeremony);

                    const img = document.createElement('img');
                    img.src = service.image;
                    img.alt = 'церемония';
                    img.width = 855;

                    if (isEven) {
                        block.appendChild(infoDiv);
                        block.appendChild(img);
                    } else {
                        block.appendChild(img);
                        block.appendChild(infoDiv);
                    }

                    serviceContainer.appendChild(block);
                });
            })
            .catch(err => console.error('Ошибка загрузки услуг:', err));
    }

    if (!forms.length) return;

    const modal = document.createElement('div');
    modal.id = 'successModal';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeSpan = document.createElement('span');
    closeSpan.className = 'modal-close';
    closeSpan.textContent = '×';

    const modalTitle = document.createElement('h2');
    modalTitle.className = 'modal-title';
    modalTitle.textContent = 'Успешно!';

    const modalText = document.createElement('p');
    modalText.className = 'modal-text';
    modalText.textContent = 'Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.';

    modalContent.appendChild(closeSpan);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalText);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    const today = new Date().toISOString().split('T')[0];

    forms.forEach(form => {
        const dateInput = form.querySelector('input[name="date"]');
        const phoneInput = form.querySelector('input[name="phone"]');
        const nameInput = form.querySelector('input[name="name"]');

        if (dateInput) {
            dateInput.setAttribute('min', today);
        }

        if (nameInput) {
            nameInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[0-9]/g, '');
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                let formatted = '';
                if (value.startsWith('7') || value.startsWith('8')) {
                    value = value.substring(1);
                }
                if (value.length > 0) {
                    formatted = '+7 ';
                    if (value.length > 0) formatted += '(' + value.substring(0, 3);
                    if (value.length >= 3) formatted += ') ' + value.substring(3, 6);
                    if (value.length >= 6) formatted += '-' + value.substring(6, 8);
                    if (value.length >= 8) formatted += '-' + value.substring(8, 10);
                }
                e.target.value = formatted;
            });
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const inputs = form.querySelectorAll('.bookingInput');
            let isValid = true;

            form.querySelectorAll('.error-text').forEach(el => el.remove());
            form.querySelectorAll('.input-wrapper').forEach(wrapper => {
                if (wrapper.querySelector('.bookingInput')) {
                    const inp = wrapper.querySelector('.bookingInput');
                    wrapper.parentNode.insertBefore(inp, wrapper);
                    wrapper.remove();
                }
            });

            inputs.forEach(input => {
                let errorMessage = '';
                const value = input.value.trim();

                if (!value) {
                    errorMessage = 'Пожалуйста, заполните это поле';
                } else if (input.name === 'guests' && parseInt(value) > 5) {
                    errorMessage = 'Максимум 5 гостей';
                } else if (input.name === 'guests' && parseInt(value) < 1) {
                    errorMessage = 'Минимум 1 гость';
                } else if (input.name === 'name' && /[0-9]/.test(value)) {
                    errorMessage = 'Имя не должно содержать цифры';
                } else if (input.name === 'name' && value.length < 2) {
                    errorMessage = 'Имя слишком короткое';
                }

                if (errorMessage) {
                    isValid = false;
                    input.style.borderColor = 'red';

                    let wrapper = input.parentElement;
                    if (!wrapper.classList.contains('input-wrapper')) {
                        wrapper = document.createElement('div');
                        wrapper.className = 'input-wrapper';
                        input.parentNode.insertBefore(wrapper, input);
                        wrapper.appendChild(input);
                    }

                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error-text';
                    errorMsg.textContent = errorMessage;
                    wrapper.appendChild(errorMsg);
                } else {
                    input.style.borderColor = '#515E09';
                }
            });

            if (isValid) {
                const serviceId = form.getAttribute('data-service');
                const formData = {
                    service_id: Number(serviceId),
                    date: form.querySelector('input[name="date"]').value,
                    name: form.querySelector('input[name="name"]').value,
                    phone: form.querySelector('input[name="phone"]').value,
                    guests: form.querySelector('input[name="guests"]').value
                };

                try {
                    const response = await fetch('/api/book', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    if (response.ok) {
                        modal.style.display = 'flex';
                        form.reset();
                    } else {
                        alert('Сервер вернул ошибку: ' + response.status);
                    }
                } catch (error) {
                    alert('Ошибка сети! Сервер не отвечает.');
                    console.error('Ошибка fetch:', error);
                }
            }
        });
    });
});