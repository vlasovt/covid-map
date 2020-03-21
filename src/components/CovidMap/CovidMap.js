import React, { useState, useEffect } from 'react'
import './CovidMap.css'
import useInterval from '../../utils/useInterval'
import countries from '../../utils/countries.json'
import CovidPopup from '../CovidPopup/CovidPopup'
import { Map, TileLayer, Marker, Tooltip,ZoomControl } from "react-leaflet";


export default function CovidMap(){

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
                  country: cd.country,
                  cases: cd.cases,
                  today: cd.todayCases,
                  deaths: cd.deaths,
                  todayDeaths: cd.todayDeaths,
                  casesPerMillion: cd.casesPerOneMillion,
                  position: country.latlng
                }
              );
            }
          }
      );

      setMArkers(cases.map(covidcase => (
        <Marker position={covidcase.position} opacity={0} key={covidcase.key}>
          <CovidPopup case={covidcase}/>
          <Tooltip direction="center" className="country-label" permanent><b>{covidcase.cases + '/' + covidcase.today}</b></Tooltip>
        </Marker>
      )))

    }, 5000);

    return (
      <div className="map-container">
         <Map zoomControl={false} center={[0,0]} zoom={3} boundsOptions={{padding: [0, 0]}}>
         <ZoomControl position="topright" />
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <div>{markers}</div>
        </Map>
      </div>
    );
}