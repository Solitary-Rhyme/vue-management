<template>
  <div class="manage">

    <!-- 新增按钮的弹出框 -->
    <!-- visible组件操控是否可见
    before-close：窗口关闭前调用函数 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      >

      <!-- 弹出框内部表单 -->
      <!-- rules配置表单输入框规则
      inline设置输入框不独占一行 -->
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>

      <!-- 弹出框确认取消选项 -->
      <!-- 确定时调用submit方法
      取消时调用handleClose方法 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 用户页面头部 -->
    <div class="manage-header">

      <!-- 新增按钮，点击调用handleAdd方法 -->
      <el-button @click="handleAdd" type="primary"> + 新增 </el-button>

      <!-- 搜索框 -->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 用户列表 -->
    <div class="common-table">
      <el-table stripe :data="tableData" style="width: 100%" height="90%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.sex === 1 ? "男" : "女"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出身日期"> </el-table-column>

        <!-- 作用域插槽，获取当前行的数据 -->
        <el-table-column prop="addr" label="地址">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>

      </el-table>

      <!-- 翻页页码部分 -->
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from "../api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入性别" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      modelType: 0,
      total: 0,
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm:{
        name:''
      }
    };
  },
  methods: {
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //后续对表单数据的处理
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.getList();
            });
          }

          // console.log(this.form,'form')
          this.$refs.form.resetFields();
          this.dialogVisible = false;
        }
      });
    },
    handleEdit(row) {
      this.modelType = 1;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleAdd() {
      this.modelType = 0;
      this.dialogVisible = true;
    },
    getList() {
      //获取的列表数据
      getUser({ params: {...this.userForm, ...this.pageData} }).then(({ data }) => {
        console.log(data);
        this.tableData = data.list;
        this.total = data.count || 0;
      });
    },
    handlePage(val) {
      this.pageData.page = val;
      this.getList();
    },
    onSubmit(){
      this.getList();
    }
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table{
    position: relative;
    height: calc(100% - 62px);
    .pager{
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>