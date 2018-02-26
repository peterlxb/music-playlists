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
        songs:[{name:'beat it',duration:3345},{name:'Rose helicopter',duration:1645},{name:'fixed you',duration:2345}]
      },
      {
        name:'eveyang',
        songs:[{name:'tomorrow',duration:4145},{name:'desperate',duration:1145},{name:'love story',duration:1645}]
      },
      {
        name:'jackson',
        songs:[{name:'yellow',duration:1445},{name:'remember you',duration:2451},{name:'18 years',duration:3245}]
      },
      {
        name:'beyond',
        songs:[{name:'never say never',duration:2345},{name:'never give up',duration:3345},{name:'go back',duration:2325}]
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
    const { playlist } = this.props;
    //console.log("playlist:",playlist.songs);
    return (
      <div style={{...defaultStyle,display:'inline-block',width:"25%"}}>
        <img/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li key={song.name}>{song.name}</li>
          )}
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
            {this.state.serverData.user.playlists.map(playlist =>
               <Playlists playlist={playlist} key={playlist.name}/>
             )}
          </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
