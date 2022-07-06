import { Route, Routes } from "react-router-dom";
import { Player } from "./pages/Player";
import {Home } from './pages/Home'
export function Router(){
  return(
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/player/:slug" element={<Player />}/>

    </Routes>
  )
}