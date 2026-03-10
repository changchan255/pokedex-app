import Header from './components/Header'
import PokemonList from './components/PokemonList'
import PokemonDetail from './components/PokemonDetail'
import About from './components/About'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <BrowserRouter>
      <Header title="Pokedex" />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/my-team" element={<div>My Team Page</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
