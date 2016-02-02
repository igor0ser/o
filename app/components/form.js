(function () {
	'use stict';

	var template = '<h3 class="text-center">Add some task</h3><form class="text-center"><input required type="text" placeholder="Type another task here..." class="input-text form-control"/><button class="btn btn-info">Add task</button></form>';

	o.getModule('myApp')
		.createComponent({
			name: 'form',
			selector: "#app",
			template: template
		})

		.registerRoute('/form')

		.addData(o.getData('todoList'))

		.addListener('submit', 'form', 'todoList', function(event){
			event.preventDefault();
			return function(compEl, getDataModel){
				var model = getDataModel('todoList');

				model.push({
					id: model[model.length-1].id + 1,
					task: compEl.querySelector('.input-text').value,
					done: false
				});
			};
		});
})();
