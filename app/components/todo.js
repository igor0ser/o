(function () {
	'use stict';

	var template = '<h3 class="text-center">Tasks to do</h3><table class="table"><tr><th>#</th><th>Task</th><th>Done</th></table>';

	o.getModule('myApp')
		.createComponent({
			name: 'todo',
			selector: "#app",
			template: template
		})

		.registerRoute('/todo')

		.addData(o.getData('todoList'))

		.applyController(function(compEl, getDataModel){
			var table = compEl.querySelector('tbody');
			var model = getDataModel('todoList');

			var j = 1;
			for (var i = 0; i < model.length; i++) {
				if (model[i].done) continue;
				var tr = document.createElement('tr');
				tr.innerHTML = '<td>' + j + '</td><td>' + model[i].task +
								'</td><td><button class="btn btn-info" data-o-id="' +
								model[i].id + '">Done</button></td>';
				table.appendChild(tr);
				j++;
			}
		})

		.addListener('click', 'button[data-o-id]', 'todoList', function(event){

			return function(compEl, getDataModel){
				var id = event.target.getAttribute('data-o-id');
				var model = getDataModel('todoList');

				for (var i = 0; i < model.length; i++) {
					if (model[i].id == id){
						model[i].done = true;
						return;
					}
				}
			}
		});

})();