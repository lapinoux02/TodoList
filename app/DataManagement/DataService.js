angular.module("TODO")
.factory("DataService", function() {
    /*---------------------------*
     *      Private attribute    *
     *---------------------------*/
    
    var data = [];
    
    var global = {
        maxTodoListId: 0,
        maxTodoId: 0
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
            id: ++global.maxTodoId
        }
    };
    
    /*---------------------------*
     *      Public method        *
     *---------------------------*/
    var setData = function(newData) {
        /* 
         * Assign the new data to the data variable without destroying its reference.
         * That way, the variables using the data don't lose the reference and auto-
         * update.
         */
        data.length = 0;
        for (var i=0; i<newData.length; ++i) {
            data.push(newData[i]);
        }
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
    
    var createNewTodoList = function(newTodoListTitle) {
        data.push({
            title: newTodoListTitle,
            list: [],
            id: ++global.maxTodoListId
        });
        return global.maxTodoListId;
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
        addNewTodo: addNewTodo,
        createNewTodoList: createNewTodoList
    };
});














