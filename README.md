# novi-plugin-link
Novi Builder Plugin for changing links sources

## How to Install
You should follow several simple steps to install this plugin:
* Copy the novi-plugin-link.js file to your path/to/novibuilder/plugins folder.
* Launch NoviBuilder

## What you are able to do
* Change link source

## Developer Settings
* querySelector - contains a css selector which defines the Plugin container.
* applyToProjectElements - indicates the type of favorite links stored.
* favoriteLinks - favorite links list.

## Usage
For use plugin your element must match the CSS selector of querySelector setting.

For example querySelector value is:
```css
a[href]
```
In this case you need to add element:
```html
<a href="#">Read more</a>
```