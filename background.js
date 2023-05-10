

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });


 
  //Capture d'écran (https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/API/tabs/captureVisibleTab)
   async function onCaptured(imageUri) {
    
    // chrome.storage.local.set({ key: imageUri }).then(() => {
    //   console.log("Value is set to " + imageUri);
      
    // });

    // chrome.storage.local.get(["key"]).then((result) => {
    //   console.log("Value currently is " + result.key);
      
    // });
    
    console.log("CL imageUri",imageUri);
    
  }
  
  
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  // chrome.action.onClicked.addListener(function()
  chrome.runtime.onMessage.addListener(function() {
    var capturing = chrome.tabs.captureVisibleTab();
   
    capturing.then(onCaptured, onError);
  });
  


  // When the user clicks on the extension action
  chrome.action.onClicked.addListener(async (tab) => {
    
      // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      // Next state will always be the opposite
      const nextState = prevState === 'ON' ? 'OFF' : 'ON';
  
      // Set the action badge to the next state
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState
      });
  
      if (nextState === 'ON') {
        // Insert the CSS file when the user turns the extension on
        await chrome.scripting.insertCSS({
          files: ['focus-mode.css'],
          target: { tabId: tab.id }
        });


      } else if (nextState === 'OFF') {
        // Remove the CSS file when the user turns the extension off
        await chrome.scripting.removeCSS({
          files: ['focus-mode.css'],
          target: { tabId: tab.id }
        });
      }
    
  }); 

  // Receive message to HTML page
  function handleMessage(request, sender, sendResponse) {
    
    console.log("Reception du keyLoger : " +
      request.greeting);
    
    sendResponse({response: "Salut Nathan"});
  }
  
  chrome.runtime.onMessage.addListener(handleMessage);