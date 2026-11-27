import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ...js.configs.recommended,
    files: ["language.js", "project-gallery.js", "theme.js"],
    languageOptions: { globals: globals.browser },
  },
];
