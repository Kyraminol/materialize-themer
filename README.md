# materialize-themer

A plugin for [Materializecss framework](https://materializecss.com) that implements easy customizable theming

[example-page here](https://materialize-themer.gianmarcorandazzo.it/)

## Usage

### 0. Include

Add materialize-themer to your page

```HTML
<link rel="stylesheet" href="https://raw.githubusercontent.com/Kyraminol/materialize-themer/master/src/materialize-themer.css">
<script src="https://raw.githubusercontent.com/Kyraminol/materialize-themer/master/src/materialize-themer.js"></script>
```



### 1. Select

Add one `<select>` with one or more `<option>`, materialize-themer will initialize color picker around it. You can use `<optgroup>` to group one or more items.

`value` attriibute will be used to match components in step 2.

```html
<select multiple id="themer-select" autocomplete="off">
    <option value="" disabled>Choose component(s)</option>
    <optgroup label="Header">
    	<option value="navbar">Navbar</option>
    </optgroup>
    <optgroup label="Body">
        <option value="background">Background</option>
    </optgroup>
    <optgroup label="Footer">
        <option value="footer">Footer</option>
    </optgroup>
</select>
```



### 2. Components

Add classes matching `value`s from defined `<option>` in step 1, then add class `themer` to change background color or `themer-text` to change text color.

You can add color and text color classes too, they will be detected as default theme colors.

```html
<body class="background themer">

    <header>
        <nav class="navbar themer blue darken-2">
            <a href="#" class="brand-logo left navbar themer-text">materialize-themer</a>
        </nav>
    </header>

    <footer class="footer themer page-footer blue darken-2"></footer>

</body>
```



### 3.  Initialize

Init a Themer instance passing the `<select>` as argument

```javascript
let themer = M.Themer.init(document.querySelector('#themer-select'));
```

