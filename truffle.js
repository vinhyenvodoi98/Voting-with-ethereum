require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
var mnemonic = "soup click poverty tooth struggle cash heart have supply sport clean quality"
// var provider = new HDWalletProvider (mnemonic,"https://ropsten.infura.io/v3/c9a0f45995234454849d7a2d3c9124ed")

// TODO HD Wallet
// ==================
// Mnemonic:      apple banana coffie
// Base HD Path:  m/44'/60'/0'/0/{account_index}


module.exports = {

    networks: {
        ropsten: {
            provider: ()=>
                new HDWalletProvider(
                    mnemonic,
                    "https://ropsten.infura.io/v3/33067fd895d4482fa44cbe0f5049e96b"
                )
            ,
            // gas: 4712388,
            // gasPrice: 100000000000,
            network_id: 3
        },
        rinkeby: {
            provider: function() {
                return new HDWalletProvider(
                    mnemonic,
                    "https://rinkeby.infura.io/v3/33067fd895d4482fa44cbe0f5049e96b"
                    )},
            network_id: "*"
        },
        development:{
            host: "127.0.0.1",
            port: 9545,
            network_id: "*"
        },
    },
        
    compilers:{
        solc:{
            optimizer: {
                enabled: true,
                runs: 200
            },
            version : "0.4.24"
        }
    }
};