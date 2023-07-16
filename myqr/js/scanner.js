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
