/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type LinkCustom_link$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type LinkList_viewer$ref: FragmentReference;
export type LinkList_viewer = {|
  +allLinks: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +$fragmentRefs: LinkCustom_link$ref,
      |},
    |}>,
    +pageInfo: ?{|
      +hasNextPage: ?boolean,
      +endCursor: ?string,
    |},
  |},
  +$refType: LinkList_viewer$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "LinkList_viewer",
  "type": "Viewer",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "allLinks"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "count",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "after",
      "type": "String"
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "allLinks",
      "name": "__LinkList_allLinks_connection",
      "storageKey": "__LinkList_allLinks_connection(orderBy:\"createdAt_DESC\")",
      "args": [
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": "createdAt_DESC",
          "type": "LinkOrderBy"
        }
      ],
      "concreteType": "LinkConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "LinkEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Link",
              "plural": false,
              "selections": [
                {
                  "kind": "FragmentSpread",
                  "name": "LinkCustom_link",
                  "args": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "__typename",
                  "args": null,
                  "storageKey": null
                }
              ]
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "cursor",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "PageInfo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasNextPage",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endCursor",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node/*: any*/).hash = 'db2b4abdc425cda0d5e17e26f8507db0';
module.exports = node;
