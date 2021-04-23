// import { People, DataProviderType } from 'data_contract';
import * as express from 'express';
import * as cors from 'cors';

import * as cheerio from 'cheerio'

import { renderToString } from '../../client/hydrate';

interface IPerson {
    name: string;
}

export type People = IPerson[];

const app = express();
const port = 3000;

app.use(cors());

app.get('/', async (_req: express.Request, res) => {

    const { html } = await renderToString("<my-component></my-component>", {
        prettyHtml: true
    });

    // using cheerio for simplicity, for production you might use templating system
    const $ = cheerio.load(html);

    $('head').append(`<script type="module" src="http://${process.env.LOCAL_VM_IP?.trim() || 'localhost'}:9999/dist/client/client.esm.js"></script>`);

    const data = JSON.stringify(await dataProvider());

    $('head').append(`<script type="application/javascript">
        window.appState = ${data}
    </script>`);

    const finalHtml = $.html();

    res.send(finalHtml);
})

function peopleDataProvider(): Promise<People> {
    return new Promise((resolve, _reject) => {
        const data: People = [
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

function restrictedDataProvider(): Promise<string[]> {
    return new Promise((resolve, _reject) => {
        const data = [
            'secret1', 'secret2', 'secret3'
        ];

        return resolve(data);
    });
}

async function dataProvider(): Promise<any> {
    return {
        people: await peopleDataProvider(),
        restricted: await restrictedDataProvider()
    }
}

(global as any).dataProvider = dataProvider;

app.listen(port, () => {
    console.log(`App listening at http://${process.env.LOCAL_VM_IP?.trim() || 'localhost'}:${port}`)
})