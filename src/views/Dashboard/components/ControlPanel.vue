<template>
  <n-grid cols="1 500:2 1000:4" x-gap="20" y-gap="20">
    <n-gi>
      <n-card class="group cursor-pointer">
        <div flex justify-between color-light dark:color-dark>
          <n-icon
            :size="60"
            class="color-blue rounded-2 group-hover:color-inherit group-hover:bg-blue"
          >
            <icon-ion:people />
          </n-icon>
          <n-statistic>
            <template #label>
              <p text-right>新访问</p>
            </template>
            <n-number-animation show-separator :from="0" :to="123456" />
          </n-statistic>
        </div>
      </n-card>
    </n-gi>
    <n-gi>
      <n-card class="group cursor-pointer">
        <div flex justify-between color-light dark:color-dark>
          <n-icon
            :size="60"
            class="color-yellow rounded-2 group-hover:color-inherit group-hover:bg-yellow"
          >
            <icon-ph:clipboard-text-fill />
          </n-icon>
          <n-statistic>
            <template #label>
              <p text-right>订单数</p>
            </template>
            <n-number-animation show-separator :from="0" :to="1234" />
          </n-statistic>
        </div>
      </n-card>
    </n-gi>
    <n-gi>
      <n-card class="group cursor-pointer">
        <div flex justify-between color-light dark:color-dark>
          <n-icon
            :size="60"
            class="color-red rounded-2 group-hover:color-inherit group-hover:bg-red"
          >
            <icon-ant-design:money-collect-outlined />
          </n-icon>
          <n-statistic>
            <template #label>
              <p text-right>销售额</p>
            </template>
            <n-number-animation show-separator :from="0" :to="123456" />
          </n-statistic>
        </div>
      </n-card>
    </n-gi>
    <n-gi>
      <n-card class="group cursor-pointer">
        <div flex justify-between color-light dark:color-dark>
          <n-icon
            :size="60"
            class="color-green rounded-2 group-hover:color-inherit group-hover:bg-green"
          >
            <icon-ic:outline-add-shopping-cart />
          </n-icon>
          <n-statistic>
            <template #label>
              <p text-right>加购数</p>
            </template>
            <n-number-animation show-separator :from="0" :to="1234" />
          </n-statistic>
        </div>
      </n-card>
    </n-gi>
  </n-grid>
</template>
