
import '@vime/core/themes/default.css'
import { gql, useQuery } from "@apollo/client";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useGetGenderMovideBySlugQuery } from '../graphql/generated';


interface VideoGenderProps {
  movieSlug: string;
}



export function VideoGender(props: VideoGenderProps) {
  const { data } = useGetGenderMovideBySlugQuery({
    variables: {
      slug: props.movieSlug
    }
  })

  console.log(data)

  return (
    <>
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-semibold text-2xl text-white">Generos:</span>
        {data?.movie?.genders.map(movieInfo => {
          return (
            <div className="bg-gradient-to-r from-[#3c0255] to-[#280936] px-2 " key={movieInfo.id}>
              <span className="text-white">{movieInfo.nameGender}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}