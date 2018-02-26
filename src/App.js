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
        name:'Eveyang',
        songs:[{name:'tomorrow',duration:6145},{name:'desperate',duration:1145},{name:'love story',duration:1645}]
      },
      {
        name:'jackson',
        songs:[{name:'yellow',duration:8445},{name:'remember you',duration:2451},{name:'18 years',duration:3245}]
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
      // return Math.round((sum + eachSong.duration) / 60);
      const minutes = sum + eachSong.duration;
      const hours = minutes / 60;
      console.log("hours:",hours);
      return minutes;
    },0)

    console.log(totalDuration);

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
        <input type="text" onChange={(event) => this.props.onTextChange(event)}/>
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
      serverData:{},
      filterString:''
    }
    this.filterChange = this.filterChange.bind(this);
  }
  //传递给filter组件
  filterChange = (event) => {
    this.setState({filterString:event.target.value})
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        serverData: fakeServerData
      })
    }, 1000);
  }

  render() {

    const playlistToRender = this.state.serverData.user ?
      this.state.serverData.user.playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase()
        )
      ) : [];

    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>
            <h1 style={{...defaultStyle ,'fontSize':'54px'}}>
              {this.state.serverData.user.name} Playlists
            </h1>
            <div>
              <PlaylistCounter playlists={playlistToRender}/>
              <HourCounter playlists={playlistToRender}/>
            </div>
            <Filter onTextChange={this.filterChange}/>
            {playlistToRender.map(playlist =>
               <Playlists playlist={playlist} key={playlist.name}/>
             )}
          </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
