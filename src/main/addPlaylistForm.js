import React, { Component } from 'react';
import axios from 'axios';
import AddTrack from './addTrack';
import TrackCheckbox from './trackCheckbox';

class AddPlaylistForm extends Component {
     
    constructor(props){
        super(props);
        this.state = {
            AddTrackForms: 0,
            AllTracks: [],
            ShowList: false,
            file: [],
            TracksFromList: [],
            imgReader: ''
        }
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onChectBox = this.onChectBox.bind(this);
        this.CanAppendAnotherUplode = true;
    }

    addUplaodTrack = () => {
        if(this.CanAppendAnotherUplode){
            this.setState({AddTrackForms: this.state.AddTrackForms + 1});
            this.CanAppendAnotherUplode = false; 
        }

    }
    getAllTracks = () => {
        if(this.state.ShowList){
            this.setState({ShowList: false});
        }else{
            this.setState({ShowList: true});
        }
        axios.patch('http://localhost/playlist/server/api.php?action=get_all_tracks').then((resalt) => {
            this.setState({AllTracks: resalt.data});
        });
    }
    onChangeFile = (e) => {
        this.CanAppendAnotherUplode = true;
        let file = [...this.state.file];
        file.push(e.target.files[0])
        this.setState({file});

        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('image').src = e.target.result;
                //  this.imgSrc = e.target.result;
                // this.setState({imgReader: e.target.result});
            }
            reader.readAsDataURL(e.target.files[0]);
        }

    }
    onChectBox = (e) => {
        if(e.target.checked){
            let TracksFromList = [...this.state.TracksFromList];
            TracksFromList.push(e.target.value);
            this.setState({TracksFromList});
        }else{
            let TracksFromList = [...this.state.TracksFromList];
             var index = TracksFromList.indexOf(e.target.value);
             if (index > -1) {
                TracksFromList.splice(index, 1);
            }
            this.setState({TracksFromList});
        }  
    }

    AddPlaylist = (e, form, props) =>{
        e.preventDefault();
        var data = new FormData(form[0]);
        data.append("playlist_name", this.name.value);
        for (let i = 0; i < this.state.file.length; i ++) {
            data.append('files[]', this.state.file[i]);
        };
        for (let i = 0; i < this.state.TracksFromList.length; i ++) {
            data.append('tracks[]', this.state.TracksFromList[i]);
        };
         const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('http://localhost/playlist/server/api.php', data , config )
            .then(function (response) {
                    props.remove();
                    props.RefreshPlaylists();   
            })
            .catch(function (error) {
                // console.log(error);
            });
        this.formSubmit.reset();
        this.setState({
            file: [],
            TracksFromList: []
        });
        
    }

  


  render() {

   if(this.props.ToPrint){

    let children = [];
    for (let i = 0; i < this.state.AddTrackForms; i ++) {
        children.push(<AddTrack key={i}  onChangeFile={this.onChangeFile}/>);
    };

    let tracks = [];
    if(this.state.ShowList){
        for (let i = 0; i < this.state.AllTracks.length; i ++) {     
            tracks.push(<TrackCheckbox Name={this.state.AllTracks[i].Name} Id={this.state.AllTracks[i].Id} onChectBox={this.onChectBox} key={i} />);
        };
    }
    



    return (

         <div id="add_playlist_form">
            <span className="glyphicon glyphicon-remove" id="remove_form" onClick={ () => this.props.remove()}></span>
            <form encType="multipart/form-data" id="uploade_form" ref={(input) => { this.formSubmit = input }} onSubmit={(e) => { this.submit = this.AddPlaylist(e, this, this.props) }}>
                <h2 id="addPlaylist">Add Playlist</h2>
                <p>
                    Playlist name: <input ref={(input) => { this.name = input }} type="text" name="playlist_name" id="playlistName" className ="form-control" required/>
                </p>
               
                    <h4>Playlist image: </h4>
                    <input type="file" ref={(input) => { this.files = input }} name="files[]" id="fileToUpload"  onChange={this.onChangeFile} accept="image/*"/>
                    <img id="image" src={this.imgSrc} alt="playlist img"/>
               
                <h4>Add tracks</h4>
                <div id="add_track">
                    {children}
                </div>
                
                <p>
                    <button type="button" onClick={this.addUplaodTrack} className="btn btn-default btn-lg w100" >
                        <span className="glyphicon glyphicon-plus" id="add_another_track">
                        </span>
                        Upload track
                    </button>
                </p>
                <p>
                    <button type="button" onClick={this.getAllTracks} className="btn btn-info btn-lg w100" id="track_list_button">
                        choose from list
                    </button>
                </p>
                <div id="track_list">
                    {tracks}
                </div>
                <p>
                    <button type="submit" className="btn btn-primary btn-lg w100" id="submit">
                        Add playlist
                    </button>
               </p>
            </form>
        </div>
          
        );
     }else{
         return null;
     }
  }
}

export default AddPlaylistForm;


  // fileReader = (input) => {
    //     onChange={this.fileReader().bind(this)}
    //     console.log(input);
    //     if (input.files && input.files[0]) {
    //         let reader = new FileReader();
    //         reader.onload = function(e) {
    //            this.imgSrc = e.target.result;
    //            console.log(this.imgSrc);
    //         }
    //         reader.readAsDataURL(input.files[0]);
    //     }
    // }
