# Workspace

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Getting started](#/1)
- **[Workspace](#/2)**
- [Technical prerequisites](#/3)
- [Components (part 1)](#/4)
- [Components (part 2)](#/5)
- [Unit testing](#/6)
- [Control flow](#/7)
- [Signals](#/8)
- [Services](#/9)
- [Pipes](#/10)
- [Http](#/11)
- [Routing](#/12)
- [Forms](#/13)
- [Appendix](#/14)

Notes :



## Workspace

An Angular workspace is **structured** by the following parts

- `package.json`
- `tsconfig.json`
- `angular.json`
- `src/app/*`

Notes :



## Workspace - package.json

The presence of a `package.json` file indicates that the directory is the root of a **Node.js** project

- Scripts can be run using the shell command `npm run <scriptName>`

```json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  }
}
```

Notes :



## Workspace - package.json

- **Dependencies** of the Angular framework are scoped under `@angular/*`

```json
{
  "dependencies": {
    "@angular/animations": "...",
    "@angular/common": "...",
    "@angular/compiler": "...",
    "@angular/core": "...",
    "@angular/forms": "...",
    "@angular/platform-browser": "...",
    "@angular/platform-browser-dynamic": "...",
    "@angular/router": "..."
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "...",
    "@angular/cli": "...",
    "@angular/compiler-cli": "..."
  }
}
```

Notes :



## Workspace - package.json

- Angular also depends on some **third-party libraries**

```json
{
  "dependencies": {
    "rxjs": "...",
    "tslib": "...",
    "zone.js": "..."
  },
  "devDependencies": {
    "typescript": "..."
  }
}
```

Notes :



## Workspace - tsconfig.json

The presence of a `tsconfig.json` file indicates that the directory is the root of a **TypeScript** project

- Specifies the root files and the **compiler options** required to compile the project
- Supplies **Angular specific options** to the compiler

```json
{
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "experimentalDecorators": true,
    ...
  },
  "angularCompilerOptions": {
    "strictInputAccessModifiers": true,
    "strictTemplates": true,
    ...
  }
}
```

Notes :



## Workspace - angular.json

The presence of an `angular.json` file indicates that the directory is the root of an **Angular** project

- Provides workspace-wide and project-specific **configuration** defaults
- These are used for build and development tools provided by the **Angular CLI**

```json
{
  "projects": {
    "zenika-ng-website": {
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "architect": {
        "build": {},
        "serve": {},
        "test": {},
      }
    }
  }
}
```

Notes :



## Workspace - angular.json

- The build `"options"` in the architect section are frequently used

```json
{
  "projects": {
    "zenika-ng-website": {
      "architect": {
        "build": {
          "options": {
              "outputPath": "dist/zenika-ng-website",
              // "index": "src/index.html",  // Becomes implicit in v20
              "browser": "src/main.ts",
              "tsConfig": "tsconfig.app.json",
              "assets": [{ "glob": "**/*", "input": "public" }],
              "styles": ["src/styles.css"],
              "scripts": []
          }
        }
      }
    }
  }
}
```

Notes :



## Workspace - src/app/*

- `index.html`: final **document** of the Single Page Application (SPA)
- `main.ts`: **entry point** of the app (from which Vite builds the JavaScript bundle)
- `app/app.*`: **main component** of the app (the one used to bootstrap the app)
- `styles.css`: **global styles** of the app
- `public/*`: **resources** of the app (images, pdf, ...)

When running the `ng build` shell command all these files are compiled and combined
to produce the final application bundle ready for production (mainly HTML, CSS and JavaScript files)

```shell
ng build
```

When the build is complete, the application bundle is in the `dist/` directory

Notes :
before angular 18, it was asset and not public folder



## Angular CLI

- The Angular CLI is a command-line interface tool that you use to
  - **initialize**
  - **develop**
  - **scaffold**
  - **maintain** applications

- It is usually installed globally on your system

```shell
npm install -g @angular/cli
```

- Here are some of the commands available

```shell
ng new my-app-name
ng serve
ng test
ng build
ng update
```

Notes :



## Angular CLI - Generate

The `generate` (or simply `g`) command is often used to quickly scaffold the different parts of an Angular application

```shell
# Generate components
ng generate component menu
ng g c product

# Generate services
ng generate service catalog
ng g s basket

# Generate pipes
ng generate pipe sort-array

# And many more...
```

You can easily get help for each type of CLI command

```shell
ng --help
ng generate --help
ng generate component --help
```

Notes :



## Angular CLI - Naming convention

In the previous versions (v19 and prior), the CLI added a suffix to the names of generated elements: ".component" for a component, ".service" for a service, etc.

This is no longer the case in v20. However, if you want to enable suffix generation in your projects, use the following schematic configuration. Depending on the case, use either "type" or "typeSeparator":

```json
{
  "projects": {
    "app": {
      ...
      "schematics": {
        "@schematics/angular:component": { "type": "my-component-suffix" },
        "@schematics/angular:directive": { "type": "my-directive-suffix" },
        "@schematics/angular:service": { "type": "my-service-suffix" },

        "@schematics/angular:guard": { "typeSeparator": "my-guard-suffix" },
        "@schematics/angular:pipe": { "typeSeparator": "my-pipe-suffix" },
      },
}
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp2" -->
