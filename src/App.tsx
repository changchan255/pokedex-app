import Header from './components/Header'
import PokemonList from './components/PokemonList'
import PokemonDetail from './components/PokemonDetail'
import About from './components/About'
import MyTeam from './components/MyTeam'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  
  return (
    <>
    <Toaster position="top-right" />
    <BrowserRouter>
      <Header title="Pokedex" />
      <main className="p-4 bg-white dark:bg-gray-500 min-h-screen">
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/my-team" element={<MyTeam />} />
        </Routes>
      </main>
    </BrowserRouter>
    </>
  )
}

export default App
