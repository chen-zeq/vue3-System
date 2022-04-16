<template>
  <a-layout style="width: 100%; height: 100%">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" >
        支出管理
      </div>
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        @click="handleClick"
        :inline-collapsed="collapsed"
      >
        <template v-for="item in list" :key="item.key">
          <template v-if="!item.children">
            <a-menu-item :key="item.key">
              <template #icon>
                <PieChartOutlined />
              </template>
              {{ item.title }}
            </a-menu-item>
          </template>
          <template v-else>
            <sub-menu :key="item.key" :menu-info="item" />
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="head">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <a-avatar :size="50" src="./src/assets/avatar.jpg"> </a-avatar>
        </div>
      </a-layout-header>
      <!-- <div>
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, paths }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="`${basePath}/${paths.join('/')}`">
          {{ route.breadcrumbName }}
        </router-link>
      </template>
    </a-breadcrumb>
    <br />
    {{ $route.path }}
  </div> -->
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import type { MenuProps } from "ant-design-vue";
import { defineComponent, ref } from "vue";
const SubMenu = {
  name: "SubMenu",
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  template: `
    <a-sub-menu :key="menuInfo.key">
      <template #icon><MailOutlined /></template>
      <template #title>{{ menuInfo.title }}</template>
      <template v-for="item in menuInfo.children" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <template #icon>
              <PieChartOutlined />
            </template>
            {{ item.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.key" />
        </template>
      </template>
    </a-sub-menu>
  `,
  components: {
    PieChartOutlined,
    MailOutlined,
  },
};
const list = [
  {
    key: "/index",
    title: "首页",
  },
  {
    key: "/cast",
    title: "每天花费",
  },
   {
    key: "/statistics",
    title: "数据统计",
  },
];
interface Route {
  path: string;
  breadcrumbName: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    "sub-menu": SubMenu,
    PieChartOutlined,
  },
  setup() {
    const routes = ref<Route[]>([
      {
        path: "index",
        breadcrumbName: "home",
      },
      {
        path: "first",
        breadcrumbName: "first",
        children: [
          {
            path: "/general",
            breadcrumbName: "General",
          },
          {
            path: "/layout",
            breadcrumbName: "Layout",
          },
          {
            path: "/navigation",
            breadcrumbName: "Navigation",
          },
        ],
      },
      {
        path: "second",
        breadcrumbName: "second",
      },
    ]);
    const router = useRouter();
    const handleClick: MenuProps["onClick"] = (e) => {
      router.push(e.key);
    };

    const collapsed = ref<boolean>(false);

    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value;
    };
    return {
      basePath: "/page/index",
      routes,
      handleClick,
      list,
      selectedKeys: ref<string[]>(["1"]),
      collapsed,
      toggleCollapsed,
      openKeys: ref(["2"]),
    };
  },
});
</script>
<style scoped>
.head {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

 .logo {
  height: 32px;
  line-height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
  color: #fff;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
