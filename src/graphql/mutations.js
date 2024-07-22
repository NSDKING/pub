/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPlanning = /* GraphQL */ `
  mutation CreatePlanning(
    $input: CreatePlanningInput!
    $condition: ModelPlanningConditionInput
  ) {
    createPlanning(input: $input, condition: $condition) {
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
export const updatePlanning = /* GraphQL */ `
  mutation UpdatePlanning(
    $input: UpdatePlanningInput!
    $condition: ModelPlanningConditionInput
  ) {
    updatePlanning(input: $input, condition: $condition) {
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
export const deletePlanning = /* GraphQL */ `
  mutation DeletePlanning(
    $input: DeletePlanningInput!
    $condition: ModelPlanningConditionInput
  ) {
    deletePlanning(input: $input, condition: $condition) {
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
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createAnnonceurs = /* GraphQL */ `
  mutation CreateAnnonceurs(
    $input: CreateAnnonceursInput!
    $condition: ModelAnnonceursConditionInput
  ) {
    createAnnonceurs(input: $input, condition: $condition) {
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
export const updateAnnonceurs = /* GraphQL */ `
  mutation UpdateAnnonceurs(
    $input: UpdateAnnonceursInput!
    $condition: ModelAnnonceursConditionInput
  ) {
    updateAnnonceurs(input: $input, condition: $condition) {
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
export const deleteAnnonceurs = /* GraphQL */ `
  mutation DeleteAnnonceurs(
    $input: DeleteAnnonceursInput!
    $condition: ModelAnnonceursConditionInput
  ) {
    deleteAnnonceurs(input: $input, condition: $condition) {
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
export const createCampagne = /* GraphQL */ `
  mutation CreateCampagne(
    $input: CreateCampagneInput!
    $condition: ModelCampagneConditionInput
  ) {
    createCampagne(input: $input, condition: $condition) {
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
export const updateCampagne = /* GraphQL */ `
  mutation UpdateCampagne(
    $input: UpdateCampagneInput!
    $condition: ModelCampagneConditionInput
  ) {
    updateCampagne(input: $input, condition: $condition) {
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
export const deleteCampagne = /* GraphQL */ `
  mutation DeleteCampagne(
    $input: DeleteCampagneInput!
    $condition: ModelCampagneConditionInput
  ) {
    deleteCampagne(input: $input, condition: $condition) {
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
