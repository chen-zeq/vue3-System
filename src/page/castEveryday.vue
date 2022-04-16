<template>
  <a-button class="editable-add-btn" @click="handleAdd" style="margin-bottom: 8px">Add</a-button>
  <a-table bordered :data-source="dataSource" :columns="columns">
    <template #name="{ text, record }">
      <div class="editable-cell">
        <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
          <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
          <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ text || ' ' }}
          <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
        </div>
      </div>
    </template>
    <template #operation="{ record }">
      <a-button type="primary" @click="showModal(record)">编辑</a-button>
    </template>
  </a-table>
  <!-- 对话框 -->
  <a-modal
    v-model:visible="visible"
    title="Basic Modal"
    @ok="handleOk"
    :body-style="bodyStyle"
    width="50%"
  >
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item name="date-picker" label="时间" v-bind="config">
        <a-date-picker v-model:value="formState.datePicker" value-format="YYYY-MM-DD" />
      </a-form-item>
      <a-form-item label="早餐">
        <a-input v-model:value="formState.breakfast" />
      </a-form-item>
      <a-form-item label="午餐">
        <a-input v-model:value="formState.lunch" />
      </a-form-item>
      <a-form-item label="晚餐">
        <a-input v-model:value="formState.dinner" />
      </a-form-item>
      <!-- <a-form-item label="Activity type">
      <a-checkbox-group v-model:value="formState.type">
        <a-checkbox value="1" name="type">Online</a-checkbox>
        <a-checkbox value="2" name="type">Promotion</a-checkbox>
        <a-checkbox value="3" name="type">Offline</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="Resources">
      <a-radio-group v-model:value="formState.resource">
        <a-radio value="1">Sponsor</a-radio>
        <a-radio value="2">Venue</a-radio>
      </a-radio-group>
      </a-form-item>-->
      <a-form-item label="其他消费">
        <a-input v-model:value="formState.desc" type="textarea" />
      </a-form-item>
      <!-- <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px">Cancel</a-button>
      </a-form-item>-->
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, Ref, ref, UnwrapRef, toRaw } from 'vue';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}
// 表单
interface FormState {
  datePicker: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}
export default defineComponent({
  components: {
    CheckOutlined,
    EditOutlined,
  },
  setup() {

    // 表格
    const columns = [
      {
        title: '时间',
        dataIndex: 'name',
        slots: { customRender: 'name' },
      },
      {
        title: '早餐',
        dataIndex: 'age',
      },
      {
        title: '午餐',
        dataIndex: 'lunch',
      },
      {
        title: '晚餐',
        dataIndex: 'dinner',
      },
      {
        title: '其他消费',
        dataIndex: 'address',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
      },
    ];

    const dataSource: Ref<DataItem[]> = ref([
      {
        key: '0',
        name: 'Edward King 0',
        age: 32,
        address: 'London, Park Lane no. 0',
      },
      {
        key: '1',
        name: 'Edward King 1',
        age: 32,
        address: 'London, Park Lane no. 1',
      },
    ]);
    const count = computed(() => dataSource.value.length + 1);
    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

    const edit = (key: string) => {
      editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
    };
    const save = (key: string) => {
      Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
      delete editableData[key];
    };

    const onDelete = (key: string) => {
      dataSource.value = dataSource.value.filter(item => item.key !== key);
    };
    const handleAdd = () => {
      const newData = {
        key: `${count.value}`,
        name: `Edward King ${count.value}`,
        age: 32,
        address: `London, Park Lane no. ${count.value}`,
      };
      dataSource.value.push(newData);
    };
    // 对话框
    const visible = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };
    const bodyStyle = {
      height: '400px'
    }
    // 表单
    const formState: UnwrapRef<FormState> = reactive({
      datePicker: '',
      breakfast: '',
      lunch: '',
      dinner: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    });
const onSubmit = () => {
  console.log('submit!', toRaw(formState));
};
// 时间控件
const config = {
  rules: [{ type: 'string' as const, required: true, message: 'Please select time!' }],
};
return {
  columns,
  onDelete,
  handleAdd,
  dataSource,
  editableData,
  count,
  edit,
  save,
  visible,
  showModal,
  handleOk,
  labelCol: { style: { width: '150px' } },
  wrapperCol: { span: 14 },
  formState,
  onSubmit,
  bodyStyle,
  config
};
  },
});
</script>
<style lang="less" scoped>
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
// 对话框
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
.ant-form {
  padding-top: 0px !important ;
}
</style>
