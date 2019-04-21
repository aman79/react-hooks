import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = props => {
	const [todoName, setTodoName] = useState('');
	const [todoList, setTodoList] = useState([]);

	// const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });

	useEffect(() => {
		axios
			.get('https://new-project-54039.firebaseio.com/todos.json')
			.then(res => {
				console.log(res);
				const todoData = res.data;
				const todos = [];
				for (const key in todoData) {
					if (todoData.hasOwnProperty(key)) {
						todos.push({ id: key, name: todoData[key].name });
					}
				}
				setTodoList(todos);
			});

		return () => {
			console.log('Cleanup');
		};
	}, [todoName]);
	const mouseMoveHandler = event => {
		console.log(event.clientX, event.clientY);
	};

	useEffect(() => {
		document.addEventListener('mousemove', mouseMoveHandler);
		return () => {
			document.removeEventListener('mousemove', mouseMoveHandler);
		};
	}, []);

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

		axios
			.post('https://new-project-54039.firebaseio.com/todos.json', {
				name: todoName
			})
			.then(response => {
				console.log(response);
			})
			.then(err => {
				console.log(err);
			});
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
					<li key={todo.id}>{todo.name}</li>
				))}
			</ul>
		</React.Fragment>
	);
};

export default Todo;
