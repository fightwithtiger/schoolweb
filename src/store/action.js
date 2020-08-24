
export default {
	saveStaffNum(context, number) {
		context.commit('saveStaffNum', number);
	},
	saveUsername(context, username) {
		context.commit('saveUsername', username);
	},
	saveAvatar(context, avatar) {
		context.commit('saveAvatar', avatar);
	},
	addNewMsgNum(context, num){
		context.commit('addNewMsgNum', num);
	}
}
