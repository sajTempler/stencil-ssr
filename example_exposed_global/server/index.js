const express = require('express');
const cors = require('cors');

const { renderToString } = require('../client/hydrate');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', async (_req, res) => {

    const { html } = await renderToString("<my-component></my-component>", {
        prettyHtml: true
    })

    res.send(html);
})

function peopleDataProvider() {
    return new Promise((resolve, _reject) => {
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
        ];

        return resolve(data);
    });
}

async function dataProvider(type) {
    switch (type) {
        case 'people':
            return await peopleDataProvider();
        default:
            return await peopleDataProvider();
    }
}

global.dataProvider = dataProvider;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})