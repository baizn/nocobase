{
  "name": "{{{name}}}",
  "private": true,
  "workspaces": [
    "packages/*/*"
  ],
  "scripts": {
    "openpiece": "openpiece",
    "pm": "openpiece pm",
    "dev": "openpiece dev",
    "start": "openpiece start",
    "clean": "openpiece clean",
    "build": "openpiece build",
    "test": "openpiece test",
    "postinstall": "openpiece postinstall",
    "lint": "eslint ."
  },
  "resolutions": {
    "@types/react": "^17.0.0",
    "@types/react-dom": "^17.0.0"
  },
  "dependencies": {
    "@tugraph/openpiece-cli": "{{{version}}}",
    {{{dependencies}}}
  },
  "devDependencies": {
    "@tugraph/openpiece-devtools": "{{{version}}}"
  }
}
