export type InstanceInputProps = {
  form: any;
};
export type InstanceTableProps = {
  form: any;
  type: string;
  domainCode: string;
};
export type AddInstanceProps = {
  isAddInstance: boolean;
  setIsAddInstance: (isAddInstance: boolean) => void;
  itemtData?: object;
  form: any;
  updateList: () => void;
};

export type AddOwnerProps = {
  isAddOwner: boolean;
  setIsAddInOwner: (isAddOwner: boolean) => void;
};

export type ApplyOwnerProps = {
  isApplyOwner: boolean;
  setIsApplyOwner: (isApplyOwner: boolean) => void;
};
