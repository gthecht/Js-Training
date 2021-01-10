class EventHandler {
  constructor() {
    this.eventList = { moveUp: [], moveLeft: [], moveDown: [], moveRight: [] };
  }

  on(eventName, cb) {
    this.eventList[eventName].push(cb);
  }

  off(eventName) {
    this.eventList[eventName] = [];
  }

  trigger(eventName, eventArgs) {
    this.eventList[eventName].forEach((cb) => {
      cb(eventArgs);
    });
  }
}
