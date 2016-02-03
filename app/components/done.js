(function () {
	'use stict';

	o.getModule('myApp')
		.createComponent({
			name: 'done',
			selector: "#app",
			template: templates.done,
			ctrlFunc: ctrlFunc
		})

		.registerRoute('/done')

		.addDataModel(o.getDataModel('todoList'));

		function ctrlFunc(getDataModel){
			var model = getDataModel('todoList');
			this.tasks = model;
		}

})();
