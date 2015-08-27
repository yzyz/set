initTimer = function() {
    this.time = 0;
    var t = setTimeout(function(){incrementTimer()},1000);
};
incrementTimer = function() {
    document.getElementById("timer").innerHTML = this.time;
    this.time++;
    if (!gameOver)
        var t = setTimeout(function(){incrementTimer()},1000);
};
