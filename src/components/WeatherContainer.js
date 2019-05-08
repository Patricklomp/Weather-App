import React from 'react';
import InsertCity from './InsertCity';
import LocationWeather from './LocationWeather';




  class WeatherContainer extends React.Component {
    
    state = {
      locationSet: false,
      location: "Kuressaare",
    }
    
    handleChange = (data) =>{
      /*When city is selected loads LocationWeather component*/
      if(!data === false){
      this.setState({
        locationSet: true,
        location: data,
      })
    }

   

    else{
      this.setState({
        locationSet: false,
        location: data,
      })
    }
    }

    getBackFromWeather = () =>{
      /*method to WeatherContainer state in LocationWeather*/
      this.setState({
        locationSet: false,
        location: undefined,
      })
    }

    hasLocation(){
      if(!this.state.locationSet){
        return <InsertCity handleChange={this.handleChange}/>
      }else{
        return<LocationWeather city={this.state.location} getBack = {this.getBackFromWeather}/>
      }
    }




   render() {
    return (
      <div className="WeatherContainer">
      {this.hasLocation()}
       </div>
    ) 
  }
}
export default WeatherContainer;


