// Generated by CoffeeScript 1.7.1
(function() {
	var clientId, touchMoveEvent, touchStopEvent;

	clientId = Math.random().toString().split('.')[1];

	$(function() {
		var $left, emit, socket;
		emit = function(e, eventName, params) {
			if (params == null) {
				params = {};
			}
			params.clientId = clientId;
			socket.emit(eventName, params);
			return e != null ? typeof e.preventDefault === "function" ? e.preventDefault() : void 0 : void 0;
		};
		socket = io.connect(window.location.origin);
		socket.on('connect', function() {
			return emit(null, 'connected');
		});
		socket.on('colorAssigned', function(data) {
			if (data.clientId === clientId) {
				return $('.color').css('background-color', data.color);
			}
		});
		socket.on('scoreUpdated', function(data) {
			if (data.clientId === clientId) {
				return $('.color').html(data.score);
			}
		});

		document.onkeydown = checkKey;
		function checkKey(e) {
			e = e || window.event;

			switch (e.keyCode) {
				case 37: //left
					emit(e, 'move', { direction: 180 });
					break;
				case 38: //up
					emit(e, 'move', { direction: 90 });
					break;
				case 39: //right
					emit(e, 'move', { direction: 0 });
					break;
				case 40: //down
					emit(e, 'move', { direction: -90 });
					break;
				case 32: //space
					emit(e, 'fire');
					break;
			}
		}

	});

}).call(this);