let keyLoger = ""
let array = []

document.addEventListener("keypress", (e) => {
    
    keyLoger+=e.key
    
    if (e.key==" " || e.key=="Enter"){
        array.push(keyLoger)
        keyLoger=""
        console.log("array = ",array )
    }
})

/*
// // Création de la fonction AFK puis appel
let isUserActivity = 0

document.addEventListener("mousemove",() => {
    
    isUserActivity=1
    console.log("CL inactivity mousemove=",isUserActivity)
 
})

// setTimeout(function(){
//     isUserActivity=0
//     console.log("statut 2=",isUserActivity)
// },3000)

function inactivity () {
    isUserActivity=0
    console.log("CL inactivity =",isUserActivity)
    setTimeout(inactivity,3000)

}
inactivity()*/
let baliseSelect = "span"

let inactivityTime = function () {
    let time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function createAnimation() {

       console.log("bientot une animation sera ici")

       let baliseSelection = document.querySelectorAll(baliseSelect)
       baliseSelection.forEach(function(item){
        item.setAttribute("class","animationCSS")
       })


    }

    function resetTimer() {
        clearTimeout(time);
        console.log("Je remet le texte normal")

        let baliseSelection = document.querySelectorAll(baliseSelect)
        baliseSelection.forEach(function(item){
        item.setAttribute("class","")
       })

        time = setTimeout(createAnimation, 3000)
        
        // 1000 milliseconds = 1 second
    }
};

window.onload = function() {
    inactivityTime();
  }

  