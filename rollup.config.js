import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { PATH_SRC, PATH_DIST} from './config-library.js';

var nameLibrary = 'cache-burst';

export default {
    entry: PATH_SRC + nameLibrary + '.ts',
    moduleName: nameLibrary,
    sourceMap: true,
    external: [
        '@angular/core',
        'ng2-cookies/ng2-cookies'
    ],
    targets: [{ 
        dest: PATH_DIST + nameLibrary + '.umd.js', 
        format: 'umd' 
    }, { 
        dest: PATH_DIST + nameLibrary + '.es.js', 
        format: 'es' 
    }],
    plugins: [
        typescript({
            typescript: require('typescript')
        }),
        resolve({
            module: true,
            main: true
        }),
        commonjs({
            include: 'node_modules/**',
        })
    ],
    onwarn: warning => {
        const skip_codes = [
            'THIS_IS_UNDEFINED',
            'MISSING_GLOBAL_NAME'
        ];
        if (skip_codes.indexOf(warning.code) != -1) return;
        console.error(warning);
    }
};