import { useState } from 'react'
import { guitarParts, getGuitarMessage } from './guitarData'
import './App.css'

function App() {
const [guitarName, setGuitarName] = useState('')

return (
<main className="container">
<header className="hero">
<h1>Custom Guitar Builder</h1>
<p>
Design your dream guitar by exploring different
parts, styles, and sounds.
</p>
</header>

  <section className="builder">
    <h2>Build Your Dream Guitar</h2>

    <p>
      Create a guitar that matches your personal style
      and the sound you want to play.
    </p>

    <label htmlFor="guitarName">Name your guitar:</label>

    <input
      id="guitarName"
      type="text"
      placeholder="Enter a guitar name"
      value={guitarName}
      onChange={(event) => setGuitarName(event.target.value)}
    />

    <p className="message">
      {getGuitarMessage(guitarName)}
    </p>

    <h3>Explore Guitar Parts</h3>

    <div className="parts-grid">
      {guitarParts.map((part) => (
        <article className="part-card" key={part.name}>
          <h4>{part.name}</h4>
          <p>{part.description}</p>
        </article>
      ))}
    </div>
  </section>

  <footer>
    <p>Custom Guitar Builder | Design Your Sound</p>
  </footer>
</main>

)
}

export default App