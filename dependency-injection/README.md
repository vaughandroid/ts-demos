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

Run with `npm run function-based`.

A straightforward approach where we export classes, which are injected with dependencies when they are constructed.

However, this is an approach I wouldn't recommend as it has a significant drawback - all dependencies are concrete, rather than abstractions.
This creates practical issues, which can be seen in the tests where we have to work around the type-checking.
It would also prevent us from being able to swap one production dependency for another. The interface-based approach addresses these issues. 

### Interface-based

Run with `npm run interface-based`.

This is a common approach in traditional OO languages such as Java.
Files export interfaces and factory functions which can be used to create something which implements the interface.

Using interfaces means more "boilerplate" code, but has a couple of benefits:

* Other classes can depend on the interface (an abstraction), rather than the class (a concrete implementation).
  This decreases coupling, and makes it easier to swap one implementation for another (e.g. for tests).
* Better encapsulation. Details such as private class fields aren't exposed as part of the API.
* Interfaces can be implemented however you like - the demo shows this done with classes in some cases and object literals in others.

### Function-based

Run with `npm run function-based`.

This is more or less the approach advocated in the article [Dependency Composition][dependency-composition].

Each file exports a factory function, which is a higher-order function - i.e. a function which returns a function.

Some observations:

* The code is pretty succinct and there isn't much boilerplate.
* Naming feels less clear than the other options.
* I personally find it clearer to have a concept of a "browser" which can print the contents of a directory, rather than having a function which can do the same.

## Factory injection

This is an approach to creating the "main" function which allows any given dependency to be swapped out.
We export the `main` function and a `productionFactories` const.
Tests can call the `productionFactories.replaceFactories` function to swap out any of the various dependencies used in the project.
This ability could also be used for production - e.g. based on feature flags.

There is an interface-based version and a function-based version, demonstrating how the technique could work with either approach to DI. 

Injecting factory functions rather than instances has a couple of benefits.
Firstly, it provides a very robust mechanism for allowing us to swap out any components we want, without needing to re-implement the wiring each time.
Secondly, the factory is in control of how instance(s) that get created, supporting patterns like singletons and instance pools.


[dependency-composition]: https://martinfowler.com/articles/dependency-composition.html
