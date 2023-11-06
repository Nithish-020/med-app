<template>
  <div>
    <!-- <menubar /> -->

    <!--* DropDown -->
    <BillDrop @billdrop="send" :trash="preSave"/>
    <!-- {{ preSave }} -->

    <!--* buttons and values -->
    <preSave :Arr="preSave" @dummy="duplicate" @on="enable" />

    <!--* Dummi Table For billing Stock -->
    <billerTable :dummy="preSave" />

    <!--* Preview Card  -->
    <BillerDialog :preview="preSave" :dialog="dialog" @off="disable" />


    

  </div>
</template>

<script>
// import menubar from "../components/Menubar.vue";
import BillDrop from "../components/BillerDrop.vue";
import preSave from "../components/PreSave.vue";
import billerTable from "../components/billerTable.vue";
import BillerDialog from "../components/BillerDialog.vue";
// import Papa from "papaparse";


export default {
  name: "billEntry",

  data() {
    return {
      preSave: [],
      dialog: false
    };
  },
  methods: {

    send(a) {
      this.preSave = a;
    },
    duplicate(b) {
      this.preSave = b;
    },
    enable(e) {
      this.dialog = e;
    },
    disable(d) {
      this.dialog = d;
    }

    // downloadCsv() {
    //   const csv = Papa.unparse(this.billmaster);
    //   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    //   const url = URL.createObjectURL(blob);
    //   const link = document.createElement("a");
    //   link.setAttribute("href", url);
    //   link.setAttribute("download", "data.csv");
    //   link.style.visibility = "hidden";
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // },
  },
  components: {
    // menubar,
    BillDrop,
    preSave,
    billerTable,
    BillerDialog
  },
};
</script>
