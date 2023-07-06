function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    var output = document.getElementById('result');
    output.innerHTML =`${decodedText}`, decodedResult;

    html5QrcodeScanner.clear();
}

function onScanError(errorMessage) {
    // handle on error condition, with error message
}

var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanError);