import React, { Component } from 'react';
import './App.css';

class App extends Component {
constructor(props){
  super(props);
  this.state={
    apiResponse: "",
    sum:'valigod'
  }
}

callAPI=()=> {
  fetch("http://localhost:9000/users/"+this.state.sum)
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }))
      .then(console.log(this.state.sum))
}

componentDidMount(){
  this.callAPI("pistashio");
}

handleChange =(e)=>{
  this.setState({sum:e.target.value.toLowerCase()}
  )}
  buttonHandler=()=>{
    this.callAPI()
  }


  render() {
    return(
    <div className="App">
      <header className="App-header">
      <input className="search" type="search" placeholder="Summoner Name" onChange={this.handleChange} />
      <button onClick={this.buttonHandler}>ok</button>
        <p className="App-intro">{this.state.apiResponse.name}</p>
        <p className="App-intro">{this.state.apiResponse.summonerLevel}</p>
      </header>
    </div>
 ) };
}

export default App;
