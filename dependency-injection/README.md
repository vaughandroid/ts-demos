# Dependency injection

Dependency injection is a very important technique, which can be achieved in any number of ways.
This project showcases a few of them.

## The project

Each example implements the same project in a different way, along with some accompanying tests.

The projects are extremely simple browsers, which can list the files in a given directory. They each consist of a few components:

* A logger: a singleton logger which logs messages to the console. The "UI" of our browser.
* A file lister: returns a list of all the files in a given directory.
* A browser: prints the name of a given directory along with its contents. Needs a logger and a file lister to be injected.
* The "main" function: the entry point for each project. Creates & "wires up" the components.
* run.ts: Runs the project by calling the "main" function.

## Implementation options

### Class-based 

Run with `npm run class-based`.

This is a common approach in traditional OO languages such as Java. Functionality code is in class functions.

The classes themselves aren't exported - instead, we export an interface (which is implemented by the class) and a factory method (which declares that it returns an instance of the interface).
Using interfaces means more "boilerplate" code, but has a couple of benefits:

* Better encapsulation. Details such as private class fields aren't exposed as part of the API.
* Other classes can depend on the interface (an abstraction), rather than the class (a concrete implementation).
  This decreases coupling, and makes it easier to swap one implementation for another (e.g. for tests).

### Function-based

Run with `npm run class-based`.

This is more or less the approach advocated in the article [Dependency Composition][dependency-composition].

Each file exports a factory function, which is a higher-order function - i.e. a function which returns a function.


[dependency-composition]: https://martinfowler.com/articles/dependency-composition.html

## Factory injection

This is an approach to creating the "main" function which allows any given dependency to be swapped out.
The `replaceFactories` function to swap out any of the various factory methods used in the project, allowing clients to control how the project is configured.
This ability to use different dependencies in different circumstances is essential for testing, but it can also be used for production - e.g. using feature flags, or supporting a data store migration.

There is a class-based version and a function-based version, demonstrating how the technique could work with either approach to DI. 

Injecting factory functions rather than instances has a couple of benefits.
Firstly, the factory is in control of how instance(s) that get created, supporting patterns like singletons and instance pools.
Secondly, it provides a very robust mechanism for allowing us to swap out any components we want, without needing to re-implement the wiring each time.
