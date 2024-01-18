import { BaseEntity } from "../Common/BaseEntity";

export interface VisitorModel extends BaseEntity {
  id: string;
  ipAddress: string;
  countryName: string;
  countryCode: string;
  regionName: string;
  longitude: number;
  latitude: number;
  continent: string;
  onContent: string;
  isProxy: string;
  createAt: Date;
}
