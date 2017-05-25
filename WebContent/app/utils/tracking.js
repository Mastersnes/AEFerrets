define(["app/utils/utils"], function (Utils) {
    "use strict";
    return {
    	push : function(marker) {
    		Utils.load("connect", {where : marker});
    	}
    };
});