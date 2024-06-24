export default class Container {
  static resolve(className) {
    return className.injectables && className.injectables.length > 0
      ? new className(
          ...className.injectables.map((injectable) =>
            injectable.injectables && injectable.injectables.length > 0
              ? Container.resolve(injectable)
              : new injectable()
          )
        )
      : new className();
  }
}
