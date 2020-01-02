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
            this.options = $.extend({}, Themer.defaults, options);

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
        static getInstance(el) {
            let domElem = !!el.jquery ? el[0] : el;
            return domElem.M_Themer;
        }

        /**
         * Teardown component
         */
        destroy() {
            this._removeEventHandlers();
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
