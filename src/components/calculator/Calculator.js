import React, { useState } from 'react'

function Calculator() {

    const [value, setValue] = useState('0')
    let postfix = ''
    let stack = []
    let index = 0

    const changeHandler = e => {
        if(value.length === 1 && value === '0')
            setValue(e.target.innerHTML)
        else 
            setValue(value + e.target.innerHTML)
    }

    const isOperator = (c) => {
        switch(c){
            case '+':
            case '-':
            case 'x':
            case '/':
                return 1;
            
            default:
                return 0;
        }
    }

    const priority = (c) => {
        switch(c){
            case 'x':
            case '/':
                return 2

            case '+':
            case '-':
                return 1

            default:
                return 0
        }
    }

    const peek = () => {
        return stack[stack.length - 1]
    }

    const tokenize = () => {
        for(let i = index; i < value.length; ++i){
            if(isOperator(value[i]))
                return i

            postfix += value[i]
        }
    }

    const infixToPostfix = () => {
        index = tokenize()
        if(index === 0){
            postfix += value[index]
            return
        }

        while((index = tokenize())){
            if(stack.length === 0){
                stack.push(value[index])
                postfix += ' '
            } else if(priority(value[index]) > priority(peek())){
                stack.push(value[index])
                postfix += ' '
            } else if(priority(value[index]) <= priority(peek())){
                const op = stack.pop()
                postfix += ` ${op} `
                stack.push(value[index])
            }
            index++
        }

        while(stack.length){
            const op = stack.pop()

            if(stack.length === 0){
                postfix += ` ${op}`
                break
            }

            postfix += ` ${op} `
        }
    }

    const evalPostfix = () => {
        infixToPostfix()
        let postfixArr = postfix.split(' ')
        stack = []
        let result

        for(let i = 0; i < postfixArr.length; ++i){
            if((postfixArr[i].length === 1 && !isOperator(postfixArr[i][0])) 
                || (!isOperator(postfixArr[i][0]))){
                    stack.push(postfixArr[i])
                    continue
            }

            const secondOperand = stack.pop()
            const firstOperand = stack.pop()
            const op = postfixArr[i][0]

            switch(op){
                case '+':
                    result = parseInt(firstOperand) + parseInt(secondOperand)
                    break
                
                case '-':
                    result = parseInt(firstOperand) - parseInt(secondOperand)
                    break

                case 'x':
                    result = parseInt(firstOperand) * parseInt(secondOperand)
                    break

                case '/':
                    result = parseInt(firstOperand) / parseInt(secondOperand)
                    break

                default:
                    break
            }

            stack.push(result)
        }
        
        const finalResult = stack.pop()
        setValue(finalResult.toString())
    }

    return (
        <div className="calculator">
            <h1>Simple Calculator</h1>
            <div className="screen">{value}</div>
            <div className="clear">
                <button className="clear-all" onClick={() => setValue('0')}>CLEAR</button>
                <button className="clear-one" onClick={() => setValue(value.length > 1 ? value.slice(0, value.length-1) : '0')}>DEL</button>
            </div>
            <div className="container">
                <div className="operand zero" onClick={e => changeHandler(e)}>0</div>
                <div className="operand one" onClick={e => changeHandler(e)}>1</div>
                <div className="operand two" onClick={e => changeHandler(e)}>2</div>
                <div className="operand three" onClick={e => changeHandler(e)}>3</div>
                <div className="operand four" onClick={e => changeHandler(e)}>4</div>
                <div className="operand five" onClick={e => changeHandler(e)}>5</div>
                <div className="operand six" onClick={e => changeHandler(e)}>6</div>
                <div className="operand seven" onClick={e => changeHandler(e)}>7</div>
                <div className="operand eight" onClick={e => changeHandler(e)}>8</div>
                <div className="operand nine" onClick={e => changeHandler(e)}>9</div>
                <div className="operator plus" onClick={e => changeHandler(e)}>+</div>
                <div className="operator minus" onClick={e => changeHandler(e)}>-</div>
                <div className="operator multiple" onClick={e => changeHandler(e)}>x</div>
                <div className="operator divide" onClick={e => changeHandler(e)}>/</div>
                <div className="operator equal" onClick={() => evalPostfix()}>=</div>
            </div>
        </div>
    )
}

export default Calculator
