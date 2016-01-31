(function () {
	'use stict';

	var template = 'done tasks';

	o.getModule('myApp')
		.createComponent({
			name: 'done',
			contoller: "controller will come soon :)",
			selector: "#app",
			template: template
		})
		.registerRoute('/done');
})();