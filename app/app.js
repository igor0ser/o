(function(){
	'use strict';
	var template1 = '<ul><li><b>Lorem ipsum dolor.</b></li><li><b>Laudantium, consequuntur ex?</b></li><li><b>Laboriosam, autem, accusamus.</b></li><li><b>Voluptas, vitae? Maiores.</b></li><li><b>Commodi, perferendis neque.</b></li></ul>';
	var template2 = '<img src="http://www.spectrain.co.uk/wp-content/uploads/2013/02/Framework-Green_opt.jpg" alt="" />'


	var component1 = {
		route: '/test1',
		selector: '#test',
		template: '<ul><li><b>Lorem ipsum dolor.</b></li><li><b>Laudantium, consequuntur ex?</b></li><li><b>Laboriosam, autem, accusamus.</b></li><li><b>Voluptas, vitae? Maiores.</b></li><li><b>Commodi, perferendis neque.</b></li></ul>'
	};

	var component2 = {
		route: '/test2',
		selector: '#test',
		template: '<img src="http://www.spectrain.co.uk/wp-content/uploads/2013/02/Framework-Green_opt.jpg" alt="" />'
	};


	o.addComponent(component1);
	o.addComponent(component2);


	class Polygon {
	  constructor(height, width) {
	    this.height = height;
	    this.width = width;
	  }
	}

	var p = new Polygon(100, 202); 
	console.log(p);

	var app = new o.Module('app');
	console.log(app);



})();