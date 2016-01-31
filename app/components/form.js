(function () {
	'use stict';

	var template = '<h1>Add some task</h1><form><input type="text" palceholder="add another task here"/><input type="submit"/></form>';

	o.getModule('myApp')
		.createComponent({
			name: 'form',
			contoller: "controller will come soon :)",
			selector: "#app",
			template: template
		})
		.registerRoute('/form');
})();