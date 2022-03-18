export interface Item {
  id: number;
  label: string;
  description: string;
  displayOrder: number;
  unitPriceFractional: number;
  currency: string;
  imageUrl: string;
  itemStock: {
    quantityLeft: number;
  };
}

export interface SubSection {
  id: number;
  label: string;
  description: string;
  displayOrder: number;
  disabled: boolean;
  disabledReason: null | string;
  items: Item[];
}

export interface Section {
  id: number;
  label: string;
  description: string;
  displayOrder: number;
  disabled: boolean;
  disabledReason: null | string;
  items: Item[];
  subSections: SubSection[];
}

export interface SectionData {
  id: string;
  label: string;
  description: string;
  displayOrder: number;
  disabled: boolean;
  disabledReason: null | string;
  items: Item[];
}
