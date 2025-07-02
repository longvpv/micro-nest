import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
    name: 'order-app',
    exposes: {
        './Routes': 'apps/order-app/src/app/remote-entry/entry.routes.ts',
        './OrderButton':
            'apps/order-app/src/app/components/order-button.component.ts',
    },
};

export default config;
