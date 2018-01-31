import React, { Component } from 'react';


class SerchItem extends Component {
  render() {

    return (
        <p  className="serchResaltItem" onClick={ () => this.props.playMe(this.props.Id, this.props.Name, this.props.Img_path)}><img className="smallImg" alt=""src={ 'http://localhost/playlist/server/'+ this.props.Img_path }/> {this.props.Name}</p>   
    );
  }
}

export default SerchItem;