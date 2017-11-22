RocketChat.TabBar.addButton({
	groups: ['channel', 'group', 'direct'],
	id: 'message-search',
	i18nTitle: 'Search',
	icon: 'magnifier',
	template: 'messageSearch',
	order: 1
});

RocketChat.TabBar.addButton({
	groups: ['direct'],
	id: 'user-info',
	i18nTitle: 'User_Info',
	icon: 'user',
	template: 'membersList',
	order: 2
});

RocketChat.TabBar.addButton({
	groups: ['channel', 'group'],
	id: 'members-list',
	i18nTitle: 'Members_List',
	icon: 'team',
	template: 'membersList',
	order: 2
});

RocketChat.TabBar.addButton({
	groups: ['channel', 'group', 'direct'],
	id: 'uploaded-files-list',
	i18nTitle: 'Room_uploaded_file_list',
	icon: 'clip',
	template: 'uploadedFilesList',
	order: 3
});

RocketChat.TabBar.addButton({
	groups: ['channel', 'privategroup', 'directmessage'],
	id: 'keyboard-shortcut-list',
	i18nTitle: 'Keyboard_Shortcuts_Title',
	icon: 'keyboard',
	template: 'keyboardShortcuts',
	order: 4
});

/**LZD 2017-11-21 添加报销按钮*/
RocketChat.TabBar.addButton({
	groups: ['channel', 'group', 'direct', 'privategroup', 'directmessage'],
	id: 'reimbursement',
	i18nTitle: '报销',
	icon: 'hubot',
	template: 'keyboardShortcuts',
	order: 100
});

/**LZD 2017-11-21 添加请假按钮*/
RocketChat.TabBar.addButton({
	groups: ['channel', 'group', 'direct', 'privategroup', 'directmessage'],
	id: 'leavevocation',
	i18nTitle: '请假',
	icon: 'plus',
	template: 'keyboardShortcuts',
	order: 101
});