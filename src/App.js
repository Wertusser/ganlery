import React from 'react';
import './App.css';
import _ from 'lodash';

function format(string) {
  string = string.replace(/<unk>/g, _.repeat("█", _.random(4, 8)));
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class Artwork extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "", description: "" };
  }

  componentWillMount() {
    fetch("https://artwork-doesnt-exists.firebaseio.com/images.json")
    .then(data => data.json())
    .then(data => _.sample(data))
    .then(state => this.setState(state))
  }

  render() {
    const art = {backgroundImage: 'url(' + this.state.url + ')'}
    return (
    <div>
      <div className="art" style={art} alt={"Artwork " + this.state.description}></div>
      <h1>"{format(this.state.description)}"</h1>
    </div>
    );
  }
}

function App() {
  return (
    <main>
      <Artwork />
    </main>
  );
}

export default App;
