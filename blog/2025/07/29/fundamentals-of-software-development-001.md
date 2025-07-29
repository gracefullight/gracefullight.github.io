---
title: Fundamentals of software development @001
date: 2025-07-29T19:05:17.618+10:00
description: Fundamentals of software development 001
authors: me
tags:
  - fsd
---

## Software Engineering

```mermaid
graph TD
  SWE[Software Engineering]
  SWE --> Systematic[Systematic<br/>SDLC]
  SWE --> Disciplined[Disciplined<br/>Methodologies]
  SWE --> Quantifiable[Quantifiable<br/>Measurable outcomes]
```

### SDLC

```mermaid
graph LR
  Ideation --> Requirements --> Design --> Development --> Testing --> Deployment --> Maintenance
```

### SW Development Methodologies

#### Waterfall

- Pros
  - Simple & easy: each phase has specific deliverables
  - Clear & set milestones
  - Fixed requirements
  - Works well for small projects with specific set of requirements
  - Determine the schedule early
  - Clear structure
- Cons
  - Working sw produced only at the end
  - High uncertainty of sw quality and functionality
  - Delayed testing, delays sw bugs discovery
  - After completion, no formal way to change the requirements
  - Fix working model, difficult to implement for complex projects

#### Agile

- Iterative cyclical progression of the SDLC
  - Repetitive structure based on iterations (sprints)
  - 2 ~ 4 weeks, SDLC repeats
  - Each release has 3 or more iterations
  - Working prototype is produced at the end of each iteration
  - Prototype is for QA and used as input for next iteration
  - Multiple releases
- Pros
  - Innovation through team collaboration
  - Time to market
  - Continuous testing
  - Risk reduction, finding sw bugs early
  - Customer feedback loop
  - Flexibility to change requirements
  - Automates most of the SDLC === DevOps approach
- Cons
  - Lack of long-term planning
  - Cost estimation is difficult
  - Limited documentation
  - No finite end
  - Difficult to see the end result due due to cyclic nature of agile

### SW Development Paradigms

```mermaid
graph TB
  ProgrammingParadigms[Programming Paradigms]
  ProgrammingParadigms --> Imperative[Imperative<br/>명령형]
    Imperative --> Procedural[Procedural<br/>절차적]
    Imperative --> ObjectOriented[Object-Oriented<br/>객체지향]
  ProgrammingParadigms --> Declarative[Declarative<br/>선언형]
    Declarative --> Functional[Functional<br/>함수형]
    Declarative --> Logical[Logical<br/>논리적]
```

#### Procedural Programming

```mermaid
graph TD
  MainProgram[Main Program]
  MainProgram --> GlobalData1[Global Data]
  MainProgram --> GlobalData2[Global Data]
  MainProgram --> GlobalData3[Global Data]

  GlobalData1 --- Function1[Function 1]
  GlobalData1 --- Function2[Function 2]

  GlobalData2 --- Function1[Function 1]
  GlobalData2 --- Function2[Function 2]
  GlobalData2 --- Function3[Function 3]

  GlobalData3 --- Function3[Function 3]

  GlobalData2 --- Function4[Function 4]
  GlobalData3 --- Function4[Function 4] 
```

- Top-down decomposition: Each sub-problem is typically implemented as a function or procedure
- Root represents the main program
- Leaves denote individual procedures or functions

#### Object-Oriented Programming

```mermaid
graph TD
  subgraph Classes&Objects[Classes & Objects]
    direction LR
    Abstraction --- Polymorphism --- Encapsulation --- Inheritance --- Abstraction
  end
```

- Abstraction: The process of hiding unnecessary details
- Encapsulation: Restricts the direct access to components of an object, while using methods to access and modify the data
- Inheritance: The process of creating sub-class
- Polymorphism: Allows for the creation, use, and storage of multiple objects that inherit from the same parent class

## Requirements Analysis

> Instructions provided by the stakeholder describe a target system

- system properties, attributes and how a system should behave
- Decomposed into Functional requirements / Non-functional requirements

