---
title: C++ quick reference
---

## Arrays

#### Create an array

```
int ints[] = {61, 12, 31};
```

#### Idiom for getting size (number of elements) of an array

```
sizeof(ints) / sizeof(ints[0])
```

## Strings

#### Create a string

```
#include <string>
std::string s = "this is a string";
```

#### String replacement

```
std::string s = "this is a string";
std::string toReplace = "string";
std::string replacement = "nothin";
// first we need to make sure the string to replace is in the string
if (s.find(toReplace) != std::string::npos) {
    // replace "string" with "nothin" in s
    std::cout << s.replace(s.find(toReplace), replacement.size(), replacement) << std::endl;
}
```

Note: std::string.replace() replaces the string in place (i.e. no s = s.replace() necessary)

#### Get a subset of a string

Use string.substr(), which takes two arguments: position and length of substring:

```
// get the last character of a string
std::cout << s.substr(s.size() - 1, 1) << std::endl;
```

#### Convert an string to an int

```
#include <cstdlib>
// first convert the string to a const char*
const char *c = s.c_str();
// then convert the char* to an int
int i = std::atoi(c);

// or do both steps at once
int i = std::atoi(s.c_str());
```

## Vectors

#### Create a vector

```
#include <vector>
std::vector<std::string> listOfStrings;
```

#### Add something to the end of a vector

```
listOfStrings.push_back("string1");
```

#### Iterate over a vector

```
std::vector<std::string>::iterator vit;
for (vit = listOfStrings.begin(); vit != listOfStrings.end(); vit++) {
    // iterators act like pointers (but technically they aren't)
    std::cout << *vit << std::endl;
}
```

#### Initialize a vector with default values

```
static const char chars[] = {'a', 'b', 'c', 'a'};
std::vector<char> v (chars, chars + sizeof(chars) / sizeof(chars[0]));
```

## Maps

#### Declare a map

```
#include <map>
std::map<std::string, int> sightings;
```

#### Add items to a map

Recommended (because the [] operator is slightly more expensive):

```
// map internally uses pair structs to store the key and value
sightings.insert(std::make_pair("llama", 2));
sightings.insert(std::make_pair("alpaca", 5));
sightings.insert(std::make_pair("guanaco", 3));
```

Alternative (does the same thing):

```
sightings["llama"] = 2;
sightings["alpaca"] = 5;
sightings["guanaco"] = 3;
```

#### Test a map for existence of a key

```
if (sightings.count("alpaca") == 1) {
```

Alternative (does the same thing):

```
if (sightings.find("alpaca") != sightings.end()) {
```

#### Get a value for a particular key

Using an iterator:

```
if (sightings.count("alpaca") == 1) {
    std::map<std::string, int>::iterator mit = sightings.find("alpaca");
    // remember, iterators act like pointers
    // parentheses required around the iterator or it'll throw an error
    // (*mit).second gets the second element of the key-value pair
    std::cout << (*mit).second << " alpacas sighted" << std::endl;
}
```

Alternative (does the same thing):

```
if (sightings.count("alpaca") == 1) {
    std::cout << sightings["alpaca"] << " alpacas sighted" << std::endl;
}
```

**Note:** be careful using the second example, because the [] operator will create a key if it doesn't exist. For example, if you're copying code and accidentally do this:

```
if (sightings.count("alpaca") == 1) {
    std::cout << sightings["camel"] << " alpacas sighted" << std::endl;
}
```

A key for "camel" will be created in the map (with no value).

#### Iterating over a map and printing its values

```
std::map<std::string, int>::iterator mit;
for (mit = sightings.begin(); mit != sightings.end(); mit++) {
    // (*mit).second gets the value and (*is).first gets the key
    std::cout << (*mit).second << " " << (*mit).first << "s sighted" << std::endl;
}
```

Prints:

```
5 alpacas sighted
3 guanacos sighted
2 llamas sighted
```

## Nested containers

#### Iterating over a vector nested in a map

```
std::map<std::string, std::vector<std::string> > sightings;

// [] operator automatically creates the llama and alpaca keys
sightings["llama"].push_back("Albuquerque");
sightings["llama"].push_back("Gatineau");
sightings["alpaca"].push_back("Québec");
sightings["alpaca"].push_back("Gaspé");

std::map<std::string, std::vector<std::string> >::iterator mit;
std::vector<std::string>::iterator vit;

for (mit = sightings.begin(); mit != sightings.end(); mit++) {
    // remember it's a map, so you have to use .first to access the key
    std::cout << (*mit).first << " sightings: ";
    // also don't forget to put the iterator in parentheses
    for (vit = (*mit).second.begin(); vit != (*mit).second.end(); vit++) {
        std::cout << *vit << "\t";
    }
    std::cout << std::endl;
}
```

Prints:

```
alpaca sightings: Québec Gaspé
llama sightings: Albuquerque Gatineau
```

## File I/O

#### Reading and writing to files

