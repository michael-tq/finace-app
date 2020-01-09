'use strict'

function makeRequest(company, balance, initial, end) {
    const apiKey = 'P8gRk7VBaTFtWMr6tY5Q30Q3faTvzL46rG8q7xR2IU9ScxkmRWD1pJbwbmSj'; 
    const searchURL = 'https://api.worldtradingdata.com/api/v1/history_multi_single_day';
    let firstDate = initial.replace(/-/g, '');
    let secondDate = end.replace(/-/g, '');
    const beginning = firstDate.slice(0,4) + '-' + firstDate.slice(4,6) + '-' + firstDate.slice(6,8);
    const ending = secondDate.slice(0,4) + '-' + secondDate.slice(4,6) + '-' + secondDate.slice(6,8);
    const firstURL = searchURL + '?symbol=' + company + '&date=' + beginning + '&' + 'api_token=' + apiKey;
    const secondURL = searchURL + '?symbol=' + company + '&date=' + ending + '&' + 'api_token=' + apiKey;
    fetchCall(firstURL, secondURL, company, balance);
}

function fetchCall(firstURL, secondURL, company, balance) {
    fetch(firstURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(firstResponse => {
      fetch(secondURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(secondResponse => {
        displayResults(firstResponse, secondResponse, company, balance);
      })
    })
  }

function displayResults(firstResponse, secondResponse, company, balance) {
    if (firstResponse.Message || secondResponse.Message) {
      $('.answer').empty();
      $('.errors').html('No data on that date or company ticker does not exist.');
    } else {
      let newCompany = company.toUpperCase();
      let firstStock = parseFloat(firstResponse.data[newCompany].close);
      let secondStock = parseFloat(secondResponse.data[newCompany].close);
      let shares = balance / firstStock; 
      let secondValue = (shares * secondStock).toFixed(2);
      $('.errors').empty();
      $('.answer').html(`<p>By the time of withdrawal you will have $${secondValue}.</p>`);
    }
}

function checkData(company, balance, initial, end) {
  if (company === '') {
    $('.answer').empty();
    $('.errors').html('Please enter a company ticker.');
  } else if (balance === '') {
    $('.answer').empty();
    $('.errors').html('Please enter a balance.');
  } else if (initial === '' || end === '') {
    $('.answer').empty();
    $('.errors').html('Please enter a date.');
  }
  let firstDate = new Date(initial).getUTCDay();
  let secondDate = new Date(end).getUTCDay();
  if (firstDate === 0 || firstDate === 6) {
    $('.answer').empty();
    $('.errors').html('Please do not select weekends or holidays. You can use the dropdown to help select a date.');
    return;
  } else if (secondDate === 0 || secondDate === 6) {
    $('.answer').empty();
    $('.errors').html('Please do not select weekends or holidays. You can use the dropdown to help select a date.');
    return;
  }
  makeRequest(company, balance, initial, end);
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const company = $('#company-name').val();
        const balance = $('#initial-amount').val();
        const initial = $('#initial-date').val();
        const end = $('#end-date').val();
        checkData(company, balance, initial, end);
    })
}

$(watchForm);
