module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


type alias Ship =
    { name : String
    , cost : Int
    }


ships : List Ship
ships =
    [ { name = "X-wing", cost = 14 }
    , { name = "Death Star", cost = 99 }
    ]


renderShip ship =
    li []
        [ text ship.name
        , text ", "
        , b []
            [ text <| toString ship.cost ]
        ]


renderShips ships =
    div
        [ style
            [ ( "font-family", "sans-serif" )
            , ( "padding", "1em" )
            ]
        ]
        [ h1 [] [ text "Ships" ]
        , ul [] (List.map renderShip ships)
        ]


main =
    renderShips ships
