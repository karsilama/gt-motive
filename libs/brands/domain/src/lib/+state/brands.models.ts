/**
 * Interface for the 'Brands' data
 */
export interface BrandEntity {
  Make_ID: string;
  Make_Name: string;
}

export interface BrandResponse {
  Count: number;
  Message: string;
  SearchCriteria?: string;
  Results: BrandEntity[];
}
