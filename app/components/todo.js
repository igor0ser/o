(function () {
	'use stict';

	var template = '<table class="table"><tr><th>#</th><th>Task</th></tr><tr><td>1</td><td>2</td></tr><tr><td>1</td><td>2</td></tr></table>';

	o.getModule('myApp')
		.createComponent({
			name: 'todo',
			contoller: "controller will come soon :)",
			selector: "#app",
			template: template
		})

		.registerRoute('/todo')

		.addModel(o.getModel('todoList'));
})();