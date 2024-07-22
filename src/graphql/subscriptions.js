/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePlanning = /* GraphQL */ `
  subscription OnCreatePlanning($filter: ModelSubscriptionPlanningFilterInput) {
    onCreatePlanning(filter: $filter) {
      id
      date
      hour
      orderID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePlanning = /* GraphQL */ `
  subscription OnUpdatePlanning($filter: ModelSubscriptionPlanningFilterInput) {
    onUpdatePlanning(filter: $filter) {
      id
      date
      hour
      orderID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePlanning = /* GraphQL */ `
  subscription OnDeletePlanning($filter: ModelSubscriptionPlanningFilterInput) {
    onDeletePlanning(filter: $filter) {
      id
      date
      hour
      orderID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
      id
      price
      name
      Campagnes {
        nextToken
        __typename
      }
      orderID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
      id
      price
      name
      Campagnes {
        nextToken
        __typename
      }
      orderID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
      id
      price
      name
      Campagnes {
        nextToken
        __typename
      }
      orderID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
      id
      annonceursID
      Campagnes {
        nextToken
        __typename
      }
      nom
      Products {
        nextToken
        __typename
      }
      diff
      attente
      nondiff
      duration
      file
      Plannings {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
      id
      annonceursID
      Campagnes {
        nextToken
        __typename
      }
      nom
      Products {
        nextToken
        __typename
      }
      diff
      attente
      nondiff
      duration
      file
      Plannings {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
      id
      annonceursID
      Campagnes {
        nextToken
        __typename
      }
      nom
      Products {
        nextToken
        __typename
      }
      diff
      attente
      nondiff
      duration
      file
      Plannings {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAnnonceurs = /* GraphQL */ `
  subscription OnCreateAnnonceurs(
    $filter: ModelSubscriptionAnnonceursFilterInput
  ) {
    onCreateAnnonceurs(filter: $filter) {
      id
      Campagnes {
        nextToken
        __typename
      }
      Orders {
        nextToken
        __typename
      }
      Nom
      numero
      mail
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAnnonceurs = /* GraphQL */ `
  subscription OnUpdateAnnonceurs(
    $filter: ModelSubscriptionAnnonceursFilterInput
  ) {
    onUpdateAnnonceurs(filter: $filter) {
      id
      Campagnes {
        nextToken
        __typename
      }
      Orders {
        nextToken
        __typename
      }
      Nom
      numero
      mail
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAnnonceurs = /* GraphQL */ `
  subscription OnDeleteAnnonceurs(
    $filter: ModelSubscriptionAnnonceursFilterInput
  ) {
    onDeleteAnnonceurs(filter: $filter) {
      id
      Campagnes {
        nextToken
        __typename
      }
      Orders {
        nextToken
        __typename
      }
      Nom
      numero
      mail
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCampagne = /* GraphQL */ `
  subscription OnCreateCampagne($filter: ModelSubscriptionCampagneFilterInput) {
    onCreateCampagne(filter: $filter) {
      id
      annonceursID
      Nom
      periode
      orderID
      productID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCampagne = /* GraphQL */ `
  subscription OnUpdateCampagne($filter: ModelSubscriptionCampagneFilterInput) {
    onUpdateCampagne(filter: $filter) {
      id
      annonceursID
      Nom
      periode
      orderID
      productID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCampagne = /* GraphQL */ `
  subscription OnDeleteCampagne($filter: ModelSubscriptionCampagneFilterInput) {
    onDeleteCampagne(filter: $filter) {
      id
      annonceursID
      Nom
      periode
      orderID
      productID
      createdAt
      updatedAt
      __typename
    }
  }
`;
