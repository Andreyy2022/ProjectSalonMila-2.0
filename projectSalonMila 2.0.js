'use strict';

let users = [];

let body = document.querySelector('body');

let inp1 = document.querySelector('#inp1');
inp1.value = '';

let inp2 = document.querySelector('#inp2');
inp2.value = '';

let inp3 = document.querySelector('#inp3');
inp3.value = '';

let inp4 = document.querySelector('#inp4');
inp4.value = '';

let btn = document.querySelector('button');
btn.innerHTML = 'Ввести';

btn.addEventListener('click', function() {
    let obj = {
        name: inp1.value,
        surname: inp2.value,
        patronymic: inp3.value,
        phone: inp4.value,
        visit: 1,
        date: new Date().toLocaleDateString()
    }

    let list = localStorage.getItem('list');

    if (list) {
        let newArr = JSON.parse( localStorage.getItem('list') );
        newArr.push(obj);
        localStorage.setItem( 'list', JSON.stringify(newArr) );
    } else {
        users.push(obj);
        localStorage.setItem( 'list', JSON.stringify(users) );
    }
});

let resultArr = JSON.parse( localStorage.getItem('list') );

let table = document.querySelector('table');
let k = 1;

for (let elems of resultArr) {
    let row = document.createElement('tr');

        let cellFirst = document.createElement('td');
        cellFirst.innerHTML  = k++;
        row.append(cellFirst);

        for (let elem in elems) {
            let cell = document.createElement('td');
            cell.innerHTML = elems[elem];
            row.append(cell);

            cell.addEventListener('click', function() {
                let input = document.createElement('input');
                input.value = cell.innerHTML;
                cell.innerHTML = '';
                cell.append(input);
                input.focus();

                    input.addEventListener('blur', function() {
                        cell.innerHTML = input.value;
                        elems[elem] = cell.innerHTML;
                        localStorage.setItem( 'list', JSON.stringify(resultArr) );
                    });
            });
        }

    let cellLast = document.createElement('td');
    cellLast.innerHTML = 'удаление';
    row.append(cellLast);

    cellLast.addEventListener('click', function() {
        let question = confirm('Ирина, действительно хочешь удалить ?');
        
        if (question) {
            delete elems.name;

            let resultArrDel = resultArr.filter(element => element.name !== undefined);

            localStorage.setItem( 'list', JSON.stringify(resultArrDel) );
        }
    });

    table.append(row);
}

let cells = document.querySelectorAll('td');

for (let cell of cells)  {
    if (cell.innerHTML == 5) {
        cell.style.color = 'red';
    }
}


//localStorage.clear();
