export interface Station {
  name: string;
  usgsId: string;
  lat: string;
  lon: string;
}

export interface StationWithRange extends Station {
  values: ReportedValues;
}

export interface LakeStation extends Station {
  gageHt?: number;
}
export interface StreamStation extends LakeStation {
  flowRate?: number;
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

export interface BulkStationQueryInput {
  zip: string;
}

export interface BulkStationQueryResult {
  streams: StreamStation[];
  lakes: LakeStation[];
}
