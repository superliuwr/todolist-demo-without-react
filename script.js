var state = {
	items: [],
	id: 0
};

var store = createStore(state);
store.onUpdate('renderListener', function(state) {
	render(state, $('#list'));
});

$('#add').on('click', function(e) {
	var value = $('#input').val().trim();
	$('#input').val('');
	state.items.push({
		id: state.id++,
		text: value,
		completed: false
	});
	store.setState(state);
});

$('#list').on('click', '.item', function() {
	var toggleId = parseInt($(this).attr('id'));
	state.items.forEach(function(el) {
		if (el.id === toggleId) {
			el.completed = !el.completed;
		}
	});
	store.setState(state);
});

$('#input').on('keyup', function() {
	state.value = $(this).val().trim();
	store.setState(state);
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

function createStore(initialState) {
	var _state = initialState || {},
		_listeners = [];

	function updateListeners(state) {
		_listeners.forEach(function(listener) {
			listener.cb(state);
		});
	}

	return {
		setState: function(state) {
			_state = state;
			updateListeners(state);
		},

		getState: function() {
			return _state;
		},

		onUpdate: function(name, cb) {
			_listeners.push({
				name: name,
				cb: cb
			});
		}
	}
}

render();