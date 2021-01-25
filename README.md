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