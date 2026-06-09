# schematics

This library was generated with [Nx](https://nx.dev).


## Work with Schematics

- Create new workspace
```bash
$ nx g @nx/plugin:plugin libs/lab/schematics --importPath=@lab/schematics
```

- Create generator

```bash
$  nx g @nx/plugin:generator --name=feature-route-module --path=libs/lab/schematics/src/feature-route-module
```

- Use the generator
```bash
$ nx g @lab/schematics:feature-route-module --name=auth --directory=libs/auth/domain/src/lib
```

## Building
```bash
Run `nx build schematics` to build the library.
```
