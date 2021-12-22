# ChinguMatchingGame
The project was completed based on the recomendation from https://github.com/chingu-voyages/soloproject-tier2-matching-game. It's a simple browser game where the player's goal is to find all 8 pairs of emotes. It uses html, css and vanilla javascript.

LIVE DEMO: http://noncomposmentis.tech/repository/Chingu%20Cohort/matching-game/index.html


![matching-game](https://user-images.githubusercontent.com/96549344/147156096-9784382c-a140-4233-a866-6f4faf38dd50.jpg)


## Basic Functionality

At the start of the game we get a random assortment of 8 emotes (from 21 possible emotes) which are then assigned to random cards. As the player clicks on a card, the game adds that card to the array and disables the card for the time being. Once the array reaches the length of 2, the function checks whether the two items in the array match. If true, the two cards remain disabled for the remainder of the game, if not, they return to their initial position and are able to be clicked again. Every time the function detects a match it increments a variable count and once that variable reaches the value of 8 the game ends.

The "New Game" button calls a function whitch resets all of the variables to their original state, generates a new set of emotes and (re)starts the timer.  

## Additional Features

- Timer is a simple function inside a setInterval method. The itervile fires every 1000ms and increments the variable seconds by 1. Once seconds react the value of 60, the varaible minutes increments by one and seconds is reset to 0.
- The move counter simply tells us how many times a player has clicked any of the cards. If the player has found a pair, additional clicks on those cards won't be added to a move counter.
- Rating display show is incremented/decremented every time a pair is true/false. The star are only a visual representation of a value(3 stars = 6);

## Bugs

There's currently a bug where if you spam click the seconds card in a pair of non-matching emotes, the top left cards opens and everything else becomes completely unresponsive. The console doesn't show any errors and I haven't been able to quite figure out what causes the bug (I have a sneaking suspicion that a certain asynchronous function has something to do with it).
