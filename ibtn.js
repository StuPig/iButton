/*
 * Interactive Button - zepto plugin for interactive buttons
 *
 * Created by StuPig
 *
 * Copyright (c) 2013 StuPig Gong
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version:  1.0.0
 *
 */
(function($, window, document, undefined) {

    var settings = {
        event: 'click',
        remain: '$iTime',
        container: document.body,
        beforeReset: null   // function() { alert(this); }
    };

    $.initIBtn = function(options) {
        settings = $.extend(settings, options);

        $(settings.container).on(settings.event, '.i-btn', function(e) {
            var $btn = $(this);

            if ($btn.data('isActived'))
                return false;

            if (!$btn.data('_inited'))
                _initBtn.call($btn);

            reset.call($btn);
        });
    }

    $.fn.reset = reset;

    function reset(immediately) {
        var $btn = this, pause = Number($btn.data('ibtnPause')), timeId;

        if (!immediately && settings.beforeReset && settings.beforeReset() === false)
            return false;

        if (immediately) {

            if (timeId = $btn.data("timeId")) {
                clearInterval(timeId);
                $btn.data('timeId', 0);
            }

            $btn.data('isActived', false);
            _resetProp.call($btn);

            return false;
        }

        if (pause) {
            timeId = setInterval(function() {
                if (!pause) {
                    reset.call($btn, true)
                    return false;
                }

                _activeBtn.call($btn, pause);

                pause --;
            }, 1000);
            $btn.data('timeId', timeId)
        } else {
            _activeBtn.call($btn);
        }
    }

    function _activeBtn(pause) {
        var $btn = this, cls, text;

        if (clas = $btn.data('ibtnClass'))
            $btn.addClass(clas);

        if (text = $btn.data('ibtnText'))
            $btn.text(text.replace(settings.remain, pause));

        $btn.data('isActived', true);
    }

    function _resetProp() {
        var $btn = this,
            cls;

        if (cls = $btn.data('ibtnClass'))
            $btn.removeClass(cls);

        if ($btn.data('ibtnText'))
            $btn.text($btn.data('originText'));

        if ($btn.data('ibtnVal'))
            $btn.val($btn.data('originVal'))
    }

    function _initBtn() {
        var $btn = this;

        $btn.data('originText', $btn.text());
        $btn.data('originVal', $btn.val());
        // TODO
        $btn.data('_inited', true);
    }
})(Zepto || jQuery, window, document);

