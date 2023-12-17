export interface Station {
  name: string;
  usgsId: string;
  lat: number;
  lon: number;
  values: ReportedValues;
}

export interface ReportedValues {
  flow: DataFrame;
}

export interface DataFrame {
  timestamp: string;
  value: number;
}
