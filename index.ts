import * as ts from 'typescript';
import * as path from 'path';
import { Extractor, IExtractorConfig, IExtractorOptions, ExtractorValidationRulePolicy } from '@microsoft/api-extractor';

const entryPointSourceFile = path.resolve('./src/index.d.ts');

const rootNames = [entryPointSourceFile];
const compilerOptions: ts.CompilerOptions = {
    rootDir: process.cwd(),
    skipLibCheck: true,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    lib: [
        'lib.es2017.d.ts'
    ]
}

// This interface provides additional runtime state
// that is NOT part of the config file
const options: IExtractorOptions = {
    localBuild: process.argv.includes('--accept'),

    // A compiler object, since we specified configType=runtime above
    compilerProgram: ts.createProgram(rootNames, compilerOptions),
}

// This interface represents the API Extractor config file contents
const config: IExtractorConfig = {
    compiler: {
        configType: 'runtime',
    },
    project: {
        entryPointSourceFile
    },
    apiReviewFile: {
        enabled: false,
    },
    apiJsonFile: {
        enabled: false
    },
    policies: {
        namespaceSupport: 'permissive'
    },
    validationRules: {
        missingReleaseTags: ExtractorValidationRulePolicy.allow
    },
    dtsRollup: {
        enabled: true,
        publishFolder: path.join(process.cwd(), 'dist'),
        mainDtsRollupPath: path.basename(entryPointSourceFile)
    }
};

const extractor = new Extractor(config, options);
const isSuccessful = extractor.processProject();

if (!isSuccessful) {
    process.exit(1);
}
