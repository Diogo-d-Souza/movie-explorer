import {
  Card,
  CardBody,
  CardHeader,
  CardImage,
  CardSubtitle,
  CardTitle,
} from '@progress/kendo-react-layout';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import IMovieDetail from '../interfaces/IMovieDetail';
import { MovieDetail } from '../utils/api';
const { VITE_IMG } = import.meta.env;

export default function MovieDetailPage() {
  const [movieDetails, setMovieDetails] = useState<IMovieDetail>();
  const imageDataUrl = `${VITE_IMG}${movieDetails?.poster_path}`;
  const { id } = useParams();

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await MovieDetail(id!);
      setMovieDetails(data);
    };
    fetchApi();
  }, [id]);

  const minutesToHours = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;
    return `${hours}h ${minutesLeft}m`;
  };

  return (
    <main
      className='flex justify-center items-center h-full w-full p-auto pt-14'
      style={{
        backgroundImage: `url(${imageDataUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <section
        className='flex justify-center items-center w-full h-full pt-8 pb-8'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      >
        <Card className='bg-zinc-900 border-slate-300 w-3/5 max-w-4xl h-full'>
          <section className='flex flex-col self-center w-1/2 gap-3 pt-4'>
            <CardImage src={imageDataUrl} />
            <span className='self-center text-gray-400'>
              "{movieDetails?.tagline}"
            </span>
          </section>
          {movieDetails && (
            <section>
              <CardHeader className='flex flex-col justify-center border-white'>
                <CardTitle className='flex flex-row text-xl font-bold text-white'>
                  <h1>{movieDetails.title}</h1>
                </CardTitle>
                <CardSubtitle
                  className='flex flex-row gap-1 text-sm text-gray-300'
                  style={{ marginTop: '-1px' }}
                >
                  <span>{movieDetails.release_date}</span>
                  {movieDetails.genres.map((genre, index) => (
                    <span key={index}>
                      {index == 0 && ' • '}
                      {genre.name}
                      {index < movieDetails.genres.length - 1 && ', '}
                    </span>
                  ))}
                  <span>
                    {' • '}
                    {minutesToHours(movieDetails.runtime)}
                  </span>
                </CardSubtitle>
              </CardHeader>
              <CardBody className='text-white '>
                <div className='flex flex-row items-center gap-1 mb-2'>
                  <FaStar color='yellow' />
                  <span className=' '>{movieDetails.vote_average}</span>
                </div>
                <p className='text-justify text-lg'>{movieDetails.overview}</p>
              </CardBody>
            </section>
          )}
        </Card>
      </section>
    </main>
  );
}
