$('.search-button').on('click', function () {
    $.ajax({
    url: 'http://www.omdbapi.com/?apikey=82824ab8&s=' + $('.input-keyword').val(),
    success: results => {
        const movies = results.Search
        console.log(movies)

        let cards = '';
        movies.forEach(m => {
            cards += 
            `<div class="col-md-4 my-3">
                <div class="card">
                <img src="${m.Poster}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                    <a href="#" class="modal-detail-button btn btn-primary" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                </div>
                </div>
            </div>`
        });
        $('.movie-container').html(cards);

        // Ketika tombol detail di-klik
        $('.modal-detail-button').on('click', function () {
            $.ajax({
                url: 'http://www.omdbapi.com/?apikey=82824ab8&i=' + $(this).data('imdbid'),
                success: (m) => {
                    const movieDetail = `
                        <div class="container-fluid">
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
                        </div>
                    `;
                    $('.modal-body').html(movieDetail);
                },
                error: (e) => {
                    console.log(e.responseText);
                }
            });
        });
    },
    error: e => {
        console.log(e.responseText)
    }
})
});


