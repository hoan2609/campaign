export interface Ad {
    name: string;
    quantity: number;
    selected?: boolean; 
  }
  
  export interface SubCampaign {
    name: string;
    status: boolean;
    ads: Ad[];
  }
  
  export interface Campaign {
    information: {
      name: string;
      describe?: string;
    };
    subCampaigns: SubCampaign[];
  }