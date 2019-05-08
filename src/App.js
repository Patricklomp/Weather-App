import React from 'react';
import logo from './logo.svg';
import './App.css';
import InsertCity from './components/InsertCity'
import WeatherContainer from './components/WeatherContainer';


  class App extends React.Component {
    



   render() {
    return (
     <div>
     <WeatherContainer
     parent={this}
     />
     
     </div>
    ) 
  }
}
export default App;