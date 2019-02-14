import React, { Component } from 'react';
import './App.css';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="filepond-wrap">
          <FilePond />
        </div>
      </div>
    );
  }
}

export default App;
