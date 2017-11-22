Meteor.startup(function() {
	RocketChat.MessageTypes.registerType({
		id: 'jitsi_call_started',
		system: true,
		message: TAPi18n.__('启动视频通话')			// wgb 2017-10-16 17:41:52
	});
});
