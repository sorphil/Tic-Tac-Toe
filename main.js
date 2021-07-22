document.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(function () {
        let viewheight = `${window.innerHeight}`;
        let viewwidth = `${window.innerWidth}`;
        let viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
    }, 100);
    document.querySelector(".titleScreen").style.display = "none"
    window.onload = function()
    {
        var playerCreationReload = sessionStorage.getItem("playerCreationReload");
        if (playerCreationReload) {
            sessionStorage.removeItem("playerCreationReload");
            playerCreation(true)
        }
        else
        {
            titleScreenHandler()
        }
    }
})

let titleScreenHandler = ()=>{
    const titleScreen = document.querySelector('.titleScreen')
    titleScreen.style.display = "flex"
    titleScreen.addEventListener('click', ()=>playerCreation(false))
}

let playerCreation = (reload)=>
{
    const titleScreen = document.querySelector('.titleScreen')
    const head = document.querySelector('.head')
    const subhead = document.querySelector('.subhead') 
    const gameContainer = document.querySelector('.gameContainer')
    const enterBtn = document.querySelector('.enter-btn')
    const resetBtn = document.querySelector('.reset-btn')
    const backBtn = document.querySelector('.back-btn')
    const authorLink = document.querySelector('.authorLink')
    
    if(reload==false)
    {
        subhead.classList.toggle('fadeOut')
        subhead.addEventListener('animationend', ()=>{
            subhead.style.display = "none"
            head.classList.add('shrink')
            titleScreen.classList.add('shrinkUp')
            head.addEventListener('animationend', ()=>{
                head.style.cssText="font-size: 6rem"
                authorLink.cssText = "font-size:0.5rem"
                titleScreen.style.cssText="cursor: default; height:25%;"
                gameContainer.style.display ="flex"
                head.classList.remove('shrink')
                titleScreen.classList.remove('shrinkUp')
                gameContainer.classList.add("fadeIn")
                gameContainer.addEventListener('animationend', ()=>gameContainer.classList.remove("fadeIn"))
            })
        })
    }
    else
    {
        titleScreen.style.display = "flex"
        subhead.style.display = "none"
        head.style.cssText="font-size: 6rem"
        titleScreen.style.cssText="cursor: default;"
        titleScreen.style.height = "25%"
        gameContainer.style.display ="flex"
    }

    playerOne={}
    playerTwo={}


    const toggleDifficultyInput = (input)=>{
        if(input.value=="AI")
        {
            if(input.id=="playerOneType") {
                document.querySelector('#playerOneHumanIcon').style.display ="none";
                document.querySelector('#playerOneRobotIcon').style.display ="block";
                document.querySelector('#playerOneDifficulty').style.opacity = "100%";
                document.querySelector('#playerOneDifficulty').disabled = false
            }
            else if (input.id=="playerTwoType")
            {   

                document.querySelector('#playerTwoHumanIcon').style.display ="none";
                document.querySelector('#playerTwoRobotIcon').style.display ="block";
                document.querySelector('#playerTwoDifficulty').style.opacity = "100%";
                document.querySelector('#playerTwoDifficulty').disabled = false
            }
        }
        else
        {
            if(input.id=="playerOneType")
            {
                document.querySelector('#playerOneHumanIcon').style.display ="block";
                document.querySelector('#playerOneRobotIcon').style.display ="none";
                document.querySelector('#playerOneDifficulty').style.opacity = "0%";
                document.querySelector('#playerOneDifficulty').disabled =true
            }
            else if (input.id=="playerTwoType")
            {
                document.querySelector('#playerTwoHumanIcon').style.display ="block";
                document.querySelector('#playerTwoRobotIcon').style.display ="none";
                document.querySelector('#playerTwoDifficulty').style.opacity = "0%";
                document.querySelector('#playerTwoDifficulty').disabled = true
            }
        }
    }

    const checkNameInput = ()=>{
        let inputs = document.querySelectorAll('.name')
        let result = Array.from(inputs).every(input=>input.value!="")
        if (result==true)
        {
            document.querySelector('.enter-btn').disabled = false
        }
        else
        {
            document.querySelector('.enter-btn').disabled = true
        }
    }

    const createPlayer = ()=>{
        document.querySelectorAll('.playerOne').forEach((input)=>{
            if(input.style.opacity !="0")
            {  
                playerOne[`${input.className.split(" ")[1]}`]=input.value
                input.classList.add('fadeOut')
                input.addEventListener('animationend', (event)=>{input.style.display="none";input.classList.remove('fadeOut');event.stopPropagation()})
            }
            else{input.style.display="none"}
            
        })
        document.querySelectorAll('.playerTwo').forEach((input)=>{
            if(input.style.opacity !="0")
            {   
                playerTwo[`${input.className.split(" ")[1]}`]=input.value
                input.classList.add('fadeOut')
                input.addEventListener('animationend', (event)=>{input.style.display="none";input.classList.remove('fadeOut');event.stopPropagation()})
            }
            else{input.style.display="none"}
        })

        enterBtn.classList.add('fadeOut')
            enterBtn.addEventListener('animationend', ()=>
            {
                enterBtn.classList.remove('fadeOut')
                enterBtn.style.display="none"

                resetBtn.style.display="block"
                backBtn.style.display="block"
                
                resetBtn.classList.add('fadeIn')
                backBtn.classList.add('fadeIn')


                const playerOneInfo = document.querySelector('.leftBlock .displayInfo')
                const playerTwoInfo = document.querySelector('.rightBlock .displayInfo')

        
                
                document.querySelector('.leftBlock .displayName').innerHTML = `<h1>${playerOne.name}</h1>`
                document.querySelector('.rightBlock .displayName').innerHTML = `<h1>${playerTwo.name}</h1>`
                document.querySelector('.leftBlock .displayType').innerHTML = `<h2>${playerOne.type}<span class = "displayDifficulty" style = "display:${playerOne.difficulty!=undefined?"inline-block":"none"}"> - ${playerOne.difficulty?playerOne.difficulty:"NULL"}</span></h2>`
                document.querySelector('.rightBlock .displayType').innerHTML = `<h2>${playerTwo.type}<span class = "displayDifficulty" style = "display:${playerTwo.difficulty!=undefined?"inline-block":"none"}"> - ${playerTwo.difficulty?playerTwo.difficulty:"NULL"}</span></h2>`
                document.querySelector('.leftBlock .displayScore').innerHTML = `<h2>Score: 0</h2>`
                document.querySelector('.rightBlock .displayScore').innerHTML = `<h2>Score: 0</h2>`

                playerOneInfo.classList.add('fadeIn')
                playerTwoInfo.classList.add('fadeIn')

                resetBtn.addEventListener('animationend', (event)=>{
                    resetBtn.classList.remove('fadeIn')
                    backBtn.classList.remove('fadeIn')
                    event.stopPropagation()
                })

                playerOneInfo.addEventListener('animationend',(event)=>event.stopPropagation())
                playerTwoInfo.addEventListener('animationend',(event)=>event.stopPropagation())
            })

        playerOne.marker ="X"
        playerOne.id = "0"
        playerTwo.marker = "O"
        playerTwo.id = "1"
        
        players= [playerOne, playerTwo]
        runGame([playerOne, playerTwo])
    }

    document.querySelectorAll('.name').forEach((input)=>{
        checkNameInput()
        input.addEventListener('keyup',()=>
        {
            checkNameInput()
        })
    })

    document.querySelectorAll('.type').forEach((input)=>{
        toggleDifficultyInput(input)
        input.addEventListener('change',function(){
            toggleDifficultyInput(this)
        })
    })


    enterBtn.addEventListener('click', function(){
        document.querySelectorAll('.playerFields').forEach((div, index)=>{
            div.classList.add('openGame')
            div.addEventListener('animationend',function(){
                document.querySelector('.boardContainer').style.cssText = "display:grid"
            })
        })
        document.querySelector('.leftBlock').addEventListener('animationend', createPlayer)
    })
}

