<template>
  <div class="wrapper" ref="wrapperRef" @scroll="sroll" @load="wrapperLoaded">
    <div class="background" :style="{ height: `${totalHeight}px` }"></div>
    <div class="list" ref="listRef">
      <div class="line" v-for="(city, index) in list" :key="index">
        <!-- <img class="image" :src="city.image" alt srcset @load="imgOnload(city)" /> -->
        <div class="item lt">{{ city.spell }}</div>
        <div class="item gt">{{ city.name }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
export default defineComponent({
  setup() {
    const listRef: any = ref({});
    const wrapperRef: any = ref({});
    const list = reactive([
      {
        spell: "BEIJING",
        name: "北京",
        image: "https://img.maidiyun.com/prod/yb/210426000892/1552116_0x0.jpg",
        imgLoaded: false,
      },
      {
        spell: "SHANGHAI",
        name: "上海",
        image: "http://photo.16pic.com/00/26/55/16pic_2655796_b.jpg",
        imgLoaded: false,
      },
      {
        spell: "GUANGZHOU",
        name: "广州",
        image: "http://photo.16pic.com/00/44/86/16pic_4486795_b.jpg",
        imgLoaded: false,
      },
      {
        spell: "SHENZHEN",
        name: "深圳",
        image: "http://photo.16pic.com/00/44/86/16pic_4486795_b.jpg",
        imgLoaded: false,
      },
      {
        spell: "HANGZHOU",
        name: "杭州",
        image: "http://photo.16pic.com/00/26/55/16pic_2655796_b.jpg",
        imgLoaded: false,
      },
      {
        spell: "TAINJING",
        name: "天津",
        image: "http://s5.sinaimg.cn/bmiddle/46e5192861c8d462681d4",
        imgLoaded: false,
      },
      {
        spell: "WUHAN",
        name: "武汉",
        image: "http://inews.gtimg.com/newsapp_bt/0/13936708154/641",
        imgLoaded: false,
      },
      {
        spell: "CHENGDU",
        name: "成都",
        image: "http://inews.gtimg.com/newsapp_bt/0/13935108977/641",
        imgLoaded: false,
      },
      {
        spell: "ZHENGZHOU",
        name: "郑州",
        image:
          "//img.pconline.com.cn/images/upload/upc/tx/photoblog/1404/26/c5/33596317_33596317_1398517630015_mthumb.jpg",
        imgLoaded: false,
      },
      {
        spell: "QINGDAO",
        name: "青岛",
        image: "https://pic.ntimg.cn/20120730/8820441_171402261000_2.jpg",
        imgLoaded: false,
      },
      {
        spell: "JINAN",
        name: "济南",
        image:
          "http://img1.cache.netease.com/cnews/2009/8/25/200908250951595947a.jpg",
        imgLoaded: false,
      },
    ]);
    for (let i = 0; i < 100; i++) {
      list.concat(list);
    }
    onMounted(() => {
      console.log("onMounted", listRef.value.offsetHeight);
      setTimeout(() => {
        list.unshift({
          spell: "HEFEI",
          name: "合肥",
          image:
            "http://img-arch.pconline.com.cn/images/upload/upc/tx/photoblog/1309/25/c49/26316176_26316176_1380092693834_mthumb.jpg",
          imgLoaded: false,
        });
      }, 3000);
    });
    return {
      listRef,
      wrapperRef,
      totalHeight: 2000,
      list,
      imgOnload(city: any) {
        city.imgLoaded = true;
        console.log(listRef.value.offsetHeight);
        const isAllImgLoaded = list.every((c) => c.imgLoaded);
        console.log(isAllImgLoaded);
      },
      wrapperLoaded(city: any) {
        console.log("wrapperRef.onload");
      },
      sroll(event: any) {
        // console.log(event);
        // console.log(event.target.scrollTop);
      },
    };
  },
});
</script>
<style lang="less" scoped>
.wrapper {
  position: absolute;
  top: 70px;
  right: 30px;
  height: 500px;
  left: 30px;
  overflow: scroll;
  border: 1px solid #e8e8e8;
  .background {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
  }
  .list {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .line {
  }
}
</style>
