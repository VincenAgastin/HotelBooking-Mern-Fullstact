import React from 'react'
import '../featuredProperties/FeaturesProperties.scss'
import useFetch from '../../hooks/useFetch';
const FeaturesProperties = () => {


  const { data, loading, error } = useFetch("http://localhost:8800/api/hotels?featured=true&limit=3");


  return (
    <div className='fp'>
      {loading ? "Loading..." : <>
      {data.map((item,i)=>(

        <div className="fpItem" key={item._id}>
  <img
    src={item.photos[0]}
    alt="No Img"
    className="fpImg"
    />
  <span className="fpName">{item.name}</span>
  <span className="fpCity">{item.city}</span>
  <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
  {item.rating && <div className="fpRating">
    <button>{item.rating}</button>
    <span>Excellent</span>
  </div>}
</div>
    )) }
</>}


    </div>
  )
}

export default FeaturesProperties