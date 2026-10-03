import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier/flat';
import base from './base.mjs';

export default [...base, ...nextVitals, prettier];
