declare global {
    namespace NodeJS {
      interface Global {
          dataProvider<T>(type: DataProviderType): Promise<T>
      }
    }
  }

export enum DataProviderType {
  PEOPLE = 'people'
}

interface IPeople {
  name: string;
}

export type People = IPeople;
