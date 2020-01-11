import React from 'react';
import './Main.css';
import axios from 'axios';
import ListItem from '../ListItem/ListItem';

class Main extends React.Component {
	state = {
    data: [], 
    searchNames: '', 
    searchTags: ''
  };

	getStudents = () => {
		axios.get(`https://api.jsonbin.io/b/5e1938578d761771cc8ec661`).then(res => {
			this.setState({
				data: res.data.students
			});
		});
  };
  
  componentDidMount() {
    this.getStudents();
	}

	searchNames = e => {
		this.setState({ searchNames: e.target.value });
  };
  
  handleTagUpdate = (newTag, id) => {
    this.setState(prevState => ({ data: this.state.data.map((student, i) => {
      if(student.id === id && prevState.data[i].tags) {
        student.tags = student.tags.concat(newTag);
        return student;
      }
      if(student.id === id && !prevState.data[i].tags) {
        student.tags = [newTag];
        return student;
      }
      return student;
    }) }))
  }

	render() {
		const filteredStudents = this.state.data.filter(student => {
      const fullName = student.firstName + ' ' + student.lastName;
      return fullName.toLowerCase().includes(this.state.searchNames.toLowerCase());
    });
    
		return (
			<div className='container'>
				<input
					className='name-input'
					id='name-input'
					type='text'
					placeholder='Search by name'
					onChange={this.searchNames}
				/>
				<div className='student-list'>
					{
						filteredStudents.map(student => (
							<ListItem key={student.id} student={student} setTags={this.handleTagUpdate} />
						))
					}
				</div>
			</div>
		);
	}
}

export default Main;
