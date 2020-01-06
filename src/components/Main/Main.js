import React from 'react';
import './Main.css';
import axios from 'axios';
import ListItem from '../ListItem/ListItem';

class Main extends React.Component {
	state = { data: [], search: '' };

	getStudents = () => {
    axios
      .get(`https://www.hatchways.io/api/assessment/students`)
      .then(res => {
        this.setState({
          data: res.data.students
        });
      });
  };
  
  search = (e) => {
    this.setState({ search: e.target.value })
  }

	componentDidMount() {
		this.getStudents();
  }

  

	render() {
    const filteredStudents = this.state.data.filter(student => {
      return student.firstName.toLowerCase().includes(this.state.search.toLocaleLowerCase())
    }) 

		return (
      <div className='container'>
        <input className='name-input' id='name-input' type="text" placeholder='Search by name' onChange={this.search} />
        <div className='student-list'>
          {this.state.data ? (
              filteredStudents.map(student => (
                <ListItem key={student.id} student={student} />
              ))
            ) : <h4>No students found...</h4>}
        </div>
      </div>
    )
	}
}

export default Main;