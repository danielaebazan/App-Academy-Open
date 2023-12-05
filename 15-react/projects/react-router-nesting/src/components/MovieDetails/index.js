import {useParams} from 'react-router-dom';
function MovieDetails({movies}) {
  const {movieId} = useParams();
  console.log(movies, 'moId', movieId, movieId === String(movies[0].id)) ;
  let movieChoice = movies.find(mov => String(mov.id) === movieId )
  console.log('moCho', movieChoice);
  return (
    <div className='comp purple'>
      <h1>{movieChoice.title}</h1>
      <p>{movieChoice.description}</p>
    </div>
  );
}

export default MovieDetails;