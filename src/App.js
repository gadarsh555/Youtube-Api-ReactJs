import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Youtube from './Youtube';

class App extends Component {
render(){
return(
<div className="App">
      <header className="App-header">
       Welcome To React
      </header>
      <Youtube />
      <header className="App-header">
      The End
      </header>
</div>
);
}
}

export default App;
