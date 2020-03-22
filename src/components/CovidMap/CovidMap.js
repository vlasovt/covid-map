import React, { useState } from 'react'
import './CovidMap.css'
import useInterval from '../../utils/useInterval'
import countries from '../../utils/countries.json'
import CovidPopup from '../CovidPopup/CovidPopup'
import { Map, TileLayer, Marker, Tooltip,ZoomControl } from "react-leaflet";
import classList from '../../utils/classList'


export default function CovidMap(){

    const [covidData, setCovidData] = useState([]);
    const [markers, setMarkers] = useState([]);
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

      setMarkers(cases.map(covidcase => (
        <Marker position={covidcase.position} opacity={0} key={covidcase.key}>
          <CovidPopup case={covidcase}/>
          <Tooltip 
          direction="center" 
          className={classList({
            'country-label': true,
            'zero': covidcase.cases < 1,
            'less-1000': covidcase.cases < 1000,
            'from-1000-to-10000': covidcase.cases > 1000 && covidcase.cases < 10000,
            'from-10000-to-20000': covidcase.cases > 10000 && covidcase.cases < 20000,
            'from-20000-to-40000': covidcase.cases > 20000 && covidcase.cases < 40000,
            'from-40000-to-60000': covidcase.cases > 40000 && covidcase.cases < 60000,
            'more-than-60000': covidcase.cases > 60000
          })} 
          permanent>
            {covidcase.cases + ' / ' + covidcase.today}
          </Tooltip>
        </Marker>
      )))

    }, 5000);

    return (
      <div className="map-container">
         <Map zoomControl={false} center={[0,0]} zoom={3} boundsOptions={{padding: [0, 0]}}>
         <ZoomControl position="topright" />
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
          />
          <div>{markers}</div>
        </Map>
      
      </div>
    );
}