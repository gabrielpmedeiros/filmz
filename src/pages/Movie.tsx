import { FiLink, FiPlus, FiCameraOff, FiCheck } from 'react-icons/fi';
import { Button } from '../components/Button';
import { ButtonVariants } from '../components/Button/types';
import * as Styles from '../styles/pages/Movie';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { IMovieRequestProps } from '../interface/Movie';
import { Loading } from '../components/Loading';
import { useWishList } from '../hooks/WishList';


export function Movie () {

    const { isMovieInWishList, handleAddOrRemoveMovieOnWishList } = useWishList();

    const { id }= useParams();


    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState<IMovieRequestProps>({} as IMovieRequestProps);

    const currentUrl = window.location.href;

    const movieYearRelease = movie && new Date(movie.release_date).getFullYear();
    const movieHours = movie && Number(Math.trunc(movie.runtime / 60).toFixed(0));
    const movieMinutes = movie && movieHours && (movie.runtime-movieHours*60).toFixed(0);

    const [isLinkCopiedToClipboard, setisLinkCopiedToClipboard] = useState(false);

    function handleCopyToClipboard() {
        setisLinkCopiedToClipboard(true);

        navigator.clipboard.writeText(currentUrl);
    }

    useEffect(() =>{
        if (isLinkCopiedToClipboard) {
            setTimeout(() => {
                setisLinkCopiedToClipboard(false);
            }, 2500)
        }
    }, [isLinkCopiedToClipboard]);

    useEffect(() =>{
        api.get<IMovieRequestProps>(`/movie/${id}`).then((response) =>{
            setMovie(response.data);
        }).finally(() =>{
            setIsLoading(false);
        });
    }, [id])

    return (
        <Styles.Container>
        {isLoading ? (
            <div className="loading-wrapper">
                <Loading/>
            </div>
        ): (
            <section id="presentation">
            <div className="movie-poster-wrapper">
                {movie?.poster_path ? (
                    <a href={movie?.homepage} target="_blank">
                        <img 
                    src={`${import.meta.env.VITE_THE_MOVIE_DB_IMAGES_URL}${movie?.poster_path}`} 
                    alt={`Capa do filme ${movie?.title}`} />
                    </a>
                ) : (
                    <>
                    <FiCameraOff />
                    <p>Capa indisponível</p>
                    </>
                )}
            </div>

            <div className="about">
                <div>
                    {/* titulo do filme */}
                    <a href={movie?.homepage} target="_blank">
                    <h1>{movie?.title}</h1>
                    </a>
                    

                    <h4>
                        {/* generos do filme */}
                        {movie?.genres.map((genre) => genre.name).toString().replaceAll(',',', ')}
                        <span>•</span>
                        {/* ano de lançamento */}
                        {movieYearRelease}
                        <span>•</span>
                        {/* duração do filme (horas e minutos) */}
                        {`${movieHours}h `}
                        {movieMinutes}m
                        <span>•</span>
                    </h4>

                    <p>{movie?.overview}</p>
                </div>
                <footer>
                <p>Avaliação geral:<span>{movie?.vote_average.toFixed(1)}</span></p>
                    <p>
                        Número de votos: <span>{movie?.vote_count}</span>
                    </p>
                <div className="actions">
                    <Button 
                    variant={ButtonVariants.Secondary}
                    onClick={handleCopyToClipboard}
                    disabled={isLinkCopiedToClipboard}
                    >
                        {isLinkCopiedToClipboard ? (
                            <>
                            Link copiado
                            <FiCheck />
                            </>
                        ) : (
                            <>
                        Copiar link
                        <FiLink />
                        </>
                        )}
                        
                    </Button>

                    <Button 
                    type="button" 
                    variant={ButtonVariants.Secondary}
                    onClick={() => handleAddOrRemoveMovieOnWishList(movie)}
                    >
                        {isMovieInWishList(movie.id) ? (
                            <>
                            Em sua lista
                            <FiCheck />
                            </>
                        ): (
                            <>
                            Adicionar à minha lista
                            <FiPlus />
                            </>
                        )}
                        
                    </Button>
                </div>
            </footer>
            </div>
            
        </section>
        )}
        
        </Styles.Container>
    );
}