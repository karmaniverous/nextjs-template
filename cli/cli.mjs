// npm imports
import _ from 'lodash';
import dirTree from 'directory-tree';
import path from 'path';
import treeify from 'treeify';

import { program } from 'commander';

program
  .command('tree')
  .option('-a, --attribute <string>', 'fs.stats attribute', './')
  .option('-d, --dir <string>', 'directory', './')
  .option('-e, --exclude <string>', 'exclude regex')
  .option('-n, --depth <int>', 'depth', (value) =>
    _.isNil(value) ? value : parseInt(value)
  )
  .action(({ attribute, depth, dir, exclude }) => {
    const dirTree2treeify = (tree) =>
      tree.reduce((t, n) => {
        t[n.name + (n.type === 'directory' && !n.children?.length ? '/' : '')] =
          n.children
            ? dirTree2treeify(n.children)
            : attribute
            ? n[attribute]
            : null;
        return t;
      }, {});

    const tree = dirTree(path.resolve(process.env.INIT_CWD ?? './', dir), {
      attributes: ['type', ...(attribute ? [attribute] : [])],
      depth,
      exclude: exclude ? new RegExp(exclude) : undefined,
      normalizePath: true,
    });

    console.log(treeify.asTree(dirTree2treeify([tree]), !!attribute));
  });

program.parse(process.argv);
