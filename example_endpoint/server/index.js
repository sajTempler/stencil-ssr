const express = require('express');
const cors = require('cors');

const { renderToString  } = require('../client/hydrate');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', async (_req, res) => {

    const { html } = await renderToString("<my-component></my-component>", {
        prettyHtml: true
    })

    res.send(html);
})

app.get('/api', (_req, res) => {

    console.log('API WAS HIT');

    const data = [
        {
            name: 'szymon'
        },
        {
            name: 'ali'
        },
        {
            name: 'wik'
        }
    ]

    res.send(JSON.stringify(data));
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})