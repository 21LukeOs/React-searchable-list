import React from 'react';
import './ListItem.css';

const ListItem = props => {
	const { grades, pic, firstName, lastName, email, company, skill } = props.student;

	const gradesTypeNumber = grades.map(grade => {
		return parseInt(grade, 10);
	});

  const average = gradesTypeNumber.reduce((a, b) => a + b, 0) / grades.length;
  
  const fullName = `${firstName} ${lastName}`;

	return (
		<div className='list-item'>
			<img className='list-item__img' src={pic} alt={fullName} />
      <div className='list-item__info'>
        <h1 className='list-item__name'>{firstName} {lastName}</h1>
        <ul className='list-item__list'>
          <li className='list-item__li list-item__email'>Email: {email}</li>
          <li className='list-item__li list-item__company'>Company: {company}</li>
          <li className='list-item__li list-item__skill'>Skill: {skill}</li>
          <li className='list-item__li list-item__average'>Average: {average.toFixed(2)}%</li>
        </ul>
      </div>
		</div>
	);
};

export default ListItem;
