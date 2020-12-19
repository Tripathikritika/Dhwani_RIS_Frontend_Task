let outerDiv = document.getElementById('outerDiv')

outerDiv.addEventListener('click', () => {
    let boxValue = event.target.style.zIndex
    if( event.target.style.zIndex == '10' ){
        
        event.target.style.zIndex = '0'
        return
    }
    else{
        event.target.style.zIndex = '10'
        return
    }
})
