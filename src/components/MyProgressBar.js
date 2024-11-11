import React from 'react';
import './Quiz.css';

const MyProgressBar = ({ currentStep, totalSteps }) => {
   
   const ThePP = ((currentStep -1) / (totalSteps-1 )) * 100;

 return (
  <section className="TheC">
     <section className="TPBar" style={{ width: `${ThePP}%` }} />

     <h3> {` ${Math.round(ThePP) }%`}</h3>   </section> );

};
export default MyProgressBar ;
