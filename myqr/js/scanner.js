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

window.open(url,'_blank');
   

html5QrcodeScanner.clear();
}

function onScanError(errorMessage) {
    // handle on error condition, with error message
}

var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanError);


function requestCameraPermission() {
      // Check if the browser supports mediaDevices.getUserMedia()
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request camera permission
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function(stream) {
            // Permission granted, create a new instance of HTML5QrcodeScanner
            const qrCodeScanner = new Html5QrcodeScanner(
              "reader",
              { fps: 10, qrbox: 250 },
              /* successCallback */ onScanSuccess
            );

            // Start scanning
            qrCodeScanner.start();

            // Handle scan success
            function onScanSuccess(qrCodeMessage) {
              const output = document.getElementById("output");
              output.innerHTML = qrCodeMessage;
              var url = (qrCodeMessage);
              window.open(url,'_self');
              qrCodeScanner.clear();
            }

          })
          .catch(function(error) {
            // Permission denied or error occurred, handle the error
            console.log("Camera permission denied or error:", error);
          });
      } else {
        console.log("getUserMedia API is not supported");
      }
    }

    // Request camera permission when the page loads
    window.onload = requestCameraPermission;

