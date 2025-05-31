import React, { useEffect, useState } from 'react'
import "./App.css"
import axios from 'axios';
import Cards from './Component/Cards';


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;



function App() {
  const [data, setdata] = useState([]);
  const [errors, seterrors] = useState(false)
  const [loading, setloading] = useState(false)
  const [search, setsearch] = useState('')

  const Fetchdata = async (query='') => {
    
    try {
      setloading(true)
      seterrors(false)

      const movie_api = query.trim() ? 'https://api.themoviedb.org/3/search/movie'   // This api for searching Movies
                                     : 'https://api.themoviedb.org/3/movie/popular';  // And This Api for Popular Movies to fetch as a Defualt 
      const response = await axios.get(movie_api, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          ...(query.trim() ? {query}:{}),
        }
      });
      setdata(response.data.results);
      //console.log(response.data.results)
      setloading(false)

    } catch (error) {
      seterrors(true)
      console.log(error)
      setloading(false)
    }
  }
   
  // Fetch popular movies on first load
  useEffect(()=>{
    Fetchdata() 
  },[])

  // Fetch only search Movies 
  useEffect(() => {
    const time = setTimeout(() => {
     if(search.trim()){      // its option or for Better perfomance
         Fetchdata(search);
      }
      
    }, 1000);
    return () => clearTimeout(time)

  }, [search])

  return (
    <>


      <h1 className='text-center fw-bolder fs-1 mt-5'>🎬 Movie Finder using  API</h1>

      <div className="col-md-12 col-lg-12 col-sm-4 col-md-6 d-flex justify-content-center">

        {/* Search Input */}
        <input type="text" placeholder='Search' className='w-50 p-2 mt-4 '
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />

        {/* Loading Handling */}
        {loading && (
          <div className="loading-overlay d-flex justify-content-center align-items-center">
            <h4>Loading...</h4>
          </div>
        )}


        {/* Error Handling */}
        {errors && (
          <div class="error-overlay d-flex justify-content-center align-items-center">
            <h3 className='text-danger'>Something Went Wrong. Please try again...</h3>
          </div>
        )}

      </div>


      {/* Card Handling */}
      <div className="container m-auto mb-3 mt-4">

       {!loading && ! errors && data.length > 0 ? (
           <>
           <h4 className="text-center mb-4">
              {search.trim() ? `Search Results for "${search}"` :null}
            </h4>
           <div className="row row-cols-4 row-cols-md-8 row-cols-lg-12  justify-content-center">
           {data.map((Movie_card)=>(
            <Cards Movie_card={Movie_card}  key={Movie_card.id}/>
           ))}
         
        </div>
        </>
       ):( ! loading && ! errors && search.trim() && (
        <div className="d-flex justify-content-center align-items-center ">
          <h4 className='text-info m-5 '>No movies found for "{search}"!! Try Again...</h4>
        </div>
       )
       )
       }

      </div>


    </>
  )
}

export default App
