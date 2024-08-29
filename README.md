## What is this App

ReactDemo is a Demo app to run through many React Feature, like nevigation, controlled input, using API, handle list, using TypeScript.

- This app is using React + TypeScript + Vite.
- This app works propertly in mobile device.
- This app can to connect to JSON sever for managing data and make it works properly. 
- Start JSON Sever by: `npm run server` under `this app directionary` in terminor.
- ReactDemo doesn't use "react-router-dom" to handld router. It implement it's own one.
- UITest Page display the way of using tailwind CSS, custom components, etc.
- Todos Page is using it's own CSS to style.
- Picture Search Page can search picture according to the text.
- Book manage Page is showing how to implement REST APIs.
- Space Missions Page is a CSS exercise.

## JSONServer
[Morn info](https://www.npmjs.com/package/json-server)

This is a simple remote JSON database interface server. it is easy to setup, connect, implement data management.
JSONServer manage the **item ID** for you. So you don't need to manage ID yourself, and just use the ID which returned by JSONServer.

### Start Json Server: 
under this app folder: run this command in terminal: `npm run server`

### Setup
- You can use `api.http` to test API.
- Edit `data.type` in `JsonServer.js`.
For example, you want to store states for your new functionality in this App, you can add a new `data.type`. And add cor-responsed resource in `db.json`.

### Files for JSONServer:
- `db.json` is the database file for JSONServer. It is plain text file. It's format is same with `db-sample.json`.
- `api.http` is the JSONServer test file. it is support by a VSCode plugin.

## Using Unsplash photo API

- More information at Unsplash website [doc](https://unsplash.com/documentation)
- limitation: 50 API visits per minute

## Available Scripts
- `npm install` install dependencies
- `npm run dev` start web app
- `npm run server` start Json server

## Icons

### react-icons

It is easy to use, like this:
Install `react-icons`.
Then:
```js
import { FaEarthOceania } from "react-icons/fa6";
<FaEarthOceania className="h-12 w-20 rotate-[15deg]" />
```
- But the icons looks not great.
- Find icons from [here](https://react-icons.github.io/react-icons/)
- You can find Font Awosome icon here. like (`import { FaXmark } from "react-icons/fa6";`)

### Font Awesome Icons

- Font Awesome Icons looks better than react-icons.
- Check icon at: https://fontawesome.com/icons
- There are a few of icons which are free.

#### Old setup method
- Firstly, create an account in Font Awesome, and login, then you can create Font Awesome Kit. You can choose to create JS embeded code or CSS embeded code. Both of them are downloadable.
- Secondly, install the kit into your project: 
For example, you can copy the JS embeded code and paste it in `<scripe>` tag to the `<head>` of your `index.html`.
Something like this:
```html
<script
  src="https://kit.fontawesome.com/228dfc1a0b.js"
  crossorigin="anonymous"
></script>
```
- Now you can use icon in you project:
```html
<i className="fas fa-trash"></i>
```

#### use `react-fontawesome` component 
```
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @awesome.me/kit-KIT_CODE
npm i --save @fortawesome/react-fontawesome@latest
```
Then
```js
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faEnvelope} />
ReactDOM.render(element, document.body)
```

### heroicons

https://heroicons.com

You can get **svg** code for your project. 

## Dropdown component

Dropdown can substitute select element. You can easily change the outlook to fit your expectation.

## Space Missions Page
This React App can fetch rocket launchs data from Data Server, filter and display launchs.

## GraphQL Client Page

- 'OperationList' is initiated from JsonServer. User can update the 'operation' in the list, but the operations won't update JsonServer until user Send the operation to GraphqlServer.

## FAQ

- skill for TypeScript.
  - use `unknown`.
  - use `fetch()`.
- How to use `axios` with `async/await`.
- `scroll-behavior: smooth;` not working
