import type { Preset, Rule } from "@unocss/core";
import { tokens } from "@fluentui/tokens";
import { kebabCase } from "scule";

/**
 * @param suffix - token name used as the class name suffix
 * @param value - CSS value to apply
 * @param variants - each entry is [classPrefix, ...cssProperties];
 *   all listed CSS properties will be set to `value`.
 *
 * @example
 * makeRules("accent", "var(--accent)", [
 *   ["border",   "border-color"],
 *   ["border-x", "border-left-color", "border-right-color"],
 * ])
 * // => [ ["border-accent", { "border-color": "var(--accent)" }],
 * //      ["border-x-accent", { "border-left-color": "var(--accent)",
 * //                            "border-right-color": "var(--accent)" }] ]
 */
function makeRules<T extends object>(
  suffix: string,
  value: string,
  variants: [classPrefix: string, ...cssProperties: string[]][],
): Rule<T>[] {
  return variants.map(
    ([classPrefix, ...cssProperties]) =>
      [
        `${classPrefix}-${suffix}`,
        Object.fromEntries(cssProperties.map((prop) => [prop, value])),
      ] as Rule<T>,
  );
}

function preset<T extends object = object>(): Preset<T> {
  const mapping: [RegExp, (...args: any[]) => Rule<T>[]][] = [
    // color
    [
      /color\-(.+)/,
      ([, color], value) =>
        makeRules<T>(color, value, [
          ["text", "color"],
          ["bg", "background-color"],
          ["border", "border-color"],
          ["border-l", "border-left-color"],
          ["border-r", "border-right-color"],
          ["border-t", "border-top-color"],
          ["border-b", "border-bottom-color"],
          ["border-x", "border-left-color", "border-right-color"],
          ["border-y", "border-top-color", "border-bottom-color"],
        ]),
    ],
    // border radius
    [
      /border\-radius(.+)/,
      ([, radius], value) =>
        makeRules<T>(radius, value, [["rounded", "border-radius"]]),
    ],
    // font family
    [
      /font\-family\-(\w+)/,
      ([, fontFamily], value) =>
        makeRules<T>(fontFamily, value, [["font", "font-family"]]),
    ],
    // font size
    [
      /font\-size\-(\w+)/,
      ([, size], value) => makeRules<T>(size, value, [["text", "font-size"]]),
    ],
    // font weight
    [
      /font\-weight\-(\w+)/,
      ([, fontWeight], value) =>
        makeRules<T>(fontWeight, value, [["text", "font-weight"]]),
    ],
    // line height
    [
      /line\-height\-(\w+)/,
      ([, lineHeight], value) =>
        makeRules<T>(lineHeight, value, [["line-height", "line-height"]]),
    ],
    // shadow
    [
      /shadow(.*)/,
      ([, shadow], value) =>
        makeRules<T>(shadow, value, [["shadow", "box-shadow"]]),
    ],
    // border width
    [
      /stroke\-width\-(\w+)/,
      ([, strokeWidth], value) =>
        makeRules<T>(strokeWidth, value, [["border", "border-width"]]),
    ],
    // spacing vertical
    [
      /spacing\-vertical\-(\w+)/,
      ([, spacing], value) =>
        makeRules<T>(spacing, value, [
          ["m", "margin"],
          ["mt", "margin-top"],
          ["mb", "margin-bottom"],
          ["my", "margin-top", "margin-bottom"],
          ["p", "padding"],
          ["pt", "padding-top"],
          ["pb", "padding-bottom"],
          ["py", "padding-top", "padding-bottom"],
        ]),
    ],
    // spacing horizontal
    [
      /spacing\-horizontal\-(\w+)/,
      ([, spacing], value) =>
        makeRules<T>(spacing, value, [
          ["ml", "margin-left"],
          ["mr", "margin-right"],
          ["mx", "margin-left", "margin-right"],
          ["pl", "padding-left"],
          ["pr", "padding-right"],
          ["px", "padding-left", "padding-right"],
        ]),
    ],
    // z-index
    [
      /z\-index\-(\w+)/,
      ([, zIndex], value) => makeRules<T>(zIndex, value, [["z", "z-index"]]),
    ],
    // animation timing function
    [
      /curve\-(.+)/,
      ([, f], value) =>
        makeRules<T>(f, value, [["animate", "animation-timing-function"]]),
    ],
    // animation duration
    [
      /duration\-(.+)/,
      ([, duration], value) =>
        makeRules<T>(duration, value, [["animate", "animation-duration"]]),
    ],
  ];

  const rules = Object.entries(tokens)
    .map(([key, value]) => [kebabCase(key), value] as [string, string])
    .map(([key, value]): Rule<T>[] => {
      const rule = mapping.find(([regex]) => regex.test(key));
      if (!rule) {
        console.warn("[unocss-preset-fluentui]", `No rule found for "${key}"`);
        return [];
      }
      const [regex, matcher] = rule;
      const matches = key.match(regex)!;
      return matcher(matches, value);
    })
    .flat();

  return {
    name: "fluentui",
    rules,
  };
}

export default preset;
