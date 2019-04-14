function interceptData() {
    var xhrOverrideScript = document.createElement('script');
    xhrOverrideScript.type = 'text/javascript';
    xhrOverrideScript.innerHTML = `
    (function() {
      var XHR = XMLHttpRequest.prototype;
      var send = XHR.send;
      var open = XHR.open;
      XHR.open = function(method, url) {
          this.url = url; // the request url
          return open.apply(this, arguments);
      }
      XHR.send = function() {
          this.addEventListener('load', function() {
              if (this.url.includes('https://api.evenfinancial.com/leads/rateTables')) {
                  var dataDOMElement = document.createElement('div');
                  dataDOMElement.id = '__interceptedData';
                  dataDOMElement.innerText = this.response;
                  dataDOMElement.style.height = 0;
                  dataDOMElement.style.overflow = 'hidden';
                  document.body.appendChild(dataDOMElement);
                  scrapeData();
              }               
          });
          return send.apply(this, arguments);
      };
    })();
    `
    document.head.prepend(xhrOverrideScript);
  }
function checkForDOM() {
    if (document.body && document.head) {
        interceptData();
    } else {
        requestIdleCallback(checkForDOM);
    }
}
function scrapeData() {
    var responseContainingEle = document.getElementById('__interceptedData');
    var response = JSON.parse(responseContainingEle.innerHTML); 
    return response;
}
requestIdleCallback(checkForDOM);