document
  .getElementById("calculateButton")
  .addEventListener("click", function () {
    const ipAddress = document.getElementById("ipAddress").value;
    const ipIncrement = document.getElementById("ipIncrement").value;

    const ipResult = document.getElementById("ipResult");
    const subnetResult = document.getElementById("subnetResult");
    const wildcardResult = document.getElementById("wildcardResult");
    const networkResult = document.getElementById("networkResult");
    const broadcastResult = document.getElementById("broadcastResult");
    const hostMinResult = document.getElementById("hostMinResult");
    const hostMaxResult = document.getElementById("hostMaxResult");
    const ipAddressClassResult = document.getElementById(
      "ipAddressClassResult"
    );
    const hostsSummaryResult = document.getElementById("hostsSummaryResult"); // New element for hosts summary

    // Regular expression to match IP address format (IPv4)
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

    // Check if the input matches the IP address format
    if (!ipRegex.test(ipAddress)) {
      alert(
        "Invalid IP address format. Please use the format xxx.xxx.xxx.xxx (e.g., 192.168.1.1)"
      );
      return; // Exit the function if the format is invalid
    }

    // Regular expression to match the CIDR format (e.g., /24)
    const cidrRegex = /^\/\d{1,2}$/;

    // Check if the input matches the CIDR format
    if (!cidrRegex.test(ipIncrement)) {
      alert(
        "Invalid CIDR format. Please use the format /<prefix-length> (e.g., /24)"
      );
      return; // Exit the function if the format is invalid
    }

    // Function to calculate IP address based on CIDR increment
    function calculateIP(ip, increment) {
      const ipParts = ip.split(".");
      const incrementParts = increment.split("/");
      const subnetSize = parseInt(incrementParts[1]);
      const subnetMask = calculateSubnetMask(subnetSize);

      const networkAddress = ipParts.map(
        (octet, index) => octet & subnetMask[index]
      );
      return networkAddress.join(".");
    }

    // Function to calculate subnet mask from CIDR prefix length
    function calculateSubnetMask(prefixLength) {
      const subnetMask = [0, 0, 0, 0];
      for (let i = 0; i < prefixLength; i++) {
        const octetIndex = Math.floor(i / 8);
        const bitIndex = 7 - (i % 8);
        subnetMask[octetIndex] |= 1 << bitIndex;
      }
      return subnetMask;
    }

    // Split IP address into octets and convert to decimal
    const ipOctets = ipAddress.split(".").map(Number);

    // Calculate IP address based on CIDR increment
    const calculatedIP = calculateIP(ipAddress, ipIncrement);

    // Calculate subnet mask from CIDR prefix length
    const subnetPrefix = parseInt(ipIncrement.split("/")[1]);
    const subnetMask = calculateSubnetMask(subnetPrefix);

    // Calculate wildcard mask (inverse of subnet mask)
    const wildcardOctets = subnetMask.map((octet) => 255 - octet);

    // Calculate network address
    const networkOctets = ipOctets.map(
      (octet, index) => octet & subnetMask[index]
    );

    // Calculate broadcast address
    const broadcastOctets = ipOctets.map(
      (octet, index) => octet | wildcardOctets[index]
    );

    // Calculate host-min and host-max addresses
    const hostMinOctets = [...networkOctets];
    hostMinOctets[3] += 1; // Increment the last octet for host-min
    const hostMaxOctets = [...broadcastOctets];
    hostMaxOctets[3] -= 1; // Decrement the last octet for host-max

    // Determine IP class based on the first octet
    let ipClass;
    const firstOctet = ipOctets[0];
    if (firstOctet >= 1 && firstOctet <= 126) {
      ipClass = "A";
    } else if (firstOctet >= 128 && firstOctet <= 191) {
      ipClass = "B";
    } else if (firstOctet >= 192 && firstOctet <= 223) {
      ipClass = "C";
    } else {
      ipClass = ""; // Default class if not in A, B, or C range
    }

    // Calculate the number of hosts in the subnet
   let numberOfHosts;
    if (subnetPrefix === 32) {
    numberOfHosts = 1; // /32 represents a single host
    } else {
    numberOfHosts = 2 ** (32 - subnetPrefix) - 2; // Subtract 2 for network and broadcast addresses
    }


    // Display the results
    ipResult.textContent = calculatedIP;
    subnetResult.textContent =
      subnetMask.join(".") + " (/" + subnetPrefix + ")";
    wildcardResult.textContent = wildcardOctets.join(".");
    networkResult.textContent = networkOctets.join(".");
    broadcastResult.textContent = broadcastOctets.join(".");
    hostMinResult.textContent = hostMinOctets.join(".");
    hostMaxResult.textContent = hostMaxOctets.join(".");
    ipAddressClassResult.textContent = ipClass;
    hostsSummaryResult.textContent = numberOfHosts; // Display the number of hosts
  });

// Reset input
document.getElementById("reset").addEventListener("click", function () {
  document.getElementById("ipAddress").value = "";
  document.getElementById("ipIncrement").value = "";
  document.getElementById("ipResult").textContent = "";
  document.getElementById("subnetResult").textContent = "";
  document.getElementById("wildcardResult").textContent = "";
  document.getElementById("networkResult").textContent = "";
  document.getElementById("broadcastResult").textContent = "";
  document.getElementById("hostMinResult").textContent = "";
  document.getElementById("hostMaxResult").textContent = "";
  document.getElementById("ipAddressClassResult").textContent = "";
  document.getElementById("hostsSummaryResult").textContent = ""; // Reset the hosts summary
});

// call variable button
var imageElement = document.getElementById("logo");
imageElement.src = "img/capture.gif";

var footerElement = document.getElementById("footer");
footerElement.innerText =
  "Designed Authorized : Rudy Gunawan,ST  (CCNA,MTCRE,MTCNA).| All rights reserved. Copyright © 2023.";
