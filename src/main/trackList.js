import React, { Component } from 'react';


class TrackList extends Component {
  render() {

    return (

         <li className="appended_track_list" onClick={ () => this.props.ChangeActive(this)} > {this.props.Name}</li>
          
    );
  }
}

export default TrackList;
//onclick="playMe(this)"