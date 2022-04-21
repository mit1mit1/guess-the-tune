export * from "src/utils/score";
export * from "src/utils/game";
export * from "src/utils/tonejs";

// export const intToDuration = (countOf16s: number) => {
//   switch (countOf16s) {
//     case 1:
//       return "16n";
//     case 2:
//       return "8n";
//     case 4:
//       return "4n";
//     case 8:
//       return "2n";
//     default:
//       return "1n";
//   }
// };

// export const intToDurationObject = (countOf16s: number) => {
//   return {
//     "16n": countOf16s,
//   };
// };

// export const getDivisionSymbol = (duration: BaseDuration) => {
//   switch (duration) {
//     case "16n":
//       return "/16";
//     case "8n":
//       return "/8";
//     case "8n.":
//       return "/8.";
//     case "4n":
//       return "/q";
//     case "4n.":
//       return "/q.";
//     case "2n":
//       return "/h";
//     case "2n.":
//       return "/h.";
//     case "1n":
//       return "/w";
//     case "1n.":
//       return "/w.";
//   }
// };
