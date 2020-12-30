function notifications(){
    chrome.notifications.create(
        {
            title:'Prithvi: A greener future',
            message:'If you\'re planning to buy something, Greener alternatives are just a click away!',
            type:'basic',
            iconUrl:'icon.png'
        }
    )
}

    
var quer1;
chrome.tabs.onUpdated.addListener(function (changeInfo, tab) {
    //chrome.tabs.sendMessage(tabID, { name: 'Chrome Tabs updated >>>>>> ' + tab.url });
    if (changeInfo.status == 'complete') {
        let url = tab.url;
        var start = url.indexOf("q=")+2;
        var end = url.indexOf("&", start);
        quer1 = url.substring(start, end);
        console.log(quer1);
        var allKeys=["buy","price","cheap", "product", "shop", "sale","amazon","flipkart","myntra","purchase","ecological"];
        var counter=0;
        for(i=0;i<allKeys.length;i++){
            if(quer1.includes(allKeys[i])&&counter==0){
                notifications(); 
                counter++;
            }
        }
    }
});

// function notifications(){
//     chrome.notifications.create(
//         {
//             title:'Prithvi: A Greener Future',
//             message:'If you\'re planning to buy something, Greener alternatives are just a click away!',
//             type:'basic',
//             iconUrl:'icon.png'
//         }
//     )
//     chrome.browserAction.openPopup;
// }

// function openapp(){
// 	// window.open('window.html');
// 	var keyboardEvent = document.createEvent('KeyboardEvent');
// var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';

// 	keyboardEvent[initMethod](
// 		  'keydown', // event type: keydown, keyup, keypress
// 		  true, // bubbles
// 		  true, // cancelable
// 		  window, // view: should be window
// 		  true, // ctrlKey
// 		  false, // altKey
// 		  true, // shiftKey
// 		  false, // metaKey
// 		  76, // keyCode: unsigned long - the virtual key code, else 0
// 		  76, // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
// 		);
// 		document.dispatchEvent(keyboardEvent);
// 	}
// chrome.windows.onCreated.addListener(notifications);


// chrome.notifications.onClicked.addListener(openapp);