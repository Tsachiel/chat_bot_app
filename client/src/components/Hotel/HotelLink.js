import React from "react";
const HotelLink = (props) => {
  return (
    <div style={{margin:'auto'}}>
      <h3>We found three perfect hotels for you !</h3>
      <br />
      <a href={props.firstHotel} target="_blank">First Hotel</a>
      <br />
      <a href={props.secondHotel} target="_blank">Second Hotel</a>
      <br />
      <a href={props.thirdHotel} target="_blank">Third Hotel</a>
      <br />
    </div>
  );
};

export default HotelLink;
