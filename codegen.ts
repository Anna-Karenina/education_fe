import { CodegenConfig } from "@graphql-codegen/cli";
const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337/graphql";
const config: CodegenConfig = {
  schema: STRAPI_URL,
  documents: ["app/**/*.{ts,tsx}"],
  generates: {
    "./app/lib/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
