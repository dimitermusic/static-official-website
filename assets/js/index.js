const API = 'https://dimiter-concert-api.herokuapp.com/api/concerts';
const today = new Date().valueOf();

fetch(API)
    .then(res => res.json())
    .then(data => {

        let tableBody = document.getElementById('concert-table');

        if (data.length < 1) {
            let comingSoon = document.createElement('p');
            comingSoon.textContent = 'COMING SOON!';
            tableBody.appendChild(comingSoon);
            comingSoon.style.textAlign = 'center'
        }

        for (let i = 0; i < data.length; i++) {

            let tableRow = document.createElement('a');
            let date = document.createElement('p')
            let venue = document.createElement('p')
            let city = document.createElement('p')
            let ticketBtn = document.createElement('a');
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
                venue.textContent = data[i].venue;
                city.textContent = data[i].city;

                tableRow.appendChild(date);
                tableRow.appendChild(venue);
                tableRow.appendChild(city);
                tableRow.appendChild(ticketBtn);
                tableBody.appendChild(tableRow);

            }

        }

    })
    .catch(err => {
        console.log('Error')
        console.log(err)
        return err
    })