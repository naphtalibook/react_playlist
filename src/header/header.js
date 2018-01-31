import React, { Component } from 'react';
import SerchItem from './serchItem';

class Header extends Component {
    constructor(){
        super();
        this.state = {value: ''}

        // this.HandelSerchChange = this.HandelSerchChange.bind(this);
    }
    HandelSerchChange = (event) => {
        this.setState({value: event.target.value}, () =>{
            this.props.Serch(this.state.value);
        });  
    }
    AppendSerchResalt = () =>{
        let resalt = [];
         for(let i = 0; i < this.props.SerchResalt.length; i++){ 
            let x = <SerchItem Name={this.props.SerchResalt[i].Name} Img_path={this.props.SerchResalt[i].Img_path} Id={this.props.SerchResalt[i].Id} playMe={this.props.playMe} key={i}/>; 
            resalt.push(x);
        }
        return resalt;
    }
   

  render() {

    return (
        <header className="clearfix">
            <button type="button" id="add_playlist_button" className="btn btn-info" onClick={ () => this.props.PrintForm()}>
                <span className="glyphicon glyphicon-plus"></span>
                <span>Add Playlist</span>
            </button>
            <div id="serch">
                <input id="serch_text" type="text"  value={this.state.value} onChange={this.HandelSerchChange.bind(this)} placeholder="serch..."/>
                <div id="serchResalt">
                    {this.AppendSerchResalt()}
                </div>
            </div>
        </header>
    );
  }
}

export default Header;