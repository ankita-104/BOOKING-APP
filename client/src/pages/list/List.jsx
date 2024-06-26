  //this url is passed in the useFetch{in the useEffect}, so the changes will be displayed immediately.
  import "./list.css";
  import Navbar from "../../components/navbar/Navbar";
  import Header from "../../components/header/Header";
  import { useLocation } from "react-router-dom";
  import { useState } from "react";
  import { format } from "date-fns";
  import { DateRange } from "react-date-range";
  import SearchItem from "../../components/searchItem/SearchItem";
  import useFetch from "../../hooks/useFetch";
  
  const List = () => {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    // location.state.destination
    const [dates, setDates] = useState(location.state.dates);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(location.state.options);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
  

      //this url is passed in the useFetch{in the useEffect}, so the changes will be displayed immediately.

    const { data, loading, error, reFetch } = useFetch(
      `/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`
    );
  
    const handleClick = () => {
      // console.log("destination " , destination);
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
              <div className="lsItem">
                <label>Destination</label>
                {/* <select type="text" value="" name="cr" placeholder="destination" onChange={(e)=>setDestination(e.target.value)}>
                        <option>berlin</option>
                        <option>madrid</option>  
                        <option>delhi</option>
                        <option>chennai</option>
                        <option>kolkata</option>
                    </select> */}
                     
                <input placeholder={destination} type="text" onChange={(e)=>setDestination(e.target.value)} />
                {/* onChange={(e)=>setDestination(e.value)} */}
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>{`${format(
                  dates[0].startDate,
                  "MM/dd/yyyy"
                )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
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
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMax(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.adult}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <input
                      type="number"
                      min={0}
                      className="lsOptionInput"
                      placeholder={options.children}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.room}
                    />
                  </div>
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
            </div>
            <div className="listResult">
              {loading ? (
                "loading"
              ) : (
                <>
                  {data.map((item) => (
                    <SearchItem item={item} key={item._id} />
                   
                  ))}
                   {/* {console.log(data)} */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default List;