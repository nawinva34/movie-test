import React, { useState } from 'react'
import MovieGrid from './component/MovieGrid'
import Navbar from './component/Navbar'
import ContentLayout from './component/ContentLayout'

function App() {
  const [cart, setCart] = useState([])


  return (
    <div className="App">
      <Navbar cart={cart} setCart={setCart}/>
      <ContentLayout>
        <MovieGrid cart={cart} setCart={setCart} />
      </ContentLayout>
    </div>
  )
}

export default App
