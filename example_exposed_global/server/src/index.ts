// import { People, DataProviderType } from 'data_contract';
import * as express from 'express';
import * as cors from 'cors';

import * as cheerio from 'cheerio'

import { renderToString } from '../../client/hydrate';

export enum DataProviderType {
    PEOPLE = 'people'
}

interface IPeople {
    name: string;
}

export type People = IPeople;

const app = express();
const port = 3000;

app.use(cors());

app.get('/', async (_req, res) => {

    const { html } = await renderToString("<my-component></my-component>", {
        prettyHtml: true
    });

    const $ = cheerio.load(html);

    // $('head').append('<script type="module" src="http://172.28.39.204:9999/dist/esm/client.js"></script>');
    $('head').append('<script type="module" src="http://172.28.37.244:9999/dist/client/client.esm.js"></script>');
    $('head').append(`<script type="application/javascript">
        window.appState = {
            people: [
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
        }
    </script>`);
    // $('head').append('<script type="module" src="http://172.28.39.204:9999/loader/index.js"></script>');

    const finalHtml = $.html();

    res.send(finalHtml);
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

(global as any).dataProvider = dataProvider;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})