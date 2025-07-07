import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.ts"],
    rules: {
      // তোমার custom rules এখানে
      'no-unused-vars':'error',
      'no-undef':'error',
      'prefer-const' : 'error',
      'no-console': 'warn',
    },
  },
  {
    ignores:['**/node_modules/','**/dist/','/.env'],
  }
];
