## BUG EXAMPLE

terminal #1
```
cd client
npm run build
```

terminal #2
serve static files
```
cd clinet/dist
npx http-server -p 9999 --cors
```

terminal #3
```
cd server
npm run serve
```

open browser on localhost:3000
change network setting to slow 3g to observe the behaviour

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
