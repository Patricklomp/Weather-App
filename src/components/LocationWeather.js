import React from 'react';
import InsertCity from './InsertCity';
import {ReactComponent as Clouds} from "../icons/cloudy.svg";
import  {ReactComponent as Thunderstorm} from "../icons/thunderstorm.svg";
import {ReactComponent as Drizzle} from "../icons/drizzle.svg";
import {ReactComponent as Rain} from "../icons/rain.svg";
import {ReactComponent as Snow} from "../icons/snow.svg";
import {ReactComponent as Other} from "../icons/else.svg";
import {ReactComponent as Clear} from "../icons/clear.svg";



  class LocationWeather extends React.Component {
      constructor(props){
          super(props)
          
          
        this.state = {
            city: props.city,

            
            like: "Light snow",
            degrees: 6,
            in3: 5,
            in6: 4,
            in9: 0,
            
            scale: "°C",
            Desc: Clouds,

            listWeekDay: [Thunderstorm,Clouds,Clouds,Clouds,Clouds],
            listTempWeek: [],
            weatherWeek: undefined,
            
            isCelsius: true,
        }
        
        this.getWeather()
      }

      

    getWeather = async (e) => {
      /* All weather information from openweathermap API
      */


        const api_call = await fetch("http://api.openweathermap.org/data/2.5/weather?q="+this.state.city+"&appid=24d4f6066c53536dbc30a1ac1b14c63c");
        
        const response = await api_call.json();
        

        let weatherDesc = this.updateWeatherIcon(response["weather"][0]["main"]);
        console.log(response["weather"][0]["description"]);

        this.setState({
          degrees: Math.round(response["main"]["temp"]-273.15),
          like: response["weather"][0]["description"],
          Desc: weatherDesc,

        });
      
        



        /*Weekly forecast*/
        this.getWeatherforWeek()

        this.getWeatherhrs()
      }

      getWeatherforWeek = async (e) => {
        /*Updates states for the listWeekday and listTempWeek*/
        
          const api_call = await fetch("http://api.openweathermap.org/data/2.5/forecast?q="+this.state.city+"&appid=24d4f6066c53536dbc30a1ac1b14c63c");
          
          const response = await api_call.json();
          
          let weatherList = response["list"];
          
          let typeList = new Array();
          let tempList = new Array();
         
          /*Getting one temp every 24 hours as there is 8 forecasts per day*/
          for(let i = 0; i<33;i= i+8){
            let daily = weatherList[i];
          
            tempList.push(Math.round(daily["main"]["temp"] -273.15));
            console.log(daily["weather"][0]["main"]);
            let weatherLike = this.updateWeatherIcon(daily["weather"][0]["main"]);
           
            typeList.push(weatherLike);
           
           console.log(typeList);
           
          }
         

          this.setState({
              listWeekDay: typeList,
              listTempWeek: tempList,

          });

          
  
         
          
  
          
        }

        getWeatherhrs = async(e) =>{
          /*Updates states for todays forecasts. */

          const api_call = await fetch("http://api.openweathermap.org/data/2.5/forecast?q="+this.state.city+"&appid=24d4f6066c53536dbc30a1ac1b14c63c");
          
          const response = await api_call.json();
          
          let weatherList = response["list"];
          let tempList = new Array();

          for(let i = 1; i<4;i++){
            let daily = weatherList[i];
          
            tempList.push(Math.round(daily["main"]["temp"] -273.15));
              
        }

        this.setState({
          in3: tempList[0],
          in6: tempList[1],
          in9: tempList[2],

        });

        }

      updateWeatherIcon = (desc) =>{
        /* Given string parameter with weather description
          Returns React Component defined by the weather*/
        switch(desc) {
          case "Thunderstorm":
            return Thunderstorm;
     
          case "Drizzle":
           return Drizzle;

          case "Rain":
            return Rain;
        
            case "Snow":
            return Snow;

            case "Clear":
            return Clear;
          
            case "Clouds":
            return Clouds;

          default:
            return Other;

        }
      }

     

      goBack = () =>{
        /*Goes back to InsertCity*/
        this.props.getBack()
      }

      getDate = (date) =>{
        /*Given date integer returns the day in string*/
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        if(date>= 7){
          date = date%7;
        }
        return days[date];
      }
    
    convertDegrees = () =>{
     /*Converts all degrees to celsius and back*/
      if(this.state.isCelsius){
        
        let weekTemps = this.state.listTempWeek;

        for (let index = 0; index < weekTemps.length; index++) {
          weekTemps[index] = Math.round(weekTemps[index]*1.8+32);
          
        }
      this.setState({
      
        degrees: Math.round(this.state.degrees*1.8+32),
        in3: Math.round(this.state.in3*1.8+32),
        in6: Math.round(this.state.in6*1.8+32),
        in9: Math.round(this.state.in9*1.8+32),
       
        scale: "°F",
        
        listTempWeek: weekTemps,
        isCelsius: false,
     })
    }else{
      
        
        let weekTemps = this.state.listTempWeek;

        for (let index = 0; index < weekTemps.length; index++) {
          weekTemps[index] = Math.round((weekTemps[index]-32)/1.8);
          
        }

      this.setState({
      
        degrees: Math.round((this.state.degrees-32)/1.8),
        in3: Math.round((this.state.in3-32)/1.8),
        in6: Math.round((this.state.in6-32)/1.8),
        in9: Math.round((this.state.in9-32)/1.8),
        
        scale: "°C",
        
        
        isCelsius: true,
     })
    }
    }
   render() {
    
      /*Todays date*/
      const date  = new Date();
      
      /*svg icons*/
      var Day0 = this.state.listWeekDay[0];
      var Day1 = this.state.listWeekDay[1];
      var Day2 = this.state.listWeekDay[2];
      var Day3 = this.state.listWeekDay[3];
      var Day4 = this.state.listWeekDay[4];
      
      const Desc = this.state.Desc;


    return (<div className = "weather">
      
      <div className="weatherHeader">
        <button className="backButton" onClick={this.goBack}></button>
        <h1 className="locationText">{this.state.city}</h1>
        <label className="switch">
          <input type="checkbox"/>
          <span className="slider round" onClick={this.convertDegrees} ><p className="movingText">{this.state.scale}</p></span>
        </label>
        
       </div>


        <div className="weatherInfo">
        <p className="weatherDate">{date.toDateString()}</p>
        <p className="weatherLike">{this.state.like}</p>
        <div className="weatherToday">
        <div className = "weatherNow">
        <h2> {this.state.degrees+ " "+this.state.scale} <div className = "weatherPicTd"><Desc/></div></h2>
        
        </div>
        <div className="today">
        <h3>Right now {this.state.degrees + " "+this.state.scale}</h3>
        <h3>In 3 hours {this.state.in3+ " "+this.state.scale}</h3>
        <h3>In 6 hours {this.state.in6 + " "+this.state.scale}</h3>
        <h3>In 9 hours {this.state.in9 + " "+this.state.scale}</h3>

        </div>
        </div>
        </div>

        <div className="weatherWeek">
        
        <div className = "dayOfWeek"><h3>{this.getDate(date.getDay())}</h3>
        <div className="dayOfWeekIcon"><Day0/></div>
        <h3 className="dayOfWeekdeg">{this.state.listTempWeek[0]+ " "+this.state.scale}</h3>
        </div>

        <div className = "dayOfWeek"><h3>{this.getDate(date.getDay()+1)}</h3>
        <div className="dayOfWeekIcon"><Day1/></div>
        <h3 className="dayOfWeekdeg">{this.state.listTempWeek[1]+ " "+this.state.scale}</h3>
        </div>

        <div className = "dayOfWeek"><h3>{this.getDate(date.getDay()+2)}</h3>
        <div className="dayOfWeekIcon"><Day2/></div>
        <h3 className="dayOfWeekdeg">{this.state.listTempWeek[2]+ " "+this.state.scale}</h3>
        </div>

        <div className = "dayOfWeek"><h3>{this.getDate(date.getDay()+3)}</h3>
        <div className="dayOfWeekIcon"><Day3/></div>
        <h3 className="dayOfWeekdeg">{this.state.listTempWeek[3]+ " "+this.state.scale}</h3>
        </div>

        <div className = "dayOfWeek"><h3>{this.getDate(date.getDay()+4)+ " "+this.state.scale}</h3>
        <div className="dayOfWeekIcon"><Day4/></div>
        <h3 className="dayOfWeekdeg">{this.state.listTempWeek[4]+ " "+this.state.scale}</h3>
        </div>


        </div>


    </div>
    ) 
  }
}
export default LocationWeather;


