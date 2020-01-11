import React from 'react';
import './ListItem.css';
import plus from '../../assets/plus-icon.svg';
import minus from '../../assets/minus-icon.svg';

class ListItem extends React.Component {
	state = {
		isToggleGradesOn: false
	};

	handleClickGrades = () => {
		this.setState(state => ({
			isToggleGradesOn: !state.isToggleGradesOn
		}));
  };
  
  handleChange = (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      this.props.setTags(e.target.value, e.target.id);
      e.target.value = '';
    }
	};

	render() {
		const {
      id,
			ratings,
			pic,
			firstName,
			lastName,
			email,
			company,
      city,
      tags
		} = this.props.student;

		const gradesTypeNumber = ratings.map(grade => {
			return parseInt(grade, 10);
		});

		const average = gradesTypeNumber.reduce((a, b) => a + b, 0) / ratings.length;

    const fullName = `${firstName} ${lastName}`;

		const allGrades = ratings.map((grade, i) => {
			return (
				<div className='each-grade' key={grade * Math.random()}>
					<span>Rating {i + 1}:</span>
					<span>{grade}/100</span>
				</div>
			);
		});

		const gradesAndTags = (
			<>
				<div className='all-grades'>{allGrades}</div>
				<div className='tags'>{tags ? tags.map(tag => {return <div className='tag' key={Math.random()}>{tag}</div>}) : null}</div>
				<input className='add-tag-input' type='text' placeholder='Add a tag' id={id} onKeyDown={this.handleChange} />
			</>
		);

		return (
			<div className='list-item'>
				<img className='list-item__img' src={pic} alt={fullName} />
				<div className='list-item__info'>
					<h1 className='list-item__name'>
						{firstName} {lastName}
					</h1>
					<ul className='list-item__list'>
						<li className='list-item__li list-item__email'>Email: {email}</li>
						<li className='list-item__li list-item__company'>
							Company: {company}
						</li>
						<li className='list-item__li list-item__skill'>City: {city}</li>
						<li className='list-item__li list-item__average'>
							Avg Rating: {average.toFixed(2)}/100
						</li>
					</ul>
					{this.state.isToggleGradesOn ? gradesAndTags : !gradesAndTags}
				</div>
				<div className='plus-minus-cont'>
					{this.state.isToggleGradesOn ? (
						<img
							className='expand-btn'
							src={minus}
							alt='minimize'
							onClick={this.handleClickGrades}
						/>
					) : (
						<img
							className='expand-btn'
							src={plus}
							alt='expand'
							onClick={this.handleClickGrades}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default ListItem;
