export default class Container {
  static resolve(className) {
    return new className(
      ...className.injectables.map((injectable) => new injectable())
    );
  }
}
