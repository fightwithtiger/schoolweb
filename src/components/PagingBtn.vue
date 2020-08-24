<template>
	<div class="m-paging-btn">
		<el-pagination :current-page="page" @current-change="changePage" background layout="prev, pager, next" :total="count" :page-size="limit">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'PagingBtn',
		props: ['count', 'limit', 'page'],
		data() {
			return {
				action: ''
			}
		},
		methods: {
			changePage(currentPage) {
				const newPage = currentPage;
				this.$emit('newList', newPage);
			}
		}
	}
</script>

<style lang="scss">
	.m-paging-btn {
		// background-color: red;
	}
</style>
