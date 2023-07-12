
function opcam(){
	var x = document.getElementById('qr-input-file').click();
	document.getElementById("qr-input-file").innerHTML = x;
}

function file(){
	var x = document.getElementById('qr-input-file').click();
	document.getElementById("qr-input-file").innerHTML = x;
}
function openInChrome() {
      var url = "http://example.com"; // Replace with your desired URL

      // Check if the browser is running on an Android device
      var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
      
      if (isAndroid) {
        var intentUrl = "intent://"+url+"#Intent;scheme=http;package=com.android.chrome;end";
        window.location.href = intentUrl;
      } else {
        window.open(url, "_blank"); // Open the URL in a new tab/window on other devices
      }
    }
