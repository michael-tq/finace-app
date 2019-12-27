'use strict'

const apiKey = 'P8gRk7VBaTFtWMr6tY5Q30Q3faTvzL46rG8q7xR2IU9ScxkmRWD1pJbwbmSj'; 
const searchURL = 'https://api.worldtradingdata.com/api/v1/history_multi_single_day';

// stock price of microsoft on 2017-january-11 
const actualURL = 
'https://api.worldtradingdata.com/api/v1/history_multi_single_day?symbol=msft&date=2017-01-11&api_token=P8gRk7VBaTFtWMr6tY5Q30Q3faTvzL46rG8q7xR2IU9ScxkmRWD1pJbwbmSj';

function formatURL(company, balance, initial, end) {
    let firstDate = initial.replace(/-/g, '');
    console.log(firstDate);
    let secondDate = end.replace(/-/g, '');
    const beginning = firstDate.slice(0,4) + '-' + firstDate.slice(4,6) + '-' + firstDate.slice(6,8);
    console.log(beginning)
    const ending = secondDate.slice(0,4) + '-' + secondDate.slice(4,6) + '-' + secondDate.slice(6,8);
    const firstURL = searchURL + '?symbol=' + company + '&date=' + beginning + '&' + 'api_token=' + apiKey;
    console.log(firstURL)
    const secondURL = searchURL + '?symbol=' + company + '&date=' + ending + '&' + 'api_token=' + apiKey;
    console.log(secondDate)
    console.log(firstDate)
    callThing(firstURL, company, balance);
    callThing(secondURL, company, balance);
    console.log(firstURL)
}

function callThing(url, company, balance) {
    console.log(company);
    // console.log(url);
    console.log(url)
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, company, balance))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
    console.log('line');
    console.log(url)
}

// function calculation(responseJson, company, balance) {
//     let initialBalance = balance * 
// }
let arr = [];
function displayResults(responseJson, company, balance) {
    console.log('fsdf');
    console.log(responseJson);
    console.log(typeof company);
    let newCompany = company.toUpperCase();
    console.log(company)
    console.log(responseJson.data)
    // let arr = [];
    // $('.answer').append(`<p>${responseJson.data[newCompany].close}</p>`);
    arr.push(parseFloat(responseJson.data[newCompany].close))
    console.log(arr)
    if (arr.length === 2 ) {
        let shares = balance / arr[0];
        console.log(typeof arr[0])
        console.log(`${balance} ${arr[0]}`);
        console.log(shares);    
        let secondValue = shares * arr[1];
        console.log(arr.length)
        // console.log(secondValue);
        $('.answer').html(`<p>${secondValue}</p>`);
        arr = [];
    }
    console.log(arr)
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
        formatURL(company, balance, initial, end);
    })
}

$(watchForm);

//no company exist, no stock data exists, 