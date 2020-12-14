import React , {useEffect , useState} from 'react'
import { API_URL , API_KEY , IMAGE_URL} from "../../Config"
import MainImage from '../LandingPage/Sections/MainImage'
import {Descriptions , Button , Row} from 'antd';
import Favorite from './Sections/Favorite';

import GridCard from '../LandingPage/Sections/GridCard'

function MovieDetailPage(props) {
    const movieId = props.match.params.movieId
    const [Movie , setMovie] = useState([])
    const [Crews , setCrews] = useState([])
    const [ActorToggle ,setActorToggle] = useState(false)

    useEffect(() =>{

        // to get the Movie Id of a particular movieId
     

        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&languages=en=US`)
            .then(response => response.json())
            .then(response =>{

                setMovie(response)

                // Crew Info 
                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                .then(response => response.json())
                .then(response =>{ 
                    setCrews(response.cast)
                })

            })

    }, [])

    const handleClick = () => {

        setActorToggle(!ActorToggle)
    }

    return(

        <div>
            {Movie[0] &&
            <MainImage image={`${IMAGE_URL}w1280${Movie[0].backdrop_path && Movie[0].backdrop_path}` }
             title={Movie[0].original_title}  text={Movie[0].overview}/>  
            }
            
       

  <div style ={{ width: '85%' , margin: '1rem auto'}} >
        <div style ={{ display: 'flex' , justifyContent: 'flex-end'}}>
           <Favorite  userFrom={localStorage.getItem('userId')} movieId={movieId} movieInfo={Movie}/>  
        </div>
  {/* Movie Info table  */}

    <Descriptions title="Movie Info" bordered>
        <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
        <Descriptions.Item label="release_date">{Movie.release_date}</Descriptions.Item>
        <Descriptions.Item label="revenue">{Movie.revenue}</Descriptions.Item>
        <Descriptions.Item label="runtime">{Movie.runtime}</Descriptions.Item>
        <Descriptions.Item label="vote_average" span={2}>
        {Movie.vote_average}
        </Descriptions.Item>
        <Descriptions.Item label="vote_count">{Movie.vote_count}</Descriptions.Item>
        <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>
        <Descriptions.Item label="popularity">{Movie.popularity}</Descriptions.Item>
    </Descriptions>
            
         <br /><br />   
        <div style ={{ display: 'flex' , justifyContent: 'center'}} >
            <Button onClick={handleClick}>Toggle ACTOR</Button>
        </div>
    
    {/* GRID CARD FOR CREW INFO */}

    { ActorToggle &&
    <Row gutter={[16,16]}>
    {Crews && Crews.map((crew,index) =>(
        <React.Fragment key={index}>
            
           {crew.profile_path &&
            <GridCard  
            actor image={`${IMAGE_URL}w500${crew.profile_path}`}
            />
            }
        </React.Fragment>

    ))}
</Row>
    
    }
    
    </div>

    
    </div>
    )
}

export default MovieDetailPage