const URL_BASE = 'https://anapioficeandfire.com/api/';
const REQ = 'books';
const HEADER_TEXT = 'Books from Game of Thrones';

function displayError(err) {
  console.log('ERROR');
  console.log(err);
}

function convertToArray(data) {
  var results = Object.values(data);
  return results;
}

function getLastBit(url) {
  return url.split('/').pop();
}

function parseDate(dateString) {
  var datePart = dateString.split('T')[0];
  var year = datePart.split('-')[0];
  var month = datePart.split('-')[1];
  var day = datePart.split('-')[2];
  var date = month.replace(/^0+/, '') + '/' + day.replace(/^0+/, '') + '/' + year;
  return date;
}

function createContent(ajaxData) {
  ajaxData.forEach(data => {
    var $book = $('<div>').addClass('book');
    var $title = $('<div>').addClass('title');
    var $isbn = $('<div>').addClass('isbn details');
    var $author = $('<div>').addClass('author details');
    var $pages = $('<div>').addClass('pages details');
    var $released = $('<div>').addClass('released details');

    var bookNum = getLastBit(data.url);
    $title.text('#' + bookNum + ': ' + data.name);
    $isbn.text('ISBN: ' + data.isbn);
    $author.text('Author: ' + data.authors[0]);
    $pages.text('Pages: ' + data.numberOfPages);
    $released.text('Released: ' + parseDate(data.released));

    $book.append($title);
    $book.append($isbn);
    $book.append($author);
    $book.append($pages);
    $book.append($released);
    $('.wrapper').append($book);
  });
}

function main() {
  $('.header').text(`${HEADER_TEXT}`);

  var $books = $.get(URL_BASE + REQ);
  $books
    .then(convertToArray)
    .then(createContent)
    .catch(displayError)
    ;
}

main();