***s l o o h***  - Ear training tool

//////
### Main problems (bugs) V0.1
1. Blue blinking area overlaps from white to black keys and mixes up the input. Better solution needed. No Span, perhaps. Maybe just the border for the keys. Even If span size reduced, clicking on the actual key but outside of span area returns 'wrong input message', which is not good design.

2. Clicking outside of div elements which contain classList like this one (line 31 in the V.1): `e.path[1].classList.contains`('key'), does not integrate well with 'evaluating guess' logic.

3. Clicking on the exit button, while piano is blinking and awaiting input, is hard to implement with current approach of referencing and comparing click event properties. (Same as in problem #2.) 
