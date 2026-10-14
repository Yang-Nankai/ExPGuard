var tracker = {
	loaded: false,
	uid: 0,
	sid: 0,
	start_at: (new Date()).valueOf(),
	scroll:0,
	cursor:0,
	url: '//surfe.pro/track/',
	init: function()
	{
		if( tracker.loaded ) return;

		tracker.uid = cm.get('uid');
		
		if( tracker.uid )
			tracker.hook();
	},
	hook: function()
	{
		document.addEventListener('click', function(e) {
			if( !e.isTrusted ) return;
			tracker.pxl({
				ts: parseInt( e.timeStamp / 1000 ),
				u: tracker.uid,
				e: 1,
				v: e.target.href ? 1 : 0,
			});
		});

		document.addEventListener('scroll', function(e) {
			if( !e.isTrusted ) return;
			tracker.scroll++;
		});

		document.addEventListener('mousemove', function(e) {
			if( !e.isTrusted ) return;
			tracker.cursor++;
		});

		tracker.loaded = true;
		tracker.interval();
	},
	interval: function()
	{
		setTimeout(function(){
			tracker.send();
			tracker.interval();
		}, 5000 );
	},
	send: function()
	{
		if( !tracker.cursor && !tracker.scroll )
			return;

		var event = [], val = [];
		if(tracker.cursor)
		{
			event.push('2');
			val.push(tracker.cursor);
		}
		if(tracker.scroll)
		{
			event.push('3');
			val.push(tracker.scroll);
		}

		event = event.join('.');
		val = val.join('.');

		tracker.pxl({
			ts: parseInt( ((new Date()).valueOf() - tracker.start_at)/1000 ),
			u: tracker.uid,
			e: event,
			v: val,
		});
		tracker.cursor = 0;
		tracker.scroll = 0;
	},
	pxl: function (args) 
	{
		if(typeof args == 'object')
		{
			var _args = [];
			for(var n in args) 
				_args.push(n+'='+encodeURIComponent(args[n]));
			args = '?'+_args.join('&');
		}
		else
			args = '';

		var p = document.createElement("img");
		p.style = 'position:absolute;left:-9999px;';
		p.src = tracker.url+tracker.sid+args;
		document.body.appendChild(p);
		setTimeout(function(){p.remove()},10);
	}
};