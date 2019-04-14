var evenResponse;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        evenResponse = request.response
        console.log(evenResponse)
        return true;
    }
);

chrome.runtime.sendMessage({contentScriptQuery: "loanOffers"}, function(response) {
    return true;
});

//alert('test')
var price

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
    var loanOffersTitle = document.createElement('div')
    loanOffersTitle.innerHTML = 'Loan Offers'
    loanOffersTitle.id = 'loanOffersTitle'
    dealsPopUp.appendChild(loanOffersTitle)

    var loanOffersTable = document.createElement('table')
    loanOffersTable.id = 'loanOffersTable'

    var loanOffersTr = document.createElement('tr')
    loanOffersTr.id = 'loanOffersTr'
    var td1 = document.createElement('td')
    td1.innerHTML = 'Provider'
    var td2 = document.createElement('td')
    td2.innerHTML = 'Amount'
    var td3 = document.createElement('td')
    td3.innerHTML = 'APR'
    var td4 = document.createElement('td')
    td4.innerHTML = 'Term Length'
    loanOffersTr.appendChild(td1)
    loanOffersTr.appendChild(td2)
    loanOffersTr.appendChild(td3)
    loanOffersTr.appendChild(td4)

    loanOffersTable.appendChild(loanOffersTr)
    for (var i=0;i<evenResponse.loanOffers.length;i++) {
        loanOffersTr = document.createElement('tr')
        var provider = document.createElement('td')
        provider.innerHTML = evenResponse.loanOffers[i].originator.name
        var amount = document.createElement('td')
        amount.innerHTML = evenResponse.loanOffers[i].maxAmount
        var APR = document.createElement('td')
        APR.innerHTML = evenResponse.loanOffers[i].meanApr
        var termLength = document.createElement('td')
        termLength.innerHTML = evenResponse.loanOffers[i].termLength + ' ' + evenResponse.loanOffers[i].termUnit + '(s)'
        
        loanOffersTr.appendChild(provider)
        loanOffersTr.appendChild(amount)
        loanOffersTr.appendChild(APR)
        loanOffersTr.appendChild(termLength)
        loanOffersTable.appendChild(loanOffersTr)
    }
    //loanOffersDiv.innerHTML = evenResponse.uuid
    dealsPopUp.appendChild(loanOffersTable)

    document.body.appendChild(dealsPopUp)
};
document.body.appendChild(topBanner); 


