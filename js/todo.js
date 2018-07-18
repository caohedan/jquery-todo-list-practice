$(document)
    .ready(function () {
        const todoForm = {
            todos : [],
            statusOfList:"all"
        }
        function filterByStatus(todos,status) {
            const filterExecuter = {
                all(){
                    return true;
                },
                active(element){
                    return !element.complete;
                },
                complete(element){
                    return element.complete;
                }
            }
            const result = todos.filter(filterExecuter[status]);
            return result;

        }
        // ${filterByStatus(todoForm.todos, todoForm.statusOfList).map( todoViewItem).join("")}
        const buildHTML =(todoForm) =>{

            let todoViewItem = (element) =>`<li  ondblclick="edit(event, '${element.id}')" class="${element.complete ? "checked":""}">
            <input name="done-todo" type="checkbox" ${element.complete ? 'checked' : ""} class="done-todo" onchange="checkItem('${element.id}')"> ${element.name}</li>`
            let todoList =`   
        <div>
            <input   class="input-text" type="text" name="ListItem" data-com.agilebits.onepassword.user-edited="yes">
    <div id="button"  onclick="addItem()">Add</div>
    </div>
    <br>
    <ol>
        ${filterByStatus(todoForm.todos,todoForm.statusOfList).map(todoViewItem).join("")}
    </ol>
    <div>
        <ul id="filters">
            <li>
                <a href="#" data-filter="all" onclick="showListByStatus('all')" class="selected">ALL</a>
            </li>
            <li>
                <a href="#" data-filter="active"  onclick="showListByStatus('active')" class="">Active</a>
            </li>
            <li>
                <a href="#" data-filter="complete" onclick="showListByStatus('complete')" class="">Complete</a>
            </li>
        </ul>

    </div>`
            return todoList;
        }

        window.addItem = (event) => {
            var toAdd = $('input[name=ListItem]').val();

            todoForm.todos.push({ id: generateUUID(), name: toAdd, complete: false });

            render();
        }
        const render = () => {
            $('#todoForm').html(buildHTML(todoForm));
        }

        render();
        window.checkItem = (id) => {
            let item = todoForm.todos.find(x=>(x.id == id) );
            if(item !== undefined){
                item.complete = !item.complete;
            }
            render();
        }
        window.showListByStatus = (status) => {
            todoForm.statusOfList = status;
            render();

        };
        window.edit= (event, id) => {
            $(event.target).attr('contentEditable', 'true')
                .focus()
                .keypress(function (event) {
                    var keycode = (event.keyCode
                        ? event.keyCode
                        : event.which);

                    if (keycode == '13') {
                        todoForm.todos.find(x=>(x.id == id)).name = $(event.target).text();
                        render();
                    }

                })
                .mousemove(function (event){
                    todoForm.todos.find(x=>(x.id == id)).name = $(event.target).text();
                    render();
                })
        }

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        // code to be implemented

    });