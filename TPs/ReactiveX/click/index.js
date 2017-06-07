let clickStream = Rx.Observable
  .fromEvent(document.getElementById('link'), 'click');

clickStream
  .buffer(clickStream.debounce(250))
  .map(list => list.length)
  .filter(x => x === 2)
  .subscribe(() => {
    console.log('doubleclick');
  })