const runGame = (players)=>
{

    const waitBoardAnimation = (func)=>{
        let tile = document.querySelector('.boardContainer .tile')
        tile.addEventListener("animationend", ()=>{
            if(func){func()}
        })
    }

    const gameBoard = (()=>{
        // Public board variable
        let board = {markers: [], positions: []};
    
        // reset confirm value
        let reset;

        const _resetBoard = ()=> {
            gameBoard.reset = confirm("Reset game?")
            if (gameBoard.reset)
            {
                gameBoard.board.markers = []
                gameBoard.board.positions = []
                document.querySelector('.boardContainer').innerHTML = ""
                _generateBoard()
                _generateHTMLBoard()
            }
            else {return}
        }
  
        const _goBack = ()=>{
            let back = confirm("Go back to character creation?")
            if(back==true)
            {
                sessionStorage.setItem("playerCreationReload", "true");
                document.location.reload();
            }
            else {return}
        }
        const _addTileEventstListeners = function(){
            console.log(game.over)
            if(game.currentPlayer.type=="AI"&&game.over==false){return}
            let tilePosition = `${this.dataset.positionY}-${this.dataset.positionX}`
    
            game.markTiles(this, tilePosition)
        }

        const _addButtonEventListeners = function()
        {
            let resetButton = document.querySelector('.reset-btn')
            let backButton = document.querySelector('.back-btn')
            resetButton.addEventListener('click', _resetBoard)
            backButton.addEventListener('click', _goBack )
        }


        // to generate intial value of board
        const _generateBoard = function()
        {
            for (let i=0; i<9; i++)
            {
                let prefix = (i>=3)?(Math.floor(i/3)):(0);
                let postfix = (i>=3)?(i-3*prefix):(i);
                board.positions.push(`${prefix}-${postfix}`);
                board.markers.push("");
            }
        }

        //create divs inside container
        const _generateHTMLBoard = function()
        {
            let boardContainer = document.querySelector('.boardContainer')
            board.positions.forEach((posValue, index)=>{
                const tile = document.createElement('div');
                tile.className = "tile";
                if(board.markers[index]!="")
                {
                    tile.innerHTML = `<div class = "marker">${board.markers[index]}</div>`
                }
                [tile.dataset.positionY, tile.dataset.positionX] = [posValue.split("-")[0], posValue.split("-")[1]];
                tile.addEventListener('click', _addTileEventstListeners);
                boardContainer.appendChild(tile);
                boardContainer.classList.add("fadeIn")
                boardContainer.addEventListener("animationend",()=>{
                    boardContainer.classList.remove("fadeIn")
                    tile.classList.add("fadeIn")
                    tile.addEventListener('animationend',function(){this.style.opacity = "1";this.classList.remove('fadeIn')})
                })
               
            })
        }

        _generateBoard()
        _generateHTMLBoard()

        waitBoardAnimation(_addButtonEventListeners)

        return {board, reset}
    })()

    const game = (()=>{
        let over = false
        let _reset = false
        let _players = players
        let winner = ""

        let currentPlayer = _players[0]
        let score = {playerOne:0, playerTwo:0, tie:0}
        
        let _displayCurrentTurn = function(initial)
        {
            let playerOneImg = document.querySelector('#playerOneFields .playerIcon img:not([style*="display: none;"])')
            let playerTwoImg = document.querySelector('#playerTwoFields .playerIcon img:not([style*="display: none;"])')
            
            if(game.currentPlayer.id == _players[0].id||initial)
            {

                playerOneImg.style.cssText = "transform:scale(1.2)"
                playerTwoImg.style.cssText = "position:static;"
                
            }
            else
            {

                    playerOneImg.style.cssText = "position:static;"
                    playerTwoImg.style.cssText = "transform:scale(1.2)"
            }

        }
        let _displayScore = function(initial)
        {
            const playerOneScore = document.querySelector('.leftBlock .displayScore')
            const playerTwoScore = document.querySelector('.rightBlock .displayScore')
            if(initial) 
            {
                playerOneScore.innerHTML = `<h2>Score: ${score.playerOne}</h2>`
                playerTwoScore.innerHTML = `<h2>Score: ${score.playerTwo}</h2>`
            }
            else 
            {
                playerOneScore.innerHTML = `<h2>Score: ${game.score.playerOne}</h2>`
                playerTwoScore.innerHTML = `<h2>Score: ${game.score.playerTwo}</h2>`
            }
        }
       




        let currentPlayerChange =  function() 
        {
            _watchBoard()
            this.currentPlayer = (this.currentPlayer===_players[0]?_players[1]:_players[0])
            if(game.over==false)
            {
                _displayCurrentTurn()
                if (game.currentPlayer.type=="AI")
                {
                    _highlightTilesAI(_moveAI)
                    return
                }
            }
        }
    
        const markTiles = function(tile, tilePosition){
            // Check if game is game.over, if it is, stop from changing tiles
            if(game.over==true)
            {
                if(game.winner=="TIE")
                {
                    alert("Game Over. Tie")
                }
                else
                {
                    alert(`Game Over. ${game.winner} Won`)
                }; 
                return true
            }
    
            let index = gameBoard.board.positions.indexOf(tilePosition)
    
            // Check if tile is not empty, if it isn't return and prevent from overwriting
            if(gameBoard.board.markers[index]!=""  && game.currentPlayer.type=="Human" ){return}
            gameBoard.board.markers[index] = game.currentPlayer.marker;
            tile.innerHTML = `<h2>${game.currentPlayer.marker}</h2>`
            tile.classList.add('marked')
            game.currentPlayerChange()
        }
    
        const _highlightTilesAI= function(moveAI){
            let i = 0
            let func = (function highlight(i, direction){
                if(_reset==true){;return}
                //RtL - Right to Left
                //LtR - Left to Right
                if(direction=="RtL")
                {
                    if(i==gameBoard.board.markers.length-1){highlight(i, "LtR"); return}
                    let tile = document.querySelectorAll('.tile')[i];
                    if(gameBoard.board.markers[gameBoard.board.positions.indexOf(`${tile.dataset.positionY}-${tile.dataset.positionX}`)]=='')
                    {tile.innerHTML = `<h2 style="opacity:40%;">${game.currentPlayer.marker}</h2>`}
                    i++
                    setTimeout(()=>highlight(i, direction), 40)
                    setTimeout(()=>{if(!tile.classList.contains('marked')){tile.innerHTML=""}}, 40)
                }
                else if (direction=="LtR")
                {   
                    if(i<0)
                    {
                        if(moveAI){moveAI()}
                        return  
                    }
                    let tile = document.querySelectorAll('.tile')[i];
                    if(gameBoard.board.markers[gameBoard.board.positions.indexOf(`${tile.dataset.positionY}-${tile.dataset.positionX}`)]=='')
                    {tile.innerHTML = `<h2 style="opacity:40%;">${game.currentPlayer.marker}</h2>`}
        
                    i--
                    setTimeout(()=>highlight(i, direction), 40)
                    setTimeout(()=>{if(!tile.classList.contains('marked')){tile.innerHTML=""}}, 40)
                }
            })(i, "RtL")
        }
    
        const _highlightTilesPlayer = function(){
                document.querySelectorAll('.tile').forEach((tile)=>{
                    tile.addEventListener('mouseenter', function(){
                        if(tile.classList.contains("marked")||game.currentPlayer.type=="AI"||game.over==true){return}
                        else
                        this.innerHTML = `<h2 style="opacity:40%;">${game.currentPlayer.marker}</h2>`
                    })
                    tile.addEventListener('mouseleave', function(){
                        if(tile.classList.contains("marked")||game.currentPlayer.type=="AI"||game.over==true){return}
                        else
                        this.innerHTML = ""
                    })
                })
        }
 

        const _handleReset = function()
        {
            document.querySelector('.reset-btn').addEventListener('click', ()=>{
                const _handlePlayerReset = ()=>{
                    game.currentPlayer = players[0]
                    _highlightTilesPlayer()
                    setTimeout(()=>
                    {
                        _reset = false;
                        if(game.currentPlayer.type=="AI")
                        {
                            game.currentPlayer=players[1]
                            game.currentPlayerChange()
                            return
                        }
                    }, 100)
                    _displayCurrentTurn(true)
                    _displayScore(true)
                  
                }
                const _handleAIReset = (_handlePlayerReset)=>{
                    _reset = true
                    game.over = false;
                    game.winner = ""
                    _handlePlayerReset()
                }

                if(gameBoard.reset==true)
                {  
                    _handleAIReset(_handlePlayerReset)
                }
           
            })
        }
        
        const _watchBoard = (boardInstance)=>{
            let _watchWinner = (playerOneTiles, playerTwoTiles, boardInstance) =>{
                const _checkWinner = (arr, direction)=>{
                    if(direction=="horizontal")
                    {
                        if(arr.includes("0-0")&&arr.includes("0-1")&&arr.includes("0-2")) {return true}
                        else if(arr.includes("1-0")&&arr.includes("1-1")&&arr.includes("1-2")) {return true}
                        else if(arr.includes("2-0")&&arr.includes("2-1")&&arr.includes("2-2")) {return true}
                    }
                    else if(direction=="vertical")
                    {
                        if(arr.includes("0-0")&&arr.includes("1-0")&&arr.includes("2-0")) {return true}
                        else if(arr.includes("0-1")&&arr.includes("1-1")&&arr.includes("2-1")) {return true}
                        else if(arr.includes("0-2")&&arr.includes("1-2")&&arr.includes("2-2")) {return true}
                    }
                    else if(direction=="diagonal")
                    {
                        if(arr.includes("0-0")&&arr.includes("1-1")&&arr.includes("2-2")) {return true}
                        else if(arr.includes("0-2")&&arr.includes("1-1")&&arr.includes("2-0")) {return true}
                    }
                }
        
                const winCondtionsX = (_checkWinner(playerOneTiles, "vertical")||_checkWinner(playerOneTiles, "horizontal")||_checkWinner(playerOneTiles, "diagonal"))
                const winCondtionsO = (_checkWinner(playerTwoTiles, "vertical")||_checkWinner(playerTwoTiles, "horizontal")||_checkWinner(playerTwoTiles, "diagonal"))
                
                if(winCondtionsX)
                {
                    if(!boardInstance&&game.currentPlayer==_players[0])
                    {
                        game.over = true
                        game.score.playerOne+=1
                        alert(`${_players[0].name} Won`)
                        game.winner = `${_players[0].name}`
                        document.querySelector('#playerOneFields .playerIcon img:not([style*="display: none;"])').style.cssText ="position:static;"
                        document.querySelector('#playerTwoFields .playerIcon img:not([style*="display: none;"])').style.cssText ="position:static;"
                        _displayScore()
                    }
                    return  "P1"
                }
                else if(winCondtionsO)
                {
                    if(!boardInstance&&game.currentPlayer==_players[1])
                    {
                        game.over = true
                        game.score.playerTwo+=1
                        game.winner = `${_players[1].name}`
                        alert(`${_players[1].name} Won`)
                        document.querySelector('#playerOneFields .playerIcon img:not([style*="display: none;"])').style.cssText ="position:static;"
                        document.querySelector('#playerTwoFields .playerIcon img:not([style*="display: none;"])').style.cssText ="position:static;"
                        _displayScore()
                    }
                    return "P2"
                }
                else if(gameBoard.board.markers.every((tile)=>tile!=""))
                {   if(!boardInstance)
                    {
                        game.over = true
                        game.score.tie+=1
                        game.winner = "TIE"
                        document.querySelector('#playerOneFields .playerIcon img:not([style*="display: none;"])').style.cssText ="position:static;"
                        document.querySelector('#playerTwoFields .playerIcon img:not([style*="display: none;"])').style.cssText ="position:static;"
                        alert(`TIE`)
                        _displayScore()
                    }
                    return "Tie"
                }
            }
    
            let playerOneTiles = []
            let playerTwoTiles = []
            boardInstance? board = boardInstance:board = gameBoard.board.markers
            board.forEach((tile, index)=>{
                if(tile!="")
                {   
                    //if tile is Player One/Two and is not present in P1/P2 Tile array, push it
                    if(tile==_players[0].marker && !playerOneTiles.includes(gameBoard.board.positions[index]))
                        {playerOneTiles.push(gameBoard.board.positions[index])}
    
                    else if(tile==_players[1].marker && !playerTwoTiles.includes(gameBoard.board.positions[index]))
                        {playerTwoTiles.push(gameBoard.board.positions[index])}
                }
                else {return}
            })
            // if(playerOneTiles.length>=3|| playerTwoTiles.length>=3)
            return _watchWinner(playerOneTiles, playerTwoTiles, boardInstance)
        }
    
        const _operationsAI = (AI_Algo)=> {
            let _minimaxPick = ()=>{
    
                let _minimax = (boardInstance, isMaximizing, depth)=>{
                    if(depth>=10){return 0}
                    let result = _watchBoard(boardInstance)
                    if(result=="P2")    {return isMaximizing? -1:1}
                    else if(result=="P1") {return isMaximizing? -1:1}
                    else if (result=="Tie") {return 0}
            
                    
                    if(isMaximizing)
                    {   
                        let bestScore = -Infinity
                        for(let i = 0; i < boardInstance.length; i++)
                        {
                            if(boardInstance[i]=="")
                            {
                                boardInstance[i] =  game.currentPlayer.marker
                                let score = _minimax(boardInstance, false, depth++)
                                boardInstance[i]=""
                                bestScore = Math.max(score, bestScore)
                            }
                        }
                        return bestScore
                    }
                    else
                    {   
                        let bestScore = Infinity
                        for(let i = 0; i < boardInstance.length; i++)
                        {
                            if(boardInstance[i]=="")
                            {  
                                boardInstance[i] = game.currentPlayer==_players[0]?_players[1].marker:_players[0].marker
                                let score = _minimax(boardInstance, true,depth++)
                                boardInstance[i]=""
                                bestScore = Math.min(score, bestScore)
                                
                            }
                        }
                        return bestScore
                    }
                }
    
                let bestScore = -Infinity
                let move;
                for(let i = 0; i<gameBoard.board.markers.length; i++)
                {
                    if(gameBoard.board.markers[i]=="")
                    {
                        gameBoard.board.markers[i] = game.currentPlayer.marker
                        let score = _minimax(gameBoard.board.markers, false, 0)
                        gameBoard.board.markers[i]=""
                        if(score>bestScore)
                        {
                            move = i
                            bestScore = score
                        }
                    }
                }
                return move
            }
        
            let _randomPick = ()=>{
                let move = Math.floor(Math.random()*(9));
                while(gameBoard.board.markers[move]!=""&&game.over==false)
                {
                    move = Math.floor(Math.random()*(9));
                }
                return move
            }
    
    
            if(AI_Algo=="minimax"){return _minimaxPick()}
            else{return _randomPick()}
        }
    
        const _moveAI = ()=>{
            let tilePosition = 0
            let tile = ""
            let index = 0
            let chance = Math.random() * 100
            // For "Easy" difficulty, perform a randomPick with a 70% chance, and a minimax pick with a 30% chance
            if(game.currentPlayer.type=="AI" && game.currentPlayer.difficulty=="Easy")
            {
                if(chance<70) {index = _operationsAI("random")}
                else {index = _operationsAI("minimax")}
            }
    
            // For "Normal" difficulty, difficulty, perform a randomPick with a 20% chance, and a minimax pick with a 80% chance
            if(game.currentPlayer.type=="AI" && game.currentPlayer.difficulty=="Normal")
            {
                if(chance<25)  {index = _operationsAI("random")}
                else {index = _operationsAI("minimax")}
            }
    
            // For "Hard" difficulty, employ _minimax
            if (game.currentPlayer.type=="AI" && game.currentPlayer.difficulty=="Hard")
            { 
                {index = _operationsAI("minimax")}
            }
            tilePosition = gameBoard.board.positions[index];
            tile = document.querySelector(`[data-position-y="${tilePosition.split("-")[0]}"][data-position-x="${tilePosition.split("-")[1]}"]`);
            game.markTiles(tile, tilePosition)
        }

        //Display turn and score at the first instance of the game

        waitBoardAnimation(_highlightTilesPlayer)
        waitBoardAnimation(_handleReset)
        waitBoardAnimation(()=>_displayCurrentTurn(true))
        waitBoardAnimation(()=>_displayScore(true))

        return {currentPlayer, currentPlayerChange, markTiles, score, winner,over}
    })()
    
    //if the first player is AI, run the game by setting current player to the 2nd one, and running the change function
    if(game.currentPlayer.type=="AI")
    {
        let tile = document.querySelector('.boardContainer .tile')
        tile.addEventListener("animationend", ()=>{
            game.currentPlayer=players[1]
            game.currentPlayerChange()
        })
   
    }
}
