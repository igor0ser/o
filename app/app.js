(function(){
	'use strict';

	var myApp = new o.Module('myApp');

	var todoList = [
		{
			id: 1,
			name: 'Watch JS Talks aboud Design Patterns',
			done: false
		},
		{
			id: 2,
			name: 'Create own awesome framework',
			done: false
		},
		{
			id: 3,
			name: 'Study English',
			done: true
		},
	];

	var todoList = new o.Data('todoList', todoList);

/*	var x = 1;
	var y = 2;
	console.log(`${ x } + ${ y } = ${ x + y}`);*/

})();

function readTemplateFile(fileURL, callback)
{
    var file = new XMLHttpRequest();
    file.open("GET", fileURL, true);
    file.onreadystatechange = function ()
    {
        if(file.readyState === 4)
        {
            if(file.status === 200 || file.status == 0)
            {
                var text = file.responseText;
                callback(text);
            }
        }
    }
    file.send(null);
}

readTemplateFile('components/done.handlebars', alert);