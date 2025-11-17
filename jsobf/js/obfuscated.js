const appElement = document.getElementById('app');

/* ============================================================
   Utility Functions
============================================================ */

// Random variable name generator
function randomVar(len = 12){
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let name = "";
    for(let i=0;i<len;i++) name += chars[Math.floor(Math.random()*chars.length)];
    return name;
}

// XOR encryption
function xorEncrypt(str, key){
    return str.split("").map((c,i)=> 
        c.charCodeAt(0) ^ key.charCodeAt(i % key.length)
    ).join(",");
}

// XOR decoder template (tanpa eval)
function xorDecoder(varCipher, varKey){
return `
(function(){
    const data = ${varCipher}.split(",").map(Number);
    const key = "${varKey}";
    let out = "";
    for(let i=0;i<data.length;i++){
        out += String.fromCharCode(data[i] ^ key.charCodeAt(i % key.length));
    }
    return out;
})()
`;
}

// Anti debugger
function antiDebug(){
return `
(function(){
    function block(){
        debugger;
        setTimeout(block, 10);
    }
    block();
})();
`;
}

/* ============================================================
   MAIN OBFUSCATOR (GitHub Safe Version)
============================================================ */
function obfuscate(){
    let code = document.getElementById("input").value;
    if(!code.trim()) { alert("Kode tidak boleh kosong!"); return; }

    let output = "";
    let kCode = code;

    // Base64
    let base = btoa(unescape(encodeURIComponent(kCode)));

    // Double Base64 option
    if(document.getElementById("double").checked){
        base = btoa(base);
    }

    // XOR Encrypt option
    let useXor = document.getElementById("xor").checked;
    let key = randomVar(8);
    let encrypted = "";

    if(useXor){
        encrypted = xorEncrypt(base, key);

        const vCipher = randomVar();
        const vKey = randomVar();

        output += `
var ${vCipher} = "${encrypted}";
var ${vKey} = "${key}";
(new Function(atob(${xorDecoder(vCipher, vKey)})))();
`;
    } else {
        // GitHub-safe executor (tanpa eval)
        output += `(new Function(atob("${base}")))();`;
    }

    // Anti debugger
    if(document.getElementById("anti").checked){
        output = antiDebug() + output;
    }

    document.getElementById("output").value = output;
}

/* ============================================================
   FILE DOWNLOAD
============================================================ */
function downloadFile(){
    const content = document.getElementById("output").value;
    if(!content.trim()) { alert("Generate dulu!"); return; }

    const blob = new Blob([content], {type:"text/javascript"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "obfuscated.js";
    link.click();
}

/* ============================================================
   DATE–TIME AUTO UPDATE (safe)
============================================================ */
function updateDateTime() {
  const el = document.getElementById('dateTime');
  if (!el) return;

  const now = new Date();
  const options = {
    weekday: 'long',
    year   : 'numeric',
    month  : 'long',
    day    : 'numeric',
    hour   : '2-digit',
    minute : '2-digit',
    second : '2-digit'
  };

  el.textContent = now.toLocaleString('id-ID', options);
}

if (document.getElementById('dateTime')) {
    setInterval(updateDateTime, 1000);
    updateDateTime();
}

/* ============================================================
   STATIC ELEMENT INIT (safe)
============================================================ */
const logo = document.getElementById('logo');
if (logo) logo.src = './img/capture.gif';

const footer = document.getElementById('footer');
if (footer)
    footer.innerText = 'Designed Authorized : Rudy Gunawan,ST (CCNA,MTCRE,MTCNA). | All rights reserved. Copyright © 2023.';
