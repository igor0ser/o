(function(global){
	'use strict';

	//constants
	var ROUTE_EVENT_NAME = 'hashchange';
	var doc = global.document;

	var routes = Symbol('routes');
	var components = Symbol('components');

	var routesList = [];
	var modules = {};
	var models = {};

	class Module{
		constructor(name){
			this[components] = [];
			this[routes] = [];

			modules[name] = this;

		}
		createComponent(obj){
			var comp = new Component(obj.controller, obj.selector, obj.template);
			this[components].push({
				name: obj.name,
				component: comp
			});
			return comp;
		}
		getComponent(name){
			for (var i = 0; i < this[components].length; i++) {
				if (this[components][i].name === name){
					return this[components][i].component;
				}
			}
		}
	}

	class Component{
		constructor(controller, selector, template){
			this.active = false;
			this.controller = controller;
			this.selector = selector;
			this.template = template;
		}

		activate(){
			this.active = true;
			doc.querySelector(this.selector).innerHTML = this.template;
		}

		registerRoute(routeName){
			routesList.push({
				routeName: routeName,
				component: this
			});
			return this;
		}

		addModel(model){
			model.addToComponentList(this);
			return this;
		}
	}

	class Model{
		constructor(name, data){
			this.componentList = [];
			this.data = data;

			models[name] = this;
		}
		addToComponentList(component){
			this.componentList.push(component);
		}
		updateComponents(){
			for (var i = 0; i < this.componentList.length; i++) {
				if (this.componentList[i].active) this.componentList[i].activate();
			}
		}
	}

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

	function getModule(name){
		return modules[name];
	}

	function getModel(name){
		return models[name];
	}

	global.addEventListener(ROUTE_EVENT_NAME, hashChangeListener);



	var myFramework = {
		Module: Module,
		getModule: getModule,
		Model: Model,
		getModel: getModel
	};
	global.o = myFramework;

})(window);