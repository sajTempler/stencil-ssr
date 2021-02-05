import { People, DataProviderType } from 'data_contract';
import * as express from 'express';
import * as cors from 'cors';

import { renderToString } from '../../client/hydrate';

const app = express();
const port = 3000;

app.use(cors());

app.get('/', async (_req, res) => {

    const { html } = await renderToString("<my-component></my-component>", {
        prettyHtml: true
    })

    res.send(html);
})

// todo: figure how to get rid of any
function peopleDataProvider(): Promise<People[] | any> {
    return new Promise((resolve, _reject) => {
        const data: People[] = [
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

async function dataProvider<T>(type: DataProviderType): Promise<T> {
    switch (type) {
        case DataProviderType.PEOPLE:
            return peopleDataProvider();
        default:
            return peopleDataProvider();
    }
}

global.dataProvider = dataProvider;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})