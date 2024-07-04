const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");

const btn = document.getElementById("search-btn");
btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // Check if data is not empty and has the expected structure
            if (data && data.length > 0) {
                const wordData = data[0];
                const meanings = wordData.meanings && wordData.meanings.length > 0 ? wordData.meanings[0] : {};
                const definitions = meanings.definitions && meanings.definitions.length > 0 ? meanings.definitions[0] : {};
                const phonetics = wordData.phonetics && wordData.phonetics.length > 0 ? wordData.phonetics[0] : {};

                result.innerHTML = `
                    <div class="word">
                        <h3>${inpWord}</h3>
                        <button onclick="playSound()">
                            <i class="fas fa-volume-up"></i>
                        </button>
                    </div>
                    <div class="details">
                        <p>${meanings.partOfSpeech || ""}</p>
                        <p>/${wordData.phonetic || ""}/</p>
                    </div>
                    <p class="word-meaning">
                        ${definitions.definition || ""}
                    </p>
                    <p class="word-example">
                        ${definitions.example || "No example available"}
                    </p>`;

                if (phonetics.audio) {
                    sound.setAttribute("src", `${phonetics.audio}`);
                } else {
                    sound.removeAttribute("src");
                }
            } else {
                result.innerHTML = `<p class="word-example">No results found for "${inpWord}".</p>`;
                sound.removeAttribute("src");
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            result.innerHTML = `<p class="word-example">An error occurred while fetching the data.</p>`;
            sound.removeAttribute("src");
        });
});

function playSound() {
    if (sound.getAttribute("src")) {
        sound.play();
    } else {
        alert("No sound available for this word.");
    }
}
