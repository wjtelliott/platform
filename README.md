# wjtelliott / platform


## This is a simple platformer I created for fun and to test my limits on JS canvas / object inheritance in JS.

As of the latest commit, I've reworked the project to use classes instead of js objects.
I found this more readable and less messy with using class extends rather than trying to deep clone
objects for inheritance. Objects not inherited were kept.

![A snippet of the demo!](/gitmd/snip.JPG "Demo Snip")

***

Past commit features:
- Basic serialization and rendering
- Basic entity functions
- Basic player movement (Crouch, Walk left/right)
- Player friction, velocity
- Tile class and functions
- Basic player movement (Jump)
- Player gravity & ground collision

Latest commit features:
- Basic map class & functions (still needs work)
- Player viewport camera
- Fixed velocity clamp on upwards movement

Next commit(s) features:
- Rework air strafe to flex player control
- Add tile collision
- Add enemy class & functions
- Add object / collectables class & functions
- Add friction change on ice

***


## Known bugs:

1. loadScripts() causes memory leaks **unless running on local machine.**
2. startGame() causes memory leaks **unless running on local machine.**
3. If player velocity is higher than width of platform, collision is ignored.


***

Sprites were imported for ease, but are found on OpenGameArt.Org

	Platformer graphics (Deluxe) by Kenney Vleugels (www.kenney.nl)

			------------------------------

			        License (CC0)
	       http://creativecommons.org/publicdomain/zero/1.0/

	You may use these graphics in personal and commercial projects.
	Credit (Kenney or www.kenney.nl) would be nice but is not mandatory.

***