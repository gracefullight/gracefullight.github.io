import { Builtins, Cli } from 'clipanion';
import { ExtractDateFromMarkdown } from './extractDateFromMarkdown';

const [node, app, ...args] = process.argv;

const cli = new Cli({
  binaryLabel: `Blog cli`,
  binaryName: `${node} ${app}`,
  binaryVersion: `0.1.0`,
});


cli.register(ExtractDateFromMarkdown);
cli.register(Builtins.HelpCommand);
cli.runExit(args);
