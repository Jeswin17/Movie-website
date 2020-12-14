import React , {useEffect , useState} from 'react'
import axios from 'axios';


function Favorite(props){

    const [FavoriteNumber , setFavoriteNumber] = useState(0)
    const [ Favorited , setFavorited] = useState(false)
    useEffect(() =>{

        const variable  = {
            userFrom: props.userFrom,
            movieId: props.movieId,
            movieTitle: props.movieInfo.original_title,
            movieImage: props.movieInfo.backdrop_path,
            movieRunTime: props.movieInfo.runtime
        }

        axios.post('/api/favorite/favoriteNumber', variable)
            .then(response =>{
                if(response.data.success){
                    setFavoriteNumber( response.data.favoriteNumber )
                } else{
                    alert('Failed to get the Favorite Number')
                }
            })

            // API to get favorite
        axios.post('/api/favorite/favorited', variable)
            .then(response =>{
                if(response.data.success){
                    setFavorited( response.data.favorited )
                } else{
                    alert('Failed to get the Favorite Info');
                }
            })
    }, [])
    return(
        <div>
             <button >{Favorited ? "remove from favorite " : "add to favorite"}{FavoriteNumber}</button>
        </div>
    )
}

export default Favorite;