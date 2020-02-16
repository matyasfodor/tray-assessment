# Tray.io assesment task

TODO:

- [x] Bootstrap project
- [x] Try styled components
- [x] Basic layout
- [x] Timer
- [x] Integrate EventEmmitter
  - [x] Check typings, add if required
- ~~[ ] Build visualizer SVG map (?)~~
  - SVG doesn't support drag and drop: https://github.com/facebook/react/issues/3192
- [x] Add interesting connectors
- [x] Extend context to track setting elements interesting
- [x] Prevent children catching drag event (if `img` and `p` are not explicitly set draggable={false} only the image or the text is dragged)
- [x] Extend README.md

Known issues & conclusions:

- "Date &amp; Time Helpers" -> should be HTML encoded (doesn't seem to worth displaying dangerous innterHTML, preferably use encoding)
- Implementing context was quite a journey: Really interesting experience, especially with TypeScript, but a simple redux as a storage would have been a better solution.
- Trying to use SVG elements was unfortunately a dead-end.
- Connector overlaps are not quite nice in the connector visualizer (top)
- Icon sizes are somewhat standardized by width, but they might still vary in height
- Long titles can overlap in the interesting connectors list
- Interesting connectors: Flex wrap & min-height was a neat trick to be able to contain more connectors.
- Drag and drop is really inconvenient if the target is outside of the viewport, with a 1000px container it's inevitable - perhaps the viewer should be scaled down, or a simple click should send the elements to the interesting connectors list

# Default CRA instructions:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
