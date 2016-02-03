(function () {
	'use stict';

	//var template = '<h3 class="text-center">Done tasks</h3><table class="table"><tr><th>#</th><th>Task</th></table>';

	var template = document.getElementById('done-template').innerHTML;
	var t1 = Handlebars.compile(template);


	o.getModule('myApp')
		.createComponent({
			name: 'done',
			selector: "#app",
			template: template,
			ctrlFunc: ctrlFunc
		})

		.registerRoute('/done')

		.addData(o.getData('todoList'));

		function ctrlFunc(getDataModel){
			var model = getDataModel('todoList');
			this.tasks = model;
		}


		

		/*applyController(function(compEl, getDataModel){
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
		});*/
})();
