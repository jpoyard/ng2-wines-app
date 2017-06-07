const testIncrement = () => {
  const stateBefore = 2;
  const action = {
    type: 'INCREMENT'
  };
  const stateAfter = stateBefore + 1;
 
  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    counter(stateBefore, action)
  ).toEqual(stateAfter);
};

const testDecrement = () => {
  const stateBefore = 2;
  const action = {
    type: 'DECREMENT'
  };
  const stateAfter = stateBefore - 1;
 
  deepFreeze(stateBefore);
  deepFreeze(action);
 
  expect(
    counter(stateBefore, action)
  ).toEqual(stateAfter);
};

testIncrement();
testDecrement();

console.log('All test passed.');
 
console.log('Initial state:');
console.log(JSON.stringify(store.getState()));
console.log('-----');

console.log('Dispatching INCREMENT');
store.dispatch({
  type: 'INCREMENT'
});
 
console.log('Current state:');
console.log(JSON.stringify(store.getState()));
console.log('-----');
 
console.log('Dispatching DECREMENT');
store.dispatch({
  type: 'DECREMENT'
});

console.log('Current state:');
console.log(JSON.stringify(store.getState()));
console.log('-----');