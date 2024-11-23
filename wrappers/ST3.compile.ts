import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/s_t3.tact',
    options: {
        debug: true,
    },
};
