

const word = document.getElementById('word'),
    text = document.getElementById('text'),
    scoreEl = document.getElementById('score'),
    timeEl = document.getElementById('time'),
    endGameEl = document.getElementById('end-game-container'),
    settingBtn = document.getElementById('settings-btn'),
    settings = document.getElementById('settings'),
    settingsForm = document.getElementById('settings-form'),
    difficultySelect = document.getElementById('difficulty')

// List of words for game

const words = [
    'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
]

// Init word
let randomWord

// Init score
let score = 0

// Init time
let time = 10

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

// Set difficulty select value
difficultySelect.value = difficulty

// Focus on text on start
text.focus()

// Start couting down
const timeInterval = setInterval(updateTime,1000)

// Generate random word form array
function getRandomWord(){
    return words[Math.floor(Math.random()*words.length)]
}

// Add word to DOM
function addWordToDOM(){
    randomWord = getRandomWord()
    word.innerHTML = randomWord
}

// Update Score
function updateScore(){
    score++
    scoreEl.innerHTML = score
}

// Update Time
function updateTime(){
    time--
    timeEl.innerHTML = time + 's'
    if(time === 0){
        clearInterval(timeInterval)
        // end game
        gameOver()
    }
}

// Game Over, show End Screen
function gameOver(){
    endGameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `
    endGameEl.style.display = 'flex'
}

addWordToDOM()

// EventListener
text.addEventListener('input', e => {
    const insertedText = e.target.value
    if(insertedText === randomWord){
        addWordToDOM()
        updateScore()
        // Clear
        e.target.value = ''
        if(difficulty === 'hard'){
            time += 2
        }
        else if(difficulty === 'medium'){
            time += 3
        }
        else{
            time += 5
        }
        updateTime()
    }
})

// Settings btn click
settingBtn.addEventListener('click', () => settings.classList.toggle('hide'))

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)
    location.reload()
})