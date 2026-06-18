async function generateSong() {

  const cerita = document.getElementById("story").value.trim();

  if (!cerita) {
    alert("Silakan isi cerita terlebih dahulu");
    return;
  }

  document.getElementById("result").innerHTML =
    `<div class="loading">🎵 Sedang membuat lagu...</div>`;

  try {

    const response = await fetch(
      "https://cerita-jadi-lagu.rudycdb.workers.dev",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          cerita: cerita
        })
      }
    );

    const data = await response.json();

    if (!response.ok || data.error) {
      document.getElementById("result").innerHTML =
        `<div class="error">${data.error || "Terjadi kesalahan."}</div>`;
      return;
    }

    document.getElementById("result").innerHTML = `

      <div class="song-container">

        <div class="song-header">

          <h1>${data.judul}</h1>

          <div class="badges">

            <span class="badge">
              ${data.mood}
            </span>

            <span class="badge">
              ${data.genre}
            </span>

            <span class="badge">
              ${data.tempo}
            </span>

          </div>

        </div>

        ${section("Verse 1", data.verse1)}

        ${section("Pre-Chorus", data.prechorus)}

        ${section("Chorus", data.chorus)}

        ${section("Verse 2", data.verse2)}

        ${section("Bridge", data.bridge)}

        ${section("Chorus Hook", data.hook)}

        ${section("Outro", data.outro)}

        ${section("Caption Facebook", data.caption)}

      </div>

    `;

  } catch (error) {

    document.getElementById("result").innerHTML =
      `<div class="error">Gagal terhubung ke server.<br>${error.message}</div>`;

    console.error(error);

  }

}

function section(title, content) {

  return `
    <div class="card">

      <h3>${title}</h3>

      <div class="card-content">

        ${String(content || "").replace(/\n/g, "<br>")}

      </div>

    </div>
  `;

}
