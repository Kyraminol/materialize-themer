(function($) {
    'use strict';

    let _defaults = {
        main_colors: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green','light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey', 'white', 'black'],
        nuances: ['darken-4', 'darken-3', 'darken-2', 'darken-1', 'default-nuance', 'lighten-1', 'lighten-2', 'lighten-3', 'lighten-4', 'lighten-5', 'accent-1', 'accent-2', 'accent-3', 'accent-4']
    };

    class Themer extends Component {
        constructor(el, options) {
            super(Themer, el, options);

            this.el.M_Themer = this;

            /**
             * Options for the Themer
             * @member Themer#options
             */
            this.options = $.extend({}, Themer.defaults, options);

            this._setupThemer();

            this._handleCircleClickBound = this._handleCircleClick.bind(this);
            this._handleSelectChangeBound = this._handleSelectChange.bind(this);

            this._setupEventHandlers();
            this._setupStyles();

        }

        static get defaults() {
            return _defaults;
        }

        static init(els, options) {
            return super.init(this, els, options);
        }

        getCurrentTheme() {
            return JSON.stringify(this._theme);
        }

        applyTheme(theme) {
            this._applyTheme(JSON.parse(theme));
            return true;
        }

        /**
         * Get Instance
         */
        static getElement(el){
            return !!el.jquery ? el[0] : el;
        }

        static getInstance(el) {
            let domElem = this.getElement(el);
            return domElem.M_Themer;
        }

        /**
         * Teardown component
         */
        destroy() {
            this._removeEventHandlers();
        }

        _clearElement(element, type){
            let clearList = type.endsWith('nuance') ? this.options.nuances : this.options.main_colors;
            clearList.forEach(toRemove => {
                if(type === 'text-nuance') toRemove = 'text-' + toRemove;
                if(type === 'text') toRemove += '-text';
                element.classList.remove(toRemove);
            })
        }

        _applyTheme(newTheme){
            Object.entries(newTheme).forEach(components => {
                let componentName = components[0];
                Object.entries(Object(components[1])).forEach(componentValues => {
                    let valueName = componentValues[0];
                    let valueNew = componentValues[1];
                    let valueOld = this._theme[componentName][valueName];
                    let selector = '.themer';
                    selector += valueName.startsWith('text') ? '-text.' + componentName : '.' + componentName;
                    if(valueName === 'text'){
                        if(valueOld) valueOld += '-text';
                        if(valueNew) valueNew += '-text';
                    } else if(valueName === 'text-nuance') {
                        if(valueOld) valueOld = 'text-' + valueOld;
                        if(valueNew) valueNew = 'text-' + valueNew;
                    }
                    document.querySelectorAll(selector).forEach(element => {
                        if(!valueOld && valueNew) this._clearElement(element, valueName);
                        if(valueOld) element.classList.remove(valueOld);
                        if(valueNew) element.classList.add(valueNew);
                    })
                    this._theme[componentName][valueName] = componentValues[1];
                });
            });
        }

        _setupThemer(){
            let el = Themer.getElement(this.el);
            let toWrap = el.parentNode;
            let wrapper = document.createElement('div');
            toWrap.parentNode.insertBefore(wrapper, toWrap);
            wrapper.appendChild(toWrap);
            wrapper.classList.add('themer-wrapper');
            this._theme = {};
            this._select = M.FormSelect.init(el, {classes: 'themer-select'});
            this._select.$selectOptions.each(option => {
                if(option.nodeName === 'OPTGROUP'){
                    for (let child of option.children){
                        if(child.value) this._theme[child.value] = {'main': null, 'main-nuance': null, 'text': null, 'text-nuance': null};
                    }
                } else {
                    if(option.value) this._theme[option.value] = {'main': null, 'main-nuance': null, 'text': null, 'text-nuance': null};
                }
            });

            let picker = document.createElement('div');
            picker.classList.add('themer-picker', 'hide');
            let mainColors = document.createElement('div');
            mainColors.classList.add('themer-main');
            let mainColorsHeader = document.createElement('h4');
            mainColorsHeader.innerText = 'Main Color';
            mainColors.appendChild(mainColorsHeader);
            this._appendCircles(mainColors, this.options.main_colors);

            let mainColorsNuances = document.createElement('div');
            mainColorsNuances.classList.add('themer-nuances', 'hide');
            let mainColorsNuancesHeader = document.createElement('h5');
            mainColorsNuancesHeader.innerText = 'Main Color Nuance';
            mainColorsNuances.appendChild(mainColorsNuancesHeader);
            this._appendCircles(mainColorsNuances, this.options.nuances, true);
            mainColors.appendChild(mainColorsNuances);

            let textColors = document.createElement('div');
            textColors.classList.add('themer-main', 'themer-text');
            let textColorsHeader = document.createElement('h4');
            textColorsHeader.innerText = 'Text Color';
            textColors.appendChild(textColorsHeader);
            this._appendCircles(textColors, this.options.main_colors);

            let textColorsNuances = document.createElement('div');
            textColorsNuances.classList.add('themer-nuances', 'themer-text', 'hide');
            let textColorsNuancesHeader = document.createElement('h5');
            textColorsNuancesHeader.innerText = 'Text Color Nuance';
            textColorsNuances.appendChild(textColorsNuancesHeader);
            this._appendCircles(textColorsNuances, this.options.nuances, true);
            textColors.appendChild(textColorsNuances);

            picker.appendChild(mainColors);
            picker.appendChild(textColors);
            wrapper.appendChild(picker);

            this._wrapper = wrapper;
            this._picker = picker;
        }

        _setupEventHandlers() {
            this._wrapper.querySelectorAll('.circle-input').forEach(circle => {
                circle.addEventListener('click', this._handleCircleClickBound);
            })
            this._select.el.addEventListener('change', this._handleSelectChangeBound);
        }

        _removeEventHandlers() {
        }

        _setupStyles() {
        }

        _appendCircles(el, list, small=false){
            let radioName = [...Array(5)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
            list.forEach(function(item){
                let id = [...Array(5)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
                let input = document.createElement('input');
                input.classList.add('circle-input');
                input.type = 'radio';
                input.style.display = 'none';
                input.id = id;
                input.name = radioName;
                input.value = item;
                let label = document.createElement('label');
                label.htmlFor = id;
                let circle = document.createElement('div');
                circle.classList.add('circle-color');
                if(small){
                    circle.classList.add('small');
                }
                circle.innerHTML = '<div class="' + item + '"></div>';
                label.appendChild(circle);
                el.appendChild(input);
                el.appendChild(label);
            });
        }

        _handleCircleClick(e){
            let value = e.target.value;
            let parent = e.target.parentElement;
            let isMain = parent.classList.contains('themer-main');
            let isText = parent.classList.contains('themer-text');
            let key = '';
            key += isText ? 'text' : 'main';
            key += isMain ? '' : '-nuance';
            if(isMain){
                parent.querySelectorAll('.themer-nuances .circle-color > div').forEach(element => {
                    element.classList.remove(...this.options.main_colors);
                    element.classList.add(value);
                });
                if(value !== 'black' && value !== 'white'){
                    parent.querySelector('.themer-nuances').classList.remove('hide');
                } else {
                    parent.querySelector('.themer-nuances').classList.add('hide');
                }
            }
            let newTheme = JSON.parse(JSON.stringify(this._theme));
            this._selectValues.forEach(selected => {
                newTheme[selected][key] = value;
            })
            this._applyTheme(newTheme);
        }

        _handleSelectChange(e){
            this._selectValues = this._select.getSelectedValues();
            if(this._selectValues.length > 0){
                this._picker.classList.remove('hide');
            } else {
                this._picker.classList.add('hide');
            }
            this._wrapper.querySelectorAll('.themer-picker input:checked').forEach(element => {
                element.checked = false;
            });
        }
    }

    /**
     * @static
     * @memberof Themer
     */
    Themer._themers = [];

    M.Themer = Themer;

    if (M.jQueryLoaded) {
        M.initializeJqueryWrapper(Themer, 'themer', 'M_Themer');
    }
})(cash);
