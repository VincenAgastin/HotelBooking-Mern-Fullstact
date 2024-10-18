import React, { useContext, useState } from 'react';
import '../hotel/Hotel.scss';
import { IoLocationSharp } from "react-icons/io5";
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import MailList from '../../components/mailList/MailList';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../components/context/SearchContext';

const Hotel = () => {
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    
    const handleImg = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handlemove = (direction) => {
        let newSlideNumber;
        if (direction === 'l') {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }
        setSlideNumber(newSlideNumber);
    };

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const { data, loading } = useFetch(`http://localhost:8800/api/hotels/find/${id}`);
    const { dates } = useContext(SearchContext);

    // Ensure dates are defined and valid
    if (!dates || dates.length === 0) {
        return <div>No dates selected. Please select your dates.</div>; 
    }

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const startDate = new Date(dates[0].startDate);
    const endDate = new Date(dates[0].endDate);
    
    const dayDifference = (date1, date2) => {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    };

    const days = dayDifference(endDate, startDate); 

    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ? "Loading..." : (
                <div className="hotelContainer">
                    {open && (
                        <div className="sliderContainer">
                            <MdCancel className='close' onClick={() => setOpen(false)} />
                            <FaArrowAltCircleLeft className='arrow' onClick={() => handlemove('l')} />
                            <div className="sliderWrapper">
                                <img src={data.photos[slideNumber]} alt="No Img" className='sliderImg' />
                            </div>
                            <FaArrowAltCircleRight className='arrow' onClick={() => handlemove('r')} />
                        </div>
                    )}
                    <div className="hotelWrapper">
                        <button className='bookNow'>Reserve or Book Now!</button>
                        <h1 className="hotelTitle">{data.name}</h1>
                        <div className="hotelAddress">
                            <IoLocationSharp />
                            <span>{data.address}</span>
                        </div>
                        <span className="hotelDistance">
                            Excellent location - {data.distance}m from center
                        </span>
                        <span className="hotelPriceHighlight">
                            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                        </span>
                        <div className="hotelImages">
                            {data.photos?.map((photo, i) => (
                                <div className="hotelImgWrapper" key={i}>
                                    <img onClick={() => handleImg(i)} src={photo} alt="No Img" className='hotelImg' />
                                </div>
                            ))}
                        </div>
                        <div className="hotelDetails">
                            <div className="hotelDetailsTexts">
                                <h1 className="hotelTitle">{data.title}</h1>
                                <p className="hotelDesc">{data.desc}</p>
                            </div>
                            <div className="hotelDetailsPrice">
                                <h1>Perfect for a {days}-night stay!</h1>
                                <span>Located in the real heart of Krakow, this property has an excellent location score of 9.8!</span>
                                <h2><b>${data.cheapestPrice * days}</b> ({days} nights)</h2>
                                <button>Reserve or Book Now!</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <MailList />
            <div className='footer'>
                <div className="fLists" style={{ display: "flex", flexDirection: "row" }}>
                    <ul className="fList">
                        <li className="fListItem">Countries</li>
                        <li className="fListItem">Region</li>
                        <li className="fListItem">Cities</li>
                        <li className="fListItem">Districts</li>
                        <li className="fListItem">Airports</li>
                        <li className="fListItem">Hotels</li>
                    </ul>
                    {/* Other lists... */}
                </div>
                <div className="fText">Copyright © 2024 TripyBooking</div>
            </div>
        </div>
    );
}

export default Hotel;
