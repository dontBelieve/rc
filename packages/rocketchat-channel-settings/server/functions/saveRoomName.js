
RocketChat.saveRoomName = function(rid, displayName, user, sendMessage = true) {
	const room = RocketChat.models.Rooms.findOneById(rid);
	if (room.t !== 'c' && room.t !== 'p') {
		throw new Meteor.Error('error-not-allowed', 'Not allowed', {
			'function': 'RocketChat.saveRoomdisplayName'
		});
	}
	if (displayName === room.name) {
		return;
	}

	const slugifiedRoomName = RocketChat.getValidRoomName(displayName, rid);

	// wgb 2017-10-19 09:24:50
	const update = RocketChat.models.Rooms.setNameById(rid, slugifiedRoomName, room.fname) && RocketChat.models.Subscriptions.updateNameAndAlertByRoomId(rid, slugifiedRoomName, room.fname);

	if (update && sendMessage) {
		RocketChat.models.Messages.createRoomRenamedWithRoomIdRoomNameAndUser(rid, displayName, user);
	}
	return displayName;
};

// wgb 2017-10-17 16:51:55 fname
RocketChat.saveRoomFname = function(rid, roomFname, user, sendMessage = true) {
	if (!Match.test(rid, String)) {
		throw new Meteor.Error('invalid-room', 'Invalid room', {
			'function': 'RocketChat.saveRoomFname'
		});
	}
	roomFname = s.escapeHTML(roomFname);
	const roomName = roomFname;
	const update = RocketChat.models.Rooms.setFnameById(rid, roomFname);
	//const mess = user.name + '(' + user.username + ')' + ' 将房间名称修改为：' + roomFname;
	if (update && sendMessage) {
		//RocketChat.models.Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser('Room_name_changed', rid, roomName, user);
		RocketChat.models.Messages.createRoomRenamedWithRoomIdRoomNameAndUser(rid, roomName, user);
	}
	return update;
};
