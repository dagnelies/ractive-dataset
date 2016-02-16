Ractive.components["datagrid"] = Ractive.extend({
	data: {
		count: 0,
		data: [],
		page: 1,
		perpage: 20,
		selection: 'multi',
		selected: [],
		fields: '',
		labels: '',
		filter: '',
		sortby: '',
		'class': '',
		'selected-class': ''
	},
	partials: {
		headers: function() {
			if( this.selection ) {
				
			}
		}
	}
	template: '<table class="{{class}}">' +
		'{{>headers}}' +
		'<tbody>' +
		'<dataset data="{{data}}" filter="{{filter}}" sortby="{{sortby}}" from="{{(page-1)*perpage}}" to="{{page*perpage}}" count="{{count}}">
					<tr>
						<td>{{.first_name}}</td>
						<td>{{.last_name}}</td>
						<td>{{.email}}</td>
						<td>{{.address}}</td>
					</tr>
				</dataset>
			</tbody>
		</table>
		
})