export type MappedFields = {
  ourField: string;
  yourField: string[];
  defaultValue: any;
  dataType: string;
  index?: number | null;
  activeField?: string | null;
  transform: Transform[];
};

export type Transform = {
  stepNum: number;
  field: string;
  operation: string;
  args: any[];
  output:null
};

export type Operation = {
  name: string;
  args: number;
};
