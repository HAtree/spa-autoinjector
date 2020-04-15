//console.info("DT SPA script initializing..");
(function() {
    'use strict';
    var _wr = function(type) {
        var orig = history[type];
        return function() {
            var rv = orig.apply(this, arguments);
            var e = new Event(type);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    };
    if (typeof history != "undefined"){
        history.pushState = _wr('pushState')
        history.replaceState = _wr('replaceState');

    }

    window.addEventListener('replaceState', function(e) {
        console.warn('Henry: State Changed (replacestate)');
        if (typeof dtrum != "undefined"){
            var action = dtrum.enterAction(window.location.pathname, 'click');
            dtrum.leaveAction(action);
        }
    });
    window.addEventListener('pushState', function(e) {
        console.warn('Henry: pushState!');
        if (typeof dtrum != "undefined"){
            var action = dtrum.enterAction(window.location.pathname, 'click');
            dtrum.leaveAction(action);
        }
    });
    //console.info("DT SPA patch ready to go");
})();
