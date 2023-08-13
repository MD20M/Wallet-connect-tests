import UniversalProvider from '@walletconnect/universal-provider';
import type { WalletConnectAppMetadata } from '../connectors/walletconnect';
export declare class UniversalProviderFactory {
    protected static provider: UniversalProvider | undefined;
    protected static relayerRegion: string | undefined;
    protected static projectId: string | undefined;
    protected static metadata: WalletConnectAppMetadata | undefined;
    static setSettings(params: {
        projectId: string;
        relayerRegion: string;
        metadata: WalletConnectAppMetadata;
        qrcode: boolean;
    }): void;
    static getProvider(): Promise<UniversalProvider>;
    static init(): Promise<void>;
}
