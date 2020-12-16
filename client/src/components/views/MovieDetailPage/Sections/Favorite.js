import React , {useEffect , useState} from 'react'
import axios from 'axios';
import { Button } from 'antd';

function Favorite(props){

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)


    const variable  = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime
    }
    const raiseInvoiceClicked = () => {
        const url = 'https://www.gv.com.sg/GVBuyTickets#/';
        window.open(url, '_blank');
    }
    const onClickFavorite = () => {
        if(Favorited) {
// if already aDDED
                axios.post('/api/favorite/removeFromFavorite', variable)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber( FavoriteNumber - 1)
                        setFavorited(!Favorited)
                }
                else{
                    alert('Failed to remove from  Favorite')

                }

                })
        } else {

            axios.post('/api/favorite/addToFavorite', variable)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber( FavoriteNumber + 1)
                    setFavorited(!Favorited)
            }
            else{
                alert('Failed to get the Favorite')

            }

            })
        }
    }

    useEffect(() =>{

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
             <button onClick={onClickFavorite} >{Favorited ? "remove from favorite " : "add to favorite"} {FavoriteNumber}</button>
             <button  onClick={raiseInvoiceClicked}>BUY TICKETS</button>
        </div>
    )
}

export default Favorite;