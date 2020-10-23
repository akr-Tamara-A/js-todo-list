'use strict'

let fs = require('fs');

/* fs.readFile('todos.json', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log('text');
 */
let fileText;
let id = 2;

fs.readFile('todos.json', 'utf-8', (err, data) => {
  if (err) throw err;
  fileText = JSON.parse(data);
  fileText[0].isChecked = true;
  fs.writeFile('todos.json', JSON.stringify(fileText), (err) => {
    if (err) {
      console.log(err);
    }
    console.log('data is writed!');
  }) 
});

let text = 'something';
/* 
fs.writeFile('text.txt', fileText, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('data is writed!');
}) */