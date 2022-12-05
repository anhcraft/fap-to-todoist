<template>
  <div class="ma-10">
    <h3 class="text-h3">FPT FAP to Todoist</h3>
    <div class="bg-grey-lighten-2 py-5 px-10 my-5">
      <b>Hưỡng dẫn sử dụng</b>
      <ul>
        <li>Sao chép mã bên dưới</li>
        <li>Vào trang FAP và mở Devtools (F12)</li>
        <li>Dán mã, nhấn enter, chờ xử lý</li>
        <li>Sao chép và dán kết quả vào đây</li>
      </ul>
    </div>
    <pre class="overflow-y-auto text-wrap my-5">
      const mondayText=document.querySelector("#aspnetForm > table > tbody > tr:nth-child(1) > td > div > table > thead > tr:nth-child(2) > th:nth-child(1)").innerText.split("/"),monday=new Date;monday.setDate(parseInt(mondayText[0])),monday.setMonth(parseInt(mondayText[1])-1);const table=document.querySelector("#aspnetForm > table > tbody > tr:nth-child(1) > td > div > table > tbody").children,data=[];for(let o=0;o&lt;table.length;o++){const b=table[o].children;for(let r=0;r&lt;b.length;r++)if(0!=b[r].children.length){let t=new Date(monday);t.setDate(t.getDate()+r-1);let e=b[r].querySelector("p span.label").innerText.substring(1).split("-")[0].split(":");t.setHours(parseInt(e[0])),t.setMinutes(parseInt(e[1])-10),t.setSeconds(0);let n=b[r].querySelector("p a:nth-child(1)").innerText.slice(0,-1),l=b[r].querySelector("p").innerText;l=l.substring(l.indexOf("at ")+3).match(/^((Sân trường [0-9])|\S+)( |\n)/giu);let a=null!==b[r].querySelector(".online-indicator");data.push({slot:o+1,subject:n,date:t.toString(),place:l,online:a})}}console.log(JSON.stringify(data));
    </pre>
    <v-textarea label="Dán kết quả" v-model="data"></v-textarea>
    <v-text-field clearable label="Nhập API Todoist" v-model="api"></v-text-field>
    <div class="bg-grey-lighten-2 py-5 px-10">
      <b>Hưỡng dẫn sử dụng</b>
      <ul>
        <li>Để chắc chắn, vui lòng kiểm tra lại thông tin bên dưới</li>
        <li>Nếu đúng, hãy nhấn nút bắt đầu</li>
      </ul>
    </div>
    <div>
      <v-list lines="two">
        <v-list-item
            v-for="item in dataObject"
            :key="item.subject"
            :title="'Slot ' + item.slot + ' | ' + item.subject + ' | at ' + item.place"
            :subtitle="new Date(item.date).toLocaleString('vi-VN') + ' | ' + (item.online ? 'Online' : 'Offline')"
        ></v-list-item>
      </v-list>
    </div>
    <v-btn class="mt-10" @click="sync">Bắt đầu tạo task</v-btn>
  </div>
</template>

<script>
import {TodoistApi} from "@doist/todoist-api-typescript";

export default {
  name: 'App',
  data(){
    return {
      data: "",
      api: ""
    }
  },
  computed: {
    dataObject(){
      return JSON.parse(this.data)
    }
  },
  methods: {
    sync() {
      const api = new TodoistApi(this.api)

      this.dataObject.forEach(v => {
        api.addTask({
          content: "[FPT] " + v.subject + " | Slot " + v.slot,
          description: "Place: " + v.place + " | " + (v.online ? 'Online' : 'Offline'),
          labels: ["fpt"],
          priority: 4,
          due_datetime: new Date(v.date).toISOString()
        }).catch((error) => console.log(error))
      })
    }
  }
}
</script>
