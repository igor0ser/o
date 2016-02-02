(function(){
	'use strict';

	var myApp = new o.Module('myApp');

	var data = [
		{
			id: 1,
			task: 'Watch JS Talks aboud Design Patterns',
			done: false
		},
		{
			id: 2,
			task: 'Create own awesome framework',
			done: false
		},
		{
			id: 3,
			task: 'Study English',
			done: true
		},
	];

	var todoList = new o.Data('todoList', data);

/*	var x = 1;
	var y = 2;
	console.log(`${ x } + ${ y } = ${ x + y}`);*/

})();