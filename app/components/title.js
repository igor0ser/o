(function () {
	'use stict';

	var template = 'You have <span id="done"></span> done cases and <span id="undone"></span> undone cases';

	o.getModule('myApp')
		.createComponent({
			name: 'title',
			selector: "#title",
			template: template
		})

		.addData(o.getData('todoList'))

		.applyController(function(compEl, getDataModel){
			var spanDone = compEl.querySelector('#done');
			var spanUndone = compEl.querySelector('#undone');
			var model = getDataModel('todoList');
			var done = 0;
			var undone = 0;


			for (var i = 0; i < model.length; i++) {
				if (model[i].done){
					done++;
				} else {
					undone++;
				}
			}

			spanDone.innerHTML = done;
			spanUndone.innerHTML = undone;
		})

		.activate();
})();
