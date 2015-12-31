angular.module("TODO")
.factory("DataService", function() {
    /*---------------------------*
     *      Private attribute    *
     *---------------------------*/
    var data = [
        {
            title: 'First',
            list: [
            {
                title: 'T11',
                description: '',
                valid: true,
                id: 1
            },
            {
                title: 'T12',
                description: 'D12',
                valid: false,
                id: 2
            }],
            id: 1
        },
        {
            title: 'Second',
            list: [
            {
                title: 'T21',
                description: 'D21',
                valid: false,
                id: 3
            },
            {
                title: 'T22',
                description: 'D22',
                valid: false,
                id: 4
            }],
            id: 2
        }
    ];
    
    var global = {
        maxId: 4
    }
    
    /*---------------------------*
     *      Private method       *
     *---------------------------*/
    
    /*
     * Retourne indexs, avec indexs.i correspondant à l'indice
     * de la liste dans la structure de donnée, et indexs.j à
     * l'indice du todo dans la liste de la todoList.
     *
     * Si le todoId est null, retourne l'indice de la liste et
     * null pour l'indice du todo.
     *
     * Retourne null si un des indice ne peux pas être trouvé.
     */
    var getIndexs = function(listId, todoId) {
        var indexs = {i: null, j: null};
        for (var i=0; i<data.length; ++i) {
            var todoList = data[i];
            if (todoList.id != listId) {
                continue;
            }
            indexs.i = i;
            if (todoId === null) {
                return indexs;
            }
            for (var j=0; j<todoList.list.length; ++j) {
                var todo = todoList.list[j];
                if (todo.id != todoId) {
                    continue;
                }
                indexs.j = j;
                return indexs;
            }
            break;
        }
        return null;
    };
    
    var newTodo = function(title, description, valid) {
        return {
            title: title || "",
            description: description || "",
            valid: valid || false,
            id: ++global.maxId
        }
    };
    
    /*---------------------------*
     *      Public method        *
     *---------------------------*/
    var setData = function(newData) {
        data = newData;
    };
    
    var getData = function() {
        return data;
    };
    
    var getList = function(todoListId) {
        return data.filter(function(e) {return e.id == todoListId;})[0];
    };
    
    var removeTodo = function(listId, todoId) {
        var indexs = getIndexs(listId, todoId);
        data[indexs.i].list.splice(indexs.j, 1);
    };
    
    var addNewTodo = function(listId, newTitle, newDescription) {
        var indexs = getIndexs(listId, null);
        data[indexs.i].list.push(newTodo(newTitle, newDescription));
    };
    
    return {
        // Init data
        setData: setData,
        
        // Get data
        getData: getData,
        getList: getList,
        
        // Remove data
        removeTodo: removeTodo,
        
        // Add data
        addNewTodo: addNewTodo
    };
});














