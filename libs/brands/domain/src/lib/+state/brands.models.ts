/**
 * Interface for the 'Brands' data
 */
export interface BrandEntity {
  Make_ID: string;
  Make_Name: string;
}

export interface BrandSelected {
  models: ModelResult[];
  vehicleTypes: VehicleTypeResult[];
}

export interface BrandResponse {
  Count: number;
  Message: string;
  SearchCriteria?: string;
  Results: BrandEntity[];
}

export interface ModelsResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: ModelResult[];
}

export interface ModelResult {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export interface VehicleTypesResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleTypeResult[];
}

export interface VehicleTypeResult {
  VehicleTypeId: number;
  VehicleTypeName: string;
}
