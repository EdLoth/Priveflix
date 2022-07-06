import { Link } from "react-router-dom";
import { Header } from "../components/Header";

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { useState } from "react";
import { FaGooglePlay } from "react-icons/fa";
import { MovieRow } from "../components/MovieRow";
import { useGetTitleMovieQuery } from "../graphql/generated";


export function Home() {
  const { data } = useGetTitleMovieQuery()

  const [scrollX, setScrollX] = useState(-400);

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
      let listW = data.movies.length * 224;
      if ((window.innerWidth - listW) > x) {
        x = (window.innerWidth - listW) - 60;
      }
    }
    
    setScrollX(x);
  }


  if (!data) {
    return (
      <div className="flex-1 bg-black h-screen w-full absolute flex justify-center">
        <div className="flex flex-row items-center justify-center ">
          <FaGooglePlay size={65} color='#9400D3' />
          <span className="text-white font-semibold text-6xl px-2">Prive<span className="font-bold text-[#9400D3]">Flix</span></span>
        </div>
      </div>
    )
  }
  return (
    <div className="flex-1 bg-gray-900 " id="fadeIn">
      <Header />
      <div className="flex flex-row flex-wrap  pt-28">
        <div className="mb-7 group transition-all ">
          <h1 className="ml-8 font-bold text-3xl">Adicionados Recentemente</h1>
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
              width: data.movies.length * 224
            }}>
              {data.movies.map(movie => {
                return (
                  <Link className="inline-block" to={`/player/${movie.slug}`} key={movie.id}>
                    <img className="h-80 w-56 rounded-2xl transform scale-90 hover:scale-100 transition-all" src={movie.banner} alt="" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <MovieRow idGender={'cl4rfs4re7o8h0bkgsto48vgl'} />
          <MovieRow idGender={'cl4rft3z87olb0bkg14o18uog'} />
          <MovieRow idGender={'cl4ro61ina8ot0bkgs8lqcci5'} />
          <MovieRow idGender={'cl4rfxf347n5q0dkdddajgcm3'} />
          <MovieRow idGender={'cl4ro6j0xa6bu0dkdu0dn4kk9'} />



        </div>

      </div>
    </div>
  )
}