/*** ESSENTIAL VARIABLES ***/
let gameStatus= false;
const allEmotes= ['4head', 'biblethump', 'cmonbruh', 'failfish', 'feelsbadman', 'feelsgoodman', 'heyguys', 'jebaited', 'kappa', 'kekw', 'kreygasm', 'monkas', 'lul', 'pepehands', 'pepelaugh', 'pjsalt', 'pogchamp', 'seemsgood', 'swiftrage', 'trihard', 'wutface'];
let emotePair= [];
let moveCount= 0;
let count= 0;
let rating= 6;
/*** DOM ***/
const cardWrapper= document.querySelectorAll('.card');
const cardCheckbox= [...document.querySelectorAll('.check')];
const cardBack= [...document.querySelectorAll('.flip-card-back')];
const ratingStar= [...document.querySelectorAll('.rating-display')];
const moveSpan= document.getElementById('moves');
const timerSpan= document.getElementById('timer');
const endMsg= document.getElementById('end-msg');
/*** FEATURES ***/
// Timer
let interval= null;
var seconds= 0;
var minutes= 0;
const time= () => {
    seconds++
    if (seconds < 10) {
        return `${minutes}:0${seconds}`;
    } else if(seconds === 60) {
        minutes++;
        seconds= 0;
    }
    return `${minutes}:${seconds}`;
};
const timer= () => {
    if(!interval) interval = setInterval(() => {timerSpan.textContent= time()}, 1000)
};
// Calculates and updates star rating
const calcRating= (pair) => {
    pair ? rating++ : rating--
    switch(rating) {
        case 6:
        ratingStar.forEach(img => img.src='media/star-solid.svg');
        break;
        case 5:
        ratingStar[0].src='media/star-solid.svg';
        ratingStar[1].src='media/star-solid.svg';
        ratingStar[2].src='media/star-half-solid.svg';
        break;
        case 4:
        ratingStar[0].src='media/star-solid.svg';
        ratingStar[1].src='media/star-solid.svg';
        ratingStar[2].src='media/star-regular.svg';
        break;
        case 3:
        ratingStar[0].src='media/star-solid.svg';
        ratingStar[1].src='media/star-half-solid.svg';
        ratingStar[2].src='media/star-regular.svg';
        break;
        case 2:
        ratingStar[0].src='media/star-solid.svg';
        ratingStar[1].src='media/star-regular.svg';
        ratingStar[2].src='media/star-regular.svg';
        break;      
        case 1:
        ratingStar[0].src='media/star-half-solid.svg';
        ratingStar[1].src='media/star-regular.svg';
        ratingStar[2].src='media/star-regular.svg';
        break;
        case 0:
        ratingStar.forEach(img => img.src='media/star-regular.svg');
        break;
        default:
        rating > 6 
        ? ratingStar.map(el => el.src='media/flame.svg')
        : ratingStar.map(el => el.src='media/poop.svg')
    }
    console.log(rating)
};
// Generates end-game message
const endMessage= () => {
    endMsg.innerHTML= `<h3>You Won!</h3><p>You've completed the game in ${moveCount} moves and for that you needed ${minutes} minutes and ${seconds} seconds.</p>`;
    endMsg.style.visibility= 'visible';
}
/*** CORE FUNCTIONS ***/
// Constructs a random set of emotes
const assignCards= () => {
    cardCheckbox.map(card => card.checked = false);
    cardWrapper.forEach(card => card.classList.add('card-hidden'));
    const allEmotesCopy = [...allEmotes];
    const cardArr = [];
    const getRandomEmote= () => {
        let newEmote = allEmotesCopy[Math.floor(Math.random()*(allEmotesCopy.length))];
        allEmotesCopy.splice(allEmotesCopy.indexOf(newEmote), 1);
        return newEmote}
    for(let i= 0; i < 8; i++) {
        let temp = getRandomEmote();
        cardArr.push(temp);
        cardArr.push(temp);
    }
    setTimeout(() => cardBack.map(card => {
        let randomNum = Math.floor(Math.random()*cardArr.length);
        card.style.backgroundImage = `url("media/icons/${cardArr[randomNum]}.png")`;
        card.style.backgroundImage = `url("media/icons/${cardArr[randomNum]}.png")`;
        cardArr.splice(randomNum, 1);
    }), 200);
};
// Function responsible for turning the cards and adding cards to emotePair array for pairCheck()
const turnCard= (e) => {
    if(!gameStatus) startNewGame();
    moveCount++;
    moveSpan.textContent= moveCount;
    e.target.parentElement.parentElement.querySelector('input').checked= true;
    e.target.parentElement.parentElement.classList.add('disabled');
    emotePair.push(e.target);
    checkPair();
};
cardWrapper.forEach(card => card.addEventListener('click', turnCard));
// Resets/Starts the game
const startNewGame= () => {
    if(gameStatus) {
    timerSpan.textContent= "0:00";
    moveSpan.textContent= "0";
    calcRating();
    varReset();
    }
    endMsg.style.visibility='hidden';
    cardWrapper.forEach(el => el.classList.remove('disabled'))
    gameStatus= true;
    assignCards();
    timer();
};
// Checks if it's a pair + ends the game once variable "count" reaches 8 pairs 
const checkPair= () => {
    if(emotePair.length === 1) {
        return;
    } else if (emotePair.length === 2) {
        if(emotePair[0].parentElement.children[1].style.backgroundImage === emotePair[1].parentElement.children[1].style.backgroundImage) {
            count++;
            calcRating(true);
            if(count === 8) {endGame()}
        } else {
            let temp = [...emotePair];
            calcRating(false);
            setTimeout(() => temp.map(el => {
                el.parentElement.parentElement.querySelector('input').checked= false;
                el.parentElement.parentElement.classList.remove('disabled')
            }), 1000);
        }
        emotePair= [];
    } else {
        console.log('internal error')
    }
};
// Resets variables, stops the timer and displays the end-game message
const endGame= () => {
    gameStatus= false;
    endMessage();
    varReset();
};
// Resets variables
const varReset= () => {
    clearInterval(interval);
    interval= null;
    minutes= 0;
    seconds= 0;
    moveCount= 0;
    count= 0;
    rating= 6;
}