import Header from './components/Header'
import PokemonList from './components/PokemonList'

function App() {
  
  return (
    <>
      <Header title="Pokedex" />
      <main className="p-4">
        <PokemonList />
      </main>
    </>
  )
}

export default App
