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
