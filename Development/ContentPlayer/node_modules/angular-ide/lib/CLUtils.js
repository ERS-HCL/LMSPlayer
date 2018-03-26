const path = require('path');
const ts = require('typescript');
const semver = require('semver');
const slashes = require('slashes');
const debug = require('debug')('angular-ide');
const chalk = require('chalk');

const ngCLIPKG = getNGCLIManifest();

// Make sure that we have a valid manifest structure
let ngCLIPKGName = null;
if (ngCLIPKG !== null) {
  ngCLIPKGName = ngCLIPKG.name;
}

const ngCLIPath = getNGCLIPath(ngCLIPKGName);

const CLEnablementStatusManager = require('./CLEnablementStatusManager').CLEnablementStatusManager;
const CLBootstrapInjectorPlugin = require('./CLBootstrapInjectorPlugin');

const fs = require('fs');


// AST Helper functions
function convertValueToLiteral(val) {
  if (Array.isArray(val)) {
    return arrayToArrayLiteral(val);
  }
  if (typeof val === 'object') {
    return objectToObjectLiteral(val);
  }
  return ts.createLiteral(val);
}

function arrayToArrayLiteral(list) {
  const newList = list.map(convertValueToLiteral);
  return ts.createArrayLiteral(newList);
}

function objectToObjectLiteral(obj) {
  const newProperties = Object.keys(obj).map((key) => {
    return ts.createPropertyAssignment(ts.createLiteral(key), convertValueToLiteral(obj[key]));
  });

  return ts.createObjectLiteral(newProperties);
}

function _getContentOfKeyLiteral(source, node) {
  if (node.kind == ts.SyntaxKind.Identifier) {
    return node.text;
  }
  else if (node.kind == ts.SyntaxKind.StringLiteral) {
    return node.text;
  }
  else {
    return null;
  }
}

function injectComponentMetadata_1() {
  let TypeScriptFileRefactor = null;
  try {
    TypeScriptFileRefactor = require('@ngtools/webpack/src/refactor');
  } catch (e) {
    TypeScriptFileRefactor = require('@angular/cli/node_modules/@ngtools/webpack/src/refactor');
    require.cache['@ngtools/webpack/src/refactor'] = require('@angular/cli/node_modules/@ngtools/webpack/src/refactor');
  }

  const origFun = TypeScriptFileRefactor.TypeScriptFileRefactor;

  TypeScriptFileRefactor.TypeScriptFileRefactor = function (fileName, _host, _program) {
    const origInstance = new (Function.prototype.bind.apply(origFun, [this, fileName, _host, _program]));

    const _self = origInstance;

    (function (c) {
      if (c) {
        const sourceFile = _self.sourceFile;

        const styleUrls = [];

        let templateUrl = null;

        // Find all object literals.
        _self.findAstNodes(sourceFile, ts.SyntaxKind.ObjectLiteralExpression, true)
          .map(function (node) { return _self.findAstNodes(node, ts.SyntaxKind.PropertyAssignment); })
          .reduce(function (prev, curr) { return curr ? prev.concat(curr) : prev; }, [])
          .filter(function (node) {
            const key = _getContentOfKeyLiteral(sourceFile, node.name);
            if (!key) {
              // key is an expression, can't do anything.
              return false;
            }
            return key == 'templateUrl' || key == 'styleUrls';
          })
          .forEach(function (node) {
            let key = _getContentOfKeyLiteral(sourceFile, node.name);
            if (key == 'templateUrl') {
              let templateUrlNode = _self.findAstNodes(node, ts.SyntaxKind.StringLiteral, false);

              if (!templateUrlNode || !templateUrlNode.length || !templateUrlNode[0].text) {
                return;
              }

              templateUrl = path.normalize(path.join(
                path.dirname(sourceFile.fileName),
                templateUrlNode[0].text
              ));
            }
            else if (key == 'styleUrls') {
              const arr = (_self.findAstNodes(node, ts.SyntaxKind.ArrayLiteralExpression, false));

              if (!arr || arr.length == 0 || arr[0].elements.length == 0) {
                return;
              }

              arr.forEach(function (arrElement) {
                const dirName = path.dirname(sourceFile.fileName);
                let styleUrl = path.normalize(path.join(dirName, arrElement.elements[0].text));

                styleUrls.push(styleUrl);
              });

              const initializer = arr[0].elements.map(function (element) {
                return element.getFullText(sourceFile);
              });
            }
          });

        let isAComponent = false;
        if (sourceFile.identifiers) {
          if (typeof sourceFile.identifiers.Component !== 'undefined') {
            isAComponent = true;
          }
          if (!isAComponent && typeof sourceFile.identifiers.get === 'function') {
            isAComponent = sourceFile.identifiers.get('Component')
          }
        }

        if (isAComponent) {
          _self.findAstNodes(sourceFile, ts.SyntaxKind.ClassDeclaration, true)
            .forEach(function (node) {
              let tsPath = path.normalize(sourceFile.fileName);

              const metadataToInject = {
                componentPath: tsPath,
                styleUrls: styleUrls,
              };
                
              if (templateUrl !== null) {
                metadataToInject.templateUrl = templateUrl;
          	  }


              const textToInject = `__clMeta = ${JSON.stringify(metadataToInject)};`;

              _self.insertAt(node.members.pos, textToInject);
            });
        }
      }
    })(CLEnablementStatusManager.getStatus());


    return _self;
  };

  TypeScriptFileRefactor.TypeScriptFileRefactor.prototype = origFun.prototype;

  TypeScriptFileRefactor.TypeScriptFileRefactor.prototype.insertAt = function (pos, text) {
    if (this._sourceString.prependRight) {
      //get rid of warning logged during build
      this._sourceString.prependRight(pos, text);
    } else {
      this._sourceString.insertRight(pos, text);
    }
    this._changed = true;
  };
}

function injectComponentMetadata_2() {
  const NgCliWebpackConfig = require(`${ngCLIPath}/models/webpack-config`).NgCliWebpackConfig;

  NgCliWebpackConfig.prototype.originalGetTargetConfig = NgCliWebpackConfig.prototype.getTargetConfig;

  NgCliWebpackConfig.prototype.getTargetConfig = function monkeyPatchedGenerateConfig(projectRoot, appConfig) {
    const targetConfig = this.originalGetTargetConfig(projectRoot, appConfig);

    if (typeof targetConfig.module === 'undefined') {
      targetConfig.module = { rules: [] };
    }

    if (typeof targetConfig.module.rules === 'undefined') {
      targetConfig.module.rules = [];
    }

    targetConfig.module.rules.push({ enforce: 'pre', test: /\.(ts)$/, loader: 'angular-ide-loader' });

    return targetConfig;
  };
}


function injectComponentMetadata_3() {
  // Importing ngtools transformation helpers
  const make_transform_1 = require("@ngtools/webpack/src/transformers/make_transform");
  const ast_helpers_1 = require("@ngtools/webpack/src/transformers/ast_helpers");
  const interfaces_1 = require("@ngtools/webpack/src/transformers/interfaces");

  // Keys used to find the template and styles properties of a component
  // Our transformers will be executed at the end, at this point, the original "templateUrl" and 
  // "styleUrls" keys have been renamed to the following ones  by the replace_sources transformer
  // located in @ngtools/webpack/src/transformers/replace_sources
  const templateKey = 'template';
  const stylesKey = 'styles';

  const templateKeys = ['templateUrl', 'template'];
  const stylesKeys = ['styles', 'styleUrls'];
  const filterKeys = templateKeys.concat(stylesKeys);

  function createCLMetadataTransform(shouldTransform) {
    const standardTransform = function (sourceFile) {
      const ops = [];
      if (!shouldTransform(sourceFile.fileName)) {
        return ops;
      }

      const styleUrls = [];

      let templateUrl = null;

      ast_helpers_1.collectDeepNodes(sourceFile, ts.SyntaxKind.ObjectLiteralExpression)
        .map(function (node) { return ast_helpers_1.collectDeepNodes(node, ts.SyntaxKind.PropertyAssignment) })
        .reduce(function (prev, curr) { return curr ? prev.concat(curr) : prev; }, [])
        .filter(function (node) {
          const key = _getContentOfKeyLiteral(sourceFile, node.name);
          if (!key) {
            return false;
          }

          return filterKeys.indexOf(key) !== -1;
        })
        .forEach(function (node) {
          let key = _getContentOfKeyLiteral(sourceFile, node.name);

          if (templateKeys.indexOf(key) !== -1) {
            let templateUrlNode = ast_helpers_1.collectDeepNodes(node, ts.SyntaxKind.StringLiteral);
            
            if (!templateUrlNode || !templateUrlNode.length || !templateUrlNode[0].text) {
            	return;
            }
            
            // [bug 32723]
            let templateUrlNodeText = templateUrlNode.length === 1 ? templateUrlNode[0].text : path.basename(templateUrlNode[1].text)
            
            templateUrl = path.normalize(path.join(
              path.dirname(sourceFile.fileName),
              templateUrlNodeText
            )

            );
          }
          else if (stylesKeys.indexOf(key) !== -1) {
            const arr = (ast_helpers_1.collectDeepNodes(node, ts.SyntaxKind.ArrayLiteralExpression));

            if (!arr || arr.length === 0 || arr[0].elements.length === 0) {
              return;
            }

            arr[0].elements.forEach(function (arrElement) {
              // This strategy works on 1.5.0 
              if (arrElement.arguments) {
                arrElement.arguments.forEach(function (argument) {
                  const dirName = path.dirname(sourceFile.fileName);
                  let styleUrl = path.normalize(path.join(dirName, argument.text));
                  if (styleUrl)

                    styleUrls.push(styleUrl);
                });
                // This strategy works for pre 1.5.0 (e.g. 1.5.0-rc.8)
              } else {
                const dirName = path.dirname(sourceFile.fileName);
                let styleUrl = path.normalize(path.join(dirName, arrElement.text));

                styleUrls.push(styleUrl);
              }
            });
          }
        });

      let isAComponent = false;
      if (sourceFile.identifiers) {
        if (typeof sourceFile.identifiers.Component !== 'undefined') {
          isAComponent = true;
        }
        if (!isAComponent && typeof sourceFile.identifiers.get === 'function') {
          isAComponent = sourceFile.identifiers.get('Component')
        }
      }

      if (isAComponent) {
        ast_helpers_1.collectDeepNodes(sourceFile, ts.SyntaxKind.ClassDeclaration)
          .forEach(function (node) {
            let tsPath = path.normalize(sourceFile.fileName);

            const metadataToInject = {
              componentPath: tsPath,
              styleUrls: styleUrls,
            };
                 
            if (templateUrl !== null && fs.existsSync(templateUrl)) {
              metadataToInject.templateUrl = templateUrl;
            }

            const newProperties = Object.keys(metadataToInject).map((key) => {
              return ts.createPropertyAssignment(ts.createLiteral(key), convertValueToLiteral(metadataToInject[key]));
            });

            const metadataProperty = ts.createProperty(
              undefined,
              [ts.createToken(ts.SyntaxKind.PublicKeyword)],
              '__clMeta',
              undefined,
              undefined,
              ts.createObjectLiteral(newProperties)
            );

            const updatedClassDeclarationNode = ts.updateClassDeclaration(
              node,
              node.decorators,
              node.modifiers,
              node.name,
              node.typeParameters,
              node.heritageClauses,
              node.members.concat(metadataProperty)
            );

            ops.push(new interfaces_1.ReplaceNodeOperation(sourceFile, node, updatedClassDeclarationNode));
          });

      }

      return ops;
    }

    return make_transform_1.makeTransform(standardTransform);
  }

  let AngularCompilerPluginModule = null;
  try {
    AngularCompilerPluginModule = require('@ngtools/webpack/src/angular_compiler_plugin');
  } catch (e) {
    AngularCompilerPluginModule = require('@angular/cli/node_modules/@ngtools/webpack/src/angular_compiler_plugin');
    require.cache['@ngtools/webpack/src/angular_compiler_plugin'] = require('@angular/cli/node_modules/@ngtools/webpack/src/angular_compiler_plugin');
  }

  let manifest = null;
  try {
    manifest = require('@ngtools/webpack/package.json')
  } catch (e) {
    manifest = require('@angular/cli/node_modules/@ngtools/webpack/package.json')
  }
  ngToolsPKGVersion = manifest.version;

  if (semver.satisfies(ngToolsPKGVersion, '<1.8.0-a')) {
    return;
  }

  AngularCompilerPluginModule.AngularCompilerPlugin.prototype.originalEmit = AngularCompilerPluginModule.AngularCompilerPlugin.prototype._emit;

  AngularCompilerPluginModule.AngularCompilerPlugin.prototype._emit = function (sourceFiles) {
    const transformOps = [];
    const self = this;
    const isAppPath = (fileName) => !fileName.endsWith('.ngfactory.ts') && !fileName.endsWith('.ngstyle.ts');

    this._transformers.push(createCLMetadataTransform(isAppPath));

    return this.originalEmit(sourceFiles);
  };

}

function injectComponentMetadata_4() {
  // Importing ngtools transformation helpers
  const make_transform_1 = require("@ngtools/webpack/src/transformers/make_transform");
  const ast_helpers_1 = require("@ngtools/webpack/src/transformers/ast_helpers");

  function createCLMetadataTransform(sourceFile) {

    const ops = [];

    const styleUrls = [];

    let templateUrl = null;

    ast_helpers_1.findAstNodes(null, sourceFile, ts.SyntaxKind.ObjectLiteralExpression, true)
      .map(function (node) { return ast_helpers_1.findAstNodes(node, sourceFile, ts.SyntaxKind.PropertyAssignment) })
      .reduce(function (prev, curr) { return curr ? prev.concat(curr) : prev; }, [])
      .filter(function (node) {
        const key = _getContentOfKeyLiteral(sourceFile, node.name);
        if (!key) {
          // key is an expression, can't do anything.
          return false;
        }
        return key == 'templateUrl' || key == 'styleUrls';
      })

      .forEach(function (node) {
        let key = _getContentOfKeyLiteral(sourceFile, node.name);
        if (key == 'templateUrl') {
          let templateUrlNode = ast_helpers_1.findAstNodes(node, sourceFile, ts.SyntaxKind.StringLiteral, true);
          
          if (!templateUrlNode || !templateUrlNode.length || !templateUrlNode[0].text) {
            return;
          }

          templateUrl = path.normalize(path.join(
            path.dirname(sourceFile.fileName),
            templateUrlNode[0].text
          ));
        }
        else if (key == 'styleUrls') {
          const arr = (ast_helpers_1.findAstNodes(node, sourceFile, ts.SyntaxKind.ArrayLiteralExpression, false));
          
          if (!arr || arr.length == 0 || arr[0].elements.length == 0) {
            return;
          }

          arr.forEach(function (arrElement) {
            const dirName = path.dirname(sourceFile.fileName);
            let styleUrl = path.normalize(path.join(dirName, arrElement.elements[0].text));

            styleUrls.push(styleUrl);
          });
          const initializer = arr[0].elements.map(function (element) {
            return element.getFullText(sourceFile);
          });
        }
      });

    let isAComponent = false;
    if (sourceFile.identifiers) {
      if (typeof sourceFile.identifiers.Component !== 'undefined') {
        isAComponent = true;
      }
      if (!isAComponent && typeof sourceFile.identifiers.get === 'function') {
        isAComponent = sourceFile.identifiers.get('Component')
      }
    }

    if (isAComponent) {
      ast_helpers_1.findAstNodes(null, sourceFile, ts.SyntaxKind.ClassDeclaration, true)
        .forEach(function (node) {
          let tsPath = path.normalize(sourceFile.fileName);

          const metadataToInject = {
            componentPath: tsPath,
            styleUrls: styleUrls,
          };
          
          if (templateUrl !== null && fs.existsSync(templateUrl)) {
            metadataToInject.templateUrl = templateUrl;
          }

          const newProperties = Object.keys(metadataToInject).map((key) => {
            return ts.createPropertyAssignment(ts.createLiteral(key), convertValueToLiteral(metadataToInject[key]));
          });

          const metadataProperty = ts.createProperty(
            undefined,
            [ts.createToken(ts.SyntaxKind.PublicKeyword)],
            '__clMeta',
            undefined,
            undefined,
            ts.createObjectLiteral(newProperties)
          );

          const updatedClassDeclarationNode = ts.updateClassDeclaration(
            node,
            node.decorators,
            node.modifiers,
            node.name,
            node.typeParameters,
            node.heritageClauses,
            node.members.concat(metadataProperty)
          );

          ops.push(new make_transform_1.ReplaceNodeOperation(sourceFile, node, updatedClassDeclarationNode));
        });
    }

    return ops;
  }

  let AngularCompilerPluginModule = null;
  try {
    AngularCompilerPluginModule = require('@ngtools/webpack/src/angular_compiler_plugin');
  } catch (e) {
    AngularCompilerPluginModule = require('@angular/cli/node_modules/@ngtools/webpack/src/angular_compiler_plugin');
    require.cache['@ngtools/webpack/src/angular_compiler_plugin'] = require('@angular/cli/node_modules/@ngtools/webpack/src/angular_compiler_plugin');
  }

  let manifest = null;
  try {
    manifest = require('@ngtools/webpack/package.json')
  } catch (e) {
    manifest = require('@angular/cli/node_modules/@ngtools/webpack/package.json')
  }
  ngToolsPKGVersion = manifest.version;

  if (semver.satisfies(ngToolsPKGVersion, '<1.8.0-a')) {
    return;
  }

  AngularCompilerPluginModule.AngularCompilerPlugin.prototype.originalEmit = AngularCompilerPluginModule.AngularCompilerPlugin.prototype._emit;

  AngularCompilerPluginModule.AngularCompilerPlugin.prototype._emit = function (sourceFiles, customTransformers) {
    const transformOps = [];
    sourceFiles.forEach(function createCLMetadaTransform(sf) {
      transformOps.push(...createCLMetadataTransform(sf));
    });

    customTransformers.beforeTs.push(make_transform_1.makeTransform(transformOps));

    return this.originalEmit(sourceFiles, customTransformers);
  };
}



function injectCLBootstrapScript_1(ngCLIVersion, config) {
  const NgCliWebpackConfig = require(`${ngCLIPath}/models/webpack-config`).NgCliWebpackConfig;

  NgCliWebpackConfig.prototype.originalGetTargetConfig1 = NgCliWebpackConfig.prototype.getTargetConfig;

  NgCliWebpackConfig.prototype.getTargetConfig = function monkeyPatchedGenerateConfig(projectRoot, appConfig) {
    const targetConfig = this.originalGetTargetConfig1(projectRoot, appConfig);

    if (typeof targetConfig.module === 'undefined') {
      targetConfig.module = { rules: [] };
    }

    if (typeof targetConfig.module.rules === 'undefined') {
      targetConfig.module.rules = [];
    }

    targetConfig.module.rules.push({ test: /\.(html)$/, loader: 'angular-ide-loader', options: config });

    return targetConfig;
  };
}

function injectCLBootstrapScript_2(ngCLIVersion, config) {
  const NgCliWebpackConfig = require(`${ngCLIPath}/models/webpack-config`).NgCliWebpackConfig;

  NgCliWebpackConfig.prototype.originalGetTargetConfig = NgCliWebpackConfig.prototype.getTargetConfig;

  NgCliWebpackConfig.prototype.getTargetConfig = function monkeyPatchedGenerateConfig(projectRoot, appConfig) {
    const targetConfig = this.originalGetTargetConfig(projectRoot, appConfig);

    (function () {
      if (typeof targetConfig.plugins === 'undefined') {
        targetConfig.plugins = [];
      }

      targetConfig.plugins.push(new CLBootstrapInjectorPlugin(config));
    })();

    return targetConfig;
  };
}

function injectComponentMetadata(ngCLIVersion) {

  if (semver.satisfies(ngCLIVersion, '>=1.0.0-beta.16 <1.0.0-beta.22')) {
    injectComponentMetadata_2();
    return;
  }

  // Determining the next injection strategy
  let manifest = null;
  try {
    manifest = require('@ngtools/webpack/package.json')
  } catch (e) {
    manifest = require('@angular/cli/node_modules/@ngtools/webpack/package.json')
  }
  ngToolsPKGVersion = manifest.version;

  if (semver.satisfies(ngToolsPKGVersion, '<1.8.0-a')) {
    // Strategy for pre Angular 5
    injectComponentMetadata_1();
  } else {
    // Extracting simple version
    const majorVersion = semver.major(ngCLIVersion);
    const minorVersion = semver.minor(ngCLIVersion);
    const patchVersion = semver.patch(ngCLIVersion);
    const simpleVersion = `${majorVersion}.${minorVersion}.${patchVersion}`;

    // Strategy for Angular 5
    if (
      semver.satisfies(ngCLIVersion, '>=1.5.0-rc.8') ||
      semver.satisfies(ngCLIVersion, '>=1.5.0') ||
      semver.satisfies(simpleVersion, '>=1.6.0')
    ) {
      injectComponentMetadata_3();
    } else {
      injectComponentMetadata_4();
    }
  }
}

function injectCLBootstrapScript(ngCLIVersion, config) {
  if (semver.satisfies(ngCLIVersion, '>=1.0.0-beta.16 <1.0.0-beta.25')) {
    injectCLBootstrapScript_1(ngCLIVersion, config);
    return;
  }

  injectCLBootstrapScript_2(ngCLIVersion, config);
}

function normalizePackageVersion(packageVersion) {
  const prereleaseParts = semver.prerelease(packageVersion);
  if (prereleaseParts &&
    prereleaseParts.length > 1 &&
    typeof prereleaseParts[1] === 'string'
  ) {
    packageVersion = packageVersion.replace(`${prereleaseParts[0]}.${prereleaseParts[1]}`,
      `${prereleaseParts[0]}.${parseInt(prereleaseParts[1])}`
    );
  }

  return packageVersion;
}

function getNGCLIManifest() {
  let manifest = null;
  try {
    manifest = require('../../@angular/cli/package.json')
  } catch (e) {
    debug('Unable to detect package using new name, trying with old name');
  }

  if (manifest === null) {
    try {
      manifest = require('../../angular-cli/package.json');
    } catch (e) {
      debug(chalk.red('Unable to detect package using old name'));
    }
  }

  return manifest;
}

function getNGCLIPath(packageName) {
  let rootPath = null;

  switch (packageName) {
    case 'angular-cli':
      rootPath = 'angular-cli';
      break;
    case '@angular/cli':
      rootPath = '@angular/cli';
      break;
    default:
  }

  return rootPath;
}

module.exports.injectComponentMetadata = injectComponentMetadata;
module.exports.injectCLBootstrapScript = injectCLBootstrapScript;
module.exports.normalizePackageVersion = normalizePackageVersion;
module.exports.getNGCLIManifest = getNGCLIManifest;
module.exports.getNGCLIPath = getNGCLIPath;
