const fs = require('node:fs/promises');

async function decodeMessage(file){
  const message = ((await fs.readFile(file, 'utf-8')).split(' '));
  const wordMap = new Map();
  let decodedMessage = '';

  message.forEach(word => {
    if(wordMap.has(word)){
      wordMap.set(word, wordMap.get(word) + 1);
    }else{
      wordMap.set(word, 1);
    }
  })

  for(let word of wordMap.keys()){
    decodedMessage += `${word}${wordMap.get(word)}`
  }

  return decodedMessage;
} 

console.log(decodeMessage('message.txt'));
