import React from 'react'
import Hero from './Hero'
import MovieRow from './MovieRow'
import endpoints from '../services/movieServices'


export default function Home() {
  return (
    <>
    <Hero />
    <MovieRow title='Peliculas populares' url={endpoints.popular} />    
    <MovieRow title='Mejores puntuadas' url={endpoints.topRated} /> 
    </>
  )
}
