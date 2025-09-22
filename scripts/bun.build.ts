import Bun from "bun"

// 打包为单文件
await Bun.build({
    entrypoints: ["./src/localhost.ts"],
    outdir: "./dist",
    target: "node",
    format: "esm",
    minify: true,
    // sourcemap: "external",
    env: "inline",
})
