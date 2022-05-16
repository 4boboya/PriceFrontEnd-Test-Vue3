<template>
  <div class="success-content">
    <icon :icon="['far', 'check-circle']" class="fa-7x" />
    <h2>儲值成功</h2>
    <div class="all-field">
      <div>
        <div>儲值單號</div>
        <div>477460840874</div>
      </div>
      <div>
        <div>儲值點數</div>
        <div>10</div>
      </div>
      <div>
        <div>儲值金額</div>
        <div>$100</div>
      </div>
      <div>
        <div>儲值日期</div>
        <div>2022-05-16</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.success-content {
  padding-block: 20px;
  text-align: center;

  & > svg {
    color: var(--hint-success);
  }
}

.all-field {
    display: table;
    margin-inline: auto;

    & > div {
        display: table-row;
        div {
            display: table-cell;
            white-space: nowrap;
            padding-inline: 10px;
        }
        div:nth-child(2) {
          text-align: left;
        }
    }
}
</style>