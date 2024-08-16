export interface Station {
  name: string;
  usgsId: string;
  lat: number;
  lon: number;
  values: ReportedValues;
}

export interface ReportedValues {
  flow?: DataFrame[];
  gage?: DataFrame[];
}

export interface DataFrame {
  timestamp: string;
  value: number;
}

export interface StationQueryInput {
  id: string;
  range: number;
}
