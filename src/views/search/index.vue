<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search v-model.trim="search" @keyup.enter="getSearch(search)" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="getSearch(search)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title" v-if="history.length > 0">
        <span>最近搜索</span>
        <van-icon @click="clear" name="delete-o" size="16" />
      </div>
      <div class="list" v-if="history.length > 0">
        <div class="list-item" v-for="item in history" :key="item" @click="getSearch(item)">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      search: '',
      history: getHistoryList() // 从本地存储获取搜索历史
    }
  },
  methods: {
    getSearch (key) {
      // 判断搜索历史中是否存在本次搜索记录
      const index = this.history.indexOf(key)
      if (index !== -1) {
        this.history.splice(index, 1) // 存在则删除
      }
      this.history.unshift(key) // 将搜索记录添加到搜索历史中
      this.search = ''
      setHistoryList(this.history) // 将搜索历史添加到本地存储

      // 跳转到搜索列表页
      this.$router.push(`/searchlist?search=${key}`)
    },
    // 清空搜索历史
    clear () {
      this.history = []
      setHistoryList([])
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
