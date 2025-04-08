import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { auth } from "./firebase/firebase";


const quizData = {
  c: [
    { question: "What is the standard header file for input/output functions in C?", options: ["stdio.h", "conio.h", "iostream.h", "stdlib.h"], answer: "stdio.h" },
    { question: "Which of the following is the correct way to declare an integer variable in C?", options: ["int variable;", "variable int;", "integer variable;", "var int;"], answer: "int variable;" },
    { question: "What does the %d format specifier represent in printf()?", options: ["Character", "String", "Integer", "Float"], answer: "Integer" },
    { question: "Which operator is used for logical AND in C?", options: ["&", "&&", "|", "||"], answer: "&&" },
    { question: "What is the purpose of the scanf() function?", options: ["To print output to the console", "To read input from the console", "To define variables", "To execute a loop"], answer: "To read input from the console" },
    { question: "What does the ++ operator do in C?", options: ["Decrements a variable", "Increments a variable", "Multiplies a variable", "Divides a variable"], answer: "Increments a variable" },
    { question: "Which keyword is used to define a constant in C?", options: ["var", "const", "static", "define"], answer: "const" },
    { question: "What is the return type of the main() function in C?", options: ["void", "int", "char", "float"], answer: "int" },
    { question: "Which of the following is a valid loop in C?", options: ["loop (i=0; i<10; i++)", "for i=0; i<10; i++", "for (i=0; i<10; i++)", "while i<10"], answer: "for (i=0; i<10; i++)" },
    { question: "What does the %s format specifier represent in printf()?", options: ["Character", "String", "Integer", "Float"], answer: "String" },
    { question: "What is the size of a char data type in most C implementations?", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], answer: "1 byte" },
    { question: "Which operator is used to access the address of a variable?", options: ["*", "&", "->", "."], answer: "&" },
    { question: "What is the purpose of the break statement in a loop?", options: ["To skip the next iteration", "To terminate the loop", "To continue the loop", "To define a loop"], answer: "To terminate the loop" },
    { question: "Which keyword is used to create a user-defined data type in C?", options: ["define", "struct", "typedef", "enum"], answer: "struct" },
    { question: "What is a pointer in C?", options: ["A variable that stores a value", "A variable that stores an address", "A function that returns a value", "A loop control variable"], answer: "A variable that stores an address" },
    { question: "What does the %f format specifier represent in printf()?", options: ["Character", "String", "Integer", "Float"], answer: "Float" },
    { question: "What is the purpose of the return statement in a function?", options: ["To declare a variable", "To print output", "To return a value from the function", "To define a loop"], answer: "To return a value from the function" },
    { question: "Which of the following is a valid comment in C?", options: ["// This is a comment", "/* This is a comment */", "# This is a comment", "' This is a comment"], answer: "/* This is a comment */" },
    { question: "What is the purpose of the malloc() function?", options: ["To free memory", "To allocate memory dynamically", "To print memory addresses", "To define a memory type"], answer: "To allocate memory dynamically" },
    { question: "What is the preprocessor directive used to include header files?", options: ["include", "#include", "import", "using"], answer: "#include" }
  ],
  cplusplus: [
    { question: "What is the primary purpose of the iostream header file in C++?", options: ["To define mathematical functions.", "To handle input and output operations.", "To manage memory allocation.", "To define string manipulation functions."], answer: "To handle input and output operations." },
    { question: "Which of the following is the correct way to declare a constant integer variable in C++?", options: ["integer const x;", "const int x;", "int constant x;", "final int x;"], answer: "const int x;" },
    { question: "What does the :: operator in C++ represent?", options: ["Pointer dereference.", "Scope resolution.", "Bitwise XOR.", "Modulus operation."], answer: "Scope resolution." },
    { question: "Which of the following is a valid way to dynamically allocate memory for an integer in C++?", options: ["int* ptr = allocate int;", "int* ptr = new int;", "int* ptr = malloc(int);", "int* ptr = create int;"], answer: "int* ptr = new int;" },
    { question: "What is the purpose of the delete keyword in C++?", options: ["To remove a file from the system.", "To deallocate dynamically allocated memory.", "To erase a variable's value.", "To terminate a program."], answer: "To deallocate dynamically allocated memory." },
    { question: "Which of the following is a valid C++ comment style?", options: ["// This is a comment", "/* This is a comment */", "Both a and b", "# This is a comment"], answer: "Both a and b." },
    { question: "What is the purpose of a constructor in a C++ class?", options: ["To destroy an object.", "To initialize an object.", "To define the class's destructor.", "To overload operators."], answer: "To initialize an object." },
    { question: "What is the term for a function that is called automatically when an object is destroyed?", options: ["Constructor", "Destructor", "Member function", "Static function"], answer: "Destructor." },
    { question: "Which of the following is a valid C++ data type for storing a single character?", options: ["string", "integer", "char", "boolean"], answer: "char." },
    { question: "What is the purpose of the using namespace std; statement?", options: ["To include standard library functions.", "To avoid writing std:: before standard library elements.", "To define a new namespace.", "To create a class."], answer: "To avoid writing std:: before standard library elements." },
    { question: "Which operator is used for accessing members of a class through a pointer?", options: [". (dot)", ":: (scope resolution)", "-> (arrow)", "* (asterisk)"], answer: "-> (arrow)." },
    { question: "What is function overloading in C++?", options: ["Defining a function inside another function.", "Defining multiple functions with the same name but different parameters.", "Overriding a base class function.", "Creating a function pointer."], answer: "Defining multiple functions with the same name but different parameters." },
    { question: "What is the purpose of the virtual keyword in C++?", options: ["To create a static variable.", "To define a constant function.", "To enable dynamic polymorphism.", "To declare a friend function."], answer: "To enable dynamic polymorphism." },
    { question: "Which of the following is a valid way to declare a reference variable in C++?", options: ["int* ref = &x;", "int& ref = x;", "int ref = *x;", "int ref = &x;"], answer: "int& ref = x;" },
    { question: "What does the endl manipulator do in C++?", options: ["Ends the program.", "Inserts a new line and flushes the output buffer.", "Deletes a file.", "Clears the screen."], answer: "Inserts a new line and flushes the output buffer." },
    { question: "What is inheritance in C++?", options: ["A way to create multiple objects.", "A mechanism for one class to inherit properties and methods from another class.", "A method to overload operators.", "A way to define static variables."], answer: "A mechanism for one class to inherit properties and methods from another class." },
    { question: "What is a template in C++?", options: ["A pre-defined class.", "A blueprint for creating generic functions or classes.", "A method to define a constant.", "A way to overload functions."], answer: "A blueprint for creating generic functions or classes." },
    { question: "Which keyword is used to derive a class from a base class in C++?", options: ["extends", "inherits", "implements", ": (colon)"], answer: ": (colon)." },
    { question: "What is the purpose of the friend keyword in C++?", options: ["To create a subclass.", "To allow a function or class to access private members of another class.", "To define a virtual function.", "To overload an operator."], answer: "To allow a function or class to access private members of another class." },
    { question: "What is the standard library in C++?", options: ["A set of user-defined functions.", "A collection of classes and functions that are part of the C++ language.", "A method to define a namespace.", "A way to create a template."], answer: "A collection of classes and functions that are part of the C++ language." }
  ],
  python: [
    { question: "Who created Python?", options: ["Guido van Rossum", "Elon Musk", "Bill Gates", "Mark Zuckerberg"], answer: "Guido van Rossum" },
    { question: "Which year was Python released?", options: ["1991", "2000", "1989", "2010"], answer: "1991" },
    { question: "What is the correct file extension for Python files?", options: [".pyth", ".pl", ".py", ".p"], answer: ".py" },
    { question: "Which of the following is a mutable data type in Python?", options: ["Tuple", "String", "Integer", "List"], answer: "List" },
    { question: "What keyword is used to define a function in Python?", options: ["func", "define", "def", "function"], answer: "def" },
    { question: "Which symbol is used for single-line comments in Python?", options: ["//", "/*", "#", "--"], answer: "#" },
    { question: "What is the output of print(2 + 3 * 4)?", options: ["20", "14", "12", "9"], answer: "14" },
    { question: "Which built-in function is used to get the length of a string or list?", options: ["size()", "length()", "len()", "count()"], answer: "len()" },
    { question: "What is the result of 3**2 in Python?", options: ["6", "8", "9", "12"], answer: "9" },
    { question: "Which of the following is used for block indentation in Python?", options: ["Curly braces {}", "Parentheses ()", "Indentation", "Semicolons ;"], answer: "Indentation" },
    { question: "What does the range() function return?", options: ["A list", "A tuple", "A range object", "A dictionary"], answer: "A range object" },
    { question: "Which operator is used for exponentiation in Python?", options: ["^", "**", "//", "%"], answer: "**" },
    { question: "What is the output of print(type([1, 2, 3]))?", options: ["<class 'tuple'>", "<class 'list'>", "<class 'array'>", "<class 'set'>"], answer: "<class 'list'>" },
    { question: "What is the purpose of the if __name__ == 'main': block?", options: ["To define a main function", "To execute code only when the script is run directly", "To import modules", "To define classes"], answer: "To execute code only when the script is run directly" },
    { question: "Which method is used to add an element to the end of a list?", options: ["insert()", "add()", "append()", "extend()"], answer: "append()" },
    { question: "What is a dictionary in Python?", options: ["An ordered sequence", "An unordered collection of key-value pairs", "A set of unique elements", "A data type for numerical calculations"], answer: "An unordered collection of key-value pairs" },
    { question: "What does the try...except block do?", options: ["Defines a loop", "Handles exceptions (errors)", "Defines a function", "Creates a class"], answer: "Handles exceptions (errors)" },
    { question: "What is the output of 'Hello' + 'World'?", options: ["Hello World", "HelloWorld", "Hello+World", "Error"], answer: "HelloWorld" },
    { question: "Which of these is a boolean value in Python?", options: ["'True'", "1", "True", "yes"], answer: "True" },
    { question: "What does the 'import' statement do?", options: ["Defines a function", "Includes external modules", "Creates a variable", "Defines a class"], answer: "Includes external modules" }
  ],
  csharp: [
    { question: "What type of programming language is C#?", options: ["Procedural", "Functional", "Object-oriented", "Scripting"], answer: "Object-oriented" },
    { question: "Which framework is C# primarily designed for?", options: ["Java Virtual Machine (JVM)", ".NET Framework", "Python Runtime", "Node.js"], answer: ".NET Framework" },
    { question: "Which keyword is used to declare a constant in C#?", options: ["var", "static", "const", "final"], answer: "const" },
    { question: "What is the purpose of the 'using' keyword?", options: ["To declare a variable", "To import namespaces", "To define a loop", "To create a class"], answer: "To import namespaces" },
    { question: "Which of the following is a value type in C#?", options: ["string", "class", "int", "object"], answer: "int" },
    { question: "What is the purpose of the 'Main' method in a C# program?", options: ["To define a class", "To initialize variables", "To serve as the entry point", "To handle exceptions"], answer: "To serve as the entry point" },
    { question: "Which operator is used for string concatenation in C#?", options: ["*", "/", "+", "%"], answer: "+" },
    { question: "What is the process of converting a value type to a reference type called?", options: ["Unboxing", "Casting", "Boxing", "Conversion"], answer: "Boxing" },
    { question: "Which keyword is used to inherit a class in C#?", options: ["implements", "extends", "inherits", ":"], answer: ":" },
    { question: "What is the purpose of the 'try-catch' block?", options: ["To define a loop", "To handle exceptions", "To declare a variable", "To create a class"], answer: "To handle exceptions" },
    { question: "Which of the following is a valid C# comment?", options: ["// This is a comment", "/* This is a comment */", "*", "a and b"], answer: "a and b" },
    { question: "What does CLR stand for?", options: ["Common Language Runtime", "Computer Logic Register", "Central Language Resource", "Compiled Library Routine"], answer: "Common Language Runtime" },
    { question: "Which access modifier makes a member accessible only within its own class?", options: ["public", "protected", "internal", "private"], answer: "private" },
    { question: "What is LINQ used for in C#?", options: ["Graphical user interfaces", "Database querying", "Network communication", "Memory management"], answer: "Database querying" },
    { question: "What keyword is used to create an object of a class?", options: ["create", "new", "object", "instance"], answer: "new" },
    { question: "What is the default value of a boolean variable in C#?", options: ["1", "true", "false", "null"], answer: "false" },
    { question: "Which data type is used to store a single character?", options: ["string", "int", "char", "byte"], answer: "char" },
    { question: "What is the purpose of the 'static' keyword?", options: ["To create an instance of a class", "To make a member belong to the class itself", "To define a loop", "To handle exceptions"], answer: "To make a member belong to the class itself" },
    { question: "What is the function of the garbage collector in C#?", options: ["To manage memory allocation", "To handle exceptions", "To compile code", "To execute code"], answer: "To manage memory allocation" },
    { question: "Which of the following is a reference type?", options: ["int", "struct", "enum", "string"], answer: "string" }
  ],
  java: [
    { question: "Which keyword is used to define a constant variable in Java?", options: ["static", "final", "const", "immutable"], answer: "final" },
    { question: "What is the primary purpose of the main method in a Java program?", options: ["To initialize objects", "To define class variables", "To serve as the program's entry point", "To handle exceptions"], answer: "To serve as the program's entry point" },
    { question: "Which of the following is NOT a primitive data type in Java?", options: ["int", "boolean", "String", "double"], answer: "String" },
    { question: "What is the purpose of the super keyword in Java?", options: ["To create a new object", "To call a method of the superclass", "To define a static variable", "To handle exceptions"], answer: "To call a method of the superclass" },
    { question: "Which of the following is true about Java's garbage collection?", options: ["It is manually triggered by the programmer.", "It automatically reclaims memory occupied by unused objects.", "It only works on primitive data types.", "It is not a part of the Java Virtual Machine (JVM)."], answer: "It automatically reclaims memory occupied by unused objects." },
    { question: "Which interface is used to implement a collection that stores elements in a key-value pair format?", options: ["List", "Set", "Map", "Queue"], answer: "Map" },
    { question: "What is the purpose of the try-catch block in Java?", options: ["To define a loop", "To handle exceptions", "To create a new class", "To declare a variable"], answer: "To handle exceptions" },
    { question: "Which access modifier makes a variable or method accessible only within the same class?", options: ["public", "private", "protected", "default (package-private)"], answer: "private" },
    { question: "What does the instanceof operator do in Java?", options: ["Checks if two objects are equal.", "Checks if an object is an instance of a specific class or interface.", "Creates a new instance of a class.", "Deletes an instance of a class."], answer: "Checks if an object is an instance of a specific class or interface." },
    { question: "Which of the following is used to create an abstract class in Java?", options: ["final", "static", "abstract", "interface"], answer: "abstract" },
    { question: "What is the purpose of the toString() method in Java?", options: ["To convert a string to an integer.", "To convert an object to a string representation.", "To compare two strings.", "To reverse a string."], answer: "To convert an object to a string representation." },
    { question: "Which of the following is a checked exception in Java?", options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "IOException", "ArithmeticException"], answer: "IOException" },
    { question: "What is method overloading in Java?", options: ["Defining multiple methods with the same name but different parameters.", "Overriding a method in a subclass.", "Creating a new class with the same name.", "Defining a method that calls itself."], answer: "Defining multiple methods with the same name but different parameters." },
    { question: "Which keyword is used to inherit a class in Java?", options: ["implements", "extends", "inherit", "derive"], answer: "extends" },
    { question: "What is the purpose of the static keyword in Java?", options: ["To create an instance of a class.", "To make a variable or method belong to the class rather than an instance.", "To define a constant.", "To handle exceptions."], answer: "To make a variable or method belong to the class rather than an instance." },
    { question: "Which interface must be implemented to create a thread using the Runnable interface?", options: ["Threadable", "Runnable", "Executable", "Concurrent"], answer: "Runnable" },
    { question: "What is the purpose of the finally block in a try-catch statement?", options: ["To define a loop.", "To handle exceptions.", "To execute code that must run regardless of whether an exception occurs.", "To declare variables."], answer: "To execute code that must run regardless of whether an exception occurs." },
    { question: "What is the default value of a boolean variable in Java?", options: ["0", "1", "true", "false"], answer: "false" },
    { question: "Which of the following is used to create a package in Java?", options: ["import", "class", "package", "interface"], answer: "package" },
    { question: "What is the purpose of the volatile keyword in Java?", options: ["To make a variable constant.", "To ensure that a variable is read from and written to main memory.", "To create a new thread.", "To define a static variable."], answer: "To ensure that a variable is read from and written to main memory." }
  ],
  kotlin: [
    { question: "Who developed Kotlin?", options: ["Google", "Microsoft", "JetBrains", "Oracle"], answer: "JetBrains" },
    { question: "Which keyword is used to declare a read-only variable in Kotlin?", options: ["var", "val", "const", "let"], answer: "val" },
    { question: "What is the entry point of a Kotlin program?", options: ["main()", "start()", "run()", "execute()"], answer: "main()" },
    { question: "Which of the following is NOT a valid Kotlin data type?", options: ["Int", "String", "Boolean", "Character"], answer: "Character" },
    { question: "What is the correct way to declare a function in Kotlin?", options: ["function myFunc()", "def myFunc()", "fun myFunc()", "void myFunc()"], answer: "fun myFunc()" },
    { question: "Which symbol is used for string interpolation in Kotlin?", options: ["#", "$", "%", "&"], answer: "$" },
    { question: "How do you define a nullable variable in Kotlin?", options: ["var x: Int?", "var x = null", "var x: ?Int", "var x: Int!"], answer: "var x: Int?" },
    { question: "Which collection type represents an ordered list in Kotlin?", options: ["Set", "Map", "List", "Array"], answer: "List" },
    { question: "What is the default visibility modifier in Kotlin?", options: ["private", "public", "internal", "protected"], answer: "public" },
    { question: "Which function is used to print text to the console in Kotlin?", options: ["print()", "console.log()", "println()", "write()"], answer: "println()" },
    { question: "How do you create a singleton class in Kotlin?", options: ["class Singleton {}", "object Singleton {}", "fun Singleton {}", "val Singleton = object {}"], answer: "object Singleton {}" },
    { question: "Which keyword is used to define an interface in Kotlin?", options: ["interface", "class", "struct", "protocol"], answer: "interface" },
    { question: "How do you declare an extension function in Kotlin?", options: ["fun String.reverse()", "def String.reverse()", "extend String.reverse()", "String.reverse()"], answer: "fun String.reverse()" },
    { question: "Which of the following is a feature of Kotlin?", options: ["Interoperability with Java", "Manual memory management", "Pointers support", "Multiple inheritance"], answer: "Interoperability with Java" },
    { question: "What is the purpose of the lateinit keyword in Kotlin?", options: ["To declare a nullable variable", "To initialize a variable later", "To make a variable immutable", "To create a constant"], answer: "To initialize a variable later" },
    { question: "Which loop structure is NOT available in Kotlin?", options: ["for", "while", "do-while", "foreach"], answer: "foreach" },
    { question: "Which keyword is used to inherit a class in Kotlin?", options: ["extends", "implements", "inherits", "open"], answer: "open" },
    { question: "What is the correct way to create a lambda function in Kotlin?", options: ["val sum = (x, y) -> x + y", "def sum(x, y) = x + y", "fun sum(x, y) = x + y", "val sum = { x, y -> x + y }"], answer: "val sum = { x, y -> x + y }" },
    { question: "Which function is used to filter elements in a collection?", options: ["map()", "reduce()", "filter()", "forEach()"], answer: "filter()" },
    { question: "Which of the following is used to create a coroutine in Kotlin?", options: ["thread { }", "launch { }", "async { }", "coroutine { }"], answer: "launch { }" }
  ],
  html: [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Machine Language", "Home Tool Markup Language", "Hyperlink and Text Management Language"], answer: "Hyper Text Markup Language" },
    { question: "Which tag is used to define the structure of an HTML document?", options: ["<head>", "<body>", "<html>", "<title>"], answer: "<html>" },
    { question: "Which tag is used to define the title of an HTML document?", options: ["<header>", "<heading>", "<title>", "<meta>"], answer: "<title>" },
    { question: "Which tag is used to create a hyperlink?", options: ["<link>", "<url>", "<a>", "<hyperlink>"], answer: "<a>" },
    { question: "Which tag is used to display an image in HTML?", options: ["<picture>", "<image>", "<src>", "<img>"], answer: "<img>" },
    { question: "Which tag is used to create an unordered list?", options: ["<ol>", "<ul>", "<list>", "<dl>"], answer: "<ul>" },
    { question: "Which tag is used to create an ordered list?", options: ["<ul>", "<list>", "<ol>", "<dl>"], answer: "<ol>" },
    { question: "Which tag is used to define a table in HTML?", options: ["<grid>", "<tbl>", "<table>", "<data>"], answer: "<table>" },
    { question: "Which tag is used to define a table row?", options: ["<row>", "<tr>", "<tdrow>", "<tablerow>"], answer: "<tr>" },
    { question: "Which tag is used to define a table data cell?", options: ["<cell>", "<tc>", "<td>", "<datacell>"], answer: "<td>" },
    { question: "Which tag is used to create a form in HTML?", options: ["<input>", "<form>", "<dataform>", "<getform>"], answer: "<form>" },
    { question: "Which attribute is used to specify the URL of a link?", options: ["src", "href", "link", "url"], answer: "href" },
    { question: "Which attribute is used to specify an alternate text for an image?", options: ["alt", "title", "description", "text"], answer: "alt" },
    { question: "Which tag is used to create a line break?", options: ["<lb>", "<break>", "<newline>", "<br>"], answer: "<br>" },
    { question: "Which tag is used to define a paragraph?", options: ["<text>", "<para>", "<p>", "<paragraph>"], answer: "<p>" },
    { question: "Which tag is used to define the main content of an HTML document?", options: ["<head>", "<body>", "<html>", "<content>"], answer: "<body>" },
    { question: "Which tag is used to define a heading?", options: ["<head>", "<title>", "<h1> to <h6>", "<header>"], answer: "<h1> to <h6>" },
    { question: "What does the <!DOCTYPE html> declaration do?", options: ["Defines the document's encoding.", "Defines the document's title.", "Defines the document's type and version of HTML.", "Defines the document's style."], answer: "Defines the document's type and version of HTML." },
    { question: "Which tag is used to embed an inline frame?", options: ["<frame>", "<embed>", "<iframe>", "<inline>"], answer: "<iframe>" },
    { question: "Which tag is used to define metadata about an HTML document?", options: ["<data>", "<metadata>", "<info>", "<meta>"], answer: "<meta>" }
  ],
  css: [
    { question: "What does CSS stand for?", options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
    { question: "Which CSS property is used to change the text color of an element?", options: ["text-color", "font-color", "color", "text-style"], answer: "color" },
    { question: "Which CSS property controls the size of text?", options: ["text-size", "font-size", "size-text", "text-font-size"], answer: "font-size" },
    { question: "How do you insert a comment in a CSS file?", options: ["// this is a comment", "/* this is a comment */", "*", "' this is a comment"], answer: "/* this is a comment */" },
    { question: "Which CSS property is used to add a background color?", options: ["background-color", "color-background", "bg-color", "background"], answer: "background-color" },
    { question: "Which CSS property is used to define the space between lines of text?", options: ["line-space", "text-spacing", "line-height", "spacing-line"], answer: "line-height" },
    { question: "Which of the following is an inline CSS style?", options: ["<style> p {color:red;} </style>", "p {color:red;}", "<p style='color:red;'>", "@import 'style.css';"], answer: "<p style='color:red;'>" },
    { question: "Which CSS selector selects all paragraph elements?", options: [".paragraph", "#paragraph", "p", "*p"], answer: "p" },
    { question: "Which CSS property is used to add a border?", options: ["border-style", "border", "outline", "border-line"], answer: "border" },
    { question: "Which CSS property is used to make text bold?", options: ["font-weight: bold;", "text-style: bold;", "font: bold;", "text-bold: true;"], answer: "font-weight: bold;" },
    { question: "What is the purpose of the CSS box model?", options: ["To define the layout of a grid.", "To describe the space surrounding HTML elements.", "To animate elements.", "To create responsive images."], answer: "To describe the space surrounding HTML elements." },
    { question: "Which property is used to set the left margin of an element?", options: ["margin-left", "left-margin", "margin-side", "left-space"], answer: "margin-left" },
    { question: "Which CSS unit is relative to the font-size of the element?", options: ["px", "cm", "em", "%"], answer: "em" },
    { question: "Which property is used to change the font family of an element?", options: ["text-family", "font-family", "family-font", "style-font"], answer: "font-family" },
    { question: "What does the CSS property 'display: none;' do?", options: ["Makes the element transparent.", "Hides the element completely.", "Changes the element's color to none.", "Removes the element's border."], answer: "Hides the element completely." },
    { question: "Which CSS property is used to control the spacing between letters?", options: ["word-spacing", "letter-spacing", "text-spacing", "character-spacing"], answer: "letter-spacing" },
    { question: "What is the purpose of the 'z-index' property?", options: ["To set the size of an element.", "To control the stacking order of elements.", "To change the color of an element.", "To align elements."], answer: "To control the stacking order of elements." },
    { question: "Which symbol is used for class selectors in CSS?", options: ["#", ".", "*", ">"], answer: "." },
    { question: "Which symbol is used for ID selectors in CSS?", options: ["#", ".", "*", ">"], answer: "#" },
    { question: "Which property is used to specify the type of list marker in an unordered list?", options: ["list-type", "list-style-type", "marker-type", "list-marker"], answer: "list-style-type" }
  ],
  javascript: [
    { question: "What keyword is used to declare a variable in JavaScript?", options: ["var", "variable", "string", "int"], answer: "var" },
    { question: "Which of the following is NOT a JavaScript data type?", options: ["String", "Number", "Boolean", "Character"], answer: "Character" },
    { question: "What does the === operator do in JavaScript?", options: ["Assigns a value", "Checks for equality with type coercion", "Checks for strict equality (value and type)", "Checks if a value is defined"], answer: "Checks for strict equality (value and type)" },
    { question: 'How do you write an "if" statement in JavaScript for executing some code if "i" is NOT equal to 5?', options: ["if (i <> 5)", "if i != 5", "if (i != 5)", "if i not= 5"], answer: "if (i != 5)" },
    { question: "Which method is used to add an element to the end of an array in JavaScript?", options: ["push()", "add()", "append()", "insert()"], answer: "push()" },
    { question: "What is the purpose of the typeof operator in JavaScript?", options: ["To change the type of a variable", "To check if a variable is defined", "To return the data type of a variable", "To convert a variable to a string"], answer: "To return the data type of a variable" },
    { question: "Which built-in function is used to convert a string to an integer in JavaScript?", options: ["toInteger()", "parseInt()", "convertInt()", "stringToInt()"], answer: "parseInt()" },
    { question: "What is the purpose of the addEventListener() method?", options: ["To remove an element from the DOM", "To add an event handler to an element", "To change the style of an element", "To create a new element"], answer: "To add an event handler to an element" },
    { question: "Which of the following is used for single-line comments in JavaScript?", options: ["/* ... */", "// ...", "-- ...", "' ..."], answer: "// ..." },
    { question: "What is a closure in JavaScript?", options: ["A function that returns a value", "A function that has access to variables from its outer (enclosing) function scope, even after the outer function has finished executing.", "A loop that iterates through an array", "A way to define a class"], answer: "A function that has access to variables from its outer (enclosing) function scope, even after the outer function has finished executing." },
    { question: "What is the this keyword in JavaScript?", options: ["A variable that stores the current date", "A reference to the current object", "A function that returns a random number", "A keyword used to define a function"], answer: "A reference to the current object" },
    { question: "Which method removes the last element from an array and returns that element?", options: ["shift()", "pop()", "splice()", "slice()"], answer: "pop()" },
    { question: "What is the purpose of the JSON.stringify() method?", options: ["To parse a JSON string", "To convert a JavaScript object to a JSON string", "To create a new JSON object", "To validate a JSON string"], answer: "To convert a JavaScript object to a JSON string" },
    { question: "Which loop is used to iterate over the properties of an object?", options: ["for loop", "while loop", "for...in loop", "do...while loop"], answer: "for...in loop" },
    { question: "What is the purpose of the setTimeout() function?", options: ["To execute a function repeatedly", "To execute a function after a specified delay", "To stop the execution of a function", "To create a new thread"], answer: "To execute a function after a specified delay" },
    { question: "What is the DOM in JavaScript?", options: ["Data Object Model", "Document Object Model", "Dynamic Object Model", "Database Object Model"], answer: "Document Object Model" },
    { question: "What is the purpose of the map() method in JavaScript arrays?", options: ["To remove elements from an array", "To create a new array with the results of calling a provided function on every element", "To sort the elements of an array", "To search for an element in an array"], answer: "To create a new array with the results of calling a provided function on every element" },
    { question: "Which keyword is used to handle exceptions in JavaScript?", options: ["error", "exception", "try...catch", "handle"], answer: "try...catch" },
    { question: "What is the purpose of the filter() method in JavaScript arrays?", options: ["To modify the elements of an array", "To create a new array with all elements that pass the test implemented by the provided function", "To sort the elements of an array", "To add elements to an array"], answer: "To create a new array with all elements that pass the test implemented by the provided function" },
    { question: "What is the difference between null and undefined in JavaScript?", options: ["They are the same.", "null is an assigned value, while undefined means a variable has been declared but not assigned a value.", "undefined is an assigned value, while null means a variable has been declared but not assigned a value.", "null is a number, and undefined is a string."], answer: "null is an assigned value, while undefined means a variable has been declared but not assigned a value." }
  ],
  reactjs: [
    { question: "What is React.js?", options: ["A JavaScript framework", "A JavaScript library for building user interfaces", "A database management system", "A backend framework"], answer: "A JavaScript library for building user interfaces" },
    { question: "Which of the following is used to create a React component?", options: ["class MyComponent {}", "function MyComponent() {}", "Both A and B", "None of the above"], answer: "Both A and B" },
    { question: "What is JSX in React?", options: ["A new JavaScript syntax", "A syntax extension for JavaScript that looks similar to HTML", "A CSS preprocessor", "A React plugin"], answer: "A syntax extension for JavaScript that looks similar to HTML" },
    { question: "How do you pass data to a child component in React?", options: ["Using state", "Using props", "Using functions", "Using Redux"], answer: "Using props" },
    { question: "Which hook is used to manage state in a functional component?", options: ["useState", "useEffect", "useContext", "useReducer"], answer: "useState" },
    { question: "What is the purpose of the useEffect hook?", options: ["To manage component state", "To perform side effects in functional components", "To update the DOM", "To handle HTTP requests"], answer: "To perform side effects in functional components" },
    { question: "Which method is called when a React component is first rendered?", options: ["componentDidMount", "componentWillUnmount", "componentDidUpdate", "render"], answer: "componentDidMount" },
    { question: "What is the virtual DOM in React?", options: ["A lightweight copy of the actual DOM", "A database for React components", "A backend API", "A new type of JavaScript object"], answer: "A lightweight copy of the actual DOM" },
    { question: "How can you conditionally render elements in React?", options: ["Using if-else statements", "Using the ternary operator", "Using logical && operator", "All of the above"], answer: "All of the above" },
    { question: "What is React Router used for?", options: ["Managing state", "Handling API requests", "Routing in React applications", "Managing component styles"], answer: "Routing in React applications" },
    { question: "Which of the following is NOT a React hook?", options: ["useState", "useEffect", "useClass", "useRef"], answer: "useClass" },
    { question: "What is the role of keys in React lists?", options: ["To uniquely identify list items", "To add event listeners", "To create new elements", "To manage component styles"], answer: "To uniquely identify list items" },
    { question: "What is Redux used for in React?", options: ["Styling components", "Managing state in large applications", "Handling API requests", "Navigating between pages"], answer: "Managing state in large applications" },
    { question: "What does React.Fragment do?", options: ["Adds styling to components", "Groups multiple elements without adding extra DOM nodes", "Handles API requests", "Creates a new component"], answer: "Groups multiple elements without adding extra DOM nodes" },
    { question: "Which of the following statements about React state is true?", options: ["State is mutable", "State should be updated directly", "State can only be used in class components", "State should be updated using setState or useState"], answer: "State should be updated using setState or useState" },
    { question: "What is the purpose of the Context API in React?", options: ["To make API calls", "To manage global state without prop drilling", "To style components", "To handle user authentication"], answer: "To manage global state without prop drilling" },
    { question: "What does the useRef hook do?", options: ["Manages state", "Creates a reference to a DOM element", "Handles side effects", "Manages component lifecycle"], answer: "Creates a reference to a DOM element" },
    { question: "Which method is used to update state in class components?", options: ["this.updateState()", "this.setState()", "this.modifyState()", "this.changeState()"], answer: "this.setState()" },
    { question: "What is the default behavior of forms in React?", options: ["They reload the page on submit", "They prevent default behavior automatically", "They send data using AJAX", "They store data in Redux"], answer: "They reload the page on submit" },
    { question: "How do you handle events in React?", options: ["Using event listeners like addEventListener()", "By binding event handlers in the constructor", "By passing a function as an event handler", "All of the above"], answer: "All of the above" }
  ],
  nodejs: [
    { question: "What is Node.js primarily used for?", options: ["Client-side scripting", "Server-side scripting", "Database management", "Graphic design"], answer: "Server-side scripting" },
    { question: "Node.js is built on which JavaScript engine?", options: ["SpiderMonkey", "Chakra", "V8", "JavaScriptCore"], answer: "V8" },
    { question: "Which of the following is a core module in Node.js?", options: ["DOM", "Canvas", "HTTP", "Window"], answer: "HTTP" },
    { question: "What does NPM stand for?", options: ["Node Package Manager", "Node Program Module", "New Page Module", "Network Programming Method"], answer: "Node Package Manager" },
    { question: "Which keyword is used to import modules in Node.js?", options: ["include", "require", "import", "using"], answer: "require" },
    { question: "Node.js is known for its...", options: ["Multi-threaded architecture", "Blocking I/O", "Single-threaded, non-blocking I/O", "Synchronous processing"], answer: "Single-threaded, non-blocking I/O" },
    { question: "What is the purpose of the package.json file?", options: ["To store website content", "To define server configurations", "To manage project dependencies and metadata", "To create HTML pages"], answer: "To manage project dependencies and metadata" },
    { question: "Which of the following is used to create a web server in Node.js?", options: ["createDocument()", "createServer()", "createWindow()", "createPage()"], answer: "createServer()" },
    { question: "What is the callback function in Node.js?", options: ["A function that runs before the main code", "A function that runs after an asynchronous operation completes", "A function that handles errors", "A function that creates variables"], answer: "A function that runs after an asynchronous operation completes" },
    { question: "What is the purpose of the fs module?", options: ["To handle network requests", "To interact with the file system", "To manage database connections", "To create user interfaces"], answer: "To interact with the file system" },
    { question: "Which of the following is a popular Node.js framework?", options: ["Django", "Ruby on Rails", "Express.js", "Spring Boot"], answer: "Express.js" },
    { question: "What does the __dirname variable represent?", options: ["The current file's name", "The current directory's path", "The parent directory's path", "The root directory's path"], answer: "The current directory's path" },
    { question: "What is the purpose of the EventEmitter class?", options: ["To handle HTTP requests", "To manage file streams", "To implement custom events", "To create database queries"], answer: "To implement custom events" },
    { question: "Which method is used to read data from a stream?", options: ["write()", "read()", "send()", "receive()"], answer: "read()" },
    { question: "What is the purpose of the process object?", options: ["To manage HTTP requests", "To provide information about the current Node.js process", "To handle file operations", "To create web pages"], answer: "To provide information about the current Node.js process" },
    { question: "What is the purpose of middleware in Express.js?", options: ["To create HTML templates", "To handle database connections", "To execute code during the request-response cycle", "To manage file uploads"], answer: "To execute code during the request-response cycle" },
    { question: "Which command is used to install a package using NPM?", options: ["npm add", "npm get", "npm install", "npm download"], answer: "npm install" },
    { question: "What does 'REPL' in Node.js stand for?", options: ["Read Evaluate Print Loop", "Request Execute Process Loop", "Read Execute Process List", "Request Evaluate Program List"], answer: "Read Evaluate Print Loop" },
    { question: "What is the purpose of the buffer module?", options: ["For managing database buffers.", "For handling binary data.", "For managing network buffers.", "For handling text data."], answer: "For handling binary data." },
    { question: "Which of the following is a global object in Node.js?", options: ["document", "window", "console", "body"], answer: "console" }
  ],
  expressjs: [
    { question: "What is Express.js primarily used for?", options: ["Client-side scripting", "Database management", "Building web servers and APIs", "Creating mobile applications"], answer: "Building web servers and APIs" },
    { question: "Express.js is a framework for which programming language?", options: ["Python", "Java", "JavaScript", "Ruby"], answer: "JavaScript" },
    { question: "Which method is used to define a route in Express.js?", options: ["create()", "define()", "route()", "app.get(), app.post(), etc."], answer: "app.get(), app.post(), etc." },
    { question: "What does the 'req' object in an Express.js route handler represent?", options: ["Response object", "Request object", "Router object", "Resource object"], answer: "Request object" },
    { question: "What does the 'res' object in an Express.js route handler represent?", options: ["Response object", "Request object", "Router object", "Resource object"], answer: "Response object" },
    { question: "Which middleware function is used to parse JSON request bodies?", options: ["express.urlencoded()", "express.json()", "express.static()", "express.cookieParser()"], answer: "express.json()" },
    { question: "Which middleware function is used to serve static files (like HTML, CSS, and JavaScript)?", options: ["express.urlencoded()", "express.json()", "express.static()", "express.cookieParser()"], answer: "express.static()" },
    { question: "What is the purpose of next() in an Express.js middleware function?", options: ["To end the request-response cycle", "To send a response to the client", "To pass control to the next middleware function", "To restart the server"], answer: "To pass control to the next middleware function" },
    { question: "Which method is used to set the HTTP status code in an Express.js response?", options: ["res.status()", "res.code()", "res.setStatusCode()", "res.httpStatus()"], answer: "res.status()" },
    { question: "Which method is used to send a JSON response in Express.js?", options: ["res.send()", "res.json()", "res.data()", "res.output()"], answer: "res.json()" },
    { question: "What is a 'route parameter' in Express.js?", options: ["A predefined URL path", "A variable part of a URL path", "A query string value", "A static file name"], answer: "A variable part of a URL path" },
    { question: "How do you access route parameters in Express.js?", options: ["req.query", "req.body", "req.params", "req.headers"], answer: "req.params" },
    { question: "How do you access query parameters in Express.js?", options: ["req.query", "req.body", "req.params", "req.headers"], answer: "req.query" },
    { question: "What is the purpose of the app.listen() method?", options: ["To define routes", "To start the server and listen for incoming requests", "To send a response", "To handle errors"], answer: "To start the server and listen for incoming requests" },
    { question: "Which of the following is an example of a valid middleware function?", options: ["function route(req, res) {}", "function handler(req) {}", "function middleware(req, res, next) {}", "function response(res) {}"], answer: "function middleware(req, res, next) {}" },
    { question: "What does the app.use() method do?", options: ["Defines a route", "Applies middleware to the application", "Sends a response", "Starts the server"], answer: "Applies middleware to the application" },
    { question: "What is the purpose of error-handling middleware?", options: ["To define routes", "To handle errors that occur during the request-response cycle", "To serve static files", "To parse JSON data"], answer: "To handle errors that occur during the request-response cycle" },
    { question: "Where is error-handling middleware typically placed in the middleware stack?", options: ["At the beginning", "In the middle", "At the end", "Anywhere"], answer: "At the end" },
    { question: "What is a template engine used for in Express.js?", options: ["Database management", "Generating dynamic HTML content", "Client-side scripting", "Network security"], answer: "Generating dynamic HTML content" },
    { question: "Which npm command is used to install Express.js?", options: ["npm install express", "npm add express", "npm get express", "npm create express"], answer: "npm install express" }
  ],
};

