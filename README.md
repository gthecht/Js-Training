# Space Oddity

A remake of the classic game Frogger where you have to navigate the frog safely through the traffic, over the river to reach your home.

The game was made without using canvas and is OOP based.
The game has 5 models:

- Game.js - controls all the objects and game statistics.
- Obstacle.js - Objects that move to the left or to the right, according to their dir argument. Some objects are good, which means that they wont hurt our satelite, some objects are bad, which means that thy hurt our satelite..
- Dock.js - If our satelite collsioned with a dock, he will level up.
- Satelite.js - Our player.
- Ofeq.js - Inherits from satelite.
- EventHandler.js - Controls all the events that happen in the game.
