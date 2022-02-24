// Confirm file is linked to html
console.log('hello world');

// Fetch from custom concerts API and print to page
const concerts = () => {

    const API = 'https://dimiter-concert-api.herokuapp.com/api/concerts';

    fetch(API)
        .then(res => res.json())
        .then(data => {

            let tableBody = document.getElementById('concert-table');

            // Print conditional message if no concerts
            if (data.length < 1) {

                let comingSoon = document.createElement('p');
                comingSoon.textContent = 'COMING SOON!';
                tableBody.appendChild(comingSoon);
                comingSoon.style.textAlign = 'center'

            }

            // Sort concerts by date
            data.sort((a, b) => {
                let da = new Date(a.date),
                    db = new Date(b.date);
                return da - db;
            });

            // Dynamically create, style, and set content of html elements based on concert API data
            for (let i = 0; i < data.length; i++) {

                let tableRow = document.createElement('a');
                let date = document.createElement('p')
                let eventName = document.createElement('p')
                let city = document.createElement('p')
                let ticketBtn = document.createElement('a');
                let today = new Date().valueOf();
                let currentConcert = new Date(data[i].date).valueOf();

                if (currentConcert >= today) {

                    tableRow.classList.add('table-row')
                    ticketBtn.classList.add('btn')

                    tableRow.href = data[i].bandsInTownLink;
                    tableRow.target = '_blank'
                    ticketBtn.textContent = 'TICKETS';
                    ticketBtn.href = data[i].ticketLink;
                    ticketBtn.target = '_blank'
                    date.textContent = data[i].date;
                    eventName.textContent = data[i].eventName;
                    city.textContent = data[i].city;

                    tableRow.appendChild(date);
                    tableRow.appendChild(eventName);
                    tableRow.appendChild(city);
                    tableRow.appendChild(ticketBtn);
                    tableBody.appendChild(tableRow);

                }

            }

        })
        .catch(err => {
            console.log(err)
            return err
        })

}

// Dynamically set copyright year to automatically update
const copyright = () => {

    let copyrightText = document.getElementById('copyright-text')
    let thisYear = new Date().toDateString().slice(11);

    copyrightText.textContent = `© ${thisYear} Dimiter Yordanov. All Rights Reserved. Powered by Dimiter Yordanov.`;

}

concerts();
copyright();