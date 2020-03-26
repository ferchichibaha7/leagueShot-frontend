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
    isLoading: false,
    tierRes:''
  }
}

callAPI=async()=> {
  this.setState({ isLoading: true });

let res =await fetch("http://localhost:9000/users/"+this.state.sum)
let test= await res.json();
this.setState({ apiResponse: test });
let res3=await fetch("http://localhost:9000/users/rank/"+this.state.apiResponse.id)
let rank=await res3.json();
this.state.tierRes=rank;
let res2=await fetch("http://localhost:9000/users/game/"+res.id)
let activegame= await res2.json();
this.setState({gameresult: activegame });


this.setState({ isLoading: false })
        


      }
     

componentDidMount(){
  this.callAPI("pistachioo");
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
        <img src={'./ranked-emblems/Emblem_.png'}/> 
        <p>{this.state.tierRes.tier}</p>
       </div>}
     
      </header>
    </div>
 ) };
}

export default App;
