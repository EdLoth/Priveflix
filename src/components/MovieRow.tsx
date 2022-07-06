import React, { useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useGetMoviesByGenderIdQuery } from '../graphql/generated';


interface MovieRowProps {
  idGender: string;
}

export function MovieRow(props: MovieRowProps) {
  const { data } = useGetMoviesByGenderIdQuery({
    variables: {
      idGender: props.idGender
    }
  })

  console.log(data)


  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  }

  const handleRigthArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    if (!data) {
      let listW = 0 * 224;
    } else {
      let listW = data.gender.movies.length * 224;
      if ((window.innerWidth - listW) > x) {
        x = (window.innerWidth - listW) - 60;
      }
    }


    setScrollX(x);
  }


  if (!data) {
    return (
      <div className="flex-1 flex justify-center">
        <h1 className="text-5xl font-bold mt-6">Carregando...</h1>
      </div>
    )
  }
  return (
    <div className="mb-7 group transition-all ">
      <h1 className="ml-8 font-bold text-3xl">Filmes de {data.gender?.nameGender}</h1>
      <div onClick={handleLeftArrow} className="absolute w-[40px] h-80  left-0 z-50 flex justify-center items-center overflow-hidden bg-bg-slate-black opacity-0 group-hover:opacity-100 cursor-pointer transition-all transition">
        <BiChevronLeft style={{ fontSize: 60 }} />
      </div>
      <div onClick={handleRigthArrow} className="absolute w-[40px] h-80  right-0 z-50 flex justify-center items-center overflow-hidden bg-bg-slate-black opacity-0 group-hover:opacity-100 cursor-pointer transition-all">
        <BiChevronRight style={{ fontSize: 60 }} />
      </div>

      <div className="overflow-x-hidden pl-4" style={{
        overflowX: 'hidden',
      }}>
        <div className="" style={{
          transition: 'all ease 0.5s',
          marginLeft: scrollX,
          width: data.gender.movies.length * 224
        }}>
          {data.gender.movies.map(movie => {
            return (
              <Link className="inline-block" to={`/player/${movie.slug}`} key={movie.id}>
                <img className="h-80 w-56 rounded-2xl transform scale-90 hover:scale-100 transition-all" src={movie.banner} alt="" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>

  );
}

