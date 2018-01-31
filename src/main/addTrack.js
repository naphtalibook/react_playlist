import React, { Component } from 'react';

class AddTrack extends Component{

    render(){
         return(
            <p><input  type="file" onChange={this.props.onChangeFile} name="files[]" className="add_track" accept="audio/mpeg"/> </p>
         )
    }
   
}
export default AddTrack;