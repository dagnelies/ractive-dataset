Ractive.components["dataset"] = Ractive.extend({
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
				if( sortby )
					result = result.sort( function(a,b) { return compare(a.value[sortby], b.value[sortby]); } )
				// we need indexes only
				result = result.map( function(entry){ return entry.index; } );
			}
			
			this.set('count', result.length)
			
			return result;
		}
	},
	template: "{{#each rows}}{{#with data[this]}}{{>content}}{{/with}}{{/each}}"
})