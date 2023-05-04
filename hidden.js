let keyLogger = ""
let array = []

document.addEventListener("keypress", (e) => {
    
    keyLogger+=e.key
    
    if (e.key==" " || e.key=="Enter"){
        array.push(keyLogger)
        keyLogger=""
        console.log("array = ",array )
    }
})


document.addEventListener("click",()=>{
    
})