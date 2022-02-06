const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')
const wordle = 'SUPER'
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowEl = document.createElement('div')
    rowEl.setAttribute('id', 'guessRow-' + guessRowIndex)
    tileDisplay.append(rowEl)
    guessRow.forEach((_guess, guessIndex) => {
        const tileEl = document.createElement('div')
        tileEl.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileEl.classList.add('tile')
        rowEl.append(tileEl)
    })
    tileDisplay.append(rowEl)
})



keys.forEach(key => {
    const buttonEl = document.createElement('button')
    buttonEl.textContent = key
    buttonEl.setAttribute('id', key)
    buttonEl.addEventListener('click', () => handleClick(key)) //callback since we pass param
    keyboard.append(buttonEl)
})

const handleClick = (key) => {
    console.log('clicked', key)
    if (key === '«') {
        console.log('delete letter')
        deleteLetter()
        return
    }
    if (key === 'ENTER') {
        console.log('check row')
        checkRow()
        return
    }

    addLetter(key)
}

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        //replace value [in row] [in tile] with letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
        console.log('guessRows', guessRows);
    }

}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    if (currentTile > 4) {
        console.log(guess, wordle);
        flipTile()
        if (wordle == guess) {
            showMessage('Magnificent!')
            isGameOver = true
            return
        } else {
            if (currentRow >= 5) {
                isGameOver = false
                showMessage('Game Over')
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        }

    }
}

const showMessage = (message) => {
    const messageEl = document.createElement('p')
    messageEl.textContent = message
    messageDisplay.append(messageEl)
    setTimeout(() => messageDisplay.removeChild(messageEl), 3000)

}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []


    rowTiles.forEach((tile) => {
        guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay'})

    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach((guess, index) => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}