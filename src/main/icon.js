import React, { Component } from 'react';
import CircleType from 'circletype';




class Icon extends Component {
     constructor(props){
        super(props);
        this.bg = { 
            backgroundImage: 'url(http://localhost/playlist/server/'+ this.props.Img_path +')',
            border: '5px solid yellow'
        };
    }
componentDidMount(){
    let circleType = new CircleType(document.getElementById('name' + this.props.Id));
    circleType.radius(130);
}

  render() {
   
    return (
        
        <div className="playlist_container clearfix">
            <span className="glyphicon glyphicon-trash glyphicon-left" onClick={ () => this.props.deleteMe(this.props.Id, this.props.Name, this.props.index, true)}></span>
            <span className="glyphicon glyphicon-pencil glyphicon-right"  onClick={ () => this.props.editMe(this.props.Id, this.props.Name, this.props.Img_path, this.props.index)}></span>
            
            <div className="playlist" onClick={ () => this.props.playMe(this.props.Id, this.props.Name, this.props.Img_path)} style={this.bg} >
                <h3 id={'name' + this.props.Id} className="playlist_name">{this.props.Name}</h3>
                <span className="glyphicon glyphicon-play glyphicon-play-playlist"></span> 
            </div>
            
        </div>
    ); 
  }
}

export default Icon;
