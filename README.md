## Description

Stencil SSR (server side rendering) with external data simple example

## Rationale

Do not pass stringified object as prop to your component

## Usage

#### Server
`cd server`
`npm i`
`node index.js`

#### Client
`cd client`
`npm i`
`npm run build`

and open `http://localhost:3000`

no clunky string passed as prop everything is rendered on the server
verify with "right click" -> "view page source"


## The more interesting one (example_exposed_global):

## Usage

`data_contract` imitates npm package that can be shared across teams

To link it to `client` and `server`:

- `cd data_contract`
- `npm link .`

then:

- `cd ../client`
- `npm link data_contract`

same for server:

- `cd ../server`
- `npm link data_contract`


You will see intellisense in Stencil components:


![Intellisense](https://raw.githubusercontent.com/sajTempler/stencil-ssr/master/images/stencil-ssr-intellisense.jpg)
