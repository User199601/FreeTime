<template>
  <el-card>
    <el-form v-bind="form">
      <div class="flex-start">
        <el-form-item label="考勤时间：" prop="onWorkTime">
          <el-time-select v-model="form.model.onWorkTime" :picker-options="{ start: '00:00', step: '00:30', end: '23:59', maxTime: form.model.offWorkTime }" placeholder="上班时间"> </el-time-select>
        </el-form-item>
        <el-form-item label-width="10px" prop="offWorkTime">
          <el-time-select v-model="form.model.offWorkTime" :picker-options="{ start: '00:00', step: '00:30', end: '23:59', minTime: form.model.onWorkTime }" placeholder="下班时间"> </el-time-select>
        </el-form-item>
      </div>

      <el-form-item label="点餐提醒：" prop="orderWarnTime">
        <el-time-select v-model="form.model.orderWarnTime" :picker-options="{ start: '00:00', step: '00:05', end: '23:59' }" placeholder="提醒时间"> </el-time-select>
      </el-form-item>

      <el-form-item label="发薪日：" prop="payOffDay">
        <div class="flex-start">
          每月
          <el-input-number v-model="form.model.payOffDay" :min="1" :max="31"></el-input-number>
          号
        </div>
      </el-form-item>
      <div class="tips">如果设置31号，遇到没有31号的月份，会取当月最后一天作为发薪日</div>

      <el-form-item label="工作制：" prop="workType">
        <el-radio-group v-model="form.model.workType">
          <el-radio :label="0">双休</el-radio>
          <el-radio :label="1" disabled>大小周</el-radio>
          <el-radio :label="2" disabled>单休</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="tips">大小周与单休功能正在开发中</div>
    </el-form>
  </el-card>
</template>

<script>
import { getConfig } from '../../background/utils'
/*  global chrome */
export default {
  data() {
    return {
      form: {
        ref: 'form',
        size: 'mini',
        labelWidth: '100px',
        model: {
          onWorkTime: '', //上班时间
          offWorkTime: '', //下班时间
          orderWarnTime: '', //提醒点餐时间
          workType: null, //工作制，0双休 1大小周 2单休
          payOffDay: null //发薪日
        },
        rules: {
          onWorkTime: [{ required: true, message: '请输入', trigger: 'none' }],
          offWorkTime: [{ required: true, message: '请输入', trigger: 'none' }],
          workType: [{ required: true, message: '请输入', trigger: 'none' }],
          payOffDay: [{ required: true, message: '请输入', trigger: 'none' }]
        }
      }
    }
  },
  created() {
    this.form.model = getConfig()
  },
  methods: {
    async save() {
      await this.$refs.form.validate()
      localStorage.setItem('goHomeConfig', JSON.stringify(this.form.model))
      this.$emit('updateConfig')
      if (chrome && chrome.runtime) {
        chrome.runtime.sendMessage('configChange')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 10px;
}
.el-date-editor.el-input {
  width: 120px;
}
.tips {
  font-size: 12px;
  color: #999;
  padding-left: 100px;
  margin-bottom: 10px;
}
</style>
