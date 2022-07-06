import { useParams } from "react-router-dom";
import { PlayerVideo } from "../components/Video";



export function Player(){
  const { slug } = useParams<{ slug: string }>()
  return(
    <div className="flex flex-col min-h-screen mt-2">
      <main className="flex flex-1">
      {slug ?
       <PlayerVideo movieSlug={slug} /> : 
       <div className="flex-1 " />
       } 
      </main>
    </div>
  )
}