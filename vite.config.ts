import ts from "typescript"

import {defineConfig, type UserConfig} from "vite"
import {qwikVite} from "@builder.io/qwik/optimizer"
import {qwikCity} from "@builder.io/qwik-city/vite"
import tsconfigPaths from "vite-tsconfig-paths"

import {
  vitePluginTypescriptTransform
} from "vite-plugin-typescript-transform"

export default defineConfig((): UserConfig => ({
  plugins: [
    qwikCity({trailingSlash: false}),
    qwikVite(),
    tsconfigPaths(),
    vitePluginTypescriptTransform({
      enforce: "pre",
      filter: {
        files: {
          include: /.tsx?$/,
        }
      },
      tsconfig: {
        override: {
          jsx: ts.JsxEmit.Preserve
        }
      }
    }),
  ],
  server: {
    headers: {
      "Cache-Control": "public, max-age=0"
    }
  },
  preview: {
    headers: {
      "Cache-Control": "public, max-age=600"
    }
  }
}))
