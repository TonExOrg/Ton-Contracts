import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/s_t1.tact',
    options: {
        debug: true,
    },
};
