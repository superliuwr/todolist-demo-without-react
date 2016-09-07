function createElement(tag, attrs, children) {
	var elem = $('<' + tag + '>');
	for (var key in attrs) {
		var val = attrs[key];
		if (key.indexOf('on') === 0) {
			var event = key.substr(2).toLowerCase();
			elem.on(event, val)
		} else {
			elem.attr(key, val);
		}
	}
	return elem.html(children);
}

function ItemRow(props) {
	var className = props.completed ? ' item completed' : 'item';
	return createElement('li', {
		id: props.id,
		class: className,
		onClick: props.onUpdate.bind(null, props.id)
	}, props.text);
}

function extending(base, item) {
	return $.extend({}, item, base);
}

function ItemsList(props) {
	return createElement('ul', {}, props.items.map(extending.bind(null, {
		onUpdate: props.onUpdate
	})).map(ItemRow));
}

function SearchBar(props) {
	function onButtonClick(e) {
		var val = $('#input').val();
		props.update(val);
		$('#input').val('');
		e.preventDefault();
	}

	var input = createElement('input', {
		id: 'input'
	});
	var button = createElement('button', {
		id: 'add',
		onClick: onButtonClick.bind(null)
	}, 'Add');

	return createElement('div', {
		class: 'serach-bar'
	}, [input, button]);
}

function App(props) {
	function getInitialState(props) {
		return {
			items: [],
			id: 0
		}
	}

	var _state = getInitialState(),
		_node = null;

	function setState(state) {
		_state = state;
		render();
	}

	function updateSearchState(value) {
		_state.items.push({
			id: _state.id++,
			text: value,
			completed: false
		});
		setState(_state);
	}

	function updateState(toggleId) {
		_state.items.forEach(function(el) {
			if (el.id === toggleId) {
				el.completed = !el.completed;
			}
		});
		setState(_state);
	}

	function render() {
		var children = [SearchBar({
			update: updateSearchState
		}), ItemsList({
			items: _state.items,
			onUpdate: updateState
		})];
		if (!_node) {
			return _node = createElement('div', {
				class: 'main'
			}, children);
		} else {
			return _node.html(children);
		}
	}

	return render();
}

function render(component, node) {
	node.empty().append(component);
}

render(App(), $('#app'));