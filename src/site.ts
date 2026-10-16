/**
 * Copyright (c) 2026 Tetsuya Higashi
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { SiteProfile } from "../shared/ts/lib/profile";

/** React の日本語のドキュメント (ja.react.dev) の設定. 日本語のサイトなので, 翻訳しない. 英語のサイトへ, ページごとに切り替えられる. 本文は article. */
export const site: SiteProfile = {
  name: "React Doc",
  host: "ja.react.dev",
  pathPrefix: "/",
  homeUrl: "https://ja.react.dev/learn",
  contentSelectors: ["main article", "article"],
  // ボタン (ページのコピーなど) は, 本文ではない
  removeSelectors: ["button"],
  titleSuffix: / [–—-] React$/,
  japanese: true,
  // ページごとに, 英語のサイト (react.dev) へ切り替えられる (英語のページは, 翻訳しないで, そのまま出す)
  alt: { host: "react.dev", toLabel: "英語のサイトへ", backLabel: "日本語のサイトへ" },
  // 左のメニュー (目次). サーバーが HTML に出す (上の見出しの GET STARTED などは, 項目ではないので出ない)
  menu: { type: "html", selector: "aside nav" },
};
