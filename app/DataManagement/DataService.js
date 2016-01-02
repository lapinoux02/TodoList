angular.module("TODO")
.factory("DataService", function() {
    /*---------------------------*
     *      Private attribute    *
     *---------------------------*/
    
    var saveData = JSON.parse(localStorage.getItem('saveData')) || {
        data: [],
        global: {
            maxTodoListId: 0,
            maxTodoId: 0
        }
    };
    
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
        for (var i=0; i<getData().length; ++i) {
            var todoList = getData()[i];
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
    
    var getGlobal = function() {
        return saveData.global;
    };
    
    var newTodo = function(title, description, valid) {
        return {
            title: title || "",
            description: description || "",
            valid: valid || false,
            id: ++getGlobal().maxTodoId
        }
    };
    
    var setData = function(newData) {
        /* 
         * Assign the new data to the data variable without destroying its reference.
         * That way, the variables using the data don't lose the reference and auto-
         * update.
         */
        getData().length = 0;
        for (var i=0; i<newData.length; ++i) {
            getData().push(newData[i]);
        }
    };
    
    var setGlobal = function(newGlobal) {
        for(var element in newGlobal) {
            saveData.global[element] = newGlobal[element];
        };
    };
    
    /*---------------------------*
     *      Public method        *
     *---------------------------*/
    
    var getData = function() {
        return saveData.data;
    };
    
    var getList = function(todoListId) {
        return getData().filter(function(e) {return e.id == todoListId;})[0];
    };
    
    var removeTodo = function(listId, todoId) {
        var indexs = getIndexs(listId, todoId);
        getData()[indexs.i].list.splice(indexs.j, 1);
        storeData();
    };
    
    var addNewTodo = function(listId, newTitle, newDescription) {
        var indexs = getIndexs(listId, null);
        getData()[indexs.i].list.push(newTodo(newTitle, newDescription));
        storeData();
    };
    
    var createNewTodoList = function(newTodoListTitle) {
        getData().push({
            title: newTodoListTitle,
            list: [],
            id: ++getGlobal().maxTodoListId
        });
        storeData();
        return getGlobal().maxTodoListId;
    };
    
    var getSaveData = function() {
        return saveData;
    };
    
    var setSaveData = function(newSaveData) {
        setData(newSaveData.data);
        setGlobal(newSaveData.global);
        storeData();
    };
    
    var storeData = function() {
        localStorage.setItem('saveData', JSON.stringify(saveData));
    };
    
    return {
        // Init data
        setSaveData: setSaveData,
        
        // Get data
        getData: getData,
        getList: getList,
        getSaveData: getSaveData,
        
        // Remove data
        removeTodo: removeTodo,
        
        // Add data
        addNewTodo: addNewTodo,
        createNewTodoList: createNewTodoList,
        
        // Sauvegarde de donnée
        storeData: storeData
    };
});














