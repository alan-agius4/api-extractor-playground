# @microsoft/api-extractor POC

This is a POC of the API Extractor running against `@angular-devkit/core`.

## Get started
```sh
npm i
```

To verify the golden files run:
```sh
npm t
```

To update the golden files run:
```sh
npm t -- --accept
```

## Forseen Issues
- To strip out experimental APIs from being part of the golden files, need to use `/** @internal @preapproved */`.
- There are a lot of unsupported exports:
```
WARNING: Unsupported export: grey
WARNING: Unsupported export: JsonValue
...
```
From what I see, `export const` and `export type` are not supported yet.

- Loads of JSDocs/TsDocs errors - This might be because it's using [AEDoc](https://github.com/Microsoft/web-build-tools/wiki/API-Extractor-~-AEDoc-tags) instead of JSDocs.

- `The TSDoc tag "@license" is not defined in this configuration`. It seems there is no way to actually configure this (https://github.com/Microsoft/web-build-tools/blob/master/apps/api-extractor/src/extractor/IExtractorConfig.ts). 

