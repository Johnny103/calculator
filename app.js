

const btnnoDis = document.getElementById('noDis');
var domd3 = document.getElementById('d3');
var domd2 = document.getElementById('d2');
var dominput = document.querySelector("#put")

// 鍵盤向下向上
btnnoDis.addEventListener('click', function () {
    var state = domd3.getAttribute('data-state')
    if (state == "open") {
        console.log(1)
        domd2.setAttribute('dd', "close")
        domd3.setAttribute('data-state', "close")
    } else {
        console.log(0)
        domd2.setAttribute('dd', "open")
        domd3.setAttribute('data-state', "open")
    }
})
// 計算方塊
function clac(e) {
    var output = dominput.value
    //創建一個元素 後面的字串是要創建的元素
    var domDiv2 = document.createElement("div")
    var answer = calcCore(output)
    var html = `
    <div class="gg">
        <div class="up"> ${output}</div>
        <div class="down">=${answer}</div>
        <div class="delete" onclick="dele(this)">x</div>
    </div>`
    domDiv2.innerHTML = html
    //更改他的元素內容
    domDiv2.setAttribute("class", "gg")
    //在巴底放上他
    domd2.appendChild(domDiv2)
    //把他的高和他的長度更改屬標相對位置

    domd2.insertBefore(domDiv2, domd2.firstChild);
    dominput.value = ""
}
/**
 * 計算四則運算可回傳答案
 * @param {string} value 要計算的數學式子 要自串
 * @returns 答案
 */
function calcCore(value) {
    value = value.replace(/×/g, "*")
    value = value.replace(/÷/g, "/")
    value = value.replace(/−/g, "-")
    var ee = math.evaluate(value)
    return math.round(ee, 10)
}

function dele(dom) {
    console.log(dom)
    var ff = dom.parentNode;
    console.log(ff)
    ff.remove();
}

/**
 * 從光標當前位置刪除輸入框一個文字
 * @param {*} 幹崊娘 輸入框
 */
function backspace(幹崊娘) {
    // 獲取光標位置
    let cursorPosition = 幹崊娘.selectionStart;
    if (cursorPosition === 0) {
        return;
    }
    // 獲取文本框的值
    let inputValue = 幹崊娘.value;
    // 刪除光標左側的字符
    幹崊娘.value = inputValue.slice(0, cursorPosition - 1) + inputValue.slice(cursorPosition);
    // 將光標移動到新位置
    幹崊娘.selectionStart = cursorPosition - 1;
    幹崊娘.selectionEnd = cursorPosition - 1;
    console.log(cursorPosition)
}


document.getElementById('box').addEventListener('mousedown', function (e) {



    // 在這裡添加事件處理程序的代碼
    // var dombtn = e.target
    var dataTxt = e.target.getAttribute('data-txt');

    // 取消事件觸發
    e.preventDefault()
    // e.stopPropagation()
    // console.log( dominput.setSelectionRange(0, dominput.value.length))   

    if (document.activeElement !== dominput) {
        // 設置焦點
        dominput.focus();
        // 獲取文本框的值
        let inputValue = dominput.value;
        // 將光標移動到文本末尾
        dominput.selectionStart = inputValue.length;
        dominput.selectionEnd = inputValue.length;

    }


    if (dataTxt == "") {
        document.getElementById("put").value = "";
        return;
    }

    if (dataTxt == "delete") {
        backspace(dominput)
        return;
    }
    if (dataTxt == "=") {
        clac()
        return;
    }


    // 新增文字到光標位置
    // cursorPosition 光標位置
    var cursorPosition = dominput.selectionStart;
    var inputValue = dominput.value;
    dominput.value = inputValue.slice(0, cursorPosition) + dataTxt + inputValue.slice(cursorPosition);
    dominput.selectionStart = dominput.selectionEnd = cursorPosition + dataTxt.length;
});

document.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        clac();
     
    }
});