window.onload = function() {
    startGame();
}

startGame = function() {
    this.deck = [];
    this.board = [];
    this.activeCount = 0;

    for (var color = 0; color < 3; color++) {
        for (var shape = 0; shape < 3; shape++) {
            for (var fill = 0; fill < 3; fill++) {
                for (var num = 0; num < 3; num++) {
                    this.deck.push(new Card(color, shape, fill, num));
                }
            }
        }
    }

    shuffle(this.deck);

    while (this.board.length < 12) {
        this.board.push(this.deck.pop());
    }

    updateBoard();
};

updateBoard = function() {
    for (var i = 0; i < this.board.length; i++) {
        while (this.board[i] == null && this.board.length > 12) {
            if (i >= 12) {
                this.board.splice(i,1);
            }
            else {
                this.board[i] = this.board.pop();
            }
        }

        if (this.board[i] == null) {
            if (this.deck.length > 0) {
                this.board[i] = this.deck.pop();
            }
            else {
                this.board.splice(i,1);
                i--;
            }
        }
    }

    while (!hasSet(this.board) && this.deck.length > 0) {
        this.board.push(this.deck.pop());
        this.board.push(this.deck.pop());
        this.board.push(this.deck.pop());
    }

    renderCards(this.board);
};

selectCard = function(i) {
    this.board[i].active = !this.board[i].active;
    if (this.board[i].active) this.activeCount++;
    else this.activeCount--;

    if (this.activeCount == 3) {
        this.activeCount = 0;
        var activeCards = [];
        for (var i = 0; i < this.board.length; i++) {
            if (this.board[i].active) {
                activeCards.push(this.board[i]);
            }
        }

        var set = isSet(activeCards);
        for (var i = 0; i < this.board.length; i++) {
            if (this.board[i].active) {
                if (set) this.board[i] = null;
                else this.board[i].active = false;
            }
        }
    }

    updateBoard();
};

shuffle = function(a) {
    for (var i = 0; i < a.length; i++) {
        var j = i + Math.floor(Math.random() * (a.length - i));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
};

hasSet = function(a) {
    var b = new Array(3);
    for (var i = 0; i < a.length; i++) {
        b[0] = a[i];
        for (var j = i+1; j < a.length; j++) {
            b[1] = a[j];
            for (var k = j+1; k < a.length; k++) {
                b[2] = a[k];
                if (isSet(b)) {
                    console.log(i + " " + j + " " + k);
                    return true;
                }
            }
        }
    }
    return false;
};

isSet = function(a) {
    if (a.length != 3) return false;

    var b = new Array(3);

    for (var i = 0; i < 3; i++) b[i] = a[i].color;
    if (!allEqualOrAllDifferent(b)) return false;

    for (var i = 0; i < 3; i++) b[i] = a[i].shape;
    if (!allEqualOrAllDifferent(b)) return false;

    for (var i = 0; i < 3; i++) b[i] = a[i].fill;
    if (!allEqualOrAllDifferent(b)) return false;

    for (var i = 0; i < 3; i++) b[i] = a[i].num;
    if (!allEqualOrAllDifferent(b)) return false;

    return true;
};

allEqualOrAllDifferent = function(a) {
    if (a[0] == a[1] && a[0] == a[2]) return true;
    if (a[0] != a[1] && a[0] != a[2] && a[1] != a[2]) return true;
    return false;
};
