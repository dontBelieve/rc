Meteor.methods({
	createPrivateGroup(name, fname, members, readOnly = false, customFields = {}) {
		check(name, String);
		check(fname, String);		// wgb 2017-10-17 10:18:30
		check(members, Match.Optional([String]));

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'createPrivateGroup' });
		}

		if (!RocketChat.authz.hasPermission(Meteor.userId(), 'create-p')) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'createPrivateGroup' });
		}
		// wgb 2017-10-17 10:18:30
		return RocketChat.createRoom('p', name, fname, Meteor.user() && Meteor.user().username, members, readOnly, {customFields});
	}
});
