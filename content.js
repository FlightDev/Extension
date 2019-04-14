chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("content.js got a message")
        console.log(request);
        console.log(sender);
    }
);

chrome.runtime.sendMessage({contentScriptQuery: "loanOffers"}, function(response) {
    console.log(response.farewell);
});

//alert('test')
var price
var EVEN_API_KEY = 'e7675dd3-ff3b-434b-95aa-70251cc3784b_88140dd4-f13e-4ce3-8322-6eaf2ee9a2d2';

if (document.getElementById('priceblock_ourprice')) {
    price = document.getElementById('priceblock_ourprice').innerHTML
} else {
    price = document.getElementById('priceblock_dealprice').innerHTML
}

document.getElementById('productTitle').innerHTML = 'terrance li ' + price

//deals popup
var dealsPopUp = document.createElement("div")
dealsPopUp.id = 'dealsPopUp'

//deals popup close button
var dealsCloseButton = document.createElement("div")
dealsCloseButton.id = 'dealsCloseButton'
dealsCloseButton.innerHTML = 'X'
dealsCloseButton.style.cursor = 'pointer';
dealsCloseButton.onclick = function() {
    document.body.removeChild(dealsPopUp)
}
//add close button to dealsPopUp element
dealsPopUp.appendChild(dealsCloseButton)

//empty space
var emptySpace = document.createElement("div"); 
emptySpace.id = 'emptySpace'
emptySpace.innerHTML = '&nbsp;'
document.body.insertBefore(emptySpace, document.body.firstChild);

//actual banner
var topBanner = document.createElement("div"); 
topBanner.id = 'topBanner'
topBanner.innerHTML = 'find an applicable loan with EVEN'
topBanner.style.cursor = 'pointer';
topBanner.onclick = function() {
    //append item for each loan offer
    var loanOffersDiv = document.createElement('div')
    loanOffersDiv.id = 'loanOffers'
    //loanOffersDiv.innerHTML = evenResponse.uuid
    dealsPopUp.appendChild(loanOffersDiv)

    document.body.appendChild(dealsPopUp)
};
document.body.appendChild(topBanner); 


