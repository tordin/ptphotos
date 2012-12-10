var events = new function() {
    var $o = this,
        hooks = {};

    $o.bind = function(names, method, properties) {
        properties = fillObject(properties, {
            one_time : false,
            priority : 0
        });

        names.split(' ').forEach(function(name) {
            if (!hooks[name]) {
                hooks[name] = [];
            }
            
            hooks[name].push(fillObject({
                method : method
            }, properties));

            hooks[name].sort(function(a, b) {
                return a.priority - b.priority;
            });
        });
    };

    $o.unbind = function(names, method) {
        names.split(' ').forEach(function(name) {
            if (hooks[name]) {
                if (!method) {
                    hooks[name] = [];
                } else {
                    for (var i = 0; i < hooks[name].length;) {
                        if (hooks[name][i].method == method) {
                            hooks[name].splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                }
            }
        });
    };

    $o.fire = function(event) {
        if (typeof(event) == 'string') {
            event = {
                name : event
            };
        }

        var hook_arguments = arguments ? Array.prototype.slice.call(arguments, 1) : [];
        hook_arguments.unshift(event);

        if (hooks[event.name]) {
            for (var i = 0; i < hooks[event.name].length;) {
                try {
                    hooks[event.name][i].method.apply(this, hook_arguments);
                } catch(error) {
                    console.log('error "' + error + '" on hook for "' + event.name + '"', hooks[event.name][i]);
                }

                if (hooks[event.name][i].one_time) {
                    hooks[event.name].splice(i, 1);
                } else {
                    i++;
                }
            }
        }
    };
};

function Waiter(events, callback, initial_time_slot) {
    var $o = this;
    
    if (!events) {
        callback(true);
    } else {
        $o.box = {};
        
        $o.go = function(key, value) {
            if (!$o.terminated) {
                if (key) {
                    $o.box[key] = value;
                }

                if (--events == 0) {
                    $o.terminated = $o.all_done = true;
                    callback(true, $o.box);
                }
            }
        };

        var time_slots = [];

        function timeOut() {
            if (!$o.terminated && !$o.all_done) {
                time_slots.shift();

                if (time_slots.length) {
                    setTimeout(timeOut, time_slots[0]);
                } else {
                    $o.terminated = true;
                    callback(false, $o.box);
                }
            }
        }

        $o.addTime = function(time_slot) {
            if (!$o.terminated && time_slot > 0) {
                if (!time_slots.length) {
                    setTimeout(timeOut, time_slot);
                }

                time_slots.push(time_slot);
            }
        };

        $o.addTime(initial_time_slot);
    }
}

function loadImages(urls, callback, time_limit) {
    var waiter = new Waiter(urls.length, callback, time_limit ? time_limit : 5000 * urls.length);

    urls.forEach(function(url) {
        var image = new Image();
        image.onload = waiter.go;
        image.src = url;                
    });
}

function fillObject(target, source, clone) {
    if (!target) {
        target = {};
    } else if (clone) {
		target = $.extend({}, target);    	
    }
    
    for (var k in source) {
    	var tv = target[k],
    		sv = source[k];
    	
    	if (typeof(tv) == 'undefined') {
    		target[k] = sv;
    		
    	} else if (typeof(tv) == 'object' && typeof(sv) == 'object') {
    		fillObject(tv, sv);
    	} 
    }
    
    return target;
}

$.fn.setVisible = function(visible) {
	for (var i = 0; i < this.length; i++) {
		if (visible) {
			$(this[i]).show();
		} else {
			$(this[i]).hide();
		}
	}
	
	return $(this);
};

function getKeys(map) {
	var list = [];
	
	for (var k in map) {
		list.push(k);
	}

	return list;
}

function pickRandom(list, amount) {
	if (amount >= list.length) {
		return list;
	}
	
	var map = {};

	do {
		map[list[Math.round(Math.random() * (list.length - 1))]] = true;
	} while (getKeys(map).length < amount);
	
	
	return getKeys(map);
}
