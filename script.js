document.addEventListener("DOMContentLoaded", function () { const API_URL = "https://sheetdb.io/api/v1/xa79t46xfl9s0"; const searchInput = document.getElementById("search"); const categorySelect = document.getElementById("category"); const darkModeToggle = document.getElementById("darkModeToggle"); const channelsContainer = document.getElementById("channels");

let channels = [];

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        channels = data;
        displayChannels();
    });

function displayChannels() {
    channelsContainer.innerHTML = "";
    const filteredChannels = channels.filter(channel =>
        channel.name.toLowerCase().includes(searchInput.value.toLowerCase()) &&
        (categorySelect.value ? channel.category === categorySelect.value : true)
    );
    filteredChannels.forEach(channel => {
        const channelCard = document.createElement("div");
        channelCard.classList.add("card");
        channelCard.innerHTML = `
            <h2>${channel.name}</h2>
            <iframe src="${channel.url}" width="100%" height="200" allowfullscreen></iframe>
        `;
        channelsContainer.appendChild(channelCard);
    });
}

searchInput.addEventListener("input", displayChannels);
categorySelect.addEventListener("change", displayChannels);
darkModeToggle.addEventListener("change", function () {
    document.body.classList.toggle("dark-mode", darkModeToggle.checked);
});

});