import { MappedFields, Row, Transform } from "../drop-down-mapper.type";

export const transformOperation = (
  field: string,
  args: string[],
  operation: string
) => {
  switch (operation) {
    case 'concat':
      return concat(field, args);
      break;
    case 'multiply':
      return multiply(field, args);
      break;
    case 'divide':
      return divide(field, args);
      break;
    case 'add':
      return add(field, args);
      break;
    case 'format':
      return format(field, args);
      break;
    case 'substring':
      return substring(field, args);
      break;
    default:
      break;
  }
  return 'Error occured';
};

const concat = (field: string, args: string[]) => {
  return field + args[0];
};

const multiply = (field: string, args: string[]) => {
  try {
    return parseFloat(field) * parseFloat(args[0]);
  } catch (ex) {
    return 'Error occured';
  }
};

const divide = (field: string, args: string[]) => {
  try {
    return parseFloat(field) / parseFloat(args[0]);
  } catch (ex) {
    return 'Error occured';
  }
};

const add = (field: string, args: string[]) => {
  try {
    return parseFloat(field) + parseFloat(args[0]);
  } catch (ex) {
    return 'Error occured';
  }
};

const format = (field: string, args: string[]) => {
  try {
    let date = new Date(field);
    //"en-US"
    return date.toLocaleDateString(args[0]);
  } catch (ex) {
    return 'Error occured';
  }
};

const substring = (field: string, args: string[]) => {
  try {
    return field.substring(parseInt(args[0]), parseInt(args[1]));
  } catch (ex) {
    return 'Error occured';
  }
};


// export const ProcessFile=(mappings:MappedFields[],rows:Row[],headerRow:string[])=>{
//   var output:Row[]=[]
//   rows.forEach((row,index)=>{
//     var r:Row={cells:[]}
//     mappings.forEach((val, i) => {
//     val.uploadedFields.forEach((field, index) => {
//       applyTranformationOnField(field);
//     });
//     r.cells.push({
//       field: val.fieldForMapping,
//       value: getPreviewData(headerRow,val.transform,val.combination,row),
//     });
//   });
//   output.push(r)
// })
// }

// const getPreviewData=(headerRow:string[],transform:Transform[],combination:string[],row:Row)=>{
//   let output = '';
//   combination.forEach((c) => {
//     let t = transform
//       .filter((a) => a.field == c)
//       .sort((a, b) => b.stepNum - a.stepNum);
//     if (t.length > 0) output += t[0].output;
//     else {
//       let i = headerRow.findIndex((a) => a == c.trim());
//       if (i != -1) output += row.cells[i].value;
//     }
//     console.log(output);
//   });
//   return output;
// }

// applyTranformationOnField(field: string) {
//   let previousOutput: any =
//     this.previewRow[this.headerRow.findIndex((a) => a == field)];
//   for (var i = 0; i < this.transform.length; i++) {
//     if (this.transform[i].field != field) continue;
//     let newArgsList = this.transform[i].args.map((val, key) => {
//       let i = this.headerRow.findIndex((a) => a == val.trim());
//       if (i == -1) return val;
//       else return this.previewRow[i];
//     });
//     previousOutput = transformOperation(
//       previousOutput,
//       newArgsList,
//       this.transform[i].operation
//     );
//     this.transform[i].output = previousOutput;
//   }

//   return previousOutput;
// }