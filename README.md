# Next.js Template

Getting a [Next.js](https://nextjs.org/) application up and running is not a
trivial exercise, especially if you want a robust and extensible result that
will support a modern development process.

Here's a plug-and-play
[Next.js template](https://github.com/karmaniverous/nextjs-template) that offers
the following features:

- Tree-shakable support for the latest ES6 goodies with
  [`eslint`](https://www.npmjs.com/package/eslint) _uber alles_.

- User registration & authentication via
  [NextAuth.js](https://next-auth.js.org/), by default against an
  [AWS Cognito User Pool](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html)
  supporting native username/password authentication and one federated identity
  provider (Google).

- Support for public & private API endpoints, both local to NextJS and at any
  [AWS API Gateway](https://aws.amazon.com/api-gateway/) secured by the same
  Cognito User Pool.

- Configured to act as a front end & authentication client for my
  [AWS API Template](https://github.com/karmaniverous/aws-api-template) on the
  back end.

- Fully integrated application state management with the
  [Redux Toolkit](https://redux-toolkit.js.org/), including support for
  difficult-to-serialize types like `Date` & `BigInt`.

- Responsive UX with [Semantic UI React](https://react.semantic-ui.com/) with
  LESS theme overrides enabled & ready for input!

- A responsive & attractive sample UI that encapsulates a ton of common use
  cases into an opinionated architecture and a library of utility components.

- Automated [`lodash`](https://www.npmjs.com/package/lodash) cherry-picking with
  [`babel-plugin-lodash`](https://www.npmjs.com/package/babel-plugin-lodash).

- Front & back-end testing with [`mocha`](https://www.npmjs.com/package/mocha),
  [`chai`](https://www.npmjs.com/package/chai), and the
  [React Testing Library](https://www.npmjs.com/package/@testing-library/react).
  Includes examples and a sweet testing console!

- Code formatting at every save & paste with
  [`prettier`](https://www.npmjs.com/package/prettier).

- One-button release to GitHub with
  [`release-it`](https://www.npmjs.com/package/release-it).

**[Click here](https://karmanivero.us/blog/nextjs-template/) for full
documentation & instructions!**
