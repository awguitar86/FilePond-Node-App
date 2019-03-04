import React, { Component } from 'react';
import './App.css';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="filepond-wrap">
          <FilePond name={'file'} server="http://localhost:8080/upload"/>
        </div>
        <button>Click</button>
      </div>
    );
  }
}

export default App;
