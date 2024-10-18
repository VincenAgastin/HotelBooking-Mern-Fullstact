import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import '../lists/List.scss';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';

const List = () => {
  const location = useLocation();

  // Initialize states
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  // Toggle date picker visibility
  const handleDate = () => {
    setOpenDate(!openDate);
  };

  // Fetch data using custom hook
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/hotels?city=${destination}&min=${min || 1}&max=${max || 999}`
  );

  // Re-fetch data when search button is clicked
  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="isItem">
              <label>Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)} 
                placeholder={destination}
              />
            </div>
            <div className="isItem">
              <label>Check-in Date</label>
              <span onClick={handleDate}>
                {`${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(
                  dates[0].endDate,
                  'dd/MM/yyyy'
                )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="isOptionItem">
                  <span className="isOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="isOptionInput"
                  />
                </div>
                <div className="isOptionItem">
                  <span className="isOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="isOptionInput"
                  />
                </div>
                <div className="isOptionItem">
                  <span className="isOptionText">Adult</span>
                  <input
                    type="number"
                    className="isOptionInput"
                    min={1}
                    placeholder={options.adult}
                  />
                </div>
                <div className="isOptionItem">
                  <span className="isOptionText">Children</span>
                  <input
                    type="number"
                    className="isOptionInput"
                    min={0}
                    placeholder={options.children}
                  />
                </div>
                <div className="isOptionItem">
                  <span className="isOptionText">Room</span>
                  <input
                    type="number"
                    className="isOptionInput"
                    placeholder={options.room}
                    min={1}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick} className="listSearchBtn">
              Search
            </button>
          </div>
          <div className="listResult">
            {loading ? (
              'loading ...'
            ) : error ? (
              <div className="error">{error}</div> // Display error message
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
