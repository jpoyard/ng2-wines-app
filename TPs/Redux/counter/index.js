const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

const store = createStore(counter);

const render = () => {
    let counterView = document.getElementById('counterView');
    if (counterView) {
        counterView.innerText = store.getState();
    }
};

store.subscribe(render);
render();