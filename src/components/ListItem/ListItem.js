import React from 'react';
import './ListItem.css';
import plus from '../../assets/plus-icon.svg';
import minus from '../../assets/minus-icon.svg';

class ListItem extends React.Component {

  state = {
    isToggleGradesOn: false
  }

  handleClickGrades = () => {
    this.setState(state => ({
      isToggleGradesOn: !state.isToggleGradesOn
    }));
  }

  render() {
    const { grades, pic, firstName, lastName, email, company, skill } = this.props.student;

    const gradesTypeNumber = grades.map(grade => {
      return parseInt(grade, 10);
    });

    const average = gradesTypeNumber.reduce((a, b) => a + b, 0) / grades.length;
    
    const fullName = `${firstName} ${lastName}`;

    const allGrades = grades.map((grade, i) => {
      return <li className='each-grade' key={grade * Math.random()}><span>Test {i + 1}:</span><span>{grade}%</span></li>;
    })

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
          <ul className='all-grades'>
            { this.state.isToggleGradesOn ? allGrades : !allGrades }
          </ul>
        </div>
        <div className='plus-minus-cont'>
          { this.state.isToggleGradesOn ? <img className='minus' src={minus} alt='subtract' onClick={this.handleClickGrades} /> : <img className='plus' src={plus} alt='expand' onClick={this.handleClickGrades} /> }
        </div>
      </div>
    );
  };
};

export default ListItem;
