import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import "../country.css"

const Country = () => {
  const [country, setCountry] = useState([])
  const [flagImg, setFlagImg] = useState([])
  const [flag,setFlag] = useState(false)
  const { name } = useParams()
  let language="";
  let money="";
  let fiat = [];
  let borderFlag = [];

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      )
      const current = await response.json()
      setCountry(current);
      console.log(current);
    }

    fetchCountryData()
  }, [name])

  const setBorderFlag = () => {
   var flagLink = [];
         const flagApiCall = async (flagCodes) => {
               const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${flagCodes}`)
                 const current = await response.json()
                   console.log(current)

                   current.forEach((f) => {const {flags:{png}}=f;flagLink.push(png)});
                    // const set = await setFlag(flagLink);
               if(!flag){
                 setFlag(true);
                     console.log();
                      setFlagImg(flagLink.sort());

                        }


        }

    console.log("Hello from the border flag");
      console.log(borderFlag);
         flagApiCall(borderFlag.toString())
  }

  return (
    <>
      <section>
        <Link to="/" className="btn btn-light">
          <i className="fas fa-arrow-left"></i> Back Home
        </Link>
        </section>

        {country.map((c) => {
          const {
            area,
            flags:{png},
            name:{common,official},
            population,
            region,
            subregion,
            capital:[central]=["NA"],
            currencies=[""],
            languages=["NA"],
            borders=["NA"],
          } = c
     for(let type in languages){language += languages[type]+","}
    if(money.length==0){ for(let x in currencies){if(money.length==0){money += x+""}}
for(let [key,value] of Object.entries(currencies[money])){ fiat.push(`${value}`);}
   }
console.log(fiat);


     if(borders.length>=1){
        borderFlag = borders.map((flag) => {return flag.toLowerCase()});
        setBorderFlag();
     }
console.log(fiat);

          return (
            <article className="country-wrap" key={Math.floor(area*3)}>
              <div className="country-inner-wrap">
                <div >
                  <img src={png} alt={common} />
                </div>

                <div >
                  <div className="country-details-wrap">
                    <h2 className="country-name">{common}</h2>
                    <h5>
                      Official Name: <span>{official}</span>
                    </h5>
                    <h5>
                      Population: <span>{population}</span>
                    </h5>
                    <h5>
                      Region: <span>{region}</span>
                    </h5>
                    <h5>
                      Sub Region: <span>{subregion}</span>
                    </h5>
                    <h5>
                      Capital: <span>{central}</span>{" "}
                    </h5>
                  </div>

                  <div>
                    <h5>
                      Currencies: <span>{fiat[0]}</span>
                    </h5>
                    <h5>
                      Languages: <span>{language}</span>
                    </h5>
                  </div>
                </div>
              </div>

              <div>
                <h3>Border Countries: </h3>
                <div className="borders">
                   <div>
                  {borders.map((border) => {
                    return (
                      <ul key={border}>
                        <li>{border}</li>
                      </ul>
                    )
                  })}
                     </div>
                     <div>
                  {(flagImg.length>=1)&&flagImg.map((link) => {
                          return <img className="border-flag" src={link}/>
                       })}
                       </div>

                </div>
              </div>
            </article>
          )
        })}

    </>
  )
}

export default Country
