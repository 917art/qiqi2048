//给第0项格子添加数字0
// let gridcell = document.querySelector('.smallbox-0-0')
// gridcell.innerHTML = 0

//给所以格子添加数字0

let numArr
let score = 0
let bestScore = 0

let scoreValue = document.querySelector('.score-Value>span')
let bestValue = document.querySelector('.bestScore-Value>span')

start()

let restartBtn = document.querySelector('.restart-btn')

restartBtn.onclick = function(){
    start()
}

function start(){
    score = 0

    bestValue.innerHTML = localStorage.getItem('bestScore')

    bestScore = localStorage.getItem('bestScore')

    numArr = []
    for(let i = 0;i<16;i++){
        numArr[i] = 0
    }

    generateNum()
    generateNum()
    
    reader()
}

function reader(){
    scoreValue.innerHTML = score

    for(let i = 0;i<16;i++){
        let row = parseInt(i / 4);
        let column = (i % 4)
    
        let gridcell = document.querySelector(`.smallbox-${row}-${column}`);
    
        let val = numArr[i] > 0 ? numArr[i] : ''
        if(val <= 512){
            gridcell.innerHTML = `<span class = "value-${val}">${val}</span>`
        }else {
            gridcell.innerHTML = `<span class = "value-${val}up">${val}</span>`
        }
        

        
        
        let len = String(val).length;
        
        gridcell.style.fontSize = len < 2 ? '38px' : '34px'
    }
}

function generateNum(){
    let randomI
    do{
        randomI = parseInt(Math.random()*16) 
    }while(numArr[randomI] > 0)
    numArr[randomI] = Math.random() < 0.5 ? 2 : 4
}

document.onkeydown = function(e){
    let ifleft = ifCanMoveLeft();
    let ifright = ifCanMoveRight();
    let ifup = ifCanMoveUp();
    let ifdown = ifCanMoveDown();

    if(!ifleft && !ifright && !ifup && !ifdown){
        if(score > bestScore){
            localStorage.setItem('bestScore',score)
        }
        alert('Game Over')
        return
    }


    if(e.code === 'ArrowLeft'){
        if(ifleft){
            moveLeft()
            generateNum()
            reader()
        }
    }else if(e.code === 'ArrowRight'){
        if(ifright){
            moveRight()
            generateNum()
            reader()
        }
    }else if(e.code === 'ArrowUp'){
        
        if(ifup){
            moveUp()
            generateNum()
            reader()
        }
    }else if(e.code === 'ArrowDown'){
        if(ifdown){
            moveDown()
            generateNum()
            reader()
        }
    }
}

function moveLeft(){
    let luojiaoStartLieArr = [0,0,0,0]
    for(let i = 0; i < 16 ; i++){

        if(i % 4 === 0){continue}
        

        if(numArr[i]>0){
            let currentRow = parseInt(i / 4)
            let currentColumn = i % 4

            for(let luojiaolie = luojiaoStartLieArr[currentRow];luojiaolie < currentColumn;luojiaolie++){
                let luojiaoIdx = currentRow * 4 + luojiaolie

                if(numArr[luojiaoIdx] === 0 && noBlockHorizontal(luojiaoIdx,i)){
                    numArr[luojiaoIdx] = numArr[i]
                    numArr[i] = 0
                }else if(numArr[luojiaoIdx] === numArr[i] && noBlockHorizontal(luojiaoIdx,i)){
                    numArr[luojiaoIdx] = numArr[i] + numArr[luojiaoIdx]
                    numArr[i] = 0

                    score += numArr[luojiaoIdx]

                    luojiaoStartLieArr[currentRow] = luojiaolie + 1
                }
            }
        }
        }
}

function ifCanMoveLeft(){
    for(let i = 0 ; i < numArr.length; i++){

        if(i % 4 === 0){
            continue
        }

       if(numArr[i] > 0){
        if(numArr[i - 1] === 0 || numArr[i - 1] === numArr[i]){
            return true
        }
       }
    }

    return false

}

