import React , {useEffect} from 'react'

function MovieDetailPage() {

    useEffect(() =>{

        // to get the Movie Id of a particular movieId
        const movieId = props.match.params.movieId

        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&languages=en=US`)
            .then()

    }, [])


    return(

        <div>

            
        </div>
    )
}

export default MovieDetailPage