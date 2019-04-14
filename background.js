// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({color: '#3aa757'}, function() {
//       console.log('The color is green.');
//     });
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//       chrome.declarativeContent.onPageChanged.addRules([{
//         conditions: [new chrome.declarativeContent.PageStateMatcher({
//           pageUrl: {hostEquals: 'www.amazon.com', urlContains: 'qid'},
//         })
//         ],
//             actions: [new chrome.declarativeContent.RequestContentScript({js: ["content.js"]})]
//       }]);
//     });
//   });
var EVEN_API_KEY = 'e7675dd3-ff3b-434b-95aa-70251cc3784b_88140dd4-f13e-4ce3-8322-6eaf2ee9a2d2';

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('hi')
        //EVEN API!!!!
        var lead = '{ "productTypes": [ "loan" ], "personalInformation": { "firstName": "John", "lastName": "Doe", "email": "john@example.com", "zipcode": "98006", "ipAddress": "8.8.8.8", "dateOfBirth": "1993-10-09", "educationLevel": "bachelors" }, "loanInformation": {}, "creditInformation": { "providedNumericCreditScore": 600 }, "financialInformation": { "employmentStatus": "employed", "monthlyNetIncome": 7000 }, "legalInformation": { "consentsToFcra": true, "consentsToTcpa": true, "tcpaLanguage": "I agree to be contacted by Even Financial and its partners at the telephone number(s) I have provided above to explore personal loan offers, including contact through automatic dialing systems, artificial or pre-recorded voice messaging, or text message. I understand my consent is not required as a condition to purchasing any goods or services from anyone." } }'
        var myHeaders = new Headers({
            'Authorization': 'Bearer ' + EVEN_API_KEY,
            'Accept': 'application/vnd.evenfinancial.v1+json',
            'Content-Type': 'application/json'
        });
        const requestAPI = new Request('https://api.evenfinancial.com/leads/rateTables', {method: 'POST', body: lead, headers: myHeaders, mode: 'cors'});
        fetch(requestAPI)
        .then(response => {
            return response.json()
        })
        .then(response => {
            sendMessage(response)
            // ...
        }).catch(error => {
            console.error(error);
        });
        return true;  // Will respond asynchronously.
    });

function sendMessage(response) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {response: response}, function(response) {
            return true;
        });
    });
}