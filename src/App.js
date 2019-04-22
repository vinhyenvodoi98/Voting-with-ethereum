import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'

class App extends Component {

  constructor(props){
    super(props)
    this.state ={
        account : '0x0',
        balance : '',
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
        <p>{this.state.account}</p>
        <p>{this.state.balance}</p>
      </div>
    );
  }
}

export default App;
