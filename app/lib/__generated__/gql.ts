/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query tenses($pagination: PaginationArg, $sort: [String]) {\n    tenses(pagination: $pagination, sort: $sort) {\n      data {\n        id\n        attributes {\n          localizationName\n          name\n        }\n      }\n    }\n  }\n": types.TensesDocument,
    "\n  query tensesGame($id: ID) {\n    tensesGame(id: $id) {\n      data {\n        attributes {\n          isFinish\n          tenses_game_carts {\n            data {\n              id\n              attributes {\n                tenses_card {\n                  data {\n                    attributes {\n                      description\n                      type\n                      tense {\n                        data {\n                          id\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n          selected_tenses {\n            data {\n              id\n              attributes {\n                name\n                localizationName\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.TensesGameDocument,
    "\n  query tensesGames($filters: TensesGameFiltersInput!) {\n    tensesGames(filters: $filters) {\n      data {\n        attributes {\n          isFinish\n          user {\n            data {\n              id\n              attributes {\n                username\n              }\n            }\n          }\n          tenses_game_carts {\n            data {\n              id\n              attributes {\n                status\n                tenses_card {\n                  data {\n                    attributes {\n                      type\n                      tense {\n                        data {\n                          id\n                        }\n                      }\n                      description\n                    }\n                  }\n                }\n              }\n            }\n          }\n          selected_tenses {\n            data {\n              attributes {\n                name\n                localizationName\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.TensesGamesDocument,
    "\n  query tensesCard($filters: TensesCardFiltersInput) {\n    tensesCards(filters: $filters) {\n      data {\n        id\n        attributes {\n          title\n          description\n        }\n      }\n    }\n  }\n": types.TensesCardDocument,
    "\n  mutation updateTensesGameCard($id: ID!, $data: TensesGameCartInput!) {\n    updateTensesGameCart(id: $id, data: $data) {\n      data {\n        id\n      }\n    }\n  }\n": types.UpdateTensesGameCardDocument,
    "\n  mutation createTensesGame($data: TensesGameInput!) {\n    createTensesGame(data: $data) {\n      data {\n        id\n        attributes {\n          selected_tenses {\n            data {\n              id\n              attributes {\n                tenses_cards {\n                  data {\n                    id\n                  }\n                }\n                localizationName\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.CreateTensesGameDocument,
    "\n  mutation createTensesGameCart($data: TensesGameCartInput!) {\n    createTensesGameCart(data: $data) {\n      data {\n        attributes {\n          status\n        }\n      }\n    }\n  }\n": types.CreateTensesGameCartDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query tenses($pagination: PaginationArg, $sort: [String]) {\n    tenses(pagination: $pagination, sort: $sort) {\n      data {\n        id\n        attributes {\n          localizationName\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query tenses($pagination: PaginationArg, $sort: [String]) {\n    tenses(pagination: $pagination, sort: $sort) {\n      data {\n        id\n        attributes {\n          localizationName\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query tensesGame($id: ID) {\n    tensesGame(id: $id) {\n      data {\n        attributes {\n          isFinish\n          tenses_game_carts {\n            data {\n              id\n              attributes {\n                tenses_card {\n                  data {\n                    attributes {\n                      description\n                      type\n                      tense {\n                        data {\n                          id\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n          selected_tenses {\n            data {\n              id\n              attributes {\n                name\n                localizationName\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query tensesGame($id: ID) {\n    tensesGame(id: $id) {\n      data {\n        attributes {\n          isFinish\n          tenses_game_carts {\n            data {\n              id\n              attributes {\n                tenses_card {\n                  data {\n                    attributes {\n                      description\n                      type\n                      tense {\n                        data {\n                          id\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n          selected_tenses {\n            data {\n              id\n              attributes {\n                name\n                localizationName\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query tensesGames($filters: TensesGameFiltersInput!) {\n    tensesGames(filters: $filters) {\n      data {\n        attributes {\n          isFinish\n          user {\n            data {\n              id\n              attributes {\n                username\n              }\n            }\n          }\n          tenses_game_carts {\n            data {\n              id\n              attributes {\n                status\n                tenses_card {\n                  data {\n                    attributes {\n                      type\n                      tense {\n                        data {\n                          id\n                        }\n                      }\n                      description\n                    }\n                  }\n                }\n              }\n            }\n          }\n          selected_tenses {\n            data {\n              attributes {\n                name\n                localizationName\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query tensesGames($filters: TensesGameFiltersInput!) {\n    tensesGames(filters: $filters) {\n      data {\n        attributes {\n          isFinish\n          user {\n            data {\n              id\n              attributes {\n                username\n              }\n            }\n          }\n          tenses_game_carts {\n            data {\n              id\n              attributes {\n                status\n                tenses_card {\n                  data {\n                    attributes {\n                      type\n                      tense {\n                        data {\n                          id\n                        }\n                      }\n                      description\n                    }\n                  }\n                }\n              }\n            }\n          }\n          selected_tenses {\n            data {\n              attributes {\n                name\n                localizationName\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query tensesCard($filters: TensesCardFiltersInput) {\n    tensesCards(filters: $filters) {\n      data {\n        id\n        attributes {\n          title\n          description\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query tensesCard($filters: TensesCardFiltersInput) {\n    tensesCards(filters: $filters) {\n      data {\n        id\n        attributes {\n          title\n          description\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateTensesGameCard($id: ID!, $data: TensesGameCartInput!) {\n    updateTensesGameCart(id: $id, data: $data) {\n      data {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateTensesGameCard($id: ID!, $data: TensesGameCartInput!) {\n    updateTensesGameCart(id: $id, data: $data) {\n      data {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createTensesGame($data: TensesGameInput!) {\n    createTensesGame(data: $data) {\n      data {\n        id\n        attributes {\n          selected_tenses {\n            data {\n              id\n              attributes {\n                tenses_cards {\n                  data {\n                    id\n                  }\n                }\n                localizationName\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createTensesGame($data: TensesGameInput!) {\n    createTensesGame(data: $data) {\n      data {\n        id\n        attributes {\n          selected_tenses {\n            data {\n              id\n              attributes {\n                tenses_cards {\n                  data {\n                    id\n                  }\n                }\n                localizationName\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createTensesGameCart($data: TensesGameCartInput!) {\n    createTensesGameCart(data: $data) {\n      data {\n        attributes {\n          status\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createTensesGameCart($data: TensesGameCartInput!) {\n    createTensesGameCart(data: $data) {\n      data {\n        attributes {\n          status\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;