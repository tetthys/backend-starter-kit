export default class Container {
  static registry = [];
  static bindingMethods = [];
  static singletones = [];

  static register(classNames) {
    classNames.forEach((className) => {
      if (
        className.tag === undefined &&
        className.memberName === undefined &&
        className.className === undefined
      ) {
        this.registry.push({
          tag: className.name,
          memberName: className.name.toLowerCase(),
          className: className,
        });
      } else {
        this.registry.push({
          tag: className.tag || className.className.name,
          memberName: className.memberName || className.className.name.toLowerCase(),
          className: className.className || className.className,
        });
      }
    });
  }

  static bind(className, bindingMethod) {
    this.bindingMethods.push({
      className: className,
      bindingMethod: bindingMethod,
    });
  }

  static bindToSingletone(className, bindingMethod) {
    this.singletones.push({
      className: className,
      instance: bindingMethod(),
    });
  }

  static isSingletone(className) {
    return this.singletones.find(
      (singletone) => singletone.className === className
    );
  }

  static resolveSingletone(className) {
    return this.singletones.find(
      (singletone) => singletone.className === className
    ).instance;
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
    if (this.isSingletone(className)) return this.resolveSingletone(className);

    return className.injectables?.length > 0
      ? new className(
          ...className.injectables.map((injectable) => {
            if (this.hasBindingMethod(injectable))
              return this.resolveWithBindingMethod(injectable);
            if (this.isSingletone(injectable))
              return this.resolveSingletone(injectable);

            return injectable.injectables?.length > 0
              ? Container.resolve(injectable)
              : new injectable();
          })
        )
      : new className();
  }
}
