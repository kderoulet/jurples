let gamePointCategories = {
    threeLetter: 0,
    fourLetter: 0,
    fivePlus: 0,
    fullHouse: 0,
    flush: 0,
    wild: 0,
    bonus: 0
}
let rounds = 0;
function filterWords(names, index, letter) {
    var filteredNames = names.filter(function(word) {
       return word.charAt(index) === letter;
    });
    return filteredNames;
}

const SixLetterWords = jurplesDictionary.filter(word => {
    if (word.length === 8) return word
})

let submissionInput = document.querySelector('#submissions')
let letterBank = document.querySelector('#letter-bank')
let wordCount = document.querySelector('#word-count')
let timer = document.querySelector('#timer')

let roundPts = document.querySelector('#round-pts')
let threePts = document.querySelector('#three-pts')
let fourPts = document.querySelector('#four-pts')
let fivePts = document.querySelector('#five-pts')
let fhPts = document.querySelector('#fh-pts')
let flushPts = document.querySelector('#flush-pts')
let flushLetter = document.querySelector('#flush-letter')    
let wildPts = document.querySelector('#wild-pts')
let bonusPts = document.querySelector('#bonus-pts')
let pointBoard = [
    threePts, fourPts, fivePts, fhPts, flushPts, flushLetter, wildPts
]


