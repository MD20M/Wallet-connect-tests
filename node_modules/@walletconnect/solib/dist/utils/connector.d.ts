import type { Connector } from '../connectors/base';
export declare function withConnector<T>(withConnectorFunc: (connector: Connector) => Promise<T>): Promise<T | null>;
