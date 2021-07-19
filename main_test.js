document.addEventListener('DOMContentLoaded', ()=>{
    titleScreenHandler()
})

let titleScreenHandler = ()=>{
    const titleScreen = document.querySelector('.titleScreen')
    titleScreen.addEventListener('click', playerCreation)
}

let playerCreation = ()=>
{
    const titleScreen = document.querySelector('.titleScreen')
    const head = document.querySelector('.head')
    const subhead = document.querySelector('.subhead') 
    const gameContainer = document.querySelector('.gameContainer')

    subhead.classList.toggle('fade-out')
        subhead.addEventListener('transitionend', (event)=>{
            subhead.style.display = "none"
            subhead.removeEventListener('transitionend', event)
            head.classList.add('shrink')
            titleScreen.classList.add('shrinkUp')
            head.addEventListener('animationend', ()=>{
                head.style.cssText="font-size: 7rem"
                titleScreen.style.cssText="cursor: default;"
                titleScreen.style.height = "20vh"
            })
        })  
        gameContainer.style.display ="flex"
}