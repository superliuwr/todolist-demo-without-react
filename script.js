var state = {
	items: [],
	id: 0
};

$('#add').on('click', function(e) {
	var value = $('#input').val().trim();
	$('#input').val('');
	state.items.push({
		id: state.id++,
		text: value,
		completed: false
	});
	render(state, $('#list'));
});

$('#list').on('click', '.item', function() {
	var toggleId = parseInt($(this).attr('id'));
	state.items.forEach(function(el) {
		if (el.id === toggleId) {
			el.completed = !el.completed;
		}
	});
	render(state, $('#list'));
});

$('#input').on('keyup', function() {
	state.value = $(this).val().trim();
	render(state, $('#list'));
});

function render(props, node) {
	node.html(ItemsList({
		items: props.items
	}));
}

function ItemRow(props) {
	var className = props.completed ? ' completed' : '';
	return '<li class="item' + className + '" id="' + props.id + '">(' +
		props.id + ') ' + props.text + '</li>';
}

function ItemsList(props) {
	return '<ul>' + props.items.map(ItemRow).join('') + '</ul>';
}

render();