```mermaid
graph LR
  Gathering_Eliciting[Gathering & Eliciting Requirements] --> Analyze[Analyze the documented Requirements<br/>Validate requirements]
  Analyze --> Identify[Identify use cases or user stories]
  Identify --> Use_case_modelling[Use case modeling<br/>High-level system functions into UML]
```

### Requirements Validation

- Compliance
- Correctness
- Completeness
- Consistency
- Usability

```mermaid
graph LR
  Perform_the_testing[Perform the testing] --> Record_the_results[Record the results] --> Discuss_the_results[Discuss the results] --> Implement_changes[Implement changes]
```

| Criteria | Description | Satisfactory Score (0-5) | Recommendations |
| --- | --- | --- | --- |
| Compliance | Degree to which the requirements meet with industry standards and regulations | 0 | - |
| Correctness | Degree to which the requirements is correct in terms of spelling, accuracy, grammatically. | 0 | - |
| Completeness | Degree to which the functional requirements match the intended software behavior | 0 | - |
| Consistency | Degree to which the requirements can be mapped to use cases | 0 | - |
| Expandability | Degree to which the requirements can be modified and improved to meet the project objectives | 0 | - |

### Use Case

> an actor wants the system to, and captures functional requirements

- always started by an actor, always written from the perspective of the actor
- a series of actions that a user must initiate to carry out some useful work and to achieve a goal
  - preconditions -> main flow -> alternative flow -> postconditions
- reflects all the possible events in the system
- complete set of use cases describes all the possible ways the system will behave and defines all the requirements

```mermaid
graph TD
  UseCase[Use Case Analysis] --> Q1[What functions will a specific<br/>actor want from the system?]
  UseCase --> Q2[Does the system store<br/>or retrieve information?]
  UseCase --> Q3[What happens when the<br/>system changes state?]
  UseCase --> Q4[Does the system interact<br/>with any external system?]
  UseCase --> Q5[Does the system<br/>generate any reports?]
  
  Q1 --> Actor[Actor Requirements]
  Q2 --> Data[Data Management]
  Q3 --> State[State Management]
  Q4 --> External[External Integration]
  Q5 --> Reports[Report Generation]
  
  Actor --> Complete[Complete Use Case Model]
  Data --> Complete
  State --> Complete
  External --> Complete
  Reports --> Complete
  
  style UseCase fill:#E6F3FF,stroke:#3366FF,stroke-width:2px
  style Complete fill:#E6FFDD,stroke:#66BB66,stroke-width:2px
  style Actor fill:#FFF2CC,stroke:#FFC000,stroke-width:1px
  style Data fill:#FFF2CC,stroke:#FFC000,stroke-width:1px
  style State fill:#FFF2CC,stroke:#FFC000,stroke-width:1px
  style External fill:#FFF2CC,stroke:#FFC000,stroke-width:1px
  style Reports fill:#FFF2CC,stroke:#FFC000,stroke-width:1px
```

### Use Case Backlog Template

| ID | Use Case Title | Actor(s) | Goal/Description | Preconditions | Postconditions | Priority | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-001 | User Login | User | Allow users to log in to the system | User must have an account | User is logged in | High | Open | - |
| UC-002 | View Profile | User | Allow users to view their profile information | User must be logged in | User profile is displayed | Medium | Open | - |

### User Stories

- Planned to be delivered in a single iteration, some user stories may span multiple iterations
- Single requirement expressed from developer's perspective
- Describes a functional or non-functional requirement

```mermaid
graph TD
  As[As a **role**] --> IWant[I want to **goal**]
  IWant --> SoThat[So that **benefit**]
```

- **As a** student
- **I want to** submit assignments online
- **so that** I can receive feedback from my instructor.

| ID | User Story | Acceptance Criteria | Priority | Status | Story Points | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| US-001 | As a student, I want to submit assignments online so that I can receive feedback from my instructor. | - User can upload assignment files<br/>- User receives confirmation of submission<br/>- Instructor can view submitted assignments | High | Open | 5 | - |
| US-002 | As a student, I want to view my grades online so that I can track my academic progress. | - User can view grades for each assignment<br/>- User can see overall course grade<br/>- Grades are updated in real-time | Medium | Open | 3 | - |

