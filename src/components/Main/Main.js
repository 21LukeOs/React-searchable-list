import React from 'react';
import './Main.css';
import axios from 'axios';
import ListItem from '../ListItem/ListItem';

class Main extends React.Component {
	state = {
    data: [], 
    searchNames: '', 
    searchTags: '',
  };

	getStudents = () => {
		axios.get(`https://www.hatchways.io/api/assessment/students`).then(res => {
			this.setState({
				data: res.data.students
			});
		});
	};

	searchNames = e => {
		this.setState({ searchNames: e.target.value });
  };
  
  handleTagUpdate = (newTag, id) => {
    this.setState(prevState => ({ data: this.state.data.map(student => {
      if(student.id === id && prevState.tags) {
        student.tags = prevState.tags.concat(newTag);
      }
      if(student.id === id && !prevState.tags) {
        student.tags = [newTag];
      }
      return student;
    }) }))
  }
  //tags: prevState.tags.concat(newTag)

	searchTags = e => {
		this.setState({ searchTags: e.target.value });
	};

	componentDidMount() {
    this.getStudents();
    // this.setState({ data: this.state.data.map(student => {
    //     return student.tags = [];
    // }) })
	}

	render() {
    console.log(this.state.data)
		const filteredStudents = this.state.data.filter(student => {
			const fullName = student.firstName + ' ' + student.lastName;
			return fullName
				.toLowerCase()
				.includes(this.state.searchNames.toLowerCase());
		});

		// const filteredByTags = this.state.data.filter(student => {
		//   return student.tags.toLowerCase().includes(this.state.searchTags.toLowerCase())
		// })

		return (
			<div className='container'>
				<input
					className='name-input'
					id='name-input'
					type='text'
					placeholder='Search by name'
					onChange={this.searchNames}
				/>
				<input
					className='tag-search'
					id='tag-search'
					type='text'
					placeholder='Search by tags'
					onChange={this.searchTags}
				/>
				<div className='student-list'>
					{this.state.data ? (
						filteredStudents.map(student => (
							<ListItem key={student.id} student={student} tags={this.state.tags} setTags={this.handleTagUpdate} />
						))
					) : (
						<h4>No students found...</h4>
					)}
				</div>
			</div>
		);
	}
}

export default Main;
