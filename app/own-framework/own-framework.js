(function(global){
	'use strict';

	//constants
	
	var doc = global.document;



/*=========        MODULE        =========*/

	//private list of modules
	var modules = [];

	//faking private fields using ES6 Symbols
	var routeSymbol = Symbol('routeSymbol');
	var componentSymbol = Symbol('components');

	class Module{
		constructor(name){
			this[componentSymbol] = [];
			this[routeSymbol] = [];
			this.name = name;

			modules.push(this);
		}
		createComponent(obj){
			var comp = new Component(obj.selector, obj.template, obj.ctrlFunc);
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

	//public function to get Module by name
	function getModule(name){
		for (var i = 0; i < modules.length; i++) {
			if (modules[i].name === name){
				return modules[i];
			}
		}
	}


/*=========      COMPONENTS      =========*/

	//private list to registering routes
	var routeList = [];

	//faking private field using ES6 Symbols
	var dataSymbol = Symbol('datas');

	class Component{
		constructor(selector, template, ctrlFunc){

			this.controller = new Controller(ctrlFunc);
			this.selector = selector;
			this.template = template;

			this.elem = doc.querySelector(this.selector);
			this.active = false;
			this[dataSymbol] = {};

			this.controller.compile(this.template);
		}

		activate(){
			this.elem.innerHTML = this.controller.getView(this.getDataModel.bind(this));
			this.active = true;
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

	//private function for deactivating components that using particular selector
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


/*=========      CONTROLLER      =========*/

	class Controller{
		constructor(ctrlFunc){
			this.ctrlFunc = ctrlFunc || function(){};
		}
		compile(template){
			this.template = Handlebars.compile(template);
		}
		getView(getDataModel){
			return this.template(new this.ctrlFunc(getDataModel));
		}
	}

	


/*=========         DATA         =========*/
	/*Data means Model in my framework*/

	//private list for saving models that are using in our application
	var dataList = {};

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

	//public function to get Data(Model) by name
	function getData(name){
		return dataList[name];
	}


/*=========       ROUTING       =========*/
	var ROUTE_EVENT_NAME = 'hashchange';

	function hashChangeListener(event) {
		var URL = event.newURL.split('#')[1];

		for (var i = 0; i < routeList.length; i++) {
			if (URL === routeList[i].routeName){
				deactivateComponentsBySelector(routeList[i].component.selector);
				routeList[i].component.activate();
			}
		}
	}

	global.addEventListener(ROUTE_EVENT_NAME, hashChangeListener);


/*=========   REAVILING MODULE   =========*/

	var ownFramework = {
		Module: Module,
		getModule: getModule,

		Data: Data,
		getData: getData
	};
	global.o = global.ownFramework = ownFramework;

})(window);