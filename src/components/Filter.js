import React from "react"

const Filter = ({
  searchInput,
  setSearchInput,
  setFiltered,
  setCountries,
  continent,
  setContinent,
  countries
}) => {


  // Prevent page reload when submitting the form
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  // Search countries
  const searchCountries = (searchValue) => {
    setSearchInput(searchValue)

    if (searchInput) {
      const filteredCountries = countries.filter((country) => {
      const {name:{common}} = country;
      const check = new RegExp("^"+searchValue,"g");
      return common.toLowerCase().match(check)})

console.log(filteredCountries);
      setFiltered(filteredCountries);
 }
     else {
      setFiltered(countries)
    }

}

  // Filter by region
  const fetchRegions = async (region) => {
    const url = `https://restcountries.com/v3.1/region/${region}`
    const res = await fetch(url)
    const data = await res.json()
    setCountries(data)

  }
  const filterRegions = (region) => {
     if(region==="All"){
          setContinent(!continent);
    }
    else{
    fetchRegions(region);
    }
  }



  return (
    <>
      <form className="form" id="form" onSubmit={handleSubmit}>
        <input
          type="search"
          name="search"
          id="search"
          autoComplete="off"
          placeholder="Search Country"
          value={searchInput}
          onChange={(e) => searchCountries(e.target.value)}
        />

        <div className="select">
          <select
            name="select"
            id="select"
            onChange={(e) => filterRegions(e.target.value)}
          >
            <option value="All">ALL</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Americas">Americas</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </form>
    </>
  )
}

export default Filter
