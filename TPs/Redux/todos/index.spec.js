const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: false
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: true
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};

const testSetVisibilityFilter = () => {
    const stateBefore = 'SHOW_ALL';
    const action = {
        type: 'SET_VISIBILITY_FILTER',
        filter: 'SHOW_COMPLETED'
    };
    const stateAfter = 'SHOW_COMPLETED';

    deepFreeze(stateBefore);
    deepFreeze(action);


    expect(
        visibilityFilter(stateBefore, action)
    ).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
testSetVisibilityFilter();
console.log('All test passed.');

console.log('Initial state:');
console.log(JSON.stringify(store.getState()));
console.log('-----');

console.log('Dispatching ADD_TODO.');
store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
});

console.log('Current state:');
console.log(JSON.stringify(store.getState()));
console.log('-----');

console.log('Dispatching ADD_TODO.');
store.dispatch({
    type: 'ADD_TODO',
    id: 1,
    text: 'Go shopping'
});

console.log('Current state:');
console.log(JSON.stringify(store.getState()));
console.log('-----');

console.log('Dispatching TOGGLE_TODO.');
store.dispatch({
    type: 'TOGGLE_TODO',
    id: 0
});

console.log('Current state:');
console.log(JSON.stringify(store.getState()));
console.log('-----');

console.log('Dispatching SET_VISIBILITY_FILTER');
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
});

console.log('Current state:');
console.log(JSON.stringify(store.getState()));
console.log('-----');