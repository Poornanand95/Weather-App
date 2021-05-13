import React from 'react';

function CityInfo(data) {
  console.log(data.getCityByName.weather.temperature.actual);

  return <div>{data.getCityByName.weather.temperature.actual}</div>;
}

export default CityInfo;
