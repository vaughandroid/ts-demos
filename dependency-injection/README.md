# Dependency injection

Dependency injection is a very important technique, which can be achieved in any number of ways.
This project showcases a few of them.

## The project

Each example implements the same project in a different way, along with some accompanying tests.

The projects are extremely simple browsers, which can list the files in a given directory. They each consist of a few components:

* A logger: a singleton logger which logs messages to the console. The "UI" of our browser.
* A file lister: returns a list of all the files in a given directory.
* The browser: given a directory name, prints the name of the directory and its contents. Needs a logger and a file lister to be injected.
* The "main" function: the entry point for each project. Creates & "wires up" the components.
* run.ts: Runs the project by calling the "main" function.

## Implementation options

### Class-based 

Run with `npm run class-based`.

This is a common approach in traditional OO languages such as Java. Functionality code is in class functions.

Other points to note:

* Interfaces are used to describe the functionality offered by a class. A single class can implement multiple interfaces if needed.
* Factory methods return types specify the instance, not the class.
* Dependencies are also described as interfaces. This avoids the need to bind functions to class instances before injecting.
