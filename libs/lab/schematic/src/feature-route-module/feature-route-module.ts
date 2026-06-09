import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import * as path from 'path';
import { FeatureRouteModuleGeneratorSchema } from './schema';

export async function featureRouteModuleGenerator(
  tree: Tree,
  options: FeatureRouteModuleGeneratorSchema,
) {
  const nameVariants = names(options.name);

  const projectRoot = `${options.directory}/${nameVariants.fileName}`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...options,
    ...nameVariants,
    tmpl: '',
  });

  await formatFiles(tree);
}

export default featureRouteModuleGenerator;
