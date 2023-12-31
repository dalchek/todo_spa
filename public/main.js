let btn = document.querySelector('#addBtn');
let input = document.querySelector('input');
let mainRow = document.querySelector('#main-row');

btn.addEventListener('click', function () {
    let inputVal = input.value;
    let xml = new XMLHttpRequest();
    xml.open('post', '/save');
    xml.onreadystatechange = function () {
        if (xml.readyState === 4 && xml.status === 200) {
            displayTodos();
        }
    };
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify({msg: inputVal}));
});

function displayTodos() {
    let data = new Promise((resolve, reject) => {
        let xml = new XMLHttpRequest();
        xml.open('get', '/get_data');
        xml.onreadystatechange = () => {
            if (xml.readyState == 4 && xml.status == 200) {
                resolve(JSON.parse(xml.responseText));
            }
        };
        xml.send();
    });
    data.then((data) => {
        let text = '';

        for (let i = 0; i < data.length; i++) {
            text += `
            <div class="col-4">
                <div class="card mt-4 mb-4">
                    <div class="card-header">
                        <button
                            class="btn btn-sm btn-secondary float-left"
                        >
                            Todo: ${i + 1}
                        </button>
                        <button
                            class="btn btn-sm btn-success float-end"
                        >
                            ${data[i].date}
                        </button>
                    </div>
                    <div class="card-body text-center">
                        <h3>${data[i].msg}</h3>
                    </div>
                    <div class="card-footer text-center">
                        <button data-id="${
                            data[i]._id
                        }" class="btn btn-sm btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            `;
        }
        mainRow.innerHTML = text;
        let allDeleteBtns = document.querySelectorAll('[data-id]');

        for (let i = 0; i < allDeleteBtns.length; i++) {
            allDeleteBtns[i].addEventListener('click', deleteTodo);
        }
    });
}

displayTodos();
function deleteTodo() {
    let xml = new XMLHttpRequest();
    xml.open('post', '/delete');
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            displayTodos();
        }
    };
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify({id: this.getAttribute('data-id')}));
}
