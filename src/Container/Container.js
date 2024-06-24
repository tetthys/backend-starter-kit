export default class Container {
  static bindingMethods = [];

  static bind(className, bindingMethod) {
    this.bindingMethods.push({
      className: className,
      bindingMethod: bindingMethod,
    });
  }

  static hasBindingMethod(className) {
    return this.bindingMethods.find(
      (bindingMethod) => bindingMethod.className === className
    );
  }

  static resolve(className) {
    if (this.hasBindingMethod(className)) {
      return this.bindingMethods
        .find((bindingMethod) => bindingMethod.className === className)
        .bindingMethod();
    }
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
