module Main exposing (..)

import Html exposing (text)
import List


type alias Person =
    { name : String
    , age : Int
    }


people : List Person
people =
    [ { name = "Legolas", age = 2993 }
    , { name = "Gimli", age = 139 }
    ]


names : List Person -> List String
names peoples =
    List.map (\person -> person.name) peoples


findPerson : String -> List Person -> Maybe Person
findPerson name people =
    List.foldl
        (\person memo ->
            case memo of
                Just _ ->
                    memo

                Nothing ->
                    if person.name == name then
                        Just person
                    else
                        Nothing
        )
        Nothing
        people


main =
    text <| toString <| findPerson "Legolas" people
