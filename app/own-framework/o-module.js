(function(){
	'use strict';
	var modules = [];
	var componentSymbol = Symbol('components');

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


	// private function for deactivating

		function deactivate(selector){
			for (var i = 0; i < modules.length; i++) {
				for (var j = 0; j < modules[i][componentSymbol].length; j++) {
					var comp = modules[i][componentSymbol][j].component;
					if (comp.selector === selector){
						comp.active = false;
					}
				}
			}
		}
})();