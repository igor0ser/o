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
		}
	];

	var todoList = new o.Model('todoList', data);

})();