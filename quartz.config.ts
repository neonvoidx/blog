import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "@neonvoid",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "neonvoid.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Roboto",
        body: "Roboto",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#ebfafa", // fg (very light)
          lightgray: "#ABB4DA", // fg_dark (light gray-blue)
          gray: "#7081d0", // fg_gutter_light (soft blue-gray)
          darkgray: "#6473B7", // dark3 (darker blue-gray)
          dark: "#292e42", // bg_highlight (darkest for light mode)
          secondary: "#39DDFD", // bright_cyan (accent)
          tertiary: "#f7c67f", // orange (warm accent)
          highlight: "#3b4261", // yellow (bright highlight)
          textHighlight: "#00FA82", // bright_green (text highlight)
        },
        darkMode: {
          light: "#212337", // bg
          lightgray: "#3b4261", // borders
          gray: "#37f499", // graph links, heavier border
          darkgray: "#ebfafa", // body text
          dark: "#37f499", // header text and icons
          secondary: "#04d1f9", // link color, current graph node
          tertiary: "#a48cf2", // hover states and visited graph nodes
          highlight: "#3b4261", // internal link background, highlighted text, highlighted lines of code
          textHighlight: "#f0313e", // markdown highlight text background
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
