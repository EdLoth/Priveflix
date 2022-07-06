import { Logo } from "./Logo";
import { FaGooglePlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Header(){
  const [scroll, setScroll] = useState(false)

  useEffect(() =>{
    const ScrollList = () => {
      if(window.scrollY > 10){
          setScroll(true)
      }else {
        setScroll(false)
      }
    }

    window.addEventListener('scroll', ScrollList)
    return () => {
      window.removeEventListener('scroll', ScrollList)
    }
  }, []);

  return(
    <header className={scroll ? 'w-full py-5 flex items-center justify-center bg-gray-700 border-b border-gray-600 fixed z-30' : 'w-full py-5 flex items-center justify-center bg-transparent  fixed z-30'}>
      
      <div className="w-full mx-8 flex flex-row justify-between items-center">
        <div className="flex flex-row">
        <FaGooglePlay size={35} color='#9400D3'/>
        <span className="text-white text-3xl px-2">Prive<span className="font-bold text-[#9400D3]">Flix</span></span>
        </div>

        <div className="flex flex-row">
            <Link className="text-white text-xl px-2" to="/">Inicio</Link>
            <Link className="text-white text-xl px-2" to="/">Séries</Link>
            <Link className="text-white text-xl px-2" to="/">Filmes</Link>
            <Link className="text-white text-xl px-2" to="/">Minha Lista</Link>
            <Link className="text-white text-xl px-2" to="/">Perfil</Link>
        </div>
      </div>
     
    </header>
  )
}