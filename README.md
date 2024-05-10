# Overview
- The entire course is of 14 Parts. Core course is 7 Parts.
- This repository consists of exercises from Part 3.
- Check [Parts 0 - 2](https://github.com/prak112/fullstack-open-core) 

# Part 3 - Programming a server with Node.js and Express
- [Deployed Phonebook application](https://fullstackopen-core-part3.onrender.com) on Render

| Exercises | Description |
| --- | --- |
| 3.1 to 3.8 | [Build REST API using Express](/index.js), [API testing using REST Client extension](/requests/), Middleware logging using `morgan` |
| 3.9 to 3.11 | Deploy backend using Render - [Deployed Phonebook app](https://fullstackopen-core-part3.onrender.com), Deploy frontend production build |
| 3.12 to 3.18 | MongoDB-mongoose [test deployment](/mongo.js), MongoDB-mongoose [setup with backend](/models/contact.js), [Error handling Middleware](/index.js) |
| 3.19 to 3.22 | [Input validation](/models/contact.js), Refactor to fix ESLint warnings |

## Project structure
- Recommended structure based on best practices for [server-app files seperation](https://dev.to/nermineslimane/always-separate-app-and-server-files--1nc7) ( *check comments for more useful info* ) 

```
    ├── index.js
    ├── app.js
    ├── controllers
    │   └── contactsController.js
    ├── dist
    │   └─-...
    ├── models
    │   └── contact.js
    |-- node_modules
    |   └─-...
    |-- requests
    |   └─-...
    |-- routes
    |   └─- contacts.js
    ├── utils
    │   ├── config.js
    │   ├── logger.js
    │   └── middleware.js
    |-- .env
    ├── .gitignore
    ├── eslint.config.mjs
    ├── package.json
    ├── README.md 
```
<hr>

### Interaction between modules

```mermaid
graph LR
    subgraph FRONTEND-'dist'
        PL[Presentation Layer]
        CMP[Components]
        CLAP[Client-API]
    end
    subgraph BACKEND
        subgraph SERVER
            I[index.js]
            A[app.js]
        end
        subgraph UTILITIES
            CNF[config.js]
            LG[logger.js]
            MW[middleware.js]
        end
        subgraph CONTROLLERS
            C[contactsController.js]
        end
        subgraph ROUTES
            R[contacts.js]
        end
        subgraph MODELS
            M[contact.js]
        end
    end
    subgraph DATBASE
        MDB[MongoDB]
    end

    PL <--> CMP
    CMP <--> CLAP
    CLAP <--> I
    I <--> A
    A <--> C
    A <--> R
    A <--> CNF
    A <--> LG
    A <--> MW
    C <--> M
    M <--> MDB
    R --> C
```

<hr>
<br>

