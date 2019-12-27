'use strict'

const apiKey = 'P8gRk7VBaTFtWMr6tY5Q30Q3faTvzL46rG8q7xR2IU9ScxkmRWD1pJbwbmSj'; 
const searchURL = 'https://api.worldtradingdata.com/api/v1/history_multi_single_day';

// stock price of microsoft on 2017-january-11 
const actualURL = 
'https://api.worldtradingdata.com/api/v1/history_multi_single_day?symbol=msft&date=2017-01-11&api_token=P8gRk7VBaTFtWMr6tY5Q30Q3faTvzL46rG8q7xR2IU9ScxkmRWD1pJbwbmSj';

function callThing(company, balance, initial, end) {
    console.log(company);
    let firstDate = initial.replace(/\//g, '');
    let second = end.replace(/\//g, '');
    const beginDate = firstDate.slice(0,4) + '-' + firstDate.slice(4,6) + '-' + firstDate.slice(6,8);
    const url = searchURL + '?symbol=' + company + '&date=' + beginDate + '&' + 'api_token=' + apiKey;  
    console.log(url);
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, company))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson, company) {
    console.log('fsdf');
    console.log(responseJson);
    console.log(typeof company);
    let newCompany = company.toUpperCase();
    console.log(company)
    console.log(responseJson.data)
    $('.answer').html(`<p>${responseJson.data[newCompany].close}</p>`);
    console.log(responseJson.data.company.close)
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const company = $('#company-name').val();
        const balance = $('#initial-amount').val();
        const initial = $('#initial-date').val();
        const end = $('#end-date').val();
        console.log(initial)
        // console.log(initial)
        callThing(company, balance, initial, end);
    })
}

$(watchForm);