```
#include <fstream>

// open a file for reading
std::ifstream inData;
inData.open("infile.txt");

// open a file for writing
std::ofstream outData;
outData.open("outfile.txt");

std::string inString;
// read the input file one line at a time, dropping the newline
while (getline(inData, inString)) {
    // write each line to output file, adding newline back
    outData << inString << std::endl;
}

// close the input and output files
inData.close();
outData.close();
```

## Command-line arguments

#### Print command line arguments

```
int main(int argc, char **argv) {
    for (int i = 0; i < argc; i++) {
        std::cout << argv[i] << std::endl;
    }
}
```

## Classes

#### Sample class:

car.h:

```
#include <iostream>

#ifndef CAR_H
#define CAR_H

// empty class definition so we can declare Car and Sedan friends of CarDoor
class Car;
class Sedan;

class CarDoor {
public:
    // leave out the return type for the constructor
    CarDoor();
    // declare Car a friend of CarDoor so it can access its private members
    friend class Car;
    // Sedan needs access too
    friend class Sedan;
private:
    enum DoorStatus {
        open,
        closed
    };
    DoorStatus doorStatus;
}; // <-- don't forget to end the class definition with a semicolon!

class Car {
public:
    void openFrontDoors();
    void pressHorn();
    // the virtual keyword allows the overridden method to be called when using Sedan in functions that require Car (polymorphism)
    virtual void showDoorStatus();
private:
    // for simplicity's sake we'll lump both front doors together
    CarDoor frontDoors;
};

// Sedan inherits Car. public keyword is used to keep public members of Car public (this is almost always what you want)
class Sedan : public Car {
public:
    void showDoorStatus();
private:
    CarDoor rearDoors;
};

#endif // CAR_H
```

car.cpp:

```
#include "car.h"

CarDoor::CarDoor() {
    doorStatus = closed;
}

void Car::pressHorn() {
    std::cout << "beep" << std::endl;
}

void Car::openFrontDoors() {
    frontDoors.doorStatus = CarDoor::open;
}

void Car::showDoorStatus() {
    if (frontDoors.doorStatus == CarDoor::open) {
        std::cout << "Front doors are open!" << std::endl;
    } else if (frontDoors.doorStatus == CarDoor::closed) {
        std::cout << "Front doors are closed" << std::endl;
    }
}

void Sedan::showDoorStatus() {
    Car::showDoorStatus();
    // some code redundancy here, but we really don't care for this example
    if (rearDoors.doorStatus == CarDoor::open) {
        std::cout << "Rear doors are open!" << std::endl;
    } else if (rearDoors.doorStatus == CarDoor::closed) {
        std::cout << "Rear doors are closed" << std::endl;
    }
}
```

usecar.cpp:

```
// car needs to be passed by reference
void showCarDoorStatus(Car& car) {
    car.showDoorStatus();
}

int main() {
    Car car;
    car.pressHorn();
    car.openFrontDoors();

    Sedan sedan;
    // calls Car.pressHorn()
    sedan.pressHorn();
    // calls Sedan.showDoorStatus()
    sedan.showDoorStatus();

    // calls Car.showDoorStatus()
    showCarDoorStatus(car);
    // calls Sedan.showDoorStatus()
    showCarDoorStatus(sedan);
}
```

## Algorithms

#### To use algorithms from the standard library:

```
#include <algorithm>
```

**Note:** first make sure the object doesn't have its own built-in operation before using an algorithm. For example, use list.reverse(), list.sort(), map.count(), map.find().

#### reverse()

Reverse a string:

```
std::string s = "this is a string";
std::reverse(s.begin(), s.end());
std::cout << s << std::endl;
```

#### count()

Print the occurrences of a particular item in a vector:

```
static const char chars[] = {'a', 'b', 'c', 'a'};
std::vector<char> v (chars, chars + sizeof(chars) / sizeof(chars[0]));
std::cout << std::count(v.begin(), v.end(), 'a') << std::endl;
```

#### sort() (has variations)

Sort a vector full of chars (using the same vector from count() above):

```
std::sort(v.begin(), v.end());
```

#### max()/min()

Return the greater of two values:

```
std::cout << std::max(5, 10) << std::endl;
```

#### replace()

Replace occurrences of 'a' with 'd' in the vector:

```
std::replace(v.begin(), v.end(), 'a', 'd');
```

#### random_shuffle()

Shuffle the elements in the vector:

```
#include <ctime>
// seed the random number generator (required)
std::srand (unsigned (std::time(0)));
std::random_shuffle(v.begin(), v.end());
```

#### binary_search()

Determine whether item is in vector (returns bool):

```
std::cout << binary_search(v.begin(), v.end(), 'c') << std::endl;
```

#### copy()

Copy one vector to another:

```
// the destination must be the same size as the source
std::vector<char> vCopy(v.size());
std::copy(v.begin(), v.end(), vCopy.begin());
```

#### for_each()

Apply myfunction() to each member of the vector:

```
void myfunction(char c) {
    std::cout << c << std::endl;
}
std::for_each(v.begin(), v.end(), myfunction);
```
