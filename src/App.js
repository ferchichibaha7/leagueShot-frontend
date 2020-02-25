import React, { Component } from 'react';
import './App.css';

class App extends Component {
constructor(props){
  super(props);
  this.state={
    apiResponse: "",
    gameresult:'',
    sum:'valigod',
    id:'',
    isLoading: false
  }
}

callAPI=()=> {
  this.setState({ isLoading: true });
  fetch("http://localhost:9000/users/"+this.state.sum)
      .then(res => res.json())
      .then(res => {
        this.setState({ apiResponse: res })
        fetch("http://localhost:9000/users/game/"+res.id)
         .then(res => res.json()) .then(res => {
          this.setState({gameresult: res })
        })



      })
      .then(() => this.setState({ isLoading: false }));
}

componentDidMount(){
  this.callAPI("valigod");
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
      <button className="btnserch" onClick={this.buttonHandler}>Go Summoner</button>
      {this.state.isLoading ? <h3>L O A D I N G</h3>: <div> <br />
        <img className="profileicon" alt="profileicon" src={"http://ddragon.leagueoflegends.com/cdn/10.4.1/img/profileicon/"+this.state.apiResponse.profileIconId+".png"} />
        <h2 className="App-intro">{this.state.apiResponse.name}</h2>
        <h5>LVL : {this.state.apiResponse.summonerLevel}</h5>
        {this.state.gameresult.gameMode? <h5>ACTIVE GAME : {this.state.gameresult.gameMode}</h5>:null}
       </div>}
     
      </header>
    </div>
 ) };
}

export default App;
