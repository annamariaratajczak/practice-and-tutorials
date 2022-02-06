const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
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

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowEl = document.createElement('div')
    rowEl.setAttribute('id', 'guestRow-' + guessRowIndex)
    tileDisplay.append(rowEl)
    guessRow.forEach((guess, guessIndex) => {
        const tileEl = document.createElement('div')
        tileEl.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileEl.classList.add('tile')
        rowEl.append(tileEl)
    })
    tileDisplay.append(rowEl)
})

const handleClick = () => {
    console.log('clicked')
}

keys.forEach(key => {
    const buttonEl = document.createElement('button')
    buttonEl.textContent = key
    buttonEl.setAttribute('id', key)
    buttonEl.addEventListener('click', handleClick)
    keyboard.append(buttonEl)
})