




const gameBoard = (()=>{
    // Public board variable
    let board = {markers: [], positions: []};

    // to generate intial value of board
    for (let i=0; i<9; i++)
    {
        let prefix = (i>=3)?(Math.floor(i/3)):(0);
        let postfix = (i>=3)?(i-3*prefix):(i);
        board.positions.push(`${prefix}-${postfix}`);
        board.markers.push("");
    }
    
    //create divs inside container
    const generateBoard = function()
    {
        document.addEventListener('DOMContentLoaded', ()=>{
            let container = document.querySelector('.container')
            board.positions.forEach((posValue, index)=>{
                const tile = document.createElement('div');
                tile.className = "tile";
                if(board.markers[index]!="")
                {
                    tile.innerHTML = `<div class = "marker">${board.markers[index]}</div>`
                }
                [tile.dataset.positionY, tile.dataset.positionX] = [posValue.split("-")[0], posValue.split("-")[1]];
                tile.addEventListener('click', _addTileEvents);
                container.appendChild(tile);
            })
        })
    }();
   
    const _addTileEvents = function(){
        if(game.currentPlayer.type=="AI"){return}
        let tilePosition = `${this.dataset.positionY}-${this.dataset.positionX}`
        game.markTiles(this, tilePosition)
    }
    
    return {board: board}
})();



// const playerControl = (()=>{
//     const createPlayer = (name, marker, type) => {return {name:name, marker:marker, type:type}}
//     return {createPlayer}
// })();

const createPlayer = (name, marker, type) => {return {name:name, marker:marker, type:type}}

 

const game = (()=>{
    let game_state = null
    let _players = [{name:'Philip', marker:"X", type:"Human", difficulty:"Easy"}, {name:'Greg', marker:"O", type:"AI", difficulty:"Easy"}]
    let currentPlayer = _players[0]
    let currentPlayerChange =  function() {
        _watchBoard()
        this.currentPlayer = (this.currentPlayer===_players[0]?_players[1]:_players[0])
        if (this.currentPlayer.type=="AI" && game.game_state!="FIN")
        {
            _moveAI()
            return
        }
        
    }

    const markTiles = function(tile, tilePosition){

        // Check if game is over, if it is, stop from changing tiles
        if(game.game_state=="FIN"){console.log("FIN"); return true}

        let index = gameBoard.board.positions.indexOf(tilePosition)

        // Check if tile is not empty, if it isn't return and prevent from overwriting
        if(gameBoard.board.markers[index]!=""  && game.currentPlayer.type=="Human" ){return}
        gameBoard.board.markers[index] = game.currentPlayer.marker;
        tile.innerHTML = `<h1>${game.currentPlayer.marker}</h1>`
        tile.classList.add('marked')
        game.currentPlayerChange()
    }

    const _highlightTilesAI= function(){
    }

    const _highlightTilesPlayer = function(){
        document.addEventListener('DOMContentLoaded',()=>{
            document.querySelectorAll('.tile').forEach((tile)=>{
                tile.addEventListener('mouseenter', function(){
                    if(tile.classList.contains("marked")){return}
                    else
                    this.innerHTML = `<h1>${game.currentPlayer.marker}</h1>`
                })
                tile.addEventListener('mouseleave', function(){
                    if(tile.classList.contains("marked")){return}
                    else
                    this.innerHTML = ""
                })
            })
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
                    alert(`Player One is the winner`)
                    game.game_state = "FIN"
                    location.reload()
                }
                return  "P1"
            }
            else if(winCondtionsO)
            {
                if(!boardInstance&&game.currentPlayer==_players[1])
                {
                    alert(`Player Two is the winner`)
                    game.game_state = "FIN"
                    location.reload()
                }
                return "P2"
            }
            else if(gameBoard.board.markers.every((tile)=>tile!=""))
            {   if(!boardInstance)
                {
                    alert(`TIE`)
                    game.game_state = "FIN"
                    location.reload()
                }
                return "Tie"
            }
            // else if(gameBoard.board.markers.every((tile)=>tile!="")){game.game_state="FIN"; alert("TIE");}
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

            let _minimax = (boardInstance, isMaximizing)=>{
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
                            let score = _minimax(boardInstance, false)
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
                            let score = _minimax(boardInstance, true)
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
                    let score = _minimax(gameBoard.board.markers, false,)
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
            while(gameBoard.board.markers[move]!=""&&game.game_state!="FIN")
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
        _highlightTilesAI()
        // For "Easy" difficulty, perform a randomPick with a 70% chance, and a minimax pick with a 30% chance
        if(game.currentPlayer.type=="AI" && game.currentPlayer.difficulty=="Easy")
        {
            if(chance<60) {index = _operationsAI("random")}
            else {index = _operationsAI("minimax")}
        }

        // For "Normal" difficulty, difficulty, perform a randomPick with a 20% chance, and a minimax pick with a 80% chance
        if(game.currentPlayer.type=="AI" && game.currentPlayer.difficulty=="Normal")
        {
            _highlightTilesAI()
            if(chance<15)  {index = _operationsAI("random")}
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
    
    return {currentPlayer, currentPlayerChange, markTiles}
})();







