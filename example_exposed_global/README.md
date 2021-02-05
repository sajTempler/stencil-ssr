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

