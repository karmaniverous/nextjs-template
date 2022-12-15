import dirTree from 'directory-tree';
import treeify from 'treeify';

import { program } from 'commander';

const convert = (tree) =>
  tree.reduce((t, { children, name, type }) => {
    t[name + (type === 'directory' && !children?.length ? '/' : '')] = children
      ? convert(children)
      : null;
    return t;
  }, {});

program
  .command('tree')
  .option('-e, --exclude <string>', 'exclude regex')
  .action(({ exclude }) => {
    const tree = dirTree('./', {
      attributes: ['type'],
      exclude: exclude ? new RegExp(exclude) : undefined,
      normalizePath: true,
    });

    console.log(treeify.asTree(convert([tree])));
  });

program.parse(process.argv);

// node cli/cli.mjs tree -e "\.git|\.next|node\_modules|public/images/favicon/|semantic-ui/site/"
