import React from 'react'
import { Popup } from "react-leaflet";
import './CovidPopup.css'

export default function CovidPopup(props){
    return(
        <Popup>
            <div className="covid-popup">
                <div><center>{props.case.country}</center></div>
                <div>Total deaths: <span className="covid-red">{props.case.deaths}</span></div>
                <div>Today deaths: <span className="covid-red">{props.case.todayDeaths}</span></div>
                <div>Cases per million: <span className="covid-red">{props.case.casesPerMillion}</span></div>
            </div>
        </Popup>
    );
}