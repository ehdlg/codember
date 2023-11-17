const fs = require('fs/promises');
const path = require('path');
const fullPath = path.resolve(__dirname, 'message.txt');

async function getMessage(url) {
  let number = 0;
  let printedNumbers = '';
  const printNumber = () => {
    printedNumbers += number;
  };
  const OPERATIONS = {
    '#': () => ++number,
    '@': () => --number,
    '*': () => (number **= 2),
    '&': () => printNumber(),
  };

  try {
    const message = await fs.readFile(url, 'utf-8');
    for (let i = 0; i < message.length; i++) {
      OPERATIONS[message[i]]();
    }
  } catch (e) {
    console.error('Error ', e);
    return '';
  }

  return printedNumbers;
}

(async () => {
  try {
    console.log(await getMessage(fullPath));
  } catch (e) {
    console.error(e);
  }
})();
