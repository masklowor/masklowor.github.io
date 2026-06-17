from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
from dotenv import load_dotenv
import os
import json
import re

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():

    try:

        data = request.get_json()

        cerita = data.get("cerita", "").strip()

        if not cerita:
            return jsonify({
                "error": "Silakan masukkan cerita terlebih dahulu."
            })

        prompt = f"""
Anda adalah pencipta lagu profesional Indonesia.

Kembalikan HASIL DALAM JSON VALID.

JANGAN gunakan markdown.
JANGAN gunakan ```json.

Format JSON:

{{
"judul":"",
"mood":"",
"genre":"",
"tempo":"",
"verse1":"",
"prechorus":"",
"chorus":"",
"verse2":"",
"bridge":"",
"hook":"",
"outro":"",
"caption":""
}}

ATURAN:

- Jangan menceritakan ulang cerita.
- Fokus pada emosi.
- Maksimal 6-8 kata per baris.
- Mudah dinyanyikan.
- Chorus harus mudah diingat.
- Bahasa Indonesia yang puitis.
- Cocok untuk Pop Akustik.
- Setiap baris lirik HARUS dipisahkan dengan karakter \\n
- Verse 1 = 4 baris
- Pre-Chorus = 2 baris
- Chorus = 4 baris
- Verse 2 = 4 baris
- Bridge = 2 baris
- Chorus Hook = 2 baris
- Outro = 2 baris

CERITA:

{cerita}
"""

        response = model.generate_content(prompt)

        hasil = response.text.strip()

        hasil = re.sub(r"```json", "", hasil)
        hasil = re.sub(r"```", "", hasil)

        lagu = json.loads(hasil)

        return jsonify(lagu)

    except Exception as e:

        return jsonify({
            "error": str(e)
        })


if __name__ == "__main__":
    app.run(debug=True)