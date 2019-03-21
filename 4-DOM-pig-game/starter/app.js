/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer;
init();
console.log("%c CURRENT", 'color:green', scores, roundScore, activePlayer);

function init (){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';
        document.getElementById('score-0').textContent = 0;
        document.getElementById('score-1').textContent = 0;
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
    }
  

    
    function switchActivePlayer(){
        roundScore = 0;
        document.getElementById('current-' + activePlayer).textContent = roundScore
        document.querySelector('.player-0-panel').classList.toggle('active')
        document.querySelector('.player-1-panel').classList.toggle('active')
        console.log('%c changed player', 'color: pink', activePlayer)
        activePlayer === 0 ? activePlayer= 1 : activePlayer=0
        document.querySelector(".dice").style.display = "none";
    }

    handleClickEvent = () =>{
        // randomize dice roll
        var randomDice = Math.floor((Math.random() * 6)) + 1
        // display and change the image of the dice
        document.querySelector('.dice').style.display =  'block'
        document.querySelector('.dice').src = `dice-${randomDice}.png`;
        // check if randomroll is one ? skip : add to score
        if (randomDice === 1) {
            switchActivePlayer()
        } else {
            roundScore += randomDice;
            document.getElementById('current-' + activePlayer).textContent  = roundScore
        }
    }

    document.querySelector('.btn-roll').addEventListener('click', handleClickEvent)

    document.querySelector('.btn-hold').addEventListener('click', ()=>{
        scores[activePlayer] += roundScore;
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

        // check if there's a winner
        if (scores[activePlayer] >= 20){
            document.querySelector('#name-'+activePlayer).textContent = 'WINNER';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner')
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active')
        } else {
            // next player
            switchActivePlayer()
        }

    })

    document.querySelector('.btn-new').addEventListener('click',init)

