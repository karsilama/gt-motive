import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { featureRouteModuleGenerator } from './feature-route-module';
import { FeatureRouteModuleGeneratorSchema } from './schema';

describe('feature-route-module generator', () => {
  let tree: Tree;
  const options: FeatureRouteModuleGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await featureRouteModuleGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
