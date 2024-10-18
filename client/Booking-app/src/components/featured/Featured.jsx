import React from 'react'
import '../featured/Featured.scss'
import useFetch from '../../hooks/useFetch'
const Featured = () => {


    const { data, loading, error } = useFetch("http://localhost:8800/api/hotels/countByCity?cities=berlin,madrid,london");

  
   
  return (
    <div className='featured'>
       { loading ? "loading please" : <> <div className="featuredItem">
            <img className='featuredImg'  src="https://images.pexels.com/photos/2291624/pexels-photo-2291624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="No Img" />
            <div className="featuredTitles">
                <h1>Berlin</h1>
                <h1>{data && data[0] !== undefined ? data[0] : "No data"} properties</h1> 
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="No Img" className='featuredImg' />
            <div className="featuredTitles">
                <h1>Madrid</h1>
                <h1>{data && data[1] !== undefined ? data[1] : "No data"} properties</h1> 
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="No Img" className='featuredImg' />
            <div className="featuredTitles">
                <h1>London</h1>
                <h1>{data && data[2] !== undefined ? data[2] : "No data"} properties</h1>   
            </div>
        </div> </>}
    </div>
  )
}

export default Featured