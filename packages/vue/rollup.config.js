const external = ["vue"];

export default {
  input: "dist-transpiled/index.js",
  output: [
    {
      dir: "dist/",
      entryFileNames: "[name].js",
      chunkFileNames: "[name]-[hash].js",
      format: "es",
      sourcemap: true,
    },
  ],
  external: (id) => external.includes(id) || id.startsWith("@w2wds/core"),
};
