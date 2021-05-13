import React, { Fragment, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_WEATHER_QUERY } from '../graphql/Queries';
import Plot from 'react-plotly.js';

import './style.css';

var k = '';
const Search = () => {
  const [citySearched, setCitySearched] = useState('');

  const [getWeather, { data, error }] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: { name: citySearched },
  });

  if (error) return <h1> Error found</h1>;

  if (data) {
    // console.log(data);
  }

  return (
    <Fragment>
      <div className='wrapper'>
        <h3 className='heading'>Weather</h3>
        <div className='search-area'>
          <input
            className='input-city'
            type='text'
            placeholder='City name...'
            onChange={(event) => {
              k = event.target.value;
              event.preventDefault();
            }}
          />
          <button
            className='btn-city'
            onClick={() => {
              setCitySearched(k);
              getWeather();
            }}
          >
            {' '}
            Search
          </button>
        </div>
        <div className='weather'>
          {data && (
            <>
              <h1 className='city-name'> {data.getCityByName.name} </h1>
              <h4 className='city-temp'>
                {' '}
                Temp: {data.getCityByName.weather.temperature.actual} F
              </h4>
              <div className='wind-speed'>
                <p className='city-description'>
                  {data.getCityByName.weather.summary.description}
                </p>
                <p className='city-wind'>
                  Wind Speed: {data.getCityByName.weather.wind.speed} kmph
                </p>
              </div>
              <div className='charts'>
                <Plot
                  className='chart-temp'
                  data={[
                    {
                      type: 'bar',
                      x: ['Actual Temp', 'Min Temp', 'Max Temp'],
                      y: [
                        data.getCityByName.weather.temperature.actual,
                        data.getCityByName.weather.temperature.min,
                        data.getCityByName.weather.temperature.max,
                      ],
                    },
                  ]}
                  layout={{ width: 420, height: 340, title: 'Temperature(F)' }}
                />
                <Plot
                  className='chart-humidity'
                  data={[
                    {
                      type: 'pie',
                      values: [
                        data.getCityByName.weather.clouds.humidity,
                        100 - data.getCityByName.weather.clouds.humidity,
                      ],
                      labels: ['Humidity', 'Air'],
                    },
                  ]}
                  layout={{ width: 420, height: 340, title: 'Humidity' }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