## UML

```mermaid
graph TD
  subgraph Behavior_Diagrams[Behavior Diagrams]
    direction LR
    UseCaseDiagram[Use Case Diagram]
    SequenceDiagram[Sequence Diagram]
    ActivityDiagram[Activity Diagram]
    StateMachineDiagram[State Machine Diagram]
  end 
  
  subgraph Structure_Diagrams[Structure Diagrams]
    direction LR
    ClassDiagram[Class Diagram]
    ObjectDiagram[Object Diagram]
    ComponentDiagram[Component Diagram]
    DeploymentDiagram[Deployment Diagram]
  end
```

- Actors: Entity that performs actions in the system
- Use Cases: Oval representation inside the system boundary of a functional requirement
- System Boundary: Square representation of the system scope
- Relationships
  - Association: Between an actor and a use case
  - Include: Between use cases, The included use case is always necessary for the completion of the activating use case.
  - Extend: Between use cases, The extension use case is activated occasionally at specific extension point.
  - Generalization/Inheritance: Between use cases, they achieve the same goal but in different ways.

```mermaid
graph LR
  Choose_System_boundary[Choose System Boundary] --> Identify_Actors[Identify Actors]
  Identify_Actors --> Identify_Their_Goals[Identify Their Goals<br/>goal-oriented, verb-noun phrases]
  Identify_Their_Goals --> Connect_Actors_use_cases[Connect Actors to Use Cases]
```

### Use Case Model

```mermaid
graph LR
    %% Actors
    Customer((Customer))
    Clerk((Clerk))
    
    %% System Boundary
    subgraph "Video Stream System"
        %% Use Cases
        UC1[Authenticate User]
        UC1A[Login]
        UC1B[Register]
        UC2[Browse Videos]
        UC3[Play Video]
        UC4[Upload Video]
        UC5[Manage Users]
        UC6[Request Support]
    end
    
    %% Customer Use Cases
    Customer --- UC1A
    Customer --- UC1B
    Customer --- UC2
    Customer --- UC3
    Customer --- UC6
    
    %% Clerk Use Cases
    Clerk --- UC1A
    Clerk --- UC4
    Clerk --- UC5
    Clerk --- UC6
    
    %% Generalization/Inheritance Relationships
    UC1A --> UC1
    UC1B --> UC1
    
    %% Include Relationships
    UC3 -.->|include| UC1A
    UC4 -.->|include| UC1A
    
    %% Extend Relationships
    UC2 -.->|extend| UC3
    
    %% Styling
    style Customer fill:#E6F3FF,stroke:#3366FF,stroke-width:2px
    style Clerk fill:#FFE6CC,stroke:#FF9900,stroke-width:2px
    style UC1 fill:#FFE6E6,stroke:#FF6B6B,stroke-width:3px
    style UC1A fill:#FFE6E6,stroke:#FF6B6B,stroke-width:1px
    style UC1B fill:#FFE6E6,stroke:#FF6B6B,stroke-width:1px
    style UC2 fill:#F0F8FF,stroke:#4682B4,stroke-width:1px
    style UC3 fill:#F0F8FF,stroke:#4682B4,stroke-width:1px
    style UC4 fill:#FFF8DC,stroke:#DAA520,stroke-width:1px
    style UC5 fill:#FFF8DC,stroke:#DAA520,stroke-width:1px
    style UC6 fill:#E6FFE6,stroke:#32CD32,stroke-width:2px
```

- System boundary: Defines the scope of the system
- Generalization: Describes the shared parts in a parent use case, then specializes in child use cases
  - Inherit features from their parent use case
  - Add new features
  - Change inherited features
- Short, simple use cases on the core functionality may be completed within one iteration.
- Keep use cases short and simple
- Focus on what, not the how
- Avoid functional decomposition

### UML Use Case Model

- CRUD
  - Create a record
  - Retrieve the record given a key
  - Update the record with new data and store it
  - Delete a record
- Each is a separate goal, possibly carried by a different person with a different security level.
