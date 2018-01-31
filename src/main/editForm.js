import React, { Component } from 'react';
import TrackCheckbox from './trackCheckbox';
import axios from 'axios';
import AddTrack from './addTrack';

class EditForm extends Component{
    constructor(){
        super();
        this.state = {
            EditedName: '',
            AllTracks: [],
            AllTracksInPlaylist: [],
            AddTrackForms: 0,
            file: [],
            TracksFromList: [],
            nameStyle:{display: "block"},
            imgStyle: {display: "none"},
            tracksStyle: {display: "none"}
        }
        this.CanAppendAnotherUplode = true;
    }
   
      addUplaodTrack = () => {
        if(this.CanAppendAnotherUplode){
            this.setState({AddTrackForms: this.state.AddTrackForms + 1}); 
            this.CanAppendAnotherUplode = false;
        }
    }
     

    onChangeFile = (e) => {
        this.CanAppendAnotherUplode = true;
        let file = [...this.state.file];
        file.push(e.target.files[0])
        this.setState({file});

        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('editImage').src = e.target.result;
                //  this.imgSrc = e.target.result;
                // this.setState({imgReader: e.target.result});
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    
    EditImg = (props) =>{
        if(this.state.EditedName === ''){
            console.log('empty');
            this.setState({EditedName: this.props.EditPlaylist.Name});
        }
        console.log(this.props.EditPlaylist.Name);
        this.setState({
            nameStyle:{display: "none"},
            imgStyle: {display: "block"},
        });
    }
    EditTracks = () =>{
        if(this.state.file.length > 0){
            axios.patch('http://localhost/playlist/server/api.php?action=get_all_tracks').then((resalt) => {
                this.setState({
                    AllTracks: resalt.data,
                    imgStyle: {display: "none"},
                    tracksStyle: {display: "block"},
                });
            }); 

            axios.patch('http://localhost/playlist/server/api.php?id='+this.props.EditPlaylist.Id).then((resalt) => {
                let TracksFromList = [];
                for (var index = 0; index < resalt.data.length; index++) {
                TracksFromList.push(resalt.data[index].Id) 
                }
                this.setState({AllTracksInPlaylist: resalt.data, TracksFromList });
            });
        }
    }
    HandelNameChange = (event) => {
        this.setState({EditedName: event.target.value});  
    }
    onChectBox = (e) => {
        if(e.target.checked){
            let TracksFromList = [...this.state.TracksFromList];
            console.log(TracksFromList);
            TracksFromList.push(e.target.value);
            console.log(TracksFromList);
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
        props.deleteMe(props.EditPlaylist.Id, props.EditPlaylist.Index, false);
        var data = new FormData(form[0]);
        data.append("playlist_name", this.state.EditedName);
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
                props.RefreshPlaylists();
                props.removeEdit();
                this.formSubmit.reset();

            })
            .catch(function (error) {
                // console.log(error);
            });
            props.removeEdit(); 
            this.setState({
                EditedName: '',
                AllTracks: [],
                AllTracksInPlaylist: [],
                AddTrackForms: 0,
                file: [],
                TracksFromList: [],
                nameStyle:{display: "block"},
                imgStyle: {display: "none"},
                tracksStyle: {display: "none"}
            });
        
    }
    render(){
        let PlaylistTracks = [];
        if(this.state.AllTracksInPlaylist !== 'no tracks'){
            for (let i = 0; i < this.state.AllTracksInPlaylist.length; i ++) {     
                PlaylistTracks.push(<TrackCheckbox Name={this.state.AllTracksInPlaylist[i].Name} Id={this.state.AllTracksInPlaylist[i].Id} onChectBox={this.onChectBox} key={i} defaultChecked={true} />);
            }
        }

        let AllTracks = [];
        let flag = false;
        for (let k = 0; k < this.state.AllTracks.length; k ++) {  
            for (let j = 0; j < PlaylistTracks.length; j ++) { 
                if(this.state.AllTracks[k].Id === PlaylistTracks[j].props.Id){
                    flag = true;
                }
            }
            if(flag === false){
                AllTracks.push(<TrackCheckbox Name={this.state.AllTracks[k].Name} Id={this.state.AllTracks[k].Id} onChectBox={this.onChectBox} defaultChecked={false} key={k} />);
            }
            flag = false;
        }

        let children = [];
        for (let i = 0; i < this.state.AddTrackForms; i ++) {
            children.push(<AddTrack key={i}  onChangeFile={this.onChangeFile}/>);
        }
    
        if(this.props.ToEditForm){

            return(
                <div id="editplaylist">
                    <form encType="multipart/form-data" id="edit_form" ref={(input) => { this.formSubmit = input }} onSubmit={(e) => { this.submit = this.AddPlaylist(e, this, this.props) }}>
                        <div id="editName" className="editBox" style={this.state.nameStyle}>
                            <h4> Edit Name</h4>
                            <p><input type="text" value={this.state.Name} onChange={this.HandelNameChange.bind(this)} placeholder={this.props.EditPlaylist.Name} className="form-control"/></p>
                            <button type="button" className="btn btn-success w100" onClick={this.EditImg}>Next</button>
                        </div>
                    
                        <div id="editImg" className="editBox" style={this.state.imgStyle}>
                            <h4> Choose an Image</h4>
                            <img src="" id="editImage" width="310px" alt="playlist img"/>
                            <p><input type="file" ref={(input) => { this.files = input }} name="files[]" id="fileToUpload"  onChange={this.onChangeFile} accept="image/*"/></p>
                            <button type="button" className="btn btn-success w100" onClick={this.EditTracks}>Next</button>
                        </div>
                        
                        <div id="editTracks" className="editBox" style={this.state.tracksStyle}>
                            <h4> Edit Tracks</h4>
                            {PlaylistTracks}
                            {AllTracks}
                            {children}
                             <p>
                                <button type="button" onClick={this.addUplaodTrack} className="btn btn-default btn-lg" >
                                    <span className="glyphicon glyphicon-plus" id="add_another_track">
                                    </span>
                                    Upload track
                                </button>
                            </p>
                            <button type="submit" className="btn btn-success w100">Finish</button>
                        </div>
                       
                        </form>
                        
                </div>
            )
        }else{
            return null;
        }
    }
   
}
export default EditForm;