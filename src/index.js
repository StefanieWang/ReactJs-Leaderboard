import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';


class TableRow extends React.Component {
	render(){
		const userInfo = this.props.userInfo;
		const userIndex = this.props.userIndex;
		return (
			<tr className="table-data">
			    <td key={userIndex+'index'} className="col-sm-1">{userIndex + 1}</td>
			    <td key={userIndex+'name'} className="col-sm-4" style={{textAlign: 'left'}}>
			        <img src={userInfo.img} alt={'image of '+userInfo.username}/> {userInfo.username}
			    </td>
			    <td key={userIndex+'recent'} className="col-sm-4">{userInfo.recent}</td>
			    <td key={userIndex+'alltime'} className="col-sm-3">{userInfo.alltime}</td>
			</tr>
		)
	}

}

class TableBody extends React.Component {
	render(){
		const userArray = this.props.userArray;
		const userList = userArray.map((user, index) => 
			{return <TableRow key={index} userInfo={user} userIndex={index} />});
		return (<tbody>{userList}</tbody>);
	}
}

class LeaderBoard extends React.Component {
	constructor(){
		super();
		this.state={
			userArray: [{"username":"anthonygallina1","img":"https://avatars.githubusercontent.com/u/11003055?v=3","alltime":4680,"recent":538,"lastUpdate":"2017-05-25T13:12:38.348Z"},{"username":"sjames1958gm","img":"https://avatars.githubusercontent.com/u/4639625?v=3","alltime":7136,"recent":531,"lastUpdate":"2017-05-25T13:12:45.512Z"},{"username":"indefinite0212","img":"https://avatars1.githubusercontent.com/u/26141499?v=3","alltime":1019,"recent":525,"lastUpdate":"2017-05-24T13:22:36.041Z"}],
		    url: 'https://fcctop100.herokuapp.com/api/fccusers/top/'
		}
		this.setState = this.setState.bind(this);
		this.sortLeader=this.sortLeader.bind(this);
	}
    
    sortLeader(e){
    	let sortMethod;
    	if(e.target === this.refs.recent){
           sortMethod = 'recent';
    	}else {
    	   sortMethod = 'alltime';
    	};
        let url = this.state.url;
        url = url + sortMethod;
        this.getData(url);
    }

    getData(url){
    	console.log(url);
    	$.getJSON(url, (data) => this.setState({userArray: data}))

    }

    componentDidMount(){
       const url = this.state.url + 'recent';
       this.getData(url);
    }

	render(){
		return (
			<table>
			    <caption className="table-title"><h1>Free Code Camp Leader Board</h1></caption>
			    <thead>
			      <tr className="table-head">
			        <th className="col-sm-1"><h3>#</h3></th>
			        <th className="col-sm-4">Camper Name</th>
			        <th className="col-sm-4 sort" ref="recent" onClick={this.sortLeader}>Points in past 30 days</th>
			        <th className="col-sm-3 sort" ref="alltime" onClick={this.sortLeader}>All time points</th>
			      </tr>
			    </thead>
			    <TableBody userArray={this.state.userArray} />
			</table>
		)
	}
}
ReactDOM.render(<LeaderBoard />, document.getElementById('app'));
