import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default {
    input: "src/index.js",
    output: [
        {
            file: "dist/index.min.js", // Para CDN (UMD)
            format: "umd",
            name: "LummaScriptify",
            exports: "named",
            plugins: [terser()], // Minificação
        },
        {
            file: "dist/index.esm.js", // Para import ESModules
            format: "es",
            exports: "named",
        },
        {
            file: "dist/index.cjs.js", // Para Node.js (CommonJS)
            format: "cjs",
            exports: "named",
        },
    ],
    plugins: [nodeResolve(), commonjs()],
};
