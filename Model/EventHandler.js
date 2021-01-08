class eventHandler extends Satelite {
  constructor() {
    this.eventList = {}; // Events that might happen will be embedded in the future
  }

  on(eventName, cb) {
    this.eventList[eventName].push(cb);
  }

  off(eventName) {
    delete this.eventList[eventName];
  }

  trigger(eventName, eventArgs) {
    this.eventList[eventName].forEach((cb) => {
      cb(...eventArgs);
    });
  }
}
