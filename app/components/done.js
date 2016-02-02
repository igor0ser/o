(function () {
	'use stict';

	var template = '<h3 class="text-center">Done tasks</h3><table class="table"><tr><th>#</th><th>Task</th></table>';

	o.getModule('myApp')
		.createComponent({
			name: 'done',
			selector: "#app",
			template: template
		})

		.registerRoute('/done')

		.addData(o.getData('todoList'))

		.applyController(function(compEl, getDataModel){
			var table = compEl.querySelector('tbody');
			var model = getDataModel('todoList');

			var j = 1;
			for (var i = 0; i < model.length; i++) {
				if (!model[i].done) continue;
				var tr = document.createElement('tr');
				tr.innerHTML = '<td>' + j + '</td><td>' + model[i].task +  '</td>';
				table.appendChild(tr);
				j++;
			}
		});
})();
