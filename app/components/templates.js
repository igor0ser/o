(function(){
	'use strict';

	// I'm using template syntax from ES6 here
	var templates = {
		title: `
			You have <b>{{done}}</b> done cases and <b>{{undone}}</b> undone cases
		`,
		form: `
			<h3 class="text-center">
				Add some task
			</h3>
			<form class="text-center">
				<input 
					required type="text" 
					placeholder="Type another task here..."
					class="input-text form-control"/>
				<button class="btn btn-info">
					Add task
				</button>
			</form>
		`,
		todo: `
			<h3 class="text-center">
				Tasks to do
			</h3>
			<table class="table">
				<tr>
					<th>#</th>
					<th>Task</th>
					<th>Done</th>
				</tr>
				{{#each tasks}}
				{{#unless this.done}}
				<tr>
					<td>{{@index}}</td>
					<td>{{this.name}}</td>
					<td>
						<button class="btn btn-info" data-o-id={{this.id}}>
							Done
						</button>
					</td>
				</tr>
				{{/unless}}
				{{/each}}
			</table>
		`,
		done: `
			<h3 class="text-center">
				Done tasks
			</h3>
			<table class="table">
				<tr>
					<th>#</th>
					<th>Task {{i}}</th>
				</tr>

				{{#each tasks}}
				<tr>
				{{#if this.done}}
					<td>{{@index}}</td>
					<td>{{this.name}}</td>
				{{/if}}
				</tr>
				{{/each}}

			</table>
		`
	};

	window.templates = templates;
})();