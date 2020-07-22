# CL React Graphs
A ReactJS wrapper around some standard D3 charts

## Setup

```
npm i -S cl-react-graph
```

## Documentation

The interactive docs can be found at: https://infosum.github.io/cl-react-graph/

## Developers

### Building the code

 ```
 npm run build
 ```

### Publishing to NPM

 Ensure that the version number is bumped & publish
 
 ```
 npm version patch -m "Upgrade to %s for reasons"
 npm publish
 ```

Note you will need to authenticate to NPM to publish.

### Running docs in development mode

If you don't have Gatsby already installed:
```
npm i -g gatsby
```

Then, to run the docs in development mode


```
cd docs-src
gatsby develop
```

the site will be available on `http://localhost:8000`

### Building the docs

```
cd docs-src
npm run build
```

The docs will be built in `/docs`

# Version 3 TODO:


## Horizontal histogram

* Hover fx on bars
* Add example of 2nd X axis
* Add <Points> component which will be used to show the percentage values in the demo dataset
* Investigate axis scales and use demo page props on example axis.


## Vertical histogram

* TODO

## Line Chart

* TODO

## Pie Chart

* TODO

## Tornado

* Check all props can be used
