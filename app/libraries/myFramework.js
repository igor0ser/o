(function(global){
	'use strict';

	//constants
	var ROUTE_EVENT_NAME = 'hashchange';
	var doc = global.document;

	var routes = Symbol('routes');
	var components = Symbol('components');

	var routesList = [
	];


	class Module{
		constructor(name){
			this.name = name;
			this[components] = [];
			this[routes] = [];
		}
		createComponent(obj){
			var comp = new Component(obj.controller, obj.selector, obj.template);
			this[components].push(comp);
			return comp;
		}
	}

	class Component{
		constructor(controller, selector, template){
			this.controller = controller;
			this.selector = selector;
			this.template = template;
		}

		activate(){
			doc.querySelector(this.selector).innerHTML = this.template;
		}

		registerRoute(routeName){
			routesList.push({
				routeName: routeName,
				component: this
			});
		}

	}

	console.log(doc.querySelector('#test'));

	function hashChangeListener(event) {
		var URL = event.newURL.split('#')[1];
		goThroughRoutesList(URL);
	}

	function goThroughRoutesList(URL) {
		for (var i = 0; i < routesList.length; i++) {
			if (URL === routesList[i].routeName){
				routesList[i].component.activate();
			}
		}
	}

	global.addEventListener(ROUTE_EVENT_NAME, hashChangeListener);



	var myFramework = {
		Module: Module
	};
	global.o = myFramework;

})(window);