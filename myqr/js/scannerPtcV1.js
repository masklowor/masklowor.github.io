// Access the "id=app" element
var appElement = document.getElementById('app');

// Initialize the QR code scanner
function initializeScanner() {
  const reader = new Html5Qrcode('reader');

    // Get the element to display the scanned data
    const output = document.getElementById('result');

    // Function to handle successful scan
    function onScanSuccess(qrCodeMessage) {
        console.log('QR Code detected:', qrCodeMessage);
        // Display the scanned data on the page
        output.innerHTML = qrCodeMessage;

        // Open the scanned URL in a new tab
        if (isValidUrl(qrCodeMessage)) {
            window.open(qrCodeMessage, '_self');

            // Clear the scanner to be ready for the next scan
            html5QrcodeScanner.clear();
        }
    }

    // Function to handle scan failure
    function onScanError(errorMessage) {
        console.error('Error scanning QR Code:', errorMessage);
    }

    // Start scanning with the back camera
    reader.start({ facingMode: 'environment' }, { fps: 10, qrbox: 250 }, onScanSuccess, onScanError);
}

// Check if the scanned text is a valid URL
function isValidUrl(text) {
   try {
        new URL(text);
        return true;
    } catch (error) {
        return false;
    }
}

// Call the scanning function when the page is ready
document.addEventListener('DOMContentLoaded', function () {
  initializeScanner();
});

// Call variable button
var imageElement = document.getElementById('logo');
imageElement.src = 'img/capture.jpg';

var headingElement = document.getElementById('header');
headingElement.innerText = 'RizkyNet QR SCANNER';

var footerElement = document.getElementById('footer');
footerElement.innerText = 'Designed Authorized : Rudy Gunawan,ST  (CCNA,MTCRE,MTCNA).| All rights reserved. Copyright © 2023.';

function opcam() {
  var x = document.getElementById('qr-input-file').click();
  document.getElementById("qr-input-file").innerHTML = x;
}

function file() {
  var x = document.getElementById('qr-input-file').click();
  document.getElementById("qr-input-file").innerHTML = x;
}

function openInChrome() {
  var url = "https://masklowor.github.io/myqr"; // Replace with your desired URL

  // Check if the browser is running on an Android device
  var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;

  if (isAndroid) {
    var intentUrl = "intent://" + url + "#Intent;scheme=http;package=com.android.chrome;end";
    window.location.href = intentUrl;
  } else {
    window.open(url, "_blank"); // Open the URL in a new tab/window on other devices
  }
}