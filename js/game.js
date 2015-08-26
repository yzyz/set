window.onload = function() {
    startGame();
}

startGame = function() {
    var deck = [];

    for (var color = 0; color < 3; color++) {
        for (var shape = 0; shape < 3; shape++) {
            for (var fill = 0; fill < 3; fill++) {
                for (var num = 0; num < 3; num++) {
                    deck.push(new Card(color, shape, fill, num));
                }
            }
        }
    }

    renderCards(deck);
};
