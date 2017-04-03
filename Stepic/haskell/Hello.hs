import           Data.Char

main = putStrLn "Hello, world!"

lenVec3 x y z = sqrt (x ^ 2 + y ^ 2 + z ^ 2)

sign x = if x > 0 then 1 else if x < 0 then (-1) else 0

infixl 6 *+*

a *+* b = a ^ 2 + b ^ 2

infixl 6 |-|

x |-| y = abs (x - y)

kek = logBase 4 $ min 20 $ 9 + 7

discount :: Double -> Double -> Double -> Double
discount limit proc sum = if sum >= limit then sum * (100 - proc) / 100 else sum

checkIsDigit = isDigit

twoDigits2Int :: Char -> Char -> Int
twoDigits2Int x y = if isDigit x && isDigit y then digitToInt x * 10 + digitToInt y else 100

dist :: (Double, Double) -> (Double, Double) -> Double
dist p1 p2 = sqrt $ (fst p2 - fst p1) ^ 2 + (snd p2 - snd p1) ^ 2

factorial n = if n <= 0 then 1 else n * factorial (n - 1)

factorial' 0 = 1
factorial' n = n * factorial' (n - 1)

factorial'' 0 = 1
factorial'' n = if n < 0 then error "arg must be >= 0" else n * factorial'' (n - 1)

factorial''' n | n == 0  = 1
               | n > 0 = n * factorial''' (n - 1)
               | otherwise = error "arg must be >= 0"

doubleFact :: Integer -> Integer
doubleFact n = if n <= 1 then 1 else n * doubleFact (n - 2)
