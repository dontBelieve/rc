Meteor.methods({
	createChannel(name, fname, members, readOnly = false, customFields = {}) {
		check(name, String);
		check(fname, String);		// wgb 2017-10-16 17:41:52
		check(members, Match.Optional([String]));

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'createChannel' });
		}

		if (!RocketChat.authz.hasPermission(Meteor.userId(), 'create-c')) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'createChannel' });
		}
		// wgb 2017-10-16 17:41:52
		return RocketChat.createRoom('c', name, fname, Meteor.user() && Meteor.user().username, members, readOnly, {customFields});
	}
});
