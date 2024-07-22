export interface CampagneType {
    id: string;
    annonceursID: string;
    Nom: string;
    periode: string;
    orderID: string;  
    productID: string; 
    createdAt: string;
    updatedAt: string;
    __typename: string;
  }
  
  
export interface ListCampagnesResponse {
    listCampagnes: {
      items: CampagneType[];
      nextToken: string | null;
      __typename: string;
    };
  }


  // Interfaces for Advertisers
export interface Advertiser {
    mail: string;
    numero: string;
    Nom: string;
    id: string;
    Campagnes: {
      items: CampagneType[];
    };
    Orders: {
      items: Order[];
    };
  }
  
// Interfaces for Orders
export interface Order {
    id: string;
    annonceursID: string;
    Campagnes: CampagneType
    nom: string;
    Products: Product;
    Planning:Planning;
    productID:string;
    diff: boolean;
    attente: boolean;
    nondiff: boolean;
    duration: number; 
    file: string; 
    createdAt: string; 
    updatedAt: string; 
    __typename: string;
  }
  
  
  // Interfaces for Products
export interface Product {
    id: string;
    price: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  
export interface CreateCampagneProps {
    isOpen: boolean;
    onClose: () => void;
    Advertisers: Advertiser[];  
    Orders: Order[];  
    Products: Product[];
    Campagnes:CampagneType[];
    setCampagnes:any;
  }
  
export interface GetAnnonceursResponse {
    data: {
        getAnnonceurs: Annonceur;
    };
}

export interface Annonceur {
    id: string;
    Campagnes: {
        items: CampagneType[];
    };
    Orders: {
        items: Order[];
    };
    Nom: string;
    numero: string | null;
    mail: string | null;
    createdAt: string;
    updatedAt: string;
    __typename: string;
}


export interface Planning {
  id: string;
  date: string; 
  hour: string; 
  orderID: string;
  createdAt: string; 
  updatedAt: string; 
  typename: string;
}
