# address-book-ui

Address book in an application to search and organize a meeting with selected user. Application supports filtering by first and last name, and by nationality of the user.

## Requirements

- node 14.x and up (it's recommended to use `nvm`)
- access to randomuser.me API

## Technologies

Application uses React (version 17) with Typescript as base dof the application. To improve the application, we also uses

- [ant design](https://ant.design) for design elements
- [emotion](https://emotion.sh) for including css in components
- [axios](https://axios-http.com) for making HTTP calls
- [lodash](https://lodash.com) for helper functions
- [mobx](https://mobx.js.org) for state management

For testing we use

- [React Testing Library](https://testing-library.com)
- [Jest](https://jestjs.io)

## Installation

To install all dependencies, run

```bash
$ yarn
```

All dependencies's versions are locked to prevent unwanted effects when new dependency version is released.

## Structure

Application is split into multiple parts

```
src/
├── api.ts
├── App.scss
├── App.test.js
├── App.tsx
├── components
│   ├── lazy-avatar
│   │   ├── lazy-avatar.test.tsx
│   │   └── lazy-avatar.tsx
│   ├── main-content
│   │   ├── main-content.test.tsx
│   │   └── main-content.tsx
│   ├── main-layout
│   │   └── main-layout.tsx
│   └── main-navbar
│       └── main-navbar.tsx
├── helpers
│   └── is-bottom-page.ts
├── index.js
├── modules
│   ├── address-book
│   │   ├── components
│   │   │   ├── address-book-page
│   │   │   │   ├── address-book-page.test.tsx
│   │   │   │   └── address-book-page.tsx
│   │   │   ├── address-book-search
│   │   │   │   ├── address-book-search.test.tsx
│   │   │   │   └── address-book-search.tsx
│   │   │   ├── address-book-user
│   │   │   │   ├── address-book-user.test.tsx
│   │   │   │   └── address-book-user.tsx
│   │   │   └── organize-meeting-modal
│   │   │       ├── organize-meeting-modal.test.tsx
│   │   │       └── organize-meeting-modal.tsx
│   │   ├── index.tsx
│   │   ├── store.test.ts
│   │   ├── store.ts
│   │   └── types.ts
│   └── settings
│       ├── components
│       │   └── settings-page
│       │       ├── settings-page.test.tsx
│       │       └── settings-page.tsx
│       └── index.tsx
├── react-app-env.d.ts
├── reportWebVitals.js
└── setupTests.js
```

1. We specify the `api` with predefined endpoint settings to that it can eb reused in the application. Because of webpack aliases (defined in `croco.config.js`) we can directly import it as

```typescript
import api from 'api';
```

2. Helper functions are defined in `helpers/` folder.
3. Generic application components are defined in `components/` folder.
4. Application is split (and lazy loaded) into different modules. Each module has it's own routing and components.

```typescript
const AddressBookModuleLazy = React.lazy(() => import('./modules/address-book'));

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <AddressBookModuleLazy />
        </Route>
        ... additional routes
      </Switch>
    </Router>
  );
}
```

and in module we define module specific routes

```typescript
export default function AddressBookModule() {
  return (
    <Switch>
      <Route path="/">
        <AddressBookPage />
      </Route>
    </Switch>
  );
}
```

## Development

To start development server, run

```bash
$ yarn start
```

It will run an application that can be accessed at http://localhost:3000/

## Testing

To test application, run

```bash
$ yarn test
```

To run test with test coverage, run

```bash
$ yarn test:coverage
```

## Code style

Code style follows [prettier](https://prettier.io) configuration `.prettierrc` with pre-commit hook to format the code. For hooks we use [husky](https://github.com/typicode/husky).

## TODO

For application to be even better, we recommend

- adding translations
- better error control with error boundaries
- more tests (full screen tests)
- responsive design
