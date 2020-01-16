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
            this._select = M.FormSelect.init(el);

            this._setupEventHandlers();
            this._setupStyles();

        }

        static get defaults() {
            return _defaults;
        }

        static init(els, options) {
            return super.init(this, els, options);
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

        _setupThemer(){
            let el = Themer.getElement(this.el);
            let toWrap = el.parentNode;
            let wrapper = document.createElement('div');
            toWrap.parentNode.insertBefore(wrapper, toWrap);
            wrapper.appendChild(toWrap);
            wrapper.classList.add('themer-wrapper');
            this._wrapper = wrapper;

            let header;

            header = document.createElement('h4');
            header.innerText = 'Main Color';
            wrapper.appendChild(header);
            this._appendCircles(wrapper, this.options.main_colors);
            header = document.createElement('h5');
            header.innerText = 'Main Color Nuance';
            wrapper.appendChild(header);
            this._appendCircles(wrapper, this.options.nuances, true);
            header = document.createElement('h4');
            header.innerText = 'Text Color';
            wrapper.appendChild(header);
            this._appendCircles(wrapper, this.options.main_colors);
            header = document.createElement('h5');
            header.innerText = 'Text Color Nuance';
            wrapper.appendChild(header);
            this._appendCircles(wrapper, this.options.nuances, true);

        }

        _setupEventHandlers() {
        }

        _removeEventHandlers() {
        }

        _setupStyles() {
        }

        _appendCircles(el, list, small=false){
            list.forEach(function(item){
                let circle = document.createElement('div');
                circle.classList.add('circle-color');
                if(small){
                    circle.classList.add('small')
                }
                circle.innerHTML = '<a href="#"><div class="' + item + '"></div></a>';
                el.appendChild(circle);
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