const QuizPage = () => {
  const { topic } = useParams();
  const questions = quizData[topic] || [];
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes

  useEffect(() => {
    if (questions.length === 0) return;

    if (!finished) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setFinished(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [finished, questions.length]);

  useEffect(() => {
    if (finished) {
      const newResult = {
        topic,
        score,
        total: questions.length,
        time: formatTime(1200 - timeLeft),
        date: new Date().toLocaleDateString(),
      };

      const currentUserEmail = auth.currentUser?.email || localStorage.getItem("userEmail");
      if (currentUserEmail) {
        const storageKey = `quizResults_${currentUserEmail}`;
        const previousResults = JSON.parse(localStorage.getItem(storageKey)) || [];
        localStorage.setItem(storageKey, JSON.stringify([...previousResults, newResult]));
      }
    }
  }, [finished, timeLeft, topic, score, questions.length]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleAnswer = (option) => {
    setSelectedOption(option);
    const correct = option === questions[currentQuestion].answer;
    if (correct) setScore((prevScore) => prevScore + 1);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setFinished(true);
    }
  };

  const getPerformanceAnalysis = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "🌟 Excellent! You have mastered this topic.";
    if (percentage >= 75) return "👍 Great job! Keep practicing to reach excellence.";
    if (percentage >= 50) return "🙂 Good effort! A bit more revision will help.";
    return "📚 Keep practicing! You're improving—keep it up and try again!";
  };

  const questionsLeft = questions.length - currentQuestion - (selectedOption !== null ? 1 : 0);

  return (
    <div className="quiz-container">
      {finished ? (
        <div className="result-container">
          <div className="result-heading">Quiz Completed!</div>
          <div className="result-score">Your Score: {score} / {questions.length}</div>
          <div className="result-subtext">{getPerformanceAnalysis()}</div>
          <table className="stats-table">
            <tbody>
              <tr><td>Total Questions:</td><td>{questions.length}</td></tr>
              <tr><td>Correct Answers:</td><td>{score}</td></tr>
              <tr><td>Incorrect Answers:</td><td>{questions.length - score}</td></tr>
              <tr><td>Time Taken:</td><td>{formatTime(1200 - timeLeft)}</td></tr>
            </tbody>
          </table>
          <div className="result-buttons">
            <button onClick={() => window.location.reload()}>Retry Quiz</button>
            <button onClick={() => navigate("/home")}>Go to Home</button>
          </div>
        </div>
      ) : (
        <>
          <h3>Time Left: {formatTime(timeLeft)} | Questions Left: {questionsLeft}</h3>
          <div className="question-box">
            <h3 className="question-text">{questions[currentQuestion]?.question}</h3>
            <table className="quiz-table">
              <tbody>
                {questions[currentQuestion]?.options.map((option, index) => (
                  <tr key={index}>
                    <td
                      onClick={() => handleAnswer(option)}
                      className={
                        selectedOption
                          ? option === questions[currentQuestion].answer
                            ? "correct-answer"
                            : option === selectedOption
                            ? "incorrect-answer"
                            : ""
                          : "hoverable"
                      }
                      style={{ cursor: selectedOption ? "default" : "pointer" }}
                    >
                      {option}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedOption !== null && (
              <button className="next-button" onClick={nextQuestion}>
                Next Question
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizPage;