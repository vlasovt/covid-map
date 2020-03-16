import React, { useState } from 'react'
import './CovidMap.css'
import useInterval from '../utils/useInterval'
import countries from '../utils/countries.json'
import { Map, TileLayer, Marker, Tooltip } from "react-leaflet";



function CovidMap(){

    const [covidData, setCovidData] = useState([]);
    const [markers, setMArkers] = useState([]);
    let cases = [];

    useInterval(() => {
      cases = [];

      fetch('https://corona.lmao.ninja/countries')
      .then(response => response.json())
      .then(data => setCovidData(data));

      covidData.forEach(cd => {
          let country = countries.find(country => country.name.common === cd.country);
          if(country){
              cases.push(
                {
                  key: cd.country,
                  cases: cd.cases,
                  today: cd.todayCases,
                  position: country.latlng
                }
              );
            }
          }
      );

      setMArkers(cases.map(covidcase => (
        <Marker position={covidcase.position} opacity={0} >
          <Tooltip direction="center" className="country-label" permanent><b>{covidcase.cases + '/' + covidcase.today}</b></Tooltip>
        </Marker>
      )))

    }, 5000);

    return (
        <Map center={[51.505, -0.09]} zoom={3}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div>{markers}</div>
      </Map>
    );
}

export default CovidMap;