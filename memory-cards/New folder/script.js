
const cardsContainer = document.querySelector('#cards-container'),
    prevBtn = document.querySelector('#prev'),
    nextBtn = document.querySelector('#next'),
    currentEl = document.querySelector('#current'),
    showBtn = document.querySelector('#show'),
    hideBtn = document.querySelector('#hide'),
    questionEl = document.querySelector('#question'),
    answerEl = document.querySelector('#answer'),
    addCardBtn = document.querySelector('#add-card'),
    clearBtn = document.querySelector('#clear'),
    addContainer = document.querySelector('#add-container')


// Keep track of current card
let currentActiveCard = 0

// Store DOM cards
const cardsEl = []

// Store card data
const cardsData = getCardsData()

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'))
  return cards === null ? [] : cards
}

function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards))
  window.location.reload()
}

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

// Create all cards
function createCards(){
    cardsData.forEach((data, index) => createCard(data,index))
}

// Create a single card
function createCard(data, index){
  const card = document.createElement('div')
  card.classList.add('card')
  if(index === 0){
    card.classList.add('active')
  }
  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
          <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
          <p>${data.answer}</p>
      </div>
    </div>
  `

  card.addEventListener('click', () => {
    card.classList.toggle('show-answer')
  })

  // Add to DOM cards
  cardsEl.push(card)
  cardsContainer.appendChild(card)

  updateCurrentText()
}

// Show number of card
function updateCurrentText(){
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`
}

createCards()

// Event listener

if(cardsEl.length>0){
  nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left'
    currentActiveCard = currentActiveCard + 1
    if(currentActiveCard > cardsEl.length - 1){
      currentActiveCard = cardsEl.length - 1
    }
    cardsEl[currentActiveCard].className = 'card active'
    updateCurrentText()
  })
  
  prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right'
    currentActiveCard = currentActiveCard - 1
    if(currentActiveCard <= 0){
      currentActiveCard = 0
    }
    cardsEl[currentActiveCard].className = 'card active'
    updateCurrentText()
  })
}

showBtn.addEventListener('click', () => {
  addContainer.classList.add('show')
})

hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show')
})

// Add new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value
  const answer = answerEl.value

  if(question.trim() && answer.trim()){
    const newCard = {question, answer}
    createCard(newCard)
    questionEl.value = ''
    answerEl.value = ''
    addContainer.classList.remove('show')
    cardsData.push(newCard)
    setCardsData(cardsData)
  }

})

clearBtn.addEventListener('click', () => {
  localStorage.clear()
  cardsContainer.innerHTML = ''
  window.location.reload()
})