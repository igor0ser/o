(function(global){
	'use strict';

	//constants
	var ROUTE_EVENT_NAME = 'hashchange';
	var doc = global.document;

	var routeSymbol = Symbol('routeSymbol');
	var componentSymbol = Symbol('components');
	var dataSymbol = Symbol('datas');

	var routeList = [];
	var dataList = {};
	var modules = [];

	class Module{
		constructor(name){
			this[componentSymbol] = [];
			this[routeSymbol] = [];
			this.name = name;

			modules.push(this);
		}
		createComponent(obj){
			var comp = new Component(obj.selector, obj.template);
			this[componentSymbol].push({
				name: obj.name,
				component: comp
			});
			return comp;
		}
		getComponent(name){
			for (var i = 0; i < this[componentSymbol].length; i++) {
				if (this[componentSymbol][i].name === name){
					return this[componentSymbol][i].component;
				}
			}
		}
	}

	class Component{
		constructor(selector, template){
			this.active = false;
			this.controller = function(){};
			this.selector = selector;
			this.template = template;

			this[dataSymbol] = {};
			this.elem = doc.querySelector(this.selector);

		}

		activate(){
			this.active = true;
			doc.querySelector(this.selector).innerHTML = this.template;
			this.controller(this.elem, this.getDataModel.bind(this));
		}

		deactivate(){
			this.active = false;
		}

		registerRoute(routeName){
			routeList.push({
				routeName: routeName,
				component: this
			});
			return this;
		}

		addData(data){
			data.addToComponentList(this);
			this[dataSymbol][data.name] = data;
			return this;
		}

		applyController(func){
			this.controller = func;
			return this;
		}

		getDataModel(name){
			return this[dataSymbol][name].model;
		}

		addListener(eventName, selector, dataNameWillBeChanged, func){
			var _this = this;

			this.elem.addEventListener(eventName, function(event){
				if (event.target.matches(selector)){
					var resFunc = func(event);
					resFunc(_this.elem, _this.getDataModel.bind(_this));

					_this[dataSymbol][dataNameWillBeChanged].updateComponents();

				}

			});
		}
	}

// data = model 
	class Data{
		constructor(name, model){
			this.componentList = [];
			this.model = model;
			this.name = name;
			dataList[name] = this;
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

// routing
	global.addEventListener(ROUTE_EVENT_NAME, hashChangeListener);
	function hashChangeListener(event) {
		var URL = event.newURL.split('#')[1];

		for (var i = 0; i < routeList.length; i++) {
			if (URL === routeList[i].routeName){
				deactivateComponentsBySelector(routeList[i].component.selector);
				routeList[i].component.activate();
			}
		}
	}



// private function for deactivating

	function deactivateComponentsBySelector(selector){
		for (var i = 0; i < modules.length; i++) {
			for (var j = 0; j < modules[i][componentSymbol].length; j++) {
				var comp = modules[i][componentSymbol][j].component;
				if (comp.selector === selector){
					comp.deactivate();
				}
			}
		}
	}

// public functions

	function getModule(name){
		for (var i = 0; i < modules.length; i++) {
			if (modules[i].name === name){
				return modules[i];
			}
		}
	}

	function getData(name){
		return dataList[name];
	}


// revealing module
	var ownFramework = {
		Module: Module,
		getModule: getModule,

		Data: Data,
		getData: getData
	};
	global.o = global.ownFramework = ownFramework;

})(window);