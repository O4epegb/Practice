module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


numbers =
    [ 1, 2, 3, 4, 5 ]


fruits =
    [ { name = "Orange" }, { name = "Banana" } ]


printThing : thing -> Html msg
printThing thing =
    li [] [ text <| toString thing ]


main =
    -- ul [] (List.map printThing numbers)
    ul [] (List.map printThing fruits)
