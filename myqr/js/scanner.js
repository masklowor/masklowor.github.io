function onScanSuccess(decodedText, decodedResult) {
    
    // Handle on success condition with the decoded text or result.
var output = document.getElementById('result');


// Get the URL parameters
var urlParams = new URLSearchParams(window.location.search);

// Get the value of the 'result' parameter
var resultParam = `${decodedText}`, decodedResult;

// Set the innerHTML of the 'output' element to the value of the 'result' parameter
output.innerHTML = resultParam;

var url = (resultParam);

window.open(url,'_self');
   

html5QrcodeScanner.clear();
}

function onScanError(errorMessage) {
    // handle on error condition, with error message
}

var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanError);
