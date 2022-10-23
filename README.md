## component-generator

- [Usage](#usage)
  - [Templates](#templates)
- [Contribute](#contribute)

## Usage

`npx @sultanyaron/component-generator`

The cli is using prompt to get the component name and the required template

### Templates

- Reusable component (styles, types, tests and a story)
- Component with test (styles, types and test)
- Custom (Choose files)
  - Style (`MyComponent.style.ts`)
  - Types (`MyComponent.types.ts`)
  - Test (`MyComponent.test.ts, myComponentSetup.ts, myComponentTestUtils.ts`)
  - Story (`MyComponent.story.tsx`)

## Contribute

- `npm install`
- `npm run dev`
- `npm test`
- `npm link`
- use `component-generator` Where ever you want to test your changes

- Create pull request
- Wait for CI to pass
- Merge
