import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import mapStoreToProps from '../../redux/mapStoreToProps';
import DatePicker from "react-datepicker";
import { formatISO } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { GrAdd } from 'react-icons/gr'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Seasons = ({store}) => {
  const dispatch = useDispatch();
  const seasons = useSelector((state) => state.seasons);
  const { farm_id } = store.user
  const startDateTime = new Date();
  const [year,setYear] = useState(startDateTime);
  const [lastFrostDate, setLastFrostDate] = useState(startDateTime);
  const [firstFrostDate, setFirstFrostDate] = useState(startDateTime);
  const [season,setSeason] = useState({})
  
  
  const addNewSeason = () => {
    const newSeason = 
    { 
      year: formatISO(year), 
      last_frost_date: formatISO(lastFrostDate), 
      first_frost_date: formatISO(firstFrostDate),
      farm_id: farm_id 
    };
    dispatch({
      type: "ADD_SEASON",
      payload: newSeason,
    });
    setSeason(newSeason);
  };

  const fetchSeasons = () => {
    const payload = {
      farm_id: `${farm_id}`
    }
    dispatch({
      type: "FETCH_SEASONS",
      payload: payload
    });
  };

  useEffect(() => {
    fetchSeasons();
  }, [season]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewSeason(); 
  };
  

  return (
    <section className="section">
      <h3>seasons</h3>
      <div className="season-inputs">
      <article className='form'>
        <form>
          <div className='form-control'>
            <label htmlFor='year'>What is the harvest year? </label>
            <DatePicker
              selected={year}
              onChange={date => setYear(date)}
              showYearPicker
              dateFormat="yyyy"
            />
          </div>
          <div className='form-control'>
            <label htmlFor='lastFrostDate'>What is the last frost date? </label>
            <DatePicker 
              selected={lastFrostDate}
              onChange={date => setLastFrostDate(date)}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='firstFrostDate'>What is the first frost date? </label>
            <DatePicker 
              selected={firstFrostDate} 
              onChange={date => setFirstFrostDate(date)}
            />
          </div>
          <button type='submit' className='btn' onClick={handleSubmit}>
            add season
          </button>
        </form>
      </article>
      <article className='cocktails-center'>
        {seasons.map((item, index) => {
          const { year, last_frost_date, first_frost_date } = item;
          return (
            <div className='cocktail' key={index}>
              <h4>harvest year: {year}</h4>
              <p>last frost date: {last_frost_date}</p>
              <p>first frost date: {first_frost_date}</p>
            </div>
          );
        })}
      </article>
      </div>
    </section>
  )
};


export default connect(mapStoreToProps)(Seasons);
