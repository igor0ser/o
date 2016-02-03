(function () {
	'use stict';

	//var template = 'You have <span id="done"></span> done cases and <span id="undone"></span> undone cases';
	var template = document.getElementById('title-template').innerHTML;


	o.getModule('myApp')
		.createComponent({
			name: 'title',
			selector: "#title",
			template: template,
			ctrlFunc: ctrlFunc
		})

		.addData(o.getData('todoList'))

		.activate();

		function ctrlFunc(getDataModel){
			var model = getDataModel('todoList');
			this.done = 0;
			this.undone = 0;

			for (var i = 0; i < model.length; i++) {
				if (model[i].done){
					this.done++;
				} else {
					this.undone++;
				}
			}

		}
})();

/*		.applyController(function(compEl, getDataModel){
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
		})*/
