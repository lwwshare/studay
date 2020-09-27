<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created () {
    function listToTree () {
      let map = {},
      res = [];
      arr.forEach(element => {
        element.children = [];
        map[element.id] = element;
      });
      arr.forEach(element => {
        let pid = element.pid;
        if (pid in map) {
          map[pid].children.push(element);
        } else {
          res.push(element);
        }
      })
      console.log(res);
    };
    let arr = [
      {id: 1, pid: null},
      {id: 2, pid: 1},
      {id: 3, pid: 2},
      {id: 4, pid: 4},
      {id: 5, pid: 5},
    ];
    listToTree(arr);
  }
}
</script>
