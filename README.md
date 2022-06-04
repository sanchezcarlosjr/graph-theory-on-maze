# Maze graph theory

https://graph-theory.sanchezcarlosjr.com/

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm install
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

# Modelling

![Maze](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/sanchezcarlosjr/graph-theory-on-maze/main/docs/maze.puml)
![Movement player](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/sanchezcarlosjr/graph-theory-on-maze/main/docs/player-movement.puml)
![Heap](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/sanchezcarlosjr/graph-theory-on-maze/main/docs/heap.puml)

# Globals (Injected code)

Because it's expected in CLRS and other books we've chosen to develop our
standard built-in objects. See more in main.js
