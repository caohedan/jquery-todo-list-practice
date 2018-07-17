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
        const buildHTML =(todoForm) =>{
            let todoViewItem = (element) =>`<li  class="${element.complete ? "checked":""}">
            <input name="done-todo" type="checkbox" class="done-todo"> ${element.name}</li>`
            let todoList =`   
        <div>
            <input class="input-text" type="text" name="ListItem" data-com.agilebits.onepassword.user-edited="yes">
    <div id="button"  onclick="addItem()">Add</div>
    </div>
    <br>
    <ol>
        ${filterByStatus(todoForm.todos, todoForm.statusOfList).map(todoViewItem).join("")}
    </ol>
    <div>
        <ul id="filters">
            <li>
                <a href="#" data-filter="all" class="selected">ALL</a>
            </li>
            <li>
                <a href="#" data-filter="active" class="">Active</a>
            </li>
            <li>
                <a href="#" data-filter="complete" class="">Complete</a>
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