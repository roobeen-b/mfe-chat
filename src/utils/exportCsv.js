// import { mkConfig, generateCsv, download, CsvOutput } from "export-to-csv";
// import { SnackBar } from ".";

// const options = {
//   useBom: true,
//   showTitle: false,
//   title: "SKYSLAES",
//   columnHeaders: [],
//   useTextFile: false,
//   fieldSeparator: ",",
//   useKeysAsHeaders: false,
//   decimalSeparator: "locale",
//   // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
// };

// const generateCSV = (
//   arr: Array<any>,
//   name: string,
//   columnHeaders: Array<string | { key: string; displayLabel: string }>
// ): CsvOutput => {
//   const filename = `SkySales-${name}-${Date.now()}`;
//   const csvConfig = mkConfig({ ...options, columnHeaders, filename });
//   return generateCsv(csvConfig)(arr);
// };

// const exportCsv = (
//   arr: Array<any>,
//   name: string,
//   columnHeaders: Array<string | { key: string; displayLabel: string }>
// ) => {
//   // let csvContent =
//   //   "data:text/csv;charset=utf-8," + arr.map((e) => e.join(",")).join("\n");
//   // let encodedUri = encodeURI(csvContent);
//   // let link = document.createElement("a");
//   // document.body.appendChild(link);
//   // link.href = encodedUri;
//   // link.download = `SkySales-${name}-${Date.now()}.csv`;
//   // // link.target = "_blank";
//   // link.click();
//   // document.body.removeChild(link);
//   try {
//     const filename = `SkySales-${name}-${Date.now()}`;
//     const csvConfig = mkConfig({ ...options, columnHeaders, filename });
//     const csv = generateCsv(csvConfig)(arr);
//     return download(csvConfig)(csv);
//   } catch (error) {
//     console.error({ exportCsvError: error });
//     SnackBar({ message: "default_error_message" }, "error");
//     return [];
//   }
// };

// export { generateCSV, exportCsv };
