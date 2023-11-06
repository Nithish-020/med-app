<template>
  <div>
    <v-btn @click="downloadCSV">Download CSV</v-btn>
    {{ structuredData }}
  </div>
</template>

<script>
import Papa from "papaparse";

export default {
  data() {
    return {
      structuredData: [

      ],
    };
  },
  methods: {
    downloadCSV() {
      const csv = Papa.unparse(this.structuredData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>
