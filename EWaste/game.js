var values = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J'];
//Anish helped me placing my grid in my webpage
//I asked Supakron for help in memory. He told me what his progress was
//Aidan O. Showed me his memory design


//bug fix: don't let user click until both images are face down
var current_tiles = [];
var flipped_count = 0;

var environment = ["img1.jpg", "img1.jpg", "img2.jpg", "img2.jpg", "img3.jpg", "img3.jpg", "img4.jpeg", "img4.jpeg",
    "img5.jpg", "img5.jpg", "img6.jpg", "img6.jpg",
    "img7.jpeg", "img7.jpeg", "img8.jpg", "img8.jpg","img9.jpg", "img9.jpg","img10.jpg", "img10.jpg"];
var names = ["ewaste1", "ewaste1", "ewaste2", "ewaste2", "ewaste3", "ewaste3", "ewaste4", "ewaste4", "ewaste5", "ewaste5",
    "ewaste6", "ewaste6", "ewaste7", "ewaste7", "ewaste8", "ewaste8", "ewaste9", "ewaste9","ewaste10", "ewaste10","ewaste11", "ewaste11"];
for (var i = 0; i < values.length; i++) {
    values[i] = '<img class= image_tile src="memory_tiles/' + environment[i] +'" alt="' + names[i] + '">';
}

/* https://www.frankmitchell.org/2015/01/fisher-yates/]
from the website mentioned in the previous line of code, the program gets a shuffling function
 that uses pseudo-random numbers in order to shuffle a deck of cards */
function shuffle(array) {
    // sets variables
    var i = 0, j = 0, temp = null;
    // array traversal
    for (i = array.length - 1; i > 0; i -= 1) {
        // gets random number and stores in j
        j = Math.floor(Math.random() * (i + 1));
        /* swaps values */
        temp = array[i];
        array[i] = array[j];
        array[j] = temp
    }
}


/*Assigns value to the tile*/
function valueForTile($tile) {
    var index = $tile.data('index');
    return values[index];
}

/* Flips the tile*/
function flipTile($tile) {
    // changes status to flipped
    $tile.addClass('flipped');
    // Set value to return of valueForTile
    $tile.html(valueForTile($tile));
}

/*Unflips the tile*/
function unflipTile($tile) {
    // Removes class flipped therefore unflipped
    $tile.removeClass('flipped');
    // Tile is empty (property of unflipped)
    $tile.html('');
}

/*Returns if the tile is flipped or not*/
function tileFlipped($tile) {
    // Return if the tile has class flipped
    return $tile.hasClass('flipped');
}

/*unflips all current tiles*/
function unflipCurrentTiles() {
    // unflip tile at array index 0 and 1 (because they don't match)
    console.log(valueForTile(current_tiles[0]));
    console.log(valueForTile(current_tiles[1]));
    unflipTile(current_tiles[0]);
    unflipTile(current_tiles[1]);

    current_tiles = [];
}

/*for every tile click it does something if the tile has not been flipped already*/
function handleTileClick() {
    // variable tile is $(this)
    if(!(current_tiles.length === 2)){
        var $tile = $(this);
        // If the tile is not already flipped
        if (!tileFlipped($tile)) {
            //if current tiles.length is something, flip!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // flips (calls flipTile)
            flipTile($tile);
            switch (current_tiles.length) {
                //if length of current tiles is 0
                case 0:
                    // adds tile to the end of array
                    current_tiles.push($tile);
                    break;
                //length is 1
                case 1:
                    //ads tile to the end
                    current_tiles.push($tile);
                    //store both tiles in vars
                    var tile1_value = valueForTile(current_tiles[0]);
                    var tile2_value = valueForTile(current_tiles[1]);
                    // if they are equal
                    if (tile1_value == tile2_value) {
                        // reset current tiles to empty
                        current_tiles = [];
                        // add 2 to the current number of flipped tiles
                        flipped_count += 2;
                        // if the number of flipped tiles is equal to all the tiles (all the tiles were flipped)
                        if (flipped_count == values.length) {
                            // pop-up: You Won!
                            alert('You Won!');
                            //resets game
                            newBoard();
                        }
                        //length is 2
                    } else {
                        // has timeout to unflip current tiles
                        setTimeout(unflipCurrentTiles, 1000);
                    }
            }
        }
    }


}
/*It creates the board from scratch*/
function newBoard() {
    //calls shuffle
    shuffle(values);
    // sets flipped to 0 because it is new game
    flipped_count = 0;
    // output is empty string
    var output = '';
    // add to html a new class tile with index 0 to the length of values minus 1
    for (var i = 0; i < values.length; i++) {

        output += '<div class="tile" data-index="' + i + '"></div>';
    }

    $('#board').html(output);
}

$(function () {
    $('#board').on('click', '.tile', handleTileClick);

    newBoard();
});
