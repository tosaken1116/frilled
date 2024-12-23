import { Hono } from "hono";
import { renderToString } from "react-dom/server";
const app = new Hono();

app.get("*", (c) => {
  return c.html(
    renderToString(
      <html>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap"
            rel="stylesheet"
          />
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />

          {import.meta.env.PROD ? (
            <>
              <script type="module" src="/static/client.js"></script>
              <link href="static/assets/style.css" rel="stylesheet" />
            </>
          ) : (
            <>
              <script type="module" src="/src/client.tsx"></script>
              <link href="/src/style.css" rel="stylesheet" />
            </>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  );
});

export default app;
