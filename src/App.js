import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color:'#fff'
};

let fakeServerData = {
  user: {
    name: 'Peter Liu',
    playlists: [
      {
        name:'david',
        songs:[{name:'beat it',duration:1345},{name:'Rose helicopter',duration:1345},{name:'fixed you',duration:1345}]
      },
      {
        name:'eveyang',
        songs:[{name:'beat it',duration:1345},{name:'Rose helicopter',duration:1345},{name:'fixed you',duration:1345}]
      },
      {
        name:'jackson',
        songs:[{name:'beat it',duration:1345},{name:'Rose helicopter',duration:1345},{name:'fixed you',duration:1345}]
      },
      {
        name:'beyond',
        songs:[{name:'beat it',duration:1345},{name:'Rose helicopter',duration:1345},{name:'fixed you',duration:1345}]
      }
    ]
  }
}

class PlaylistCounter extends Component {

  render() {

    const {playlists} = this.props;

    return (
      <div style={{...defaultStyle,width:'40%',display:'inline-block'}}>
        <h2>{ playlists && playlists.length} playlists</h2>
      </div>
    );
  }
}

class HourCounter extends Component {

  render() {

    const {playlists} = this.props;
    //use reduce
    let allSongs = playlists.reduce((songs,eachPlayList) => {
      return songs.concat(eachPlayList.songs)
    },[]);

    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return Math.round((sum + eachSong.duration) / 60);
    },0)

    console.log(allSongs);

    return (
      <div style={{...defaultStyle,width:'40%',display:'inline-block'}}>
        <h2>{playlists && totalDuration} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img/>
        <input type="text" />
        Filter
      </div>
    );
  }
}

class Playlists extends Component {
  render() {
    return (
      <div style={{...defaultStyle,display:'inline-block',width:"25%"}}>
        <img/>
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      serverData:{}
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        serverData: fakeServerData
      })
    }, 1000)
  }

  render() {
    console.log(this.state.serverData);
    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>
            <h1 style={{...defaultStyle ,'fontSize':'54px'}}>
              {this.state.serverData.user.name} Playlists
            </h1>
            <div>
              <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
              <HourCounter playlists={this.state.serverData.user.playlists}/>
            </div>
            <Filter />
            <Playlists />
            <Playlists />
            <Playlists />
            <Playlists />
          </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
