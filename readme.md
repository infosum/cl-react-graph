# CL React Graphs

A ReactJS wrapper around some standard D3 charts

## Setup

```
npm i -S cl-react-graph
```

## Documentation

The interactive docs can be found at: https://infosum.github.io/cl-react-graph/

## Developers

### Running docs in development mode

If you don't have Gatsby already installed:

```
npm i -g gatsby
```

Then, to run the docs in development mode

```
cd docs-src
npm i
gatsby develop
```

the site will be available on `http://localhost:8000`

### Publishing to NPM

Publishing is handled via a GitHub Action.

You will need to

- npm run build (generates types)
- ensure that the version number is bumped E.g. `npm version patch -m "Upgrade to %s for reasons"`
- create a new named tag starting with 'v' E.g. `git tag -a v3.3.1`
- `git push --tag`

### Building the code

GitLab Actions should now handle this for you, although currently it seems types aren't generated,
but for reference:

```
npm run build
```

### Building the docs

GitLab Actions should now handle this for you, but for reference:

```
cd docs-src
npm run build
```

The docs will be built in `/docs`

# Outstanding issues

Can be found in https://github.com/infosum/cl-react-graph/projects/1
