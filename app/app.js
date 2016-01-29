(function(){
	'use strict';
	var template1 = '<ul><li><b>Lorem ipsum dolor.</b></li><li><b>Laudantium, consequuntur ex?</b></li><li><b>Laboriosam, autem, accusamus.</b></li><li><b>Voluptas, vitae? Maiores.</b></li><li><b>Commodi, perferendis neque.</b></li></ul>';
	var template2 = '<img src="http://www.spectrain.co.uk/wp-content/uploads/2013/02/Framework-Green_opt.jpg" alt="" />';



	var myApp = new o.Module('myApp');
	var comp1 = myApp.createComponent({
		contoller: "controller will come soon :)",
		selector: "#test",
		template: template1
	});
	comp1.registerRoute('/test1');

	var comp2 = myApp.createComponent({
		controller: "controller will come soon :)",
		selector: "#test",
		template: template2
	});
	comp2.registerRoute('/test2');



})();