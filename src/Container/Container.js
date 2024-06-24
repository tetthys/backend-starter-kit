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

  static resolveWithBindingMethod(className) {
    return this.bindingMethods
      .find((bindingMethod) => bindingMethod.className === className)
      .bindingMethod();
  }

  static resolve(className) {
    if (this.hasBindingMethod(className))
      return this.resolveWithBindingMethod(className);
    return className.injectables?.length > 0
      ? new className(
          ...className.injectables.map((injectable) => {
            if (this.hasBindingMethod(injectable))
              return this.resolveWithBindingMethod(injectable);
            return injectable.injectables?.length > 0
              ? Container.resolve(injectable)
              : new injectable();
          })
        )
      : new className();
  }
}
