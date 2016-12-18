module Main exposing (..)

import Html exposing (text)


type alias Dog =
    { name : String
    , age : Int
    }


dog : Dog
dog =
    { name = "Kek"
    , age = 3
    }


renderDog : Dog -> String
renderDog dog =
    "I am a dog, my name is " ++ dog.name ++ ", " ++ (toString dog.age)


main =
    text <| renderDog dog
