# backend-starter-kit

backend starter kit with rich features!

# What I aim for

# Core Concepts

## Booting

## Container

```javascript
class Head {
  constructor(eye, nose, mouth) {
    this.eye = eye;
    this.nose = nose;
    this.mouth = mouth;
  }
}

it("resolves autowired instance", () => {
  const head = Container.resolve(Head);
  expect(head.eye).toBeInstanceOf(Eye);
  expect(head.nose).toBeInstanceOf(Nose);
  expect(head.mouth).toBeInstanceOf(Mouth);
  expect(head.mouth.teeth).toBeInstanceOf(Teeth);
});
```

No need to use decorator syntax or other.

`Container` just inspect the class's constructor properties and inject them in its `registry`.

## Facade

# Folder Structure

## /App

Each is equivalent to an interface.

# Helpers

# Testing Guide

This uses [vitest v1.6.0](https://github.com/vitest-dev/vitest) as testing framework.

You don't need to import vitest APIs like `describe`, `it`, `expect`.

Because I set up to use vitest APIs globally in `vitest.config.ts`.

If you want to know how, see [this vitest documentation](https://vitest.dev/config/#globals).

## How to test http server

This uses [supertest v7.0.0](https://github.com/ladjs/supertest) to test http server.
