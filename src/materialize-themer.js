(function($) {
    'use strict';

    let _defaults = {
    };

    class Themer extends Component {
        constructor(el, options) {
            super(Themer, el, options);

            this.el.M_Themer = this;

            /**
             * Options for the Themer
             * @member Themer#options
             */
            this.options = $.extend({}, Themer.defaults, options)

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

        }

        _setupEventHandlers() {
        }

        _removeEventHandlers() {
        }

        _setupStyles() {
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
