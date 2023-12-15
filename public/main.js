let btn = document.querySelector('#addBtn');
let input = document.querySelector('input');

btn.addEventListener('click', function () {
    let inputVal = input.value;
    let xml = new XMLHttpRequest();
    xml.open('post', '/save');
    xml.onreadystatechange = function () {
        if (xml.readyState === 4 && xml.status === 200) {
            console.log(xml.responseText);
        }
    };
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify({msg: inputVal}));
});
