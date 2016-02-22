function addRandomUsers(num) {
	var added = []
	for(var i=0; i < num; i++) {
		added.push({
			first_name: chance.first(),
			last_name: chance.last(),
			email: chance.email(),
			address: chance.address()
		});
	}
	var users = ractive.get('users')
	users = users.concat(added)
	ractive.set('users', users)
}