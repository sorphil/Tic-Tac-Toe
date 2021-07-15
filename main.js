document.addEventListener('DOMContentLoaded', ()=>{
    if(screen.availHeight > screen.availWidth){
        alert("Please use Landscape!");
    }
    document.querySelector('.gameContainer').style.display="none"
    document.querySelector('.playerCreation').style.display="none"
    document.querySelector('.titleScreen').style.display= "none"
    window.onload = function()
    {
        var playerCreationReload = sessionStorage.getItem("playerCreationReload");
        if (playerCreationReload) {
            sessionStorage.removeItem("playerCreationReload");
            playerCreation(true)
        }
        else
        {
            titleScreen()
        }
    }
})


let titleScreen = (()=>{

    const titleScreen = document.querySelector('.titleScreen')
    titleScreen.style.display = "flex"
    titleScreen.addEventListener('click', ()=>{playerCreation()})
    document.addEventListener('keyup', (e)=>{
        if(e.key=="Enter"&& titleScreen.style.display=="flex")
        {
            document.querySelector('.titleScreen').style.display="none"
            playerCreation()
        }
    })
})



let playerCreation = (reload)=>{
    const titleScreen = document.querySelector('.titleScreen')
    const subhead = document.querySelector('.subhead') 
    const playerCreation = document.querySelector('.playerCreation')

    titleScreen.style.display = "flex"
    subhead.classList.add('fade-out')
    subhead.addEventListener('transitionend', ()=>{
        subhead.style.display = "none"
        playerCreation.style.display = "flex"
        titleScreen.classList.add('shrinkUp')
        titleScreen.addEventListener('animationend', ()=>{
            titleScreen.style.cssText="   height: 20vh;font-size: 9vmin;cursor: default;"
        })
    })
    if(reload)
        {
            subhead.style.display = "none"
            titleScreen.style.display = "flex"
            playerCreation.style.display = "flex"
            titleScreen.style.cssText="   height: 20vh;font-size: 9vmin;cursor: default;"
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
            }
            else 
            {
                document.querySelector('#playerTwoHumanIcon').style.display ="none";
                document.querySelector('#playerTwoRobotIcon').style.display ="block";
                document.querySelector('#playerTwoDifficulty').style.opacity = "100%";
            }
        }
        else
        {
            if(input.id=="playerOneType")
            {
                document.querySelector('#playerOneHumanIcon').style.display ="block";
                document.querySelector('#playerOneRobotIcon').style.display ="none";
                document.querySelector('#playerOneDifficulty').style.opacity = "0%";
            }
            else
            {
                document.querySelector('#playerTwoHumanIcon').style.display ="block";
                document.querySelector('#playerTwoRobotIcon').style.display ="none";
                document.querySelector('#playerTwoDifficulty').style.opacity = "0%";
            }
        }
    }
    const checkNameInput = ()=>{

        let inputs = document.querySelectorAll('.name')
        let result = Array.from(inputs).every(input=>input.value!="")
        if (result==true)
        {
            document.querySelector('button').disabled = false
        }
        else
        {
            document.querySelector('button').disabled = true
        }
    }
    const createPlayer = ()=>{
        document.querySelectorAll('.playerOne').forEach((input)=>{
            playerOne[`${input.className.split(" ")[1]}`]=input.value
        })
        document.querySelectorAll('.playerTwo').forEach((input)=>{
            playerTwo[`${input.className.split(" ")[1]}`]=input.value
        })
        playerOne.marker="X"
        playerTwo.marker="O"
        players= [playerOne, playerTwo]
        document.querySelector('.playerCreation').style.display="none"
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

    document.querySelector('button').addEventListener('click', ()=>{
        createPlayer()
    })
    if(document.querySelector('button').disabled == false)
    {
        document.addEventListener('keyup', (e)=>{
            if(e.key=="Enter"&&document.querySelector('.gameContainer').style.display=="none")
            {
                createPlayer()
            }
        })
    }
}

