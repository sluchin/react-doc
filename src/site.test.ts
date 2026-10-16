/**
 * Copyright (c) 2026 Tetsuya Higashi
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { describe, expect, it } from "vitest";
import { isDocUrl, switchedUrl } from "../shared/ts/lib/docUrl";
import { extractPage } from "../shared/ts/lib/extract";
import { site } from "./site";

/** 作り物の React のドキュメント風のページ (ドキュメントの文章は使わない). */
const PAGE = `<html><head><title>Sample – React</title></head><body>
<header>Header</header>
<aside><nav role="navigation"><ul><h3>SECTION</h3>
<li><a href="/learn">Top</a><div><ul><li><a href="/learn/sub">Sub</a></li></ul></div></li>
<li role="separator"></li></ul></nav></aside>
<main><article><button>Copy page</button><h1>Sample</h1><p>See <a href="/reference/react/useState">useState</a>.</p></article></main>
</body></html>`;

describe("React site profile", () => {
  it("is a Japanese site, so the app does not translate it", () => {
    expect(site.japanese).toBe(true);
    expect(isDocUrl(site.homeUrl, site)).toBe(true);
  });

  it("opens the English site too, and switches the page between the two", () => {
    expect(site.alt?.host).toBe("react.dev");
    expect(isDocUrl("https://react.dev/learn", site)).toBe(true);
    expect(switchedUrl("https://ja.react.dev/learn#a", site)).toBe("https://react.dev/learn#a");
    expect(switchedUrl("https://react.dev/learn", site)).toBe("https://ja.react.dev/learn");
  });

  it("takes the article, strips the site name, and makes the links absolute", () => {
    const page = extractPage(PAGE, site.homeUrl, site);
    expect(page.title).toBe("Sample");
    expect(page.html).not.toContain("Header");
    expect(page.html).not.toContain("Copy page");
    expect(page.html).toContain('href="https://ja.react.dev/reference/react/useState"');
  });

  it("reads the menu of the side nav without the headings and the separators", () => {
    const { menu } = extractPage(PAGE, site.homeUrl, site);
    expect(menu.map((item) => [item.title, item.url])).toEqual([
      ["Top", "https://ja.react.dev/learn"],
    ]);
    expect(menu[0].children.map((item) => item.title)).toEqual(["Sub"]);
  });
});
