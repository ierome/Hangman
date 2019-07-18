$(document).ready(function () {
    // Function to get Random Number for choosing random word
    function getRandomNum(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    //Grabs the words array and returns a new array of just the words with 3 letters or more
    var words = commonWords.filter(function (item) {
        if (item.length >= 3) {
            return true;
        } else {
            return false;
        }
    })

    //Choose a random word from the new array called word
    var wordPar = getRandomNum(words.length)
    const word = words[wordPar];
    console.log(word)
    var underscores = ''
    var usedLetters = []
    var lives = 4;
    $("#score").html(`<h1>You have ${lives} lives left! Don't waste them!</h1>`);

    //Creating the underscores for the letters
    for (i = 0; i < word.length; i++) {
        underscores += `<div class="letter" id="letter${i}">_</div>`
    }
    $("#wordDisplay").html(underscores)
    let success = 0;
    let win = 0;
    let fails = 0;

    function checkLetter(letter2Guess) {
        if (usedLetters.includes(letter2Guess)) {
            $(".repeat").fadeIn();
            setTimeout(function () {
                $(".repeat").fadeOut();
            }, 2000);
        } else if (letter2Guess == "") {
            console.log("Cant guess NOTHING")
        } else {
            usedLetters.push(letter2Guess)
            $("#guessedLetters").html(`<h1>Guessed Letters: ${usedLetters}</h1>`)
            guess(letter2Guess)
        }
    }

    function lifeCheck(lives) {
        if (lives == 3) {
            $("#hangman-part-06").addClass("hide");
            $("#score").hide()
            $("#score").html(`<h1>You have ${lives} lives left! Don't waste them!</h1>`);
            $("#score").slideDown();
            $(".invalid").fadeIn();
            success = 0;
            setTimeout(function () {
                $(".invalid").fadeOut();
            }, 2000);
        } else if (lives == 2) {
            $("#hangman-part-04").addClass("hide");
            $("#score").hide()
            $("#score").html(`<h1>You have ${lives} lives left! Don't waste them!</h1>`);
            $("#score").slideDown();
            $(".invalid").fadeIn();
            success = 0;
            setTimeout(function () {
                $(".invalid").fadeOut();
            }, 2000);
        } else if (lives == 1) {
            $("#hangman-part-03").addClass("hide");
            $("#score").hide()
            $("#score").html(`<h1>You have ${lives} lives left! Don't waste them!</h1>`);
            $("#score").slideDown();
            $(".invalid").fadeIn();
            success = 0;
            setTimeout(function () {
                $(".invalid").fadeOut();
            }, 2000);
        } else if (lives == 0) {
            $("#hangman-part-02").addClass("hide");
            console.log("GAME OVER NIGGA")
            $("#score").html('<img src="https://media.giphy.com/media/EndO2bvE3adMc/giphy.gif">')
        }
    }

    function guess(letterGuessed) {
        for (var i = 0; i < word.length; i++) {
            if (letterGuessed == word.charAt(i)) {
                $(`#letter${i}`).hide();
                $(`#letter${i}`).html(word.charAt(i))
                $(`#letter${i}`).fadeIn();
                success++
            } else {
                fails++
            }
        }
        if (success >= 1) {
            $(".success").fadeIn();
            setTimeout(function () {
                $(".success").fadeOut();
            }, 2000);
            win++
        }
        if (win == word.length) {
            console.log("You won!")
            $("#score").html(`<img src="https://media.giphy.com/media/xT0GqssRweIhlz209i/giphy.gif">`)
        }
        if (success == 0) {
            lives -= 1
            lifeCheck(lives);
        }
        success = 0;
    }
    $("#guess").on('click', function (e) {
        e.preventDefault()
        letter2Guess = $("#guessForm").val();
        if (lives == 0) {
            console.log("Come on you lost already.")
        } else {
            checkLetter(letter2Guess)
        }

        //console.log(usedLetters)
    })

})