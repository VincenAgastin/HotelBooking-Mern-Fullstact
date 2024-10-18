import React from 'react'
import '../propertyList/PropertyList.scss'
import useFetch from '../../hooks/useFetch';
const PropertyList = () => {


    const { data, loading, error } = useFetch("http://localhost:8800/api/hotels/countByType");

    const images=[
        "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://img.freepik.com/free-photo/3d-house-model-with-modern-architecture_23-2151004030.jpg?t=st=1725336459~exp=1725340059~hmac=f41b9514ecfc92050c0757f26854592dfe456829eb4893d131ff7787039dd4fc&w=900",
        "https://img.freepik.com/free-photo/house-boat_1353-176.jpg?t=st=1725336656~exp=1725340256~hmac=1e52cf8521f3669efd8844e2982b88cb60fa06a89166bd2c1459e6a49aa9ba7c&w=900",
        "https://img.freepik.com/free-photo/house-boat_1353-176.jpg?t=st=1725336656~exp=1725340256~hmac=1e52cf8521f3669efd8844e2982b88cb60fa06a89166bd2c1459e6a49aa9ba7c&w=900",
        "https://img.freepik.com/free-photo/luxurious-villa-with-modern-architectural-design_23-2151694124.jpg?t=st=1725336746~exp=1725340346~hmac=38fbf4f849d03b5216816fccbc92dc41196cd410d0ca00d09f6cba87b7e73515&w=900",
    ]

  return (
    <div className='pList'>
       {loading ? "Loading..." : <> 
       {data && images.map((img,i) =>(

           <div className="pListItem" key={i}>
            <img className='pListImg' src={img} alt="No img" />
            <div className="pListTitles">
                <h1>
                    {data[i]?.type}
                </h1>
                <h2>{data[i]?.count} {data[i]?.type}</h2>
            </div>
        
       
        </div>
        ))  }
        </>}
       
    </div>
  )
}

export default PropertyList