function newRound() {
    submissionInput.value = ''
    submissionInput.disabled = false
    submissionInput.focus()

    // point board
    roundPts.textContent = "Round points:"
    threePts.textContent = 0
    fourPts.textContent = 0    
    fivePts.textContent = 0
    fhPts.textContent = 0
    flushPts.textContent = 0
    flushLetter.textContent = ''
    wildPts.textContent = 0
    bonusPts.textContent = 0
    
    // 8 random letters with at least one vowel
    let wordArray = []
    let vowels = ["e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","y","y","y","y","y","y","y","y","y" ]
    let rareConsonants = ["x","z","j","q"]
    let weightedLetters = ["e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","l","l","l","l","l","l","l","l","l","l","l","l","l","l","l","l","l","l","l","l","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","p","p","p","p","p","p","p","p","p","p","p","p","p","p","p","p","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","h","h","h","h","h","h","h","h","h","h","h","h","h","h","h","g","g","g","g","g","g","g","g","g","g","g","g","b","b","b","b","b","b","b","b","b","b","f","f","f","f","f","f","f","f","f","y","y","y","y","y","y","y","y","y","w","w","w","w","w","w","k","k","k","k","k","v","v","v","v","v","x","z","j","q"]
    let commonWeightedLetters = ["e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","i","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","l","l","l","l","l","l","l","l","l","l","l","l","l","l","l","l","l","l","l","l","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","p","p","p","p","p","p","p","p","p","p","p","p","p","p","p","p","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","h","h","h","h","h","h","h","h","h","h","h","h","h","h","h","g","g","g","g","g","g","g","g","g","g","g","g","b","b","b","b","b","b","b","b","b","b","f","f","f","f","f","f","f","f","f","y","y","y","y","y","y","y","y","y","w","w","w","w","w","w","k","k","k","k","k","v","v","v","v","v"]
    let pointCategories = {
        threeLetter: 0,
        fourLetter: 0,
        fivePlus: 0,
        fullHouse: 0,
        flush: 0,
        wild: 0,
        bonus: 0
    }
    // sample bounds:   2 <= vowels <= 4; 2 <= rare cons <= 3
    let vowelCount = 0, rareCount = 0
    // new strat... pick 6 letter word, add two letters, scramble
    let firstSix = pickRandom(SixLetterWords)
    for (let i = 0; i < 6; i++) {
        let newLetter = firstSix[i]
        wordArray.push(newLetter)
        if (vowels.includes(newLetter)) {
            vowelCount++
        } else if (rareConsonants.includes(newLetter)) {
            rareCount++
        }
        if (wordArray.filter(item => item == newLetter).length > 2) {
            weightedLetters = weightedLetters.filter(a => a !== newLetter)
            commonWeightedLetters = commonWeightedLetters.filter(a => a !== newLetter)        
        }
    }
    for (let i = 0; i < 2; i++) {
        let newLetter = ''
        if (vowelCount < 2) {
            newLetter = pickRandom(vowels)
        } else if (rareCount > 0) {
            newLetter = pickRandom(commonWeightedLetters)
        } else {
            newLetter = pickRandom(weightedLetters)
        }
        wordArray.push(newLetter)
        if (vowels.includes(newLetter)) {
            vowelCount++
        } else if (rareConsonants.includes(newLetter)) {
            rareCount++
        }
        if (wordArray.filter(item => item == newLetter).length > 2) {
            weightedLetters = weightedLetters.filter(a => a !== newLetter)
            commonWeightedLetters = commonWeightedLetters.filter(a => a !== newLetter)        
        }
    }
    // shuffle
    for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    
    function pickRandom(array) {
        return array[Math.floor(Math.random() * array.length-1)]
    }
    
    // timer stuff
    
    function startTimer(duration, display) {
        let startTimerId = setInterval(function () {
            if (--duration > -1) {
                display.textContent = duration
            } else {
                clearInterval(startTimerId)
                endGame()
            }
        }, 1000)
    }
    let timerTime = 90
    timer.textContent = timerTime
    startTimer(timerTime, timer)

    function endGame() {
        // disable typing
        submissionInput.disabled = true
        // select new points
        roundPts.textContent = "Select a score:"
        // start new game
        pointBoard.forEach(score => {
            if (!score.classList.value.includes('selected')) {
                score.addEventListener('click', addToTotal)
                score.className += 'selectable'
            }
        })
    }
    function addToTotal(evt) {
        pointBoard.forEach(score => {
            score.removeEventListener('click', addToTotal)
        })
    
        let target = evt.target
        target.className = 'selected'
        let gameID = `#game-${target.id}`
        // convert id to key
        let pointsDict = {
            'three-pts': 'threeLetter',
            'four-pts': 'fourLetter',
            'five-pts': 'fivePlus',
            'fh-pts': 'fullHouse',
            'flush-pts': 'flush',
            'wild-pts': 'wild',
        }
        gamePointCategories[pointsDict[target.id]] = pointCategories[pointsDict[target.id]]
        document.querySelector(gameID).textContent = gamePointCategories[pointsDict[target.id]]
        if (target.id === 'flush-pts') {
            document.querySelector('#game-flush-letter').textContent = document.querySelector('#flush-letter').textContent
        }

        gamePointCategories['bonus'] += pointCategories['bonus']
        document.querySelector('#game-bonus-pts').textContent = gamePointCategories['bonus']
        submissionInput.removeEventListener("keydown", onKeydown)
        submissionInput.removeEventListener("input", onInput)
        let totalPoints = 0
        Object.keys(gamePointCategories).forEach(key => {
             totalPoints += gamePointCategories[key]
        })
        document.querySelector('#game-total-pts').textContent = totalPoints
        
        checkForNewRound()
    }
    
    // let wordArray = ['a', 'c', 'c', 'u', 's', 'e', 'r', 's']
    let wordReversed = wordArray.toReversed()
    let originalWord = wordArray.join('')
    letterBank.textContent = originalWord
    
    let submissionWord = ''
    submissionInput.value = submissionWord
    
    let submissions = []
    let submissionsByLetter = {}
    let mostSubmissionsByLetter = 0
    let mostSubmittedLetter = ''
    // filter jurples dictionary to only words that can be made out of originalWord 
    let wordBank = jurplesDictionary
    
    submissionInput.addEventListener("input", onInput)
    function onInput(evt) {
        if (letterBank.textContent.includes(evt.data)) {
            letterBank.textContent = letterBank.textContent.replace(evt.data, ' ') // nbsp;
            submissionWord += evt.data
            submissionInput.value = submissionWord
        } else if (evt.inputType == 'deleteContentBackward') {
            //remove word from submission
            let letter = submissionWord.slice(-1)
            submissionWord = submissionWord.slice(0, -1)
            submissionInput.value = submissionWord
            // reconstruct letterbank
            // letter will go in the last space that corresponds to the letter
            // first get spaces
            let spaces = []
            for (let i = 0; i < letterBank.textContent.length; i++) {
                // console.log(letterBank.textContent[i])
                if (letterBank.textContent[i] === ' ') {
                    spaces.push(i)
                }
            }
            // next find last space that corresponds with deleted letter
            let space = 0
            for (let i = spaces.length-1; i >= 0; i--) {
                if (originalWord[spaces[i]] === letter) {
                    space = spaces[i]
                    break
                }
            }
            // add to letter bank
            let content = letterBank.textContent.split('')
            content[space] = letter
            content = content.join('')
            letterBank.textContent = content
        } else {
            submissionInput.value = submissionWord        
        }
    }
    
    submissionInput.addEventListener("keydown", onKeydown)
    function onKeydown(evt) {
        if (evt.key == "Enter") {
            if (!submissions.includes(submissionWord)) {
                submissions.push(submissionWord)
                if (wordBank.includes(submissionWord)) {
                    wordCount.textContent = Number(wordCount.textContent) + 1
                    calculateTotals(submissionWord)
                }
            }
            submissionWord = ''
            submissionInput.value = submissionWord
            letterBank.textContent = originalWord
        }
    }
    
    function calculateTotals(word) {
        if (word[0] in submissionsByLetter) {
            submissionsByLetter[word[0]] += 1
        } else {
            submissionsByLetter[word[0]] = 1
        }
        if (submissionsByLetter[word[0]] > mostSubmissionsByLetter) {
            mostSubmissionsByLetter = submissionsByLetter[word[0]]
            mostSubmittedLetter = word[0]
            pointCategories.flush = mostSubmissionsByLetter * 10
        }
    
        if (word.length === 3) {
            pointCategories.threeLetter += 4
            pointCategories.wild += 1
        } else if (word.length === 4) {
            pointCategories.fourLetter += 6
            pointCategories.wild += 2
            if (pointCategories.fourLetter === 60) {
                pointCategories.fourLetter += 30
            }
        } else if (word.length >= 5) {
            pointCategories.fivePlus += 8
            if (pointCategories.fivePlus === 80) {
                pointCategories.fivePlus += 100
            }
    
            if (word.length === 5) {
                pointCategories.wild += 5
            } else if (word.length === 6) {
                pointCategories.wild += 7
            } else if (word.length === 7) {
                pointCategories.wild += 10
                pointCategories.bonus += 50
            } else if (word.length === 8) {
                pointCategories.wild += 15
                pointCategories.bonus += 50
            }
        }
        if (submissions.length > 24) {
            pointCategories.fullHouse = 150
        } else if (submissions.length > 14) {
            pointCategories.fullHouse = 50
        }
        threePts.textContent = pointCategories.threeLetter
        fourPts.textContent = pointCategories.fourLetter
        fivePts.textContent = pointCategories.fivePlus
        fhPts.textContent = pointCategories.fullHouse
        flushPts.textContent = pointCategories.flush
        flushLetter.textContent = mostSubmittedLetter
        wildPts.textContent = pointCategories.wild
        bonusPts.textContent = pointCategories.bonus
    }
}
newRound()

function checkForNewRound() {
    if (rounds < 5) {
        rounds++
        newRound()
    }
}