This is a simple platformer I created for fun and to test my limits on JS canvas / object inheritance in JS.

As of the latest commit, I've reworked the project to use classes instead of js objects.
I found this more readable and less messy with using class extends rather than trying to deep clone
objects for inheritance. Objects not inherited were kept.

Past commit features:
- Basic serialization and rendering
- Basic entity functions
- Basic player movement (Crouch, Walk left/right)
- Player friction, velocity

Latest commit features:
- Tile class and functions
- Basic player movement (Jump)
- Player gravity & ground collision

Next commit(s) features:
- Rework air strafe to flex player control
- Add tile collision
- Add basic map class & functions
- Add enemy class & functions
- Add object / collectables class & functions
- Add friction change on ice


Sprites were imported for ease, but are found on OpenGameArt.Org
Credit is below from their license readme:

###############################################################################

	Platformer graphics (Deluxe) by Kenney Vleugels (www.kenney.nl)

			------------------------------

			        License (CC0)
	       http://creativecommons.org/publicdomain/zero/1.0/

	You may use these graphics in personal and commercial projects.
	Credit (Kenney or www.kenney.nl) would be nice but is not mandatory.

###############################################################################