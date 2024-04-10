// src/query/schema.ts
import { gql } from "@apollo/client";
export const GETTENSE = gql`
  query tenses($pagination: PaginationArg, $sort: [String]) {
    tenses(pagination: $pagination, sort: $sort) {
      data {
        id
        attributes {
          localizationName
          name
        }
      }
    }
  }
`;

export const GETGAME = gql`
  query tensesGame($id: ID) {
    tensesGame(id: $id) {
      data {
        attributes {
          isFinish
          tenses_game_carts {
            data {
              id
              attributes {
                tenses_card {
                  data {
                    attributes {
                      description
                      type
                      tense {
                        data {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          selected_tenses {
            data {
              id
              attributes {
                name
                localizationName
              }
            }
          }
        }
      }
    }
  }
`;

export const GETGAME2 = gql`
  query tensesGames($filters: TensesGameFiltersInput!) {
    tensesGames(filters: $filters) {
      data {
        attributes {
          isFinish
          user {
            data {
              id
              attributes {
                username
              }
            }
          }
          tenses_game_carts {
            data {
              id
              attributes {
                status
                tenses_card {
                  data {
                    attributes {
                      type
                      tense {
                        data {
                          id
                        }
                      }
                      description
                    }
                  }
                }
              }
            }
          }
          selected_tenses {
            data {
              id
              attributes {
                name
                localizationName
              }
            }
          }
        }
      }
    }
  }
`;

export const GETTENSESCARDBYTENSID = gql`
  query tensesCard($filters: TensesCardFiltersInput) {
    tensesCards(filters: $filters) {
      data {
        id
        attributes {
          title
          description
        }
      }
    }
  }
`;

export const PUTCARDINTENSE = gql`
  mutation updateTensesGameCard($id: ID!, $data: TensesGameCartInput!) {
    updateTensesGameCart(id: $id, data: $data) {
      data {
        id
      }
    }
  }
`;

export const CREATEGAME = gql`
  mutation createTensesGame($data: TensesGameInput!) {
    createTensesGame(data: $data) {
      data {
        id
        attributes {
          selected_tenses {
            data {
              id
              attributes {
                tenses_cards {
                  data {
                    id
                  }
                }
                localizationName
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATEGAMECARD = gql`
  mutation createTensesGameCart($data: TensesGameCartInput!) {
    createTensesGameCart(data: $data) {
      data {
        attributes {
          status
        }
      }
    }
  }
`;
