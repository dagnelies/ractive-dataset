/*
The naive attempt would be to manipulate the original array directly.
This is problematic because it first have to be filtered first, then sorted, then the from/to rows extracted.
In order to do that in that order, you would need to work on a copy.
But this is problematic as well since you'd loose the data-binding with the original array.

The trick is to work directly on the array indexes.
*/
Ractive.components["dataset"] = Ractive.extend({
	lazy: true,
	isolated: true,
	data: {
		data: [],
		filter: '',
		sortby: '',
		from: 0,
		to: 0,
		count: 1
	},
	computed: {
		rows: function(){
			var indexes = this.get('indexes')
			
			var from = this.get('from')
			var to = this.get('to')
			
			if( to <= 0 )
				to = indexes.length
			
			return indexes.slice(from,to)
		},
		indexes: function() {
			var data = this.get('data')
			var filter = this.get('filter')
			var sortby = this.get('sortby')
			
			function compare(a,b) {
				if (a > b) {
					return 1;
				}
				if (a < b) {
					return -1;
				}
				return 0;
			}
			
			function findAny(obj, str) {
				str = str.toLowerCase()
				for(var key in obj) {
					var value = String(obj[key]).toLowerCase()
					if( value.indexOf(str) >= 0 )
						return true;
				}
				return false;
			}
			
			if( !filter && !sortby ) {
				// just get the indexes
				result = data.map( function(val,i) { return i; } )
			}
			else {
				// index it
				var result = data.map( function(val,i) { return {index:i, value:val}; } )
				// filter it
				if( filter )
					result = result.filter( function(entry) { return findAny(entry.value, filter); } )
				// sort it
				if( sortby ) {
					var reverse = (sortby.charAt(0) === '-')
					if( !reverse ) {
						result = result.sort( function(a,b) { return compare(a.value[sortby], b.value[sortby]); } )
					}
					else {
						sortby = sortby.substr(1)
						result = result.sort( function(b,a) { return compare(a.value[sortby], b.value[sortby]); } )
					}
				}
				// we need indexes only
				result = result.map( function(entry){ return entry.index; } );
			}
			
			this.set('count', result.length)
			
			return result;
		}
	},
	remove: function( keypath ) {
		var dot = keypath.lastIndexOf(".")
		var index = parseInt( keypath.substring(dot+1) )
		this.splice('data', index, 1)
	},
	template: "{{#each rows}}{{#with data[this]}}{{>content}}{{/with}}{{/each}}"
})

Ractive.components["pager"] = Ractive.extend({
	isolated: true,
	data: {
		page: 1,
		of: 10,
		'class': ''
	},
	template: '<div class="{{class}}">' +
				'{{#if page > 1}}' +
					' <a href="#1" on-click="@this.set(\'page\', 1)">&lt;&lt;</a>' +
					' <a href="#{{page-1}}" on-click="@this.set(\'page\', page-1)">&lt;</a>' +
				'{{/if}}' +
				' <input type="number" step="1" min="1" max="1000" value="{{page}}" style="width:50px;" /> / {{of}}' +
				' <div style="display:inline-block; width:80px;">' +
				'{{#if page < of}}' +
					' <a href="#{{page+1}}" on-click="@this.set(\'page\', page+1)">&gt;</a>' +
					' <a href="#{{of}}" on-click="@this.set(\'page\', of)">&gt;&gt;</a>' +
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
	template: '<th on-click="@this.toggle()">{{>content}}<span style="width:10px">' +
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