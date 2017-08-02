import './style.css'
import Ghost from './ghost.png'

/* add an event listener for window resize */

window.addEventListener('resize', resizeCanvas, false)

/* --------------------------------------- */

/* the intention of these objects is to generate closure */
/* this is why they are dangerously in global scope, sorry */
/* create empty canvas/window objects holding empty array */
/* these arrays will store the values of updated widths/heights */

var canvasObj = {
	canvasWidth: 0,
	canvasHeight: 0
}

var winObj = {
	windowWidth: 0,
	windowHeight: 0
}

/* --------------------------------------- */

/* creates parent flexbox component */

function createParent() {
	var element = document.createElement('div')
	element.setAttribute('class', 'flexbox-parent')
	return element
}

/* --------------------------------------- */

/* creates head component after parent component */

function header() {
	var element = document.createElement('div')
	element.setAttribute('class', 'flexbox-item header')
	element.setAttribute('align', 'center')
	element.innerHTML = 'Window Dimensions - Red | Canvas Dimensions - Green'
	return element
}

/* --------------------------------------- */

/* creates a wrapper for the main content */

function flexSet() {
	var element = document.createElement('div')
	element.setAttribute(
		'class',
		'flexbox-item fill-area content flexbox-item-grow'
	)
	return element
}

/* --------------------------------------- */

/* div which holds main content area */

function flexContent() {
	var element = document.createElement('div')
	element.setAttribute('class', 'flexbox-area-content flexbox-item-grow')
	element.setAttribute('width', 'auto')
	element.setAttribute('height', 'auto')
	return element
}

/* --------------------------------------- */

/* canvas tag, child of both flex content and flexset */

function canvasComponent() {
	var element = document.createElement('canvas')
	element.setAttribute('id', 'myCanvas')

	return element
}
/* --------------------------------------- */

/* creates tail component, which is child of parent div */

function tail() {
	var element = document.createElement('div')
	element.setAttribute('class', 'flexbox-item footer')
	element.setAttribute('align', 'center')
	element.innerHTML = 'Canvas-Window Resize'
	return element
}
/* --------------------------------------- */

function ghostTag() {
	var element = document.createElement('div')
	element.setAttribute('id', 'ghost')
	var scaryGhost = new Image()
	scaryGhost.src = Ghost
	scaryGhost.setAttribute('width', '75px')
	scaryGhost.setAttribute('height', '75px')
	scaryGhost.setAttribute('position', 'relative')
	scaryGhost.setAttribute('display', 'inline')
	scaryGhost.setAttribute('float', 'right')
	element.appendChild(scaryGhost)
	return element
}

/* creates dom elements that need to be parent nodes, and canvas */

var parent = createParent()
var setFlex = flexSet()
var contentFlex = flexContent()
var canvas = canvasComponent()
var headRest = header()
var tailRest = tail()

/* --------------------------------------- */

/* creates dom elements that need to be parent nodes, and canvas */

document.body.appendChild(parent) // | <parent>
//  |     \
parent.appendChild(headRest) //   |- <header>
//    |       \
parent.appendChild(setFlex) //     |-   <wrapper>
//      |        \
setFlex.appendChild(contentFlex) //       |     <content>
//        |          \
contentFlex.appendChild(canvas) //         |        <canvas>
//          |            \
parent.appendChild(tailRest) //           |-          <tail>
//            |              \
tailRest.appendChild(ghostTag()) //             |             <scaryGhost>
/* --------------------------------------- */

/* creates "test" divs that display canvas and window width, height */

var canvasDivWidth = createCanvasWidth()
var canvasDivHeight = createCanvasHeight()
var windowDivWidth = createWinWidth()
var windowDivHeight = createWinHeight()
headRest.appendChild(canvasDivHeight)
headRest.appendChild(canvasDivWidth)
headRest.appendChild(windowDivHeight)
headRest.appendChild(windowDivWidth)

/* --------------------------------------- */

/* initial resize of canvas, should be called by event listener on window resize */

resizeCanvas()

/* --------------------------------------- */

/* resize canvas method, checks if wrapping div has resized, if so, resizes */
/* also updates values for canvas and windows width/heights */
/* calls function that updates the innerHTML for these divs */
/* calls function that then draws whatever on canvas */

function resizeCanvas() {
	var rect = setFlex.getBoundingClientRect()
	canvas.width = rect.width - 20
	canvas.height = rect.height - 20
	canvasObj.canvasWidth = canvas.width
	canvasObj.canvasHeight = canvas.height
	winObj.windowWidth = window.innerWidth
	winObj.windowHeight = window.innerHeight
	updateWinCanvasDivs()
	drawOnCanvas(canvas.width, canvas.height)
}

/* --------------------------------------- */

/* draws on canvas */

function drawOnCanvas(width, height) {
	var c = document.getElementById('myCanvas')
	var ctx = c.getContext('2d')
	ctx.moveTo(0, 0)
	ctx.lineTo(width, height)
	ctx.stroke()
}

/* --------------------------------------- */

/* div for win width test */

function createWinWidth() {
	var element = document.createElement('div')
	element.setAttribute('class', 'win-width')
	element.innerHTML = winObj.windowHeight
	return element
}

/* --------------------------------------- */

/* div for win height test */

function createWinHeight() {
	var element = document.createElement('div')
	element.setAttribute('class', 'win-height')
	element.innerHTML = winObj.windowWidth
	return element
}

/* --------------------------------------- */

/* div for canvas width test */

function createCanvasWidth() {
	var element = document.createElement('div')
	element.setAttribute('class', 'canvas-width')
	element.innerHTML = canvasObj.canvasWidth
	return element
}

/* --------------------------------------- */

/* div for canvas height test */

function createCanvasHeight() {
	var element = document.createElement('div')
	element.setAttribute('class', 'canvas-height')
	element.innerHTML = canvasObj.canvasHeight
	return element
}

/* --------------------------------------- */

/* updates innerHTML of test divs with object values */
/* these should have been changed when even listener calls */
/* canvas resize function  ---> styles for divs are in css */
function updateWinCanvasDivs() {
	canvasDivWidth.innerHTML = canvasObj.canvasWidth
	canvasDivHeight.innerHTML = canvasObj.canvasHeight
	windowDivWidth.innerHTML = winObj.windowWidth
	windowDivHeight.innerHTML = winObj.windowHeight
}

/* --------------------------------------- */
