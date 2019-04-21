import React, { useState } from 'react';
import axios from 'axios';

const Todo = props => {
	const [todoName, setTodoName] = useState('');
	const [todoList, setTodoList] = useState([]);

	// const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });

	const inputChangeHandler = event => {
		setTodoName(event.target.value);
		// setTodoState({
		//   userInput: event.target.value,
		//   todoList: todoState.todoList
		// });
	};

	const addTodoHandler = () => {
		setTodoList(todoList.concat(todoName));
		// setTodoState({
		//   userInput: todoState.userInput,
		//   todoList: todoState.todoList.concat(todoState.userInput)
		// });
	};

	return (
		<React.Fragment>
			<input
				type='text'
				placeholder='Todo'
				onChange={inputChangeHandler}
				value={todoName}
			/>
			<button onClick={addTodoHandler}>Add</button>
			<ul>
				{todoList.map(todo => (
					<li key={todo}>{todo}</li>
				))}
			</ul>
		</React.Fragment>
	);
};

export default Todo;
