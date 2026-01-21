const searchBtn = document.querySelector('.search-button')
searchBtn.addEventListener('click',async function () { 
    const inputKeyword = document.querySelector('.input-keyword')
    const movies = await getMovies(inputKeyword.value)
    updateUI(movies)
    
})

// Keyword input
async function getMovies(keyword) {
    const response = await fetch('http://www.omdbapi.com/?apikey=82824ab8&s=' + keyword)
    const data = await response.json()
    return data.Search
}


// Show Cards
function updateUI(movies) {
    let cards = ''
    movies.forEach(m => cards += showCards(m))
    const movieContainer = document.querySelector('.movie-container')
    movieContainer.innerHTML = cards;
}

function showCards(m) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                <img src="${m.Poster}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                    <a href="#" class="modal-detail-button btn btn-primary" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                </div>
                </div>
            </div>`
}


///////////////////////////////////////////////////////////////////////////////////////////   

document.addEventListener('click',async function (e) {
    if(e.target.classList.contains('modal-detail-button')){
        const imdbid = e.target.dataset.imdbid
        const movieDetail = await getMovieDetail(imdbid)
        updateUIDetail(movieDetail)
    }
})

function getMovieDetail (imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=82824ab8&i=' + imdbid)
        .then(response => response.json())
        .then(m => m)
}

function updateUIDetail (m) {
    const movieDetail = showMovieDetail(m)
    const modalBody = document.querySelector('.modal-body')
    modalBody.innerHTML = movieDetail;
}


// Show Detail
function showMovieDetail(m) {
    return `<div class="container-fluid">
              <div class="row">
                <div class="col-md-4">
                  <img src="${m.Poster}" class="img-fluid">
                </div>
                <div class="col-md-8">
                  <ul class="list-group">
                    <li class="list-group-item"><h3>${m.Title}</h3></li>
                    <li class="list-group-item">Released: ${m.Released}</li>
                    <li class="list-group-item">Genre: ${m.Genre}</li>
                    <li class="list-group-item">Director: ${m.Director}</li>
                    <li class="list-group-item">Actors: ${m.Actors}</li>
                    <li class="list-group-item">Plot: ${m.Plot}</li>
                  </ul>
                </div>
              </div>
            </div>`
}