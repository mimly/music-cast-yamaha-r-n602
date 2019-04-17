const controller = require('./controllers/controller');
const Vue = require('vue');


(async function () {

    // await controller.powerON();
    // await controller.ls();
    // await controller.pause();
    // if (await controller.powerON()) {
    //     await controller.changeInput('server');
    //     await controller.changeRoot();
    // }

    // await controller.cd(6);
    // await controller.pwd();
    // await controller.ls();

    // controller.powerOFF();

})();

Vue.component('search', {

    props: ["phrase"],

    template: '<div><input type="text" v-model:phrase="searchPhrase" v-on:keypress="onEnter" placeholder="Music is the key..."></div>',

    data: function () {
        return {
            searchPhrase: ""
        }
    },

    methods: {
        onEnter: function (event) {
            alert("Search phrase is: " + this.searchPhrase);
            if(event.which === 13) {
                alert("Search phrase is: " + this.searchPhrase);
            }
        }
    }

});

Vue.component('list', {

    template: `
         <div>
             <list-entry v-for="file in files" v-bind:file="file" v-bind:key="file.text"></list-entry>
         </div>
    `,

    data: function () {
       return {
           files: [
               {text: "/home/dir/", attribute: "2"},
               {text: "/home/file", attribute: "1"},
               {text: "/home/dir2/", attribute: "2"}
           ]
       };
    }

});

Vue.component('list-entry', {

    props: ["file"],

    template: '<div>{{ file.text }}</div>'

});


const app = new Vue({

    el: '#main',

});