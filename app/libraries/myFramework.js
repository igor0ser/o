(function(global){
	'use strict';

	//constants
	var ROUTE_EVENT_NAME = 'hashchange';
	var doc = global.document;

	var routes = Symbol('routes');
	var components = Symbol('components');

	var componentsList = [
	];


	class Module{
		constructor(name){
			this.name = name;
			this[components] = [];
			this[routes] = [];
		}
		addComponent(obj){
			var comp = new Component(obj.controller, obj.selector, obj.template);
			this[components].push(comp);
			return comp;
		}
		registerRoute(routeName, comp){
			this[routes].push({routeName, comp});
		}
	}

	class Component{
		contructor(controller, selector, template){
			this.controller = controller;
			this.selector = selector;
			this.template = template;
		}

		activate(){
			doc.querySelector(selector).innerHTML = template;
		}
	}




	global.addEventListener(ROUTE_EVENT_NAME, routeListener);



	function routeListener(event) {
		var URL = event.newURL.split('#')[1];
		goThroughRoutesList(URL);
	}

	function goThroughRoutesList(URL) {
		for (var i = 0; i < componentsList.length; i++) {
			if (URL === componentsList[i].route){
				var el = doc.querySelector(componentsList[i].selector);
				el.innerHTML = componentsList[i].template;
			}
		}
	}

	function addComponent(component){
		componentsList.push(component);
	}








	var myFramework = {
		Module: Module
	};
	myFramework.addComponent = addComponent;
/*	myFramework.Module = Module;*/
	global.o = myFramework;

})(window);