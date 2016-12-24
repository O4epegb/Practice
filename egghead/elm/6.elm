module Main exposing (..)

import Html exposing (..)
import Html.Events exposing (..)


model =
    { showFace = False }


type Msg
    = ShowFace


update msg model_ =
    case msg of
        ShowFace ->
            { model_ | showFace = True }


view model_ =
    div []
        [ h1 [] [ text "Face Generator" ]
        , button [ onClick ShowFace ] [ text "Face me" ]
        , if model_.showFace then
            text "o_O"
          else
            text ""
        ]


main =
    Html.beginnerProgram
        { model = model
        , view = view
        , update = update
        }
