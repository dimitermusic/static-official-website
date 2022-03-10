// Confirm file is linked to html
console.log('hello world');
// Select element from DOM to add concerts to
let tableBody = document.getElementById('concert-table');

// Print conditional message if no concert data
const handleNoConcertMessage = () => {

    let comingSoon = document.createElement('p');
    let disclaimer = document.getElementById('concert-disclaimer');

    disclaimer.textContent = ""
    comingSoon.textContent = 'COMING SOON!';
    tableBody.appendChild(comingSoon);
    comingSoon.style.textAlign = 'center'

}

// Fetch from custom concerts API and print to page
const handleFetchConcerts = () => {

    const API = 'https://api.dimitermusic.com/concerts';

    fetch(API)
        .then(res => res.json())
        .then(data => {

            if (data.length < 1 || (!data)) {

                handleNoConcertMessage();

            }


            // Sort concerts by date
            const handleSortConcerts = () => {

                data.sort((a, b) => {

                    let da = new Date(a.date),
                        db = new Date(b.date);

                    return da - db;

                });

            }

            // Dynamically create, style, and set content of html elements based on concert API data
            const handleDisplayConcerts = () => {

                for (let i = 0; i < data.length; i++) {

                    let tableRow = document.createElement('a');
                    let date = document.createElement('p')
                    let eventName = document.createElement('p')
                    let city = document.createElement('p')
                    let today = new Date().valueOf();
                    let currentConcert = new Date(data[i].date).valueOf();

                    if (currentConcert >= today) {

                        // Add CSS class to dynamically created row.
                        tableRow.classList.add('table-row')

                        // Set content of dynamically created elements based on API data.
                        tableRow.target = '_blank'
                        date.textContent = data[i].date;
                        eventName.textContent = data[i].eventName;
                        city.textContent = data[i].city;

                        // Print elements to page.
                        tableRow.appendChild(date);
                        tableRow.appendChild(eventName);
                        tableRow.appendChild(city);
                        tableBody.appendChild(tableRow);

                        // Add ticket link if present.
                        if (data[i].ticketLink) {

                            let ticketBtn = document.createElement('a');
                            ticketBtn.classList.add('btn')
                            ticketBtn.textContent = 'TICKETS';
                            ticketBtn.href = data[i].ticketLink;
                            ticketBtn.target = '_blank'
                            tableRow.appendChild(ticketBtn);

                        }

                        // Add Bandsintown link to table row if not null.
                        if (data[i].bandsInTownLink) {

                            tableRow.href = data[i].bandsInTownLink;

                        }

                    }

                }

            }

            handleSortConcerts();
            handleDisplayConcerts();

        })
        .catch(err => {
            console.log(err)
            handleNoConcertMessage();
            return err
        })

}

// Dynamically set copyright year to automatically update
const handleCopyrightMessage = () => {

    let copyrightText = document.getElementById('copyright-text');
    let thisYear = new Date().toDateString().slice(11);
    let githubLink = document.createElement('a');

    copyrightText.textContent = `© ${thisYear} Dimiter Yordanov. All Rights Reserved. Powered by `;

    // Add link to dynamically created copyright text
    githubLink.textContent = 'Dimiter Yordanov.';
    githubLink.href = 'https://www.github.com/dimitermusic';
    githubLink.target = '_blank';
    githubLink.classList.add('github-link');
    copyrightText.appendChild(githubLink);


}

handleFetchConcerts();
handleCopyrightMessage();