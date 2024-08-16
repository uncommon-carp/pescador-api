export interface Station {
  name: string;
  id: string;
  lat: number;
  lon: number;
  values: ReportedValues;
}

export interface ReportedValues {
  flow?: DataFrame[];
  gageHt?: DataFrame[];
}

export interface DataFrame {
  timestamp: string;
  value: number;
}

export interface StationQueryInput {
  site: string;
  range: number;
}
