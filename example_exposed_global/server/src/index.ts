// import { People, DataProviderType } from 'data_contract';
import * as express from 'express';
import * as cors from 'cors';

import * as cheerio from 'cheerio'

import { renderToString } from '../../client/hydrate';

interface IPerson {
    name: string;
}

let id = 1;

export type People = IPerson[];

const app = express();
const port = 3000;

app.use(cors());

const sleep = (ms: number = 5000) => {
    return new Promise((resolve) => {
        return setTimeout(() => {
            return resolve('');
        }, ms)
    })
}

app.get('/', async (req: express.Request, res) => {

    id += 1;

    (req as any).id = id; 

    const { html } = await renderToString("<my-component></my-component>", {
        prettyHtml: true
    });

    // to simulate concurrent request
    await sleep();

    // using cheerio for simplicity, for production you might use templating system
    const $ = cheerio.load(html);

    $('head').append(`<script type="module" src="http://${process.env.LOCAL_VM_IP?.trim() || 'localhost'}:9999/dist/client/client.esm.js"></script>`);

    const data = JSON.stringify({...(await dataProvider()), id});

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

    // todo restrict for req id

    const computed = {
        people: await peopleDataProvider(),
        restricted: await restrictedDataProvider()
    }

    const proxy = new Proxy(computed, {
        get: (target, prop) => {
            if (prop === 'restricted') {
                console.log('accessing restricted');
            }

            return target[prop];
        }
    })
    
    return proxy;
}

(global as any).dataProvider = dataProvider;

app.listen(port, () => {
    console.log(`App listening at http://${process.env.LOCAL_VM_IP?.trim() || 'localhost'}:${port}`)
})