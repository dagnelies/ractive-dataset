Ractive.components["pager"] = Ractive.extend({
	isolated: true,
	data: {
		page: 1,
		of: 10,
		'class': ''
	},
	template: '<div class="{{class}}">' +
				'{{#if page > 1}}' +
					' <a href="#1" on-click="set(\'page\', 1)">&lt;&lt;</a>' +
					' <a href="#{{page-1}}" on-click="set(\'page\', page-1)">&lt;</a>' +
				'{{/if}}' +
				' <input type="number" step="1" min="1" max="1000" value="{{page}}" style="width:50px;" /> / {{of}}' +
				' <div style="display:inline-block; width:80px;">' +
				'{{#if page < of}}' +
					' <a href="#{{page+1}}" on-click="set(\'page\', page+1)">&gt;</a>' +
					' <a href="#{{of}}" on-click="set(\'page\', of)">&gt;&gt;</a>' +
				'{{/if}}' +
				'</div>' +
			'</div>',
	onchange: function(data) {
		if( !data.page && !data.perpage )
			return
		var p = data.page || this.get('page')
		var pp = data.perpage || this.get('pp')
		this.set('from', (p - 1) * pp)
		this.set('to', p * pp)
	}
})

Ractive.components["ts"] = Ractive.extend({
	isolated: true,
	data: function(){ return {
		sortby: '',
		target: ''
	}},
	template: '<th on-click="toggle()">{{>content}}<span style="width:10px">' +
		'{{#if .sortby === .target}}&#9660;{{/if}}' +
		'{{#if .sortby === ("-" + .target)}}&#9650;{{/if}}' +
		'</span></th>',
	toggle: function() {
		var sortby = this.get('sortby')
		var target = this.get('target')
		if( !sortby )
			this.set('sortby', target)
		else if( sortby === target )
			this.set('sortby', '-' + target)
		else if( sortby === '-' + target )
			this.set('sortby', '')
		else
			this.set('sortby', target)
	}
})