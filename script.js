import 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'
let spans = $("span")

jQuery(function () {
    spans.toArray().forEach(el => {
        el.onclick = () => click(el.innerHTML)
    });
});

var numbs = []
var ops = []
var isResult = false
var isOp = false
var numbInd = 0

function click(param) {
    let n = Number.parseInt(param)
    if (!isNaN(n)) {
        if (isOp || isResult) {
            isOp = false
            if (isResult) {
                isResult = false
                numbs = []
                ops = []
                numbInd = 0
            }
            $('.results > p').text('')

        }
        add_numb(n);
        $('.clear').text('CE')
    } else {
        switch (param) {
            case '=':
                result()
                break
            case '.':
                $('.results > p').text($('.results > p').text()+".")
                break
            case 'AC':
                numbs = []
                ops = []
                numbInd = 0
                isResult = false
                isOp = false
                $('.results > p').text('')
                break
            case 'CE':
                numbs[numbInd] = 0
                $('.results > p').text('')
                $('.clear').text('AC')
                break
            case '+':
            case '-':
            case '⨯':
            case '÷':
            case '%':
                operator(param)
                $('.clear').text('CE')
                break;
            case '+/-':
                if (!isOp && !isResult && $('.results > p').text() != "") {
                    numbs[numbInd] *= -1
                    $('.results > p').text(numbs[numbInd].toString())
                }
        }
    }
}

function add_numb(n) {
    let res = $('.results > p')
    res.text(res.text() + n.toString())
    numbs[numbInd] = Number.parseFloat(res.text())
    console.log(numbs)
}

function operator(op) {
    if (isResult) {
        numbs = []
        ops = []
        numbs[0] = Number.parseFloat($('.results > p').text())
        numbInd = 0
        isResult = false
    }
    $('.results > p').text(op)
    ops[numbInd] = op
    if (!isOp)
        numbInd += 1
    isOp = true
}


function result() {
    if (isOp) numbInd -= 1
    if (isResult) {
        let p = $('.results > p')
        p.text(eval(p.text() + "*2"))
        return
    }
    let res = 0;
    let _ops = ops
    _ops.forEach(el => {
        if (el == '⨯')
            _ops[_ops.indexOf(el)] = '*'
        else if (el == '÷')
            _ops[_ops.indexOf(el)] = '/'
    });
    isResult = true
    isOp = false
    let ress = ''
    for (const n of Array(numbInd + 1).keys()) {
        ress = ress + numbs[n].toString()
        ress = ress + " "
        if (n != numbInd)
            ress = ress + ops[n]
        ress = ress + " "

    }
    ress.replace('undefined', '')
    res = eval(ress)
    $('.results > p').text(res.toString())

}
$('body').on('keypress', ev => {
    console.log('sis')
    switch (ev.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '+':
        case '-':
        case '÷':
        case '⨯':
            click(ev.key)
            break
        case '/':
            click('÷')
            break
        case '*':
            click('⨯')
            break
        case 'Enter':
        case '=':
            click('=')
            break


    }
})