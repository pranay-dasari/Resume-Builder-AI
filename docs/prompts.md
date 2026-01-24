## Resume AI Prompt

=====================================================================================
#High Level Design Prompt
-------------------------------------------------------------------------------------
Using the available codebase, system context, and architectural patterns, create a comprehensive High-Level Design (HLD) document for the application.

The document should provide a clear architectural overview and must include:

System overview and objectives

Major components and modules, with their responsibilities

Overall system architecture (logical and physical views)

Data flow and interaction diagrams between components

Key technologies, frameworks, and platforms used

Integration points with external systems and services

High-level data model and storage strategy

Authentication, authorization, and security considerations

Scalability, performance, and availability considerations

Deployment overview (environments, infrastructure assumptions)

Assumptions, constraints, and non-functional requirements

The HLD should abstract away low-level implementation details and instead focus on design decisions, system boundaries, and interactions, serving as a reference for architects, stakeholders, and development teams.
=====================================================================================

=====================================================================================
#Low Level Design Prompt
-------------------------------------------------------------------------------------
Using the existing codebase as the single source of truth, comprehensively update the low_level_design.md document.

The document should serve as a complete technical reference and must include:

A breakdown of each page or module in the system

Detailed descriptions of all fields, attributes, and data elements

Clear definitions of relationships between entities (including data flow and dependencies)

Documentation of all connections and integrations (e.g., APIs, services, databases, internal/external interfaces)

Any relevant logic, constraints, validations, and assumptions inferred from the code

Ensure the documentation is accurate, exhaustive, and directly derived from the available code, written in a clear and structured format suitable for long-term reference by developers and architects.
=====================================================================================

#Prompt for UI Specification Document
-------------------------------------------------------------------------------------
Create a comprehensive UI Specification Document for the application, focusing only on user interface components and visual structure.

The document should act as a functional UI reference and must include:

A list of all pages/screens in the application

Description of each page’s purpose and layout

Detailed enumeration of UI fields and components (e.g., inputs, dropdowns, buttons, tables, modals, labels, icons)

Definition of modules or UI sections within each page

Description of UI artifacts such as forms, dashboards, wizards, pop-ups, alerts, and notifications

User interactions and behaviors (e.g., validations, enable/disable states, visibility rules, navigation flow)

UI relationships and navigation between pages and modules

Any relevant UI rules, assumptions, and constraints

The document should exclude all technical, backend, architectural, and implementation details.
Focus solely on what the user sees and interacts with, using clear, structured, and easily understandable language suitable for designers, product owners, and stakeholders.
=====================================================================================