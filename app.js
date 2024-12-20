const gameApiHost = 'free-to-play-games-database.p.rapidapi.com';
const gameApiKey = 'f5e35fd318msh64fc6cd9e144f9ep1d857ajsnde0fe25b7fb7';


function loadGames(category) {
    const url = `https://${gameApiHost}/api/games?category=${category}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': gameApiKey,
            'x-rapidapi-host': gameApiHost
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(games => displayGameList(games))
        .catch(error => console.error('Error fetching games:', error));
}

function displayGameList(games) {
    const gameCategoriesSection = document.getElementById('game-categories');
    gameCategoriesSection.innerHTML = '';

    games.slice(0, 8).forEach(game => {
        const gameCard = `
            <div class="col-12 col-md-4">
                <div class="game-card h-100" data-id="${game.id}">
                    <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}">
                    <h5 class="card-title">${game.title}</h5>
                    <p class="card-text">${game.short_description}</p>
                    <button class="btn btn-primary view-details-btn" onclick="viewGameDetails(${game.id})">View Details</button>
                </div>
            </div>
        `;
        gameCategoriesSection.innerHTML += gameCard;
    });
}


function viewGameDetails(gameId) {
    const url = `https://${gameApiHost}/api/game?id=${gameId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': gameApiKey,
            'x-rapidapi-host': gameApiHost
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(game => {
            const gameDetailsSection = document.getElementById('game-details');
            gameDetailsSection.style.display = 'block';
            document.getElementById('game-detail-content').innerHTML = `
                <h3>${game.title}</h3>
                <p>Category: ${game.genre}</p>
                <p>Platform: ${game.platform}</p>
                <p>Status: ${game.status}</p>
                <p>${game.description}</p>
                <a href="${game.game_url}" target="_blank" class="btn btn-success">Play Now</a>
            `;
        })
        .catch(error => console.error('Error fetching game details:', error));
}


loadGames('shooter');









