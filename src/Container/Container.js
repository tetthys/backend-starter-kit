export default class Container {
  static registry = [];
  static bindingMethods = [];
  static singletones = [];

  static register(array) {
    array.forEach((item) => {
      if (
        item.tag === undefined &&
        item.memberName === undefined &&
        item.class === undefined
      ) {
        this.registry.push({
          tag: item.name,
          memberName: item.name.toLowerCase(),
          class: item,
        });
      } else {
        this.registry.push({
          tag: item.tag || item.class.name,
          memberName: item.memberName || item.class.name.toLowerCase(),
          class: item.class || item.class,
        });
      }
    });
  }

  static bind(bindingInfo, bindingMethod) {
    let bindingClass;

    if (bindingInfo.class) {
      bindingClass = this.registry.find((item) => {
        return item.class === bindingInfo.class;
      }).class;
    }

    if (bindingInfo.tag) {
      bindingClass = this.registry.find((item) => {
        return item.tag === bindingInfo.tag;
      }).class;
    }

    this.bindingMethods.push({
      bindingClass: bindingClass,
      bindingMethod: bindingMethod,
    });
  }

  static bindToSingletone(bindingInfo, bindingMethod) {
    let bindingClass;

    if (bindingInfo.class) {
      bindingClass = this.registry.find((item) => {
        return item.class === bindingInfo.class;
      }).class;
    }

    if (bindingInfo.tag) {
      bindingClass = this.registry.find((item) => {
        return item.tag === bindingInfo.tag;
      }).class;
    }

    this.singletones.push({
      bindingClass: bindingClass,
      instance: bindingMethod(),
    });
  }

  static isSingletone(className) {
    return this.singletones.find(
      (singletone) => singletone.bindingClass === className
    );
  }

  static resolveSingletone(className) {
    return this.singletones.find(
      (singletone) => singletone.bindingClass === className
    ).instance;
  }

  static hasBindingMethod(className) {
    return this.bindingMethods.find(
      (bindingMethod) => bindingMethod.bindingClass === className
    );
  }

  static resolveWithBindingMethod(className) {
    return this.bindingMethods
      .find((bindingMethod) => bindingMethod.bindingClass === className)
      .bindingMethod();
  }

  static resolve(className) {
    if (this.hasBindingMethod(className)) {
      return this.resolveWithBindingMethod(className);
    }
    if (this.isSingletone(className)) {
      return this.resolveSingletone(className);
    }

    const dependencyClassNames = [];

    const classNameInstance = new className();

    this.registry.forEach((item) => {
      if (classNameInstance.hasOwnProperty(item.memberName)) {
        dependencyClassNames.push(item.class);
      }
    });

    return new className(
      ...dependencyClassNames.map((dependencyClassName) => {
        return Container.resolve(dependencyClassName);
      })
    );
  }
}
