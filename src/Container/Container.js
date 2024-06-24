export default class Container {
  resolve(className) {
    return new className(
      ...className.injectables.map((injectable) => new injectable())
    );
  }
}
