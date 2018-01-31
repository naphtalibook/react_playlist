
import React, { Component } from 'react';


class TrackCheckbox extends Component {

  render() {

    return (
        <p><input defaultChecked={this.props.defaultChecked} ref={(input) => { this.tracks = input }} onChange={ (e) => this.props.onChectBox(e)} type="checkbox" value={this.props.Id} name="tracks[]"/> {this.props.Name}</p>  
    );
  }
}

export default TrackCheckbox;
// onChange={ () => this.props.onChectBox(this.tracks.value)}