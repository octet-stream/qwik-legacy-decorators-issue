import {component$} from "@builder.io/qwik"
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister
} from "@builder.io/qwik-city"

import {RouterHead} from "./components/RouterHead"

import "./global.css"

/**
 * The root of a QwikCity site always start with the <QwikCityProvider> component,
 * immediately followed by the document's <head> and <body>.
 *
 * Don't remove the `<head>` and `<body>` elements.
 */
export default component$(() => (
  <QwikCityProvider>
    <head>
      <meta charSet="utf-8" />
      <link rel="manifest" href="/manifest.json" />
      <RouterHead />
    </head>
    <body lang="en">
      <RouterOutlet />
      <ServiceWorkerRegister />
    </body>
  </QwikCityProvider>
))
