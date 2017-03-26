#lang br/quicklang

(define (read-syntax path port)
  (define args (port->lines port))
  (define handle-datums (format-datums '(handle ~a) args))
  (define module-datum `(module stacker-mod "stacker.rkt"
                          ,@handle-datums))
  (datum->syntax #f module-datum))
(provide read-syntax)

(define-macro (stacker-module-begin HANDLE-EXPR ...)
  #'(#%module-begin
     HANDLE-EXPR ...
     (display (first stack))))
(provide (rename-out [stacker-module-begin #%module-begin]))

(define stack empty)

(define (pop-stack!)
  (define arg (first stack))
  (set! stack (rest stack))
  arg)

(define (push-stack! arg)
  (set! stack (cons arg stack)))

(define (handle [arg #f])
  (cond
    [(number? arg) (push-stack! arg)]
    [(or (equal? * arg) (equal? + arg))
     (define op-result (arg (pop-stack!) (pop-stack!))) 
     (push-stack! op-result)]))
(provide handle)

(provide + *)