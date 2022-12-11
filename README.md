# Next.js Template

## Why?

Getting a Next.js application up and running is not a trivial exercise. This
template solves a lot of initial problems and gets you to a well-scaffolded,
responsive web application with some built-in navigation and support for all the
goodies.

This template is highly opinionated with respect to toolchain. It is _hard_ to
get all of these bits to work together. It isn't hard to find a template that
provides a basic platform. The challenge is to fill that template out into a
machine that supports the development process in a robust matter.

It is _hard_ to get all of those bits to work together. It is _way_ easier to
cut out the bits you don't need than figure out how to slot in the things you
do. So that's what we have here.

Because this is a Next.js template, it works perfectly when deployed to
[Vercel](https://vercel.com/). I've tried hard to make it host-agnostic, though,
and I know for a fact that it works just as well deployed to
[AWS Amplify](https://aws.amazon.com/amplify). It should work fine at any host
that supports Next.js.

## What's Included

In order to work effectively with this template, you need to be familiar with
the following technologies (click the links to do a deep dive):

| Topic                                                                                                                             | Category                                                    | Resource                                                                                                                                              |          Length |
| --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------: |
| [Mocha](https://mochajs.org/) & [Chai](https://www.chaijs.com/) with [Should](https://www.chaijs.com/guide/styles/#should) syntax | tests & assertions                                          |                                                                                                                                                       |                 |
| [Lodash](https://lodash.com/docs)                                                                                                 | Javascript utility library                                  |                                                                                                                                                       |                 |
| [Next.js](https://nextjs.org/)                                                                                                    | host-agnostic production framework & host                   |                                                                                                                                                       |                 |
| [Prettier](https://prettier.io/)                                                                                                  | code formatting                                             |                                                                                                                                                       |                 |
| [React](https://reactjs.org/), [Redux](https://react-redux.js.org/) & [Redux Toolkit](https://redux-toolkit.js.org/)              | application framework & state                               | [Udemy course](https://www.udemy.com/course/react-redux/)<br>[YouTube playlist](https://youtube.com/playlist?list=PLM0LBHjz37LXSASzEv81f3tGptAsEGQUM) | 52 hrs<br>3 hrs |
| [ReleaseIt](https://www.npmjs.com/package/release-it)                                                                             | Versioning & release                                        |                                                                                                                                                       |                 |
| [Semantic UI React](https://react.semantic-ui.com/)                                                                               | front end components with template support fully configured |                                                                                                                                                       |                 |
| [Serify / Deserify](https://www.npmjs.com/package/@karmaniverous/serify-deserify)                                                 | Redux middleware                                            |                                                                                                                                                       |                 |

## Setting Up Your Dev Environment

**Use [VS Code](https://code.visualstudio.com/) as your code editor!** This is
non-negotiable, for reasons that will become obvious in step 2 below.

1. Clone this repository to your local machine.

1. VS Code will ask to install a bunch of recommended extensions. Accept all of
   them.

1. Install dependencies by running `npm install`.

1. Remove the `.template` extension from `.env.local.template` and
   `.env.development.local.template`. These files are blocked by `.gitignore`,
   so they are safe for environment secrets!

1. Start the development server by running `npm run dev`.

1. Visit the web application at http://localhost:3000.

## `release-it` Configuration

This template includes [release-it](https://github.com/release-it/release-it)
support that requires these final configurations:

1. Create a copy of `.env.development.local.template` and name it
   `.env.development.local`

1. Create a GitHub
   [personal access token](https://github.com/settings/tokens/new?scopes=repo&description=release-it)
   and add it as the value of `GITHUB_TOKEN` in `.env.development.local`.

You can now build your project and publish a release to GitHub and NPM with
these commands:

```
npm run build
npm run release
```

When you to this, you will find that your sidebar menu and site footer contain a
link to the current version's release notes. You can configure this by editing
the component at `components/page/SidebarItemsReleaseNotes.jsx`.

## `lodash` Support

[`lodash`](https://lodash.com/) is the classic Swiss-army-knife library: you
could always code around it, and it isn't always appropriate, but it's super
nice to have it in your back pocket.

Trouble is, it's a HUGE library. You can cherry-pick from it, but that gets
painful fast. So I've included & configured
[`babel-plugin-lodash`](https://www.npmjs.com/package/babel-plugin-lodash). Now
you can just import the entire library in your code, like this:

```js
import _ from 'lodash';
```

Babel will cherry-pick from `lodash` for you at build time!

## Coming Soon

If the following environment variable condition is `true`, the application will
display a coming soon page:

```js
process.env.NEXT_PUBLIC_COMING_SOON === '1' &&
  process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview';
```

If it is `false`, then the application will display.

In the development environment, both variables may be set explicitly in
`.env.development`. In deployed environments, they are set explicitly in
`.env.production` but may be overridden in your deployment pipeline.

If you are hosted at Vercel, the hosting environment will populate the
`NEXT_PUBLIC_VERCEL_ENV` environment variable to reflect your deployment type.
This value will be `production` on your production branch and `preview` on all
other branches.

## UI & Layout

This template uses the [Semantic UI React](https://react.semantic-ui.com/)
component set.

Your starting point is a nice reactive layout with a sticky sidebar that
collapses down to a hamburger menu at mobile resolutions. There were some
difficulties getting this to work properly with the installed version of
Semantic UI; I've resolved these and commented those fixes in the code.

The Semantic toolkit is super flexible, so you can easily morph this into
whatever layout works for you.

Semantic UI has a fantastic LESS-based theming system. It was a HUGE challenge
getting this working properly within the Next.js context. Problem solved,
though, so out of the box this template offers full Semantic UI theme support.

All aspects of the site theme can be controlled by modifying the contents of the
`semantic-ui` directory.

Out of the box, this template leverages the `default` Semantic UI theme. Switch
themes globally or at a component level by modifying the `theme.config` file.
Override every conceivable aspect of the current theme, with full access to all
related LESS variables, by editing the templates in the `site` directory. To
examine existing themes and borrow their settings as overrides, see the contents
of `node_modules\semantic-ui-less\themes`.

See [here](https://semantic-ui.com/usage/theming.html) to learn more about
Semantic UI themes.

## Redux, Redux Toolkit & Create Entity Adapter

[TODO]

## Testing

[TODO]

## Formatting & Linting Support

[TODO]

## Environment Variables

[TODO]

## Page Model

[TODO]

## User Authentication

[TODO]

## Next Steps

- Connection to AWS API template
- API endpoints
