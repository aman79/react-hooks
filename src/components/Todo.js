import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';
import List from './List';

const Todo = props => {
	const [inputIsValid, setInputIsValid] = useState(false);
	//const [todoName, setTodoName] = useState('');
	//const [submittedTodo, setSubmittedTodo] = useState(null);
	//	const [todoList, setTodoList] = useState([]);

	// const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });

	const todoInputRef = useRef();

	const todoListReducer = (state, action) => {
		switch (action.type) {
			case 'ADD':
				return state.concat(action.payload);
			case 'SET':
				return action.payload;
			case 'REMOVE':
				return state.filter(todo => todo.id !== action.payload);

			default:
				return state;
		}
	};

	const [todoList, dispatch] = useReducer(todoListReducer, []);

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
				//setTodoList(todos);
				dispatch({ type: 'SET', payload: todos });
			});

		return () => {
			console.log('Cleanup');
		};
	}, []);

	const inputValidationHandler = event => {
		if (event.target.value.trim() === '') {
			setInputIsValid(false);
		} else {
			setInputIsValid(true);
		}
	};
	// const mouseMoveHandler = event => {
	//	console.log(event.clientX, event.clientY);
	// };

	// useEffect(() => {
	// 	document.addEventListener('mousemove', mouseMoveHandler);
	// 	return () => {
	// 		document.removeEventListener('mousemove', mouseMoveHandler);
	// 	};
	// }, []);

	// useEffect(() => {
	// 	if (submittedTodo) {
	// 		//setTodoList(todoList.concat(submittedTodo));
	// 		dispatch({ type: 'ADD', payload: submittedTodo });
	// 	}
	// }, [submittedTodo]);

	// const inputChangeHandler = event => {
	// 	setTodoName(event.target.value);
	// 	// setTodoState({
	// 	//   userInput: event.target.value,
	// 	//   todoList: todoState.todoList
	// 	// });
	// };

	const addTodoHandler = () => {
		//	setTodoList(todoList.concat(todoName));
		// setTodoState({
		//   userInput: todoState.userInput,
		//   todoList: todoState.todoList.concat(todoState.userInput)
		// });

		const todoName = todoInputRef.current.value;
		axios
			.post('https://new-project-54039.firebaseio.com/todos.json', {
				name: todoName
			})
			.then(response => {
				setTimeout(() => {
					const todoItem = { id: response.data.name, name: todoName };
					//setTodoList(todoList.concat(todoItem));
					//	setSubmittedTodo(todoItem);
					dispatch({ type: 'ADD', payload: todoItem });
				}, 3000);
			})
			.then(err => {
				console.log(err);
			});
	};

	const todoRemoveHandler = todoId => {
		axios
			.delete(`https://new-project-54039.firebaseio.com/todos/${todoId}.json`)
			.then(res => {
				dispatch({ type: 'REMOVE', payload: todoId });
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<React.Fragment>
			<input
				type='text'
				placeholder='Todo'
				// onChange={inputChangeHandler}
				// value={todoName}
				ref={todoInputRef}
				onChange={inputValidationHandler}
				style={{ backgroundColor: inputIsValid ? 'transparent' : 'red' }}
			/>
			<button onClick={addTodoHandler}>Add</button>
			{useMemo(
				() => (
					<List items={todoList} onClick={todoRemoveHandler} />
				),
				[todoList]
			)}
		</React.Fragment>
	);
};

export default Todo;
