import React from 'react'
import MovieGrid from './MovieGrid'
import Navbar from './component/Navbar'
import ContentLayout from './component/ContentLayout'

function App() {
  return (
    <div className="App">
      <Navbar />
      <ContentLayout>
        <MovieGrid />
      </ContentLayout>
    </div>
  )
}

export default App
