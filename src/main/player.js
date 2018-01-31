import React, { Component } from 'react';
import TrackList from './trackList';
import ReactAudioPlayer from 'react-audio-player';

class Player extends Component {
    constructor(props){
        super(props);
        this.state = {
            Name: '',
            Img_path: '',
            Tracks: [],
            ActiveTrack: {},
            spin: 'spin',
            playing: true,
            Glyphicon: ''
        };
        
        
  }
     componentWillReceiveProps(){
        this.setState({ Img_path: this.props.Img_path, Tracks: this.props.Tracks });
    }
    pase = () =>{
        this.setState({spin: '', playing: false, Glyphicon: 'glyphicon glyphicon-play-circle'});
        
    }
    play = () =>{
        this.setState({spin: 'spin', playing: true, Glyphicon:'glyphicon glyphicon-pause'});
    }
    handelClick = () =>{
        if(this.state.playing){
            this.rap.audioEl.pause();
            this.setState({playing: false, Glyphicon: 'glyphicon glyphicon-play-circle' })
        }else{
            this.rap.audioEl.play();
            this.setState({playing: false, true: 'glyphicon glyphicon-pause' })
        }
    }


  render() {
      let divStyle = {
        backgroundImage: 'url(http://localhost/playlist/server/'+ this.props.Img_path +')', 
      };
    return (
    //   onEnded={}
    <div id="playing" className="clearfix">
        <h3 id="playing_name" >{this.props.Name}</h3>
        <div id="bg_img" style={divStyle} className={this.state.spin} onClick={this.handelClick}>
            <span id="glyphiconPlayPause" className={this.state.Glyphicon}></span>
        </div>
        <div id="audio">
            <ReactAudioPlayer
                src={'http://localhost/playlist/server/' + this.props.ActiveTrack.Path}
                ref={(element) => { this.rap = element; } }
                autoPlay
                controls
                onEnded = { () => this.props.NextTrack(this.props.ActiveTrack.index)}
                onPause = { () => this.pase() }
                onPlay = { () => this.play() }
                
            />
            <p>NOW PLAYING:<b id="nowPlaying"> {this.props.ActiveTrack.Name}</b> </p>
        </div>
            <ol id="ol_track">
                {
                    this.tracks = this.props.Tracks.map((p, i)=>{
                    return <TrackList Name={p.Name} key={i} index={i} ChangeActive={this.props.ChangeActive}/>  
                    })
                 }
            </ol>
    </div>
    );
  }
}

export default Player;