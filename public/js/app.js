const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const moreInfo = document.querySelector('#more-info');
const message3 = document.querySelector('#message-3');

weatherForm.addEventListener('submit', (e) => {

    // Initial settings for every time a location is submitted
    moreInfo.style.display = 'none';
    e.preventDefault()

    const location = search.value;

    message1.textContent = 'Loading...';
    message2.textContent = '';
    message3.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
            } else {
                // Setting messages data
                message1.textContent = data.location + '.';
                message2.innerHTML = data.forecast;
                message3.innerHTML = data.forecastExtra;

                // Setting button
                moreInfo.style.display = 'inline';

                // Event to show data with a click on the button
                moreInfo.addEventListener('click', () => {

                    message3.classList.toggle('hidden');

                    if (message3.classList.contains('hidden'))
                        moreInfo.textContent = `More info ◼`;
                    else
                        moreInfo.textContent = `More info ▼`;

                });
            }
        });
    });
});