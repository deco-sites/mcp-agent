import { ComponentChildren } from "preact";
import { asset as asset, Head as Head } from "@deco/deco/htmx";
export const Layout = ({ children, revision, hmrUniqueId }: {
  children: ComponentChildren;
  revision: string;
  hmrUniqueId: string;
}) => {
  return (
    <>
      {/* Include Icons and manifest */}
      {/** @ts-ignore: ignore error */}
      <Head>
        {/* Enable View Transitions API */}
        <style
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={`/styles.css?revision=${revision}${hmrUniqueId}`}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* Rest of Preact tree */}
      {children}
    </>
  );
};
