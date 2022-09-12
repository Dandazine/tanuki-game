const game = {
    // Assets 
    bubble: document.querySelector('.bubble'),
    cursor: document.querySelector('.cursor'),
    dog: document.getElementById('dog'),
    dogMove: document.querySelector('.dog'),
    isRunning: false,
    music: document.querySelector('.music'),
    playerName: null,
    score: 0,
    scoreNeeded: 0,
    sound: document.querySelector('.sound'),
    // Time stuff 
    interval:null,
    timeInterval: null,
    intervalDuration:1000,
    timeLeft:0,
    // Buttons
    gameToggle: document.querySelector('.gametoggle'),
    infoBtn: document.querySelector('.info-btn'),
    infoClose: document.querySelector('.close-info'),
    quit: document.querySelector('.quit-game-btn'),
    restart: document.querySelector('.restart'),
    startGameBtn: document.querySelector('.start-game-btn'),
    // Displays 
    infoDiv: document.querySelector(".info-div"),
    levelDisplay: document.getElementById("level-display"),
    nameDisplay: document.getElementById("name-display"),
    timeDisplay: document.getElementById("time-display"),
    // Methods 
    setup: ()=>{
        // Event Listeners
        window.addEventListener('mousemove', (e)=>{
            game.cursor.style.left= e.pageX + "px";
            game.cursor.style.top= e.pageY + "px";
        });
        game.music.volume= 0.3;
        window.addEventListener('mousemove', (e)=>{
            game.bubble.style.left= e.pageX + "px";
            game.bubble.style.top= e.pageY + "px";
        });
        window.addEventListener('click', (e)=>{
            console.log(e.target);
            if(game.isRunning){
                if(e.target.classList.contains('dog')){
                    game.bubble.style.display='block';
                    setTimeout(()=>{
                        game.bubble.style.display = 'none';
                    },1000)
                    // sounds.play();
                    game.score++;
                    game.checkScore();
                    game.scoreDisplay();
                    game.sound.play();
                }
            }
        });
        game.gameToggle.addEventListener('click',()=>{
            if(game.isRunning===false){
                game.startGame();
            }else{
                game.pauseGame();
            }
        });
        game.quit.addEventListener('click',()=>{
            game.quitGame();
        });
        game.restart.addEventListener('click', ()=>{
            game.restartGame();
        });
        game.startGameBtn.addEventListener('click', ()=>{
            game.switchScreen('.opening');
        });
        game.infoBtn.addEventListener('click', ()=>{
            game.pauseGame();
            game.infoDiv.style.display= "block";
        });
        game.infoClose.addEventListener('click', ()=>{
            game.infoDiv.style.display= "none";
        });
        document.getElementById('easy').addEventListener('click', ()=>{
            let playerTestName = document.getElementById('player-name').value;
            if(playerTestName === null || playerTestName.trim().length === 0){
            alert("Please enter a proper name!");
            }else{
                game.nameFunction();
                game.levelChoice(1);
                game.switchScreen('.game');
            }
        });
        document.getElementById('medium').addEventListener('click', ()=>{
            let playerTestName = document.getElementById('player-name').value;
            if(playerTestName === null || playerTestName.trim().length === 0){
            alert("Please enter a proper name!");
            }else{
                game.nameFunction();
                game.levelChoice(2);
                game.switchScreen('.game');  
            }
        });
        document.getElementById('hard').addEventListener('click', ()=>{
            let playerTestName = document.getElementById('player-name').value;
            if(playerTestName === null || playerTestName.trim().length === 0){
            alert("Please enter a proper name!");
            }else{
                game.nameFunction();
                game.levelChoice(3);
                game.switchScreen('.game');
            }
        });
        document.querySelector('.quit-menu').addEventListener('click', ()=>{
            game.quitGame();
        })
    },
    startGame:()=>{
        game.isRunning=true;
        game.movingDog();
        game.gameToggle.innerHTML="Pause";
        game.timeFunction();
        game.music.play();
    },
    pauseGame:()=>{
        game.isRunning=false;
        game.movingDog();
        game.gameToggle.innerHTML="Start";
        game.timeFunction();
        game.music.pause();
    },
    restartGame:()=>{
        game.pauseGame();
        game.switchScreen('.opening');
        game.levelChoice(4);
    },
    quitGame:()=>{
        game.pauseGame();
        game.switchScreen('.main');
        game.levelChoice(4);
    },
    checkScore:()=>{
        if(game.score >= game.scoreNeeded){
          game.pauseGame();
          game.switchScreen(".game-over");
        }
    },
    scoreDisplay:()=>{
        document.getElementById('score-display').innerHTML= `Current Score: ${game.score}`;
        document.getElementById('score-need').innerHTML= game.scoreNeeded
    },
    diffDisplay:(dif)=>{
        game.levelDisplay.innerHTML= `Difficulty: ${dif}`;
    },
    timeFunction:()=>{
        if(game.isRunning){
            if(game.timeLeft > 0){
                game.timeInterval = setInterval(() => {
                    game.timeDisplayFunct();
                    game.timeLeft--;
                    if(game.timeLeft < 0){
                        game.restartGame();
                        alert('You ran out of time!')
                    }
                }, 1000);
            }
        }else{
            clearInterval(game.timeInterval);
        }
    },
    levelChoice:(diff)=>{
        switch(diff){
            case 1:
                game.intervalDuration = 1500;
                game.scoreNeeded= 35;
                game.timeLeft= 90;
                game.diffDisplay("Easy");
                break;
            case 2:
                game.intervalDuration = 1200;
                game.scoreNeeded= 45;
                game.timeLeft= 60;
                game.diffDisplay("Medium");
                break;
            case 3:
                game.intervalDuration = 1000;
                game.scoreNeeded= 50;
                game.timeLeft= 30;
                game.diffDisplay("Hard");
                break;
            case 4:
                game.interval=null;
                game.timeInterval=null
                game.intervalDuration = 0;
                game.score= 0;
                game.scoreNeeded= 0;
                game.timeLeft= 0;
                game.scoreDisplay();
                break;
            default:
                break;
        }
        game.timeDisplayFunct();
    },
    nameUpdateDisplay:()=>{
        game.nameDisplay.innerHTML= `Player Name: ${game.playerName}`;
    },
    nameFunction:()=>{
            game.playerName= document.getElementById('player-name').value;
            game.nameUpdateDisplay();
    },
    timeDisplayFunct:()=>{
        let minutesremaining = Math.floor(game.timeLeft / 60);
        let secondsRemaining = Math.floor(game.timeLeft % 60);
        if(minutesremaining < 10){
            document.querySelector('.minutes').innerHTML=`0${minutesremaining}`;
        }else{
            document.querySelector('.minutes').innerHTML=minutesremaining;
        }
        if(secondsRemaining < 10){document.querySelector('.seconds').innerHTML=`0${secondsRemaining}`;
        }else{
            document.querySelector('.seconds').innerHTML=secondsRemaining;
        }
        
    },
    movingDog:()=>{
        if(game.isRunning===true){
            let screenWidth = window.screen.width;
            let screenHeight= window.screen.height;
            game.interval=setInterval(()=>{
                let randLeft = Math.floor(Math.random() *screenWidth - 200);
                let randTop = Math.floor(Math.random() *screenHeight - 200);
                game.dogMove.style.left=randLeft+'px';
                game.dogMove.style.top=randTop+'px';
            },game.intervalDuration)
        }else{
            clearInterval(game.interval);
        }
    },
    switchScreen:(screen)=>{
        $('.screen').hide();
        $(screen).show();
    }
}

game.setup();
