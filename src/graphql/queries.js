/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlanning = /* GraphQL */ `
  query GetPlanning($id: ID!) {
    getPlanning(id: $id) {
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
export const listPlannings = /* GraphQL */ `
  query ListPlannings(
    $filter: ModelPlanningFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlannings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        hour
        orderID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const planningsByOrderID = /* GraphQL */ `
  query PlanningsByOrderID(
    $orderID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPlanningFilterInput
    $limit: Int
    $nextToken: String
  ) {
    planningsByOrderID(
      orderID: $orderID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        hour
        orderID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        price
        name
        orderID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const productsByOrderID = /* GraphQL */ `
  query ProductsByOrderID(
    $orderID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByOrderID(
      orderID: $orderID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        price
        name
        orderID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        annonceursID
        nom
        diff
        attente
        nondiff
        duration
        file
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ordersByAnnonceursID = /* GraphQL */ `
  query OrdersByAnnonceursID(
    $annonceursID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByAnnonceursID(
      annonceursID: $annonceursID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        annonceursID
        nom
        diff
        attente
        nondiff
        duration
        file
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAnnonceurs = /* GraphQL */ `
  query GetAnnonceurs($id: ID!) {
    getAnnonceurs(id: $id) {
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
export const listAnnonceurs = /* GraphQL */ `
  query ListAnnonceurs(
    $filter: ModelAnnonceursFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnnonceurs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Nom
        numero
        mail
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCampagne = /* GraphQL */ `
  query GetCampagne($id: ID!) {
    getCampagne(id: $id) {
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
export const listCampagnes = /* GraphQL */ `
  query ListCampagnes(
    $filter: ModelCampagneFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCampagnes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const campagnesByAnnonceursID = /* GraphQL */ `
  query CampagnesByAnnonceursID(
    $annonceursID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCampagneFilterInput
    $limit: Int
    $nextToken: String
  ) {
    campagnesByAnnonceursID(
      annonceursID: $annonceursID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const campagnesByOrderID = /* GraphQL */ `
  query CampagnesByOrderID(
    $orderID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCampagneFilterInput
    $limit: Int
    $nextToken: String
  ) {
    campagnesByOrderID(
      orderID: $orderID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const campagnesByProductID = /* GraphQL */ `
  query CampagnesByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCampagneFilterInput
    $limit: Int
    $nextToken: String
  ) {
    campagnesByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