function moveRight(){
    let luojiaoStartLieArr = [3,3,3,3]

    for(let i = numArr.length - 1 ; i >= 0 ; i--){
        if(i % 4 === 3){
            continue
        }

        if(numArr[i] > 0){
            let currentRow = parseInt(i / 4)
            let currentColumn = i % 4

            for(let luojiaolie = luojiaoStartLieArr[currentRow]  ; luojiaolie > currentColumn ; luojiaolie--){
                let luojiaoIdx = currentRow * 4 + luojiaolie

                if(numArr[luojiaoIdx] === 0 && noBlockHorizontal(i,luojiaoIdx)){
                    numArr[luojiaoIdx] = numArr[i]
                    numArr[i] = 0
                }else if(numArr[luojiaoIdx] === numArr[i] && noBlockHorizontal(i,luojiaoIdx)){
                    numArr[luojiaoIdx] = numArr[i] + numArr[luojiaoIdx]
                    numArr[i] = 0

                    score += numArr[luojiaoIdx]

                    luojiaoStartLieArr[currentRow] = luojiaolie - 1
                }
            }

            beforeRow = currentRow
        }
    }
}

function ifCanMoveRight(){
    for(let i = 0;i < 16 ; i++){
        if(i % 4 === 3){
            continue
        }

        if(numArr[i] > 0){
            if(numArr[i + 1] === 0 || numArr[i] === numArr[i + 1]){
                return true
            }
           }
    }

    return false
}

function moveUp(){
    let luojiaoHangArr = [0,0,0,0]
    for(let i = 0; i < numArr.length; i++){
        if(i  < 4) {continue}

        if(numArr[i] > 0){
            let currentRow = parseInt(i / 4)
            let currentColumn = i % 4

            for(let luojiaoHang = luojiaoHangArr[currentColumn] ; luojiaoHang < currentRow; luojiaoHang++){
                let luojiaoIdx = luojiaoHang * 4 + currentColumn

                if(numArr[luojiaoIdx] === 0 && noBlockVertical(luojiaoIdx,i)){
                    numArr[luojiaoIdx] = numArr[i]
                    numArr[i] = 0
                }else if(numArr[luojiaoIdx] === numArr[i] && noBlockVertical(luojiaoIdx,i)){
                    numArr[luojiaoIdx] = numArr[i] + numArr[luojiaoIdx]
                    numArr[i] = 0

                    score += numArr[luojiaoIdx]

                    luojiaoHangArr[currentColumn] = luojiaoHang + 1
                }
            }
        }
    }
}

function ifCanMoveUp(){
    for(let i = 0; i < numArr.length ; i++){
        if(i  < 4) {continue}

        if(numArr[i] > 0){
             if(numArr[i - 4] === 0 || numArr[i - 4 ] === numArr[i]){
                return true
             }
        }
    }
    return false
}

function moveDown(){
    let luojiaoHangArr = [3,3,3,3]

    for(let i = numArr.length - 1 ;i >= 0 ; i--){
        if(i > 11){continue}
        
        if(numArr[i] > 0){
            let currentRow = parseInt(i / 4)
            let currentColumn = i % 4

            for(let luojiaoHang = luojiaoHangArr[currentColumn] ; luojiaoHang > currentRow; luojiaoHang--){
                let luojiaoIdx = luojiaoHang * 4 + currentColumn

                if(numArr[luojiaoIdx] === 0 && noBlockVertical(i,luojiaoIdx)){
                    numArr[luojiaoIdx] = numArr[i]
                    numArr[i] = 0
                }else if(numArr[luojiaoIdx] === numArr[i] && noBlockVertical(i,luojiaoIdx)){
                    numArr[luojiaoIdx] = numArr[i] + numArr[luojiaoIdx]
                    numArr[i] = 0

                    score += numArr[luojiaoIdx]

                    luojiaoHangArr[currentColumn] = luojiaoHang - 1
                }
            }
        }
    }
}

function ifCanMoveDown(){
    for(let i = numArr.length - 1; i >= 0 ; i--){
        if(i > 11){continue}

        if(numArr[i] > 0){
            if((numArr[i+4] === 0 || numArr[i] === numArr[i+4])){
                return true
            }
        }
    }

    return false
}

function noBlockHorizontal(minIdx,maxIdx){
        for(let i = minIdx + 1; i < maxIdx ;i++){
            if(numArr[i] > 0){
                return false
            }
            
        }
        return true
}

function noBlockVertical(minIdx,maxIdx){
    for(let i =  minIdx + 4; i < maxIdx ; i+= 4){
        if(numArr[i] > 0){
            return false
        }
    }
    return true
}