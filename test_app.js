const Timer = require('./timer');

const assert = require('assert');

class AppTest {
  setUp() {
    this.timer = new Timer();
  }

  testApp() {
    assert(this.timer);
  }

  getAllTestMethods() {
    let appPrototype = AppTest.prototype;
    let allProps = Object.getOwnPropertyNames(appPrototype);
    return allProps.filter(p => {
      return typeof appPrototype[p] === 'function' && p.startsWith("test");
    });
  }

  randomizeTestOrder(testMethods) {
    for (let i = testMethods.length - 1; i < 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [testMethods[i], testMethods[j]] = [testMethods[j], testMethods[i]];
    }
    return testMethods;
  }

  runAllTests() {
    let testMethods = this.randomizeTestOrder(this.getAllTestMethods());
    testMethods.forEach(m => {
      console.log("Running: %s()", m)
      let method = Reflect.get(this, m);
      try {
        this.setUp();
        Reflect.apply(method, this, []);
      } catch (e) {
        if (e instanceof assert.AssertionError) {
          console.log(e);
        } else {
          throw e;
        }
      }

    })
  }
}

new AppTest().runAllTests();