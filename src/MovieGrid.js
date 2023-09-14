import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Input, Modal, Button, InputNumber } from 'antd'
import axios from 'axios'

const MovieGrid = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [moviePrice, setMoviePrice] = useState(0)

  console.log('data', data)
  console.log(moviePrice)

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/search/movie?api_key=3cb8f229fa3acc813c27545f21f181c9&query=a',
      )
      .then((response) => {
        setData(response.data.results)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  useEffect(() => {
    const filteredResults = data.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setSearchResults(filteredResults)
  }, [searchTerm, data])

  const handleCardClick = (movie) => {
    setSelectedMovie(movie)
    setModalVisible(true)
    setMoviePrice(0)
  }

  const handleSavePrice = () => {
    // Find the index of the selected movie in the data array
    const index = data.findIndex((movie) => movie.id === selectedMovie.id)
    if (index !== -1) {
      // Clone the data array and update the price of the selected movie
      const updatedData = [...data]
      updatedData[index] = { ...selectedMovie, price: moviePrice }
      setData(updatedData)
    }
    setModalVisible(false)
  }

  return (
    <div>
      <Input
        placeholder="Search for a movie"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        style={{ marginBottom: '20px' }}
      />
      <Row gutter={[40, 40]}>
        {searchResults.map((movie) => (
          <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
            <div onClick={() => handleCardClick(movie)}>
              <Card
                hoverable
                cover={
                  <img
                    alt={movie.title}
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  />
                }
              >
                <Card.Meta
                  title={movie.title}
                  description={movie.release_date}
                />
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={1000}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <img
              alt={selectedMovie ? selectedMovie.title : ''}
              src={`https://image.tmdb.org/t/p/w500/${
                selectedMovie ? selectedMovie.poster_path : ''
              }`}
              style={{ maxWidth: '100%' }}
            />
          </div>
          <div className="p-5">
            {selectedMovie && (
              <div>
                <p className="text-2xl font-bold pb-3">{selectedMovie.title}</p>
                <p className="text-lg font-bold">Overview</p>
                <p className="text-base">{selectedMovie.overview}</p>
                <p className="text-lg font-bold pt-3">Release date</p>
                <p className="text-base">{selectedMovie.release_date}</p>
                <div className="absolute bottom-5">
                  <p className="text-lg font-bold pb-1">
                    Price {selectedMovie.price ? selectedMovie.price : "0"} $
                  </p>
                  <InputNumber
                    placeholder="Enter the price"
                    value={moviePrice}
                    onChange={(value) => setMoviePrice(value)}
                  />
                  <Button type='primary' danger onClick={handleSavePrice}>Save Price</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default MovieGrid
