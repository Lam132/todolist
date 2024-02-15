const inputBox = document.getElementById("input-box");
const list = document.querySelector(".moveable");


function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        list.appendChild(li);
        let span = document.createElement("span")
        span.innerHTML = "\u00d7";
        li.appendChild(span)
    }
    inputBox.value = '';
    saveData();
}

list.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", list.innerHTML);
}
function showTask() {
    list.innerHTML = localStorage.getItem("data");
}
showTask();

let items = document.querySelectorAll('#items-list > li')


//tạo vòng lặp
items.forEach(item => {
    $(item).prop('draggable', true)//đặt draggable là true để kéo thả
    item.addEventListener('dragstart', dragStart)//khi kéo sẽ kích hoạt dragstart
    item.addEventListener('drop', dropped)//khi thả sẽ kích hoạt drop start
    item.addEventListener('dragenter', cancelDefault)//phần tử đang được kéo sẽ kích hoạt cancel
    item.addEventListener('dragover', cancelDefault)//phần tử đang được kéo di chuyển qua phần tử này sẽ kích hoạt cancel
})


//hàm dragstart: lấy vị trí bản đầu dùng index, lưu data bằng setdata
function dragStart(e) {
    var index = $(e.target).index()
    e.dataTransfer.setData('text/plain', index)
}

//hàm dropped: chọn vị trí mới so với vị trí cũ rồi chèn phần tử, nếu được thì phần tử sẽ là vị trí mới và thay thế vị trí cũ bằng phần tử khác, còn chưa kéo thả được thì phần tử sẽ ở vị trí cũ
function dropped(e) {
    cancelDefault(e)

    let oldIndex = e.dataTransfer.getData('text/plain')
    let target = $(e.target)
    let newIndex = target.index()

    let dropped = $(this).parent().children().eq(oldIndex).remove()

    if (newIndex < oldIndex) {
        target.before(dropped)
    } else {
        target.after(dropped)
    }
}

function cancelDefault(e) {
    e.preventDefault()
    e.stopPropagation()
    return false
}