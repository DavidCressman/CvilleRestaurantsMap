import React, { Component } from "react";
import axios from "axios";

const mapResults = keyvalue => {
    return keyvalue.map(row => <li>Name: {row.name}, Rating: {row.rating}, Price: {row.price}</li>);
  };
const API_KEY = process.env.React_APP_API_KEY;

export default class places extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyvalue: [],
      bars: [],
      searchterm: '',
   
    };
  }


  componentDidMount() {
    let url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query='+this.state.searchterm+'+restaurant+in+Charlottesville&key='+
    API_KEY;
    console.log(url)
    axios
      .get(url)
      .then(res => {
        const data = res.data.results;
        console.log (data);
        const name = data.map(restaurant => restaurant.name);
        const rating = data.map(restaurant => restaurant.rating);
        const price = data.map(restaurant => restaurant.price_level);
        const values = [];
        for (let i = 0; i < data.length; i++) {
        if (data[i].opening_hours.open_now == true){  
          values.push({ name: name[i], rating: rating[i], price: price[i] });
        }
    }
        this.setState({ keyvalue: values });
        console.log (this.state.keyvalue)
      });

      let bar_url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query='+this.state.searchterm+'+bar+in+Charlottesville&key='
      +API_KEY;
      axios
      .get(bar_url)
      .then(res => {
        const bardata = res.data.results;
        console.log (bardata);
        const barname = bardata.map(bar => bar.name);
        const barrating = bardata.map(bar => bar.rating);
        const barprice = bardata.map(bar => bar.price_level);
        const open = bardata.map(bar => bar.opening_hours);
        const values = [];
        for (let i = 0; i < bardata.length; i++) {
        if (bardata[i].opening_hours.open_now == true){  
          values.push({ name: barname[i], rating: barrating[i], price: barprice[i] });
        }
    }
        this.setState({ bars: values });
      });
  }



  
  changehandle = event => {
    this.setState({
      searchterm: event.target.value
    },);
  }
  submithandle = event => {
     this.componentDidMount();
  }


  render() {
  
 
    return (
    
      <div>
      <h1>Food Finder</h1>    
      <form onSubmit={this.handleSubmit}>
      <label for="startDate">Search: </label>
          <input type="text" 
                 name="searchterm"   
                 value={this.state.searchterm} 
                 onChange={this.changehandle}/>
      </form>
      <button onClick={this.submithandle}>
        search
      </button>
      

        <h3>Restaurants</h3>
        {mapResults(this.state.keyvalue)}
        <h3>Bars</h3>
        {mapResults(this.state.bars)}
      </div>
    );
  }
}



