import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Countries from './components/Countries'
import Country from './components/Country'

function App() {
  return (
    <Router>
      <>
        <Header />
        <Route exact path="/">
          <Countries />
        </Route>
        <Route path="/countries/:name" children={<Country />}></Route>
         <Footer />
      </>
    </Router>
  )
}

export default App
