import React from 'react';
import './List.css';
import ListItem from '../ListItem/ListItem';

const List = props => {
  const students = props.students.map(student => {
    return <ListItem key={student.id} student={student} />
  })

	return (
		<div className='list'>
			<div className='student-list'>
        {students}
      </div>
		</div>
	);
};

export default List;