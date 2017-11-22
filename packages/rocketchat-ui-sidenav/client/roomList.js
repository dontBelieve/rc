Template.roomList.helpers({
	rooms() {
		if (this.identifier === 'unread') {
			const query = {
				alert: true,
				open: true,
				hideUnreadStatus: { $ne: true }
			};
			return ChatSubscription.find(query, { sort: { 't': 1, 'name': 1 }});
		}

		if (this.anonymous) {
			return RocketChat.models.Rooms.find({t: 'c'}, { sort: { name: 1 } });
		}


		const favoritesEnabled = RocketChat.settings.get('Favorite_Rooms');

		const query = {
			open: true
		};
		const sort = { 't': 1, 'name': 1 };
		if (this.identifier === 'f') {
			query.f = favoritesEnabled;
		} else {
			let types = [this.identifier];
			if (this.identifier === 'activity') {
				types = ['c', 'p', 'd'];
			}
			if (this.identifier === 'channels' || this.identifier === 'unread') {
				types = [ 'c', 'p'];
			}
			const user = Meteor.user();
			if (user && user.settings && user.settings.preferences && user.settings.preferences.roomsListExhibitionMode === 'unread') {
				query.$or = [
					{ alert: { $ne: true } },
					{ hideUnreadStatus: true }
				];
			}
			query.t = { $in: types };
			query.f = { $ne: favoritesEnabled };
		}
		if (this.identifier === 'activity') {
			const list = ChatSubscription.find(query).fetch().map(sub => {
				const lm = RocketChat.models.Rooms.findOne(sub.rid, { fields: { _updatedAt: 1 }})._updatedAt;
				return {
					lm: lm && lm.toISOString(),
					...sub
				};
			});
			return _.sortBy(list, 'lm').reverse();
		}
		return ChatSubscription.find(query, { sort });
	},

	isLivechat() {
		return this.identifier === 'l';
	},

	shouldAppear(group, rooms) {
		/*
		if is a normal group ('channel' 'private' 'direct')
		or is favorite and has one room
		or is unread and has one room
		*/

		return !['unread', 'f'].includes(group.identifier) || rooms.count();
	},

	roomType(room) {
		if (room.header || room.identifier) {
			return `type-${ room.header || room.identifier }`;
		}
	},

	/*wgb 2017-11-10 14:58:56 start*/
	roomType_favorite(room) {
		if (room.header || room.identifier) {
			var roomType_favorite = `type-${ room.header || room.identifier }`;
			if(roomType_favorite === 'type-favorite') {
				return true;
			} else {
				return false;
			}
		}
	},
	roomType_c(room) {
		if (room.header || room.identifier) {
			var roomType_c = `type-${ room.header || room.identifier }`;
			if(roomType_c == 'type-c') {
				return true;
			} else {
				return false;
			}
		}
	},
	roomType_p(room) {
		if (room.header || room.identifier) {
			var roomType_p = `type-${ room.header || room.identifier }`;
			if(roomType_p == 'type-p') {
				return true;
			} else {
				return false;
			}
		}
	},
	roomType_d(room) {
		if (room.header || room.identifier) {
			var roomType_d = `type-${ room.header || room.identifier }`;
			if(roomType_d == 'type-d') {
				return true;
			} else {
				return false;
			}
		}
	}
	/*wgb 2017-11-10 15:00:36 end*/
});

// Template.roomList.onRendered(function() {
// 	$(this.firstNode.parentElement).perfectScrollbar();
// });

Template.roomList.events({
	'click .more'(e, t) {
		if (t.data.identifier === 'p') {
			SideNav.setFlex('listPrivateGroupsFlex');
		} else if (t.data.isCombined) {
			SideNav.setFlex('listCombinedFlex');
		} else {
			SideNav.setFlex('listChannelsFlex');
		}

		return SideNav.openFlex();
	}
});
