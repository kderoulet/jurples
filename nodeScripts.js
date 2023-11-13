let fs = require('fs')
// let data = fs.readFileSync('./words.txt', 'utf-8')
// // console.log(data)

// data = data.split('\r\n')
// // console.log(data)

// let wordRegex = /^[a-z]{3,8}$/
// for (let i = data.length-1; i >= 0; i--) {
//     // console.log(i, data[i])
//     let word = data[i]
//     if (!wordRegex.test(word)) {
//         data.splice(i, 1)
//     }
// }
// data = data.join('\n')
// fs.writeFileSync('./jurples-dictionary.txt', data)

// let data = fs.readFileSync('./jurples-dictionary.txt', 'utf-8')
// data = data.split('\n')
// data.forEach((datum, i) => {
//     data[i] = String(datum)
// })
// data = data.join('", "')
// fs.writeFileSync('./dict.js', data);