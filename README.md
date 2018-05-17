# ChordPlay : Make your own accompaniment score!

## engine.js

engine.js contains the main backend data structures and functions. It manipulates the internal data saved that are less visible to the users.
```javascript
function parseChord(chord)
```
- Parses raw string *chord* into root note and chord elements. Returns notes of the chord.
<br>
```javascript
class Note
```
- Saves a note. Contains keys, duration, is_rest and functions to modify them.
<br>
```javascript
class Unit
```
- Represent a half bar that contains several Notes.
<br>

```javascript
function addUnit()
```
- Add an empty(rest) unit at the end of the score.
<br>
```javascript
function insertUnit(index) 
```
- Add an empty(rest) unit next to the Unit at score[index].
<br>
```javascript
function deleteUnit(index)
```
- Delete the selected Unit at score[index]
<br>
```javascript
function setChord(index, chord_name)
```
- Set chord of Unit score[index] to *chordname* (e.g. "C", "D", "F#", ...)
<br>
```javascript
function invertChord(index, variation)
```
- Invert chord (e.g. [C,E,G] -> [E,G,C]) of Unit score[index]
<br>
```javascript
function changeRhythm(index, variation)
```
- Change rhythm of Unit score[index].
<br>
```javascript
function deleteChord(index)
```
- Delete selected chord. That is, make selected Unit(score[index]) to rest Unit.

## layout.js

layout.js deals with the main container divs. It adjusts the size of the container divs to fit the window size.
```javascript
function updateSize()
```
- Updates the sizes of different elements on the page to fit the window size.
<br>

```javascript
function initSize()
```
- Initializes the sizes of the elements on the page on first load.
<br>

```javascript
function handleFileSelect(evt)
```
- Selects and loads the selected image file to the importDiv at the bottom of the screen.
<br>

```javascript
function menuUpdate()
```
- Updates the menu bar to enable and disable buttons according to the selection.

## menu.js

menu.js contains click listeners for each menu button.  
They are implemented with jqeury click function.

e.g. :
```javascript
$("#invertChordButton").click
```
Run invertChord for the selected units when button is clicked  

## midi.js
midi.js contains functions for playing the notes of score and click listeners for play, pause, stop menu buttons.
```javascript
$("#playButton").click
$("#pauseButton").click
$("#stopButton").click
```
- Click listeners for play, pause, stop menu buttons.
<br>
```javascript
function playChord(notes, delay, length)
```
- Play chords with *notes*, *delay* and *length*.
<br>
```javascript
function checkPlayingList()
```
- called repeatedly by setInterval. Check queue of notes that waits to play and remove played notes.
<br>
```javascript
function resumeMIDI()
```
- Resume paused playing score.
<br>
```javascript
function playMIDI (units)
```
- Play list of units.
<br>
```javascript
function playNote(note, delay)
```
- Play a class Note.
<br>

## modal.js

modal.js contains functions that deals with the functions in the modal window that pops up to let the user select the rhythm and inversions.

***cancel1.onclick*** 
Event handler for cancel button for the modal window for invert chord button. Closes the window.

***cancel2.onclick***
Event handler for cancel button for the modal window for change rhythm button. Closes the window.

***select1.onclick***
Applies the selected inversion to the selected units.

***select2.onclick***
Applies the selected rhythm to the selected units.

***window.onclick***
Closes the modal window when the user clicks outside the modal.

## score_render.js

score_render.js contains functions that deals with the visuals of the scores rendered.
```javascript
function limiter(input)
```
Limits the BPM input to the range [40, 200].

```javascript
function dragHandler()
```
Adds listeners to the divs containing the scores. The listeners handle selection of scores by clicking and dragging, for single selection and multiple selection. 

```javascript
function renderScore()
```
Takes score array, and adds and draws the appropriate Units containing the correct chords.

## tree.js

tree.js contains functions that deal with the popular chords on the left side of the page.
```javascript
function openDetails(chordname, trtemp)
```
When base trees("C", "D", ...) are clicked, open detailed chord lists("C#m7", "FM7", ...)

```javascript
$(document).on("mouseenter", ".deeptree", function())
```
When mouse hovers over the detailed chords, drag affordance appears.

```javascript
$(document).on("mouseleave", ".deeptree", function())
```
When mouse leaves the detailed chords, drag affordance disappears.

```javascript
function closeDetails()
```
Close the detailed chord lists
```javascript
function dragChord(ev)
```
Allows dragging of the chord in the chord library. Sends the chord name through the event.

```javascript
function allowDrop(ev)
```
Sets the background of the bar the user hovers over during dragging to show which unit is going to be affected. 
```javascript
function dropChord(ev)
```
Sets the data of the unit to the dropped chord and redraws the score.
```javascript
function dragLeave(ev)
```
Resets the background of the bar the user's pointer left to transparent.

```javascript
$("#searchArea").autocomplete
```
Gives autocomplete function of chords at the top-left search area
