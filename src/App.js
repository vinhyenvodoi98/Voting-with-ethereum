import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'

class App extends Component {

  constructor(props){
    super(props)
    this.state ={
        account : '0x0',
        balance : '',
        vote : 7,
        voted : 3,
        color: '#b53471',
        value: Math.floor(3/7*100),
    }
  }

  async componentDidMount(){

    const web3 = await new Web3(Web3.givenProvider);

    await web3.eth.getCoinbase().then((account)=>{
        this.setState({account})
    });

    await web3.eth.getBalance(this.state.account).then((balance)=>{
        balance = web3.utils.fromWei(balance);
        this.setState({balance})
    }) 
  }


  render() {
    return (
      <div className="App">
        <div >
          <p className="account">{this.state.account}</p>
          <p className="account">{this.state.balance}</p>
        </div>

        <div className="content">
          <div className="content_position">
            <h3>Who will be the president of VietNam</h3>
          </div>
        </div>
        
        <div className="vote_area">
          <div className="vote_box"> 
            <div className="head_vote"> 
              <span>
                <img className="avatar" src="https://picsum.photos/200/300" alt="Logo" /> 
              </span>
            </div>
            <div className="candidates">
              <p>Donald Trump</p>
            </div>
            <div className="button_vote">
              <button className="button">VOTE</button>
            </div>
            <div className="progress-bar">
              <div className="bar">
                <div className="backgroundbar" style={{'width': this.state.value + '%'}}>
                </div>
                <div style={{'backgroundColor': '#d3d3d3', 'width': (100-this.state.value) + '%'}}>
                </div>  
              </div>
            </div>
            <div className="score">
              <p>{this.state.value}%</p>
              <p>{this.state.voted}/{this.state.vote}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
