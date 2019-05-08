import React from 'react';
import WeatherContainer from './WeatherContainer';




  class InsertCity extends React.Component {
    constructor(props) {
      super(props)
  
      
      
    }
    state = {
      
    }
    
    handleChange= (e) => {
      this.setState({ input: e.target.value });
    }

    keyPress = (e) =>{
      /*if user presses enter*/
      if(e.keyCode === 13){
        this.gotLocation()
         
         // put the login here
      }
   }

   gotLocation = async () =>{
     /*Checking if location is valid*/
    let city = this.state.input;
    let no404 = false;
    
    fetch("http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=24d4f6066c53536dbc30a1ac1b14c63c").then(response => {
      if (response.status === 404) {
        
        no404 = false;
      }else{
        
        no404 = true;
        this.props.handleChange(this.state.input);
      }
    });

    
    

     if(no404 === true){
      
     }
     


    
   
    
   }

   useCurrentLoc = async(e) =>{
    /*Using current location through geoiplookup api*/
    
    const api_call = await fetch("https://json.geoiplookup.io/");
          
    const response = await api_call.json();

    this.props.handleChange(response["district"]);

    

 

   }



   render() {
    return (
      <div className="Location">
      <div className="search">
      <input type="text" placeholder="                  City" onChange={this.handleChange} onKeyDown={this.keyPress} className="CityInput"></input>
      <button className="searchButton" onClick={this.gotLocation}></button>
      </div>
      <p className="submitText">or</p>
      <p className = "positonText">use my <button className = "positionButton" onClick={this.useCurrentLoc}>current position</button></p>
      
       </div>
    ) 
  }
}
export default InsertCity;