const runGame = (players)=>
{
    document.querySelector('.titleScreen').style.display ="none"
    document.querySelector('.gameContainer').style.display = "block"
    // const generateHTML = (()=>{
    //     let gameContainer =
    //     gameContainer.innerHTML = `
    //     `                           
    //     gameContainer.style.display= "block"
    // })()

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
            let back = confirm("Go back to character select?")
            if(back==true)
            {
                sessionStorage.setItem("playerCreationReload", "true");
                document.location.reload();
            }
            else {return}
        }
        const _addTileEventstListeners = function(){
            if(game.currentPlayer.type=="AI"){return}
            let tilePosition = `${this.dataset.positionY}-${this.dataset.positionX}`
            game.markTiles(this, tilePosition)
        }

        const _addButtonEventListeners = function()
        {
            let resetButton = document.querySelector('.reset-btn')
            let backButton = document.querySelector('.back-btn')
            resetButton.addEventListener('click', _resetBoard)
            backButton.addEventListener('click', _goBack )
        }()


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
            })
            // boardContainer.display
        }

        _generateBoard()
        _generateHTMLBoard()

        return {board, reset}
    })()

    const game = (()=>{
        let _over = false
        let _reset = false
        let _players = players

        let currentPlayer = _players[0]
        let score = {playerOne:0, playerTwo:0, tie:0}
        
        let _displayCurrentTurn = function(initial)
        {
            let turnDiv =  document.querySelector('.turn')
            if(initial) {turnDiv.innerHTML = `${_players[0].name}'s Turn`}
            else {turnDiv.innerHTML = `${game.currentPlayer.name}'s Turn`}
        }
        let _displayScore = function(initial)
        {
            let scoreDiv =  document.querySelector('.score')
            if(initial) {scoreDiv.innerHTML = `${_players[0].name}:${score.playerOne}, ${_players[1].name}:${score.playerTwo}, Tie:${score.tie}`}
            else {scoreDiv.innerHTML = `${_players[0].name}:${game.score.playerOne}, ${_players[1].name}:${game.score.playerTwo}, Tie:${game.score.tie}`}
        }
       
        //Display turn and score at the first instance of the game
        _displayCurrentTurn(true)
        _displayScore(true)

        let currentPlayerChange =  function() 
        {
            _watchBoard()
            this.currentPlayer = (this.currentPlayer===_players[0]?_players[1]:_players[0])
            if(_over==false)
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
            // Check if game is over, if it is, stop from changing tiles
            if(_over==true){console.log("FIN"); return true}
    
            let index = gameBoard.board.positions.indexOf(tilePosition)
    
            // Check if tile is not empty, if it isn't return and prevent from overwriting
            if(gameBoard.board.markers[index]!=""  && game.currentPlayer.type=="Human" ){return}
            gameBoard.board.markers[index] = game.currentPlayer.marker;
            tile.innerHTML = `<h1>${game.currentPlayer.marker}</h1>`
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
                    if(!tile.classList.contains('marked'))
                    {tile.innerHTML = `<h1 style="opacity:40%;">${game.currentPlayer.marker}</h1>`}
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
                    if(!tile.classList.contains('marked'))
                    {tile.innerHTML = `<h1 style="opacity:40%;">${game.currentPlayer.marker}</h1>`}
        
                    i--
                    setTimeout(()=>highlight(i, direction), 40)
                    setTimeout(()=>{if(!tile.classList.contains('marked')){tile.innerHTML=""}}, 40)
                }
            })(i, "RtL")
        }
    
        const _highlightTilesPlayer = function(){
                document.querySelectorAll('.tile').forEach((tile)=>{
                    tile.addEventListener('mouseenter', function(){
                        if(tile.classList.contains("marked")||game.currentPlayer.type=="AI"||_over==true){return}
                        else
                        this.innerHTML = `<h1 style="opacity:40%;">${game.currentPlayer.marker}</h1>`
                    })
                    tile.addEventListener('mouseleave', function(){
                        if(tile.classList.contains("marked")||game.currentPlayer.type=="AI"||_over==true){return}
                        else
                        this.innerHTML = ""
                    })
                })
        }
        _highlightTilesPlayer()

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
                    _over = false;
                    _handlePlayerReset()
                }

                if(gameBoard.reset==true)
                {  
                    _handleAIReset(_handlePlayerReset)
                }
           
            })
        }()
        
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
                        _over = true
                        game.score.playerOne+=1
                        document.querySelector('.turn').innerHTML = `${_players[0].name} Won`
                        _displayScore()
                    }
                    return  "P1"
                }
                else if(winCondtionsO)
                {
                    if(!boardInstance&&game.currentPlayer==_players[1])
                    {
                        _over = true
                        game.score.playerTwo+=1
                        document.querySelector('.turn').innerHTML = `${_players[1].name} Won`
                        _displayScore()
                    }
                    return "P2"
                }
                else if(gameBoard.board.markers.every((tile)=>tile!=""))
                {   if(!boardInstance)
                    {
                        _over = true
                        game.score.tie+=1
                        document.querySelector('.turn').innerHTML = `Tie`
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
                while(gameBoard.board.markers[move]!=""&&_over==false)
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

        return {currentPlayer, currentPlayerChange, markTiles, score}
    })()
    
    //if the first player is AI, run the game by setting current player to the 2nd one, and running the change function
    if(game.currentPlayer.type=="AI")
    {
        game.currentPlayer=players[1]
        game.currentPlayerChange()
    }
}


    