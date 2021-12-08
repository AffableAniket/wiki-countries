import React, { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import {setDetailsTheme} from "./Header";
import Filter from "./Filter"

const url = "https://restcountries.com/v3.1/all"
const Countries = () => {

  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [continent, setContinent] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

    const fetchCountries = async () => {
      const response = await fetch(url)
      const countries = await response.json()

  console.log(countries);
      setCountries(countries);
      setIsLoading(false)
    }

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    const bodyTheme = document.body.getAttribute("class");
    if(bodyTheme==="light-theme"){
    setDetailsTheme();
       }
  }, [countries])


  useEffect(() => {
    fetchCountries()
  }, [continent])



  return (
    <>
      <Filter
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setFiltered={setFiltered}
        setCountries={setCountries}
        countries={countries}
        continent={continent}
        setContinent={setContinent}
      />
      {isLoading ? (
        <h1 className="loading">Loading...</h1>
      ) : searchInput.length > 1 ? (
      <>
        <section className="countries">
          {filtered.map((country) => {
          const {name:{common},flags:{png },capital:[capitalName]=["NA"],population,region,area} = country;


            return (
               <div key={area+Math.random()*3}>
              <Link to={`/countries/${common}`} >
                <article>
                  <div className="flag">
                    <img src={png} alt={common} />
                  </div>
                  <div className="details">
                    <h4 className="country-name">
                      Name: <span>{common}</span>
                    </h4>
                    <h4>
                      Population: <span>{population}</span>
                    </h4>
                    <h4>
                      Region: <span>{region}</span>
                    </h4>
                    <h4>
                      Capital: <span>{capitalName}</span>
                    </h4>
                  </div>
                </article>
              </Link>
            </div>
            )
          })}
        </section>
     </>
      ) : (
      <>
        <section className="countries">
          {countries.map((country) => {
            const {name:{common},flags:{png },capital:[capitalName]=["NA"],population,region,area} = country;

            return (
           <div key={area+Math.random()*3}>
              <Link to={`/countries/${common}`} >
                <article>
                  <div className="flag">
                    <img src={png} alt={common} />
                  </div>
                  <div className="details">
                    <h4 className="country-name">
                      Name: <span>{common}</span>
                    </h4>
                    <h4>
                      Population: <span>{population}</span>
                    </h4>
                    <h4>
                      Region: <span>{region}</span>
                    </h4>
                    <h4>
                      Capital: <span>{capitalName}</span>
                    </h4>
                  </div>
                </article>
              </Link>
            </div>
            )
          })}
        </section>
    </>
      )}
    </>
  )
}

export default Countries
