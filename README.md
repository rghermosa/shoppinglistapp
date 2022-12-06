# **SHOPPING LIST APPLICATION**

## **What is this application about?**

This application is a personal project made by Roger González Hermosa, owner of this GitHub repository. 
It consists of a basic shopping list application in which you can create users and each user can see available products, brands and add them to custom lists to order them later on.

--------

## **Technologies, concepts, techniques, methodologies... followed**
This application is micro-service based following the next concepts/principles/technologies:
- **_Hexagonal/Clean architecture_** for a better organization of the code depending on its responsability.
- **_Domain Driven Design_** due to design decision to simulate a large application where the application is scalable enough to break a micro-service into 2 without much effort among other advantages this code technique has.
- **_Design Patterns_** as the optimum way to solve certain problems and to have a better organization and hierarchy of the code.  
Some of the design patterns used are Singleton, Factory Method, Abstract Factory, Adapter, Bridge, Facade, Decorator, Proxy, among others that are not emphasized
- **_Nodejs with TypeScript_** for development, this may change in the future depending on the architecture and design decisions.
- **_SOLID and Clean Code_**, to achieve a good coding quality for a better maintainance of the code and the features implemented.
- **_Docker_** for containarizing the micro-services.
- **_RabbitMQ_** for communication between some of the micro-services.  
(please look out the design to see which ones use MQ to communicate)
- **_Event Driven Architecture_** for reaching a nondependant, fast, scalable and asynchronous communication between services.  
(using RabbitMQ)
- **_Git Flow_** to create features and organize branches.  
(due to a lack of JIRA it's hard to segment each piece of code into sub branches so they are all in the same micro-service branch)   

_PS: Please note that I'm no expert whatsoever in any of this technologies, techniques, concepts... I'm just doing this to learn._  
_If you have any advice or enhancement to give me I would be more than happy to discuss it._

--------


## **Basic troubleshooting**

Depending on the IDE/editor you are working on, you might see some problems on the files, that can be for different reasons:

- You don't have TypeScript installed on your editor/machine and it's not recognising some of the features this language has, please install TypeScript to also get hints or improvements that IntelliSense may suggest.

- The other possible reason is that there's a search going on in your node_modules the modules of third party libraries that are used in the project, to fix that you should go for each context installing its dependencies (npm install). 
<br />
<br />


_PS: I'm working on a script that should fix that altogether._

---------

## **How to run the application**

You will need to have Docker installed and running in order to do so.

It is highly recommended to also have a postgres client installed and running to run the application for the connections to not fail when starting the services.

Once all of that is done, you just have to follow this two steps:

1. Run `docker-compose build` in your preffered terminal to build the services and compile the code. 
_It usually takes less than a minute_

2. Run `docker-compose up` after a build to run the compiled code.  
_It usually takes 20 secs_


If you wish to run or build one or more services in specific, you can run both commands with the names of the services you wish to build/run as follows: `docker-compose build rabbitmq user-management`.  
This is useful when you haven't modified all the services and want to build the modified one, you just want to check if the modified compiles, etc...

<br>

_PS: If a container fails or keeps stuck in the npm install step, abort the process and do it all over again._

------

## **Architecture/Design**


This is a diagram that shows the Architechture and Design followed.
This is made by me and it still has a lot of room for several improvements whether visually or technically, still there are some decisions that are made for a specific purpose. You can reach out with a proposal if you don't agree.

![ShoppingList Architecture](https://github.com/rghermosa/shoppinglistapp/blob/main/shoppinglist_architecture.jpg?raw=true)
<br />
<br />

_TODO: Explain design and architectural decisions about the app_

