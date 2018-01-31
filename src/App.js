import React, { Component } from 'react';
import swal from 'sweetalert'
import './App.css';
import Header from './header/header';
import Icon from './main/icon';
import Player from './main/player';
import AddPlaylistForm from './main/addPlaylistForm';
import EditForm from './main/editForm';
import axios from 'axios';



class App extends Component {

    constructor(){
    super();
    this.state = {
      playlists: [],
        Name: '',
        Img_path: '',
        Tracks: [],
        ActiveTrack: {Name: ''},    //defult title
        ActiveTrackIndex: 0,
        PlaylistForm: false,
        EditForm: false,
        EditPlaylist: {},
        SerchResalt: []
      }
  }
  
  componentWillMount(){
    axios.patch('http://localhost/playlist/server/api.php?action=main').then((resalt) => {
        this.setState({playlists: resalt.data});
    });
  }

  deleteMe = (id, name, index, flag) => {
    //flag is to know if the delete is after edit or on click
    if(flag){
      //swweet alert
      swal({
        title: "Your playlist will be deleted permanently!",
        text: "Are you sure you want to delete the playlist?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.patch('http://localhost/playlist/server/api.php?delete=' + id).then((resalt) => {
              var playlists = [...this.state.playlists];
              playlists.splice([index], 1);
              this.setState({playlists});
              if(name === this.state.Name){
                this.setState({ Name: '', Img_path: '', Tracks: [], ActiveTrack: {Name: ''},});
              }
          });
        }  
      })
    }else{
       axios.patch('http://localhost/playlist/server/api.php?delete=' + id).then((resalt) => {
          var playlists = [...this.state.playlists];
          playlists.splice([index], 1);
          this.setState({playlists});
          if(name === this.state.Name){
            this.setState({ Name: '', Img_path: '', Tracks: [], ActiveTrack: {Name: ''},});
          }
      });
    }
  }
  editMe = (id,name,img,index) =>{
    this.setState({
      EditForm: true,
      EditPlaylist: {
        Id: id,
        Name: name,
        Img_path: img,
        Index: index
      }
    });
  }
  removeEdit = () =>{
    this.setState({EditForm: false});
  }

  playMe = (id,name,img) => {
     axios.patch('http://localhost/playlist/server/api.php?id='+id).then((resalt) => {
       if(resalt.data !== 'no tracks'){
          this.setState({Tracks: resalt.data, Name: name, Img_path: img, ActiveTrack: resalt.data[0] });
       } 
    });
  }
  RefreshPlaylists = () => {
    axios.patch('http://localhost/playlist/server/api.php?action=main').then((resalt) => {
        this.setState({playlists: resalt.data});
    });
  }

  printAddPlaylistForm = () => {
   this.setState({PlaylistForm: true});
  }
  CloseAddPlaylistForm = () => {
     this.setState({PlaylistForm: false});
  }
  ChangeActive = (elm) => {
    let ActiveTrack = this.state.Tracks[elm.props.index]
    this.setState({ActiveTrack, ActiveTrackIndex:elm.props.index});
  }
  NextTrack = () =>{
    let playlistLength = this.state.Tracks.length;
    if(this.state.ActiveTrackIndex < playlistLength -1){
        this.setState({ ActiveTrackIndex: this.state.ActiveTrackIndex + 1 });
    }else{
      this.setState({ ActiveTrackIndex: 0 });
    } 
    this.setState({ ActiveTrack: this.state.Tracks[this.state.ActiveTrackIndex ] });
  }
  Serch = (serchText) =>{
    if(serchText.length > 1){
      axios.patch('http://localhost/playlist/server/api.php?serch='+ serchText).then((resalt) => {
        this.setState({SerchResalt: resalt.data});
      });
    }
  }


  render() {
     document.title = this.state.ActiveTrack.Name;
    return (
      
      <div>
        <Header PrintForm={this.printAddPlaylistForm} Serch={this.Serch} SerchResalt={this.state.SerchResalt} playMe={this.playMe}/>
        
            <AddPlaylistForm ToPrint={this.state.PlaylistForm} remove={this.CloseAddPlaylistForm} RefreshPlaylists={this.RefreshPlaylists}/>
            <EditForm ToEditForm={this.state.EditForm} EditPlaylist={this.state.EditPlaylist} remove={this.CloseAddPlaylistForm} RefreshPlaylists={this.RefreshPlaylists} deleteMe={this.deleteMe} removeEdit={this.removeEdit}/>
        
        <div id="main">
          <Player 
          Name={this.state.Name} 
          Img_path={this.state.Img_path} 
          Tracks={this.state.Tracks} 
          ActiveTrack={this.state.ActiveTrack} 
          ChangeActive={this.ChangeActive}
          NextTrack={this.NextTrack} />
          {
              this.printIcon = this.state.playlists.map((p, i)=>{
              return <Icon Id={p.Id} Name={p.Name} Img_path={p.Img_path} playMe={this.playMe} deleteMe={this.deleteMe} editMe={this.editMe} key={p.Id} index={i}  />  
              })
          }
         </div>
      </div>
    );
  }
}

export default App;

   