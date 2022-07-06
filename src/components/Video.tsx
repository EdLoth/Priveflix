
import '@vime/core/themes/default.css'
import { DefaultUi, Player, Video } from '@vime/react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { VideoDate } from './VideoDate';
import { VideoGender } from './VideoGenders';
import { ArrowCircleLeft } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { useGetMovieBySlugQuery } from '../graphql/generated';



interface VideoProps {
  movieSlug: string;
}

export function PlayerVideo(props: VideoProps) {
  const { data } = useGetMovieBySlugQuery({
    variables: {
      slug: props.movieSlug
    }
  })


  console.log(data)

  if (!data) {
    return (
      <div className="flex-1 flex justify-center">
        <h1 className="text-5xl font-bold mt-6">Carregando...</h1>
      </div>
    )
  }

  return (
    <div className="flex-1 flex items-center">
      <div className="bg-black mx-14 flex justify-between items-center">
        <div className="p-8  mx-auto">
            <div className="flex-1">
              <Link className="flex items-center w-40 mb-6" to="/">
              <ArrowCircleLeft size={56} color={'#9400D3'} />
              </Link>
              <h1 className="text-[40px] font-bold mb-12 w-10/12">
                {data.movie?.title}
              </h1>


              <VideoGender movieSlug={props.movieSlug} />
              <div className="flex gap-4 items-center">
                <VideoDate availableAt={new Date(data.movie?.availableAt)} />
                <span className="font-semibold">{data.movie?.duration}</span>
              </div>
              <p className="mt-4 text-gray-200 leading-relaxed text-justify w-10/12">
                <span className="font-bold text-xl">Sinopse: </span>{data.movie?.description}
              </p>

              <div className="flex items-center gap-4 mt-6">

                <div className="leading-relaxed">
                  {/* <strong className="font-bold text-2xl block">{data.movie?.directors}</strong> */}
                </div>
              </div>
            </div>
        </div>
        <div className="h-[60vh] w-full  aspect-video">
          <Player controls>
            <Video crossOrigin="" poster={data.movie?.poster}>
              {/* These are passed directly to the underlying HTML5 `<video>` element. */}
              {/* Why `data-src`? Lazy loading, you can always use `src` if you prefer.  */}
              <source
                data-src={data.movie?.videoId}
                type="video/mp4"
              />
            </Video>
            <DefaultUi />
          </Player>
        </div>
      </div>

    </div>
  )
}