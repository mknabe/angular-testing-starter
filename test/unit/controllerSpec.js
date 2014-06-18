localStorage.clear();

describe('Controllers ::', function() {
  beforeEach(module('todomvc'));

  describe('TodoCtrl', function() {
    var scope, todoCtrl, location;
    var todoStorageMock = {
      storage: [],
      get: function () {
        return this.storage;
      },
      put: function (value) {
        this.storage = value;
      }
    };

    beforeEach(inject(function ($controller, $rootScope, $location) {
      scope = $rootScope.$new();
      todoStorageMock.storage = [];
      location = $location;
      todoCtrl = $controller('TodoCtrl', {
        $scope: scope,
        todoStorage: todoStorageMock
      });
    }));

    it('should be defined', function() {
      expect(todoCtrl).toBeDefined();
    });

    it('should not have an edited Todo on start', function () {
      expect(scope.editedTodo).toBeNull();
    });

    it('should not start with any todos', function() {
      expect(scope.todos.length).toBe(0);
    });

    it('should have all Todos completed', function () {
      scope.$digest();
      expect(scope.allChecked).toBeTruthy();
    });

    describe('location', function() {
      it('should redirect to home directory when blank', function() {
        location.path('');
        scope.$apply();
        expect(location.path()).toBe('/');
      });
    });

    // addTodo
    it('should have an addTodo function', function() {
      expect(scope.addTodo).toBeDefined();
    });

    describe('adding todos', function() {
      afterEach(function() {
        todoStorageMock.storage = [];
      });

      it('should not add blank todos', function() {
        scope.newTodo = '';
        scope.addTodo();
        expect(scope.todos.length).toBe(0);
      });

      it('should not add items consisting only of whitespaces', function () {
        scope.newTodo = '   ';
        scope.addTodo();
        expect(scope.todos.length).toBe(0);
      });

      it('should trim whitespace from new Todos', function () {
        scope.newTodo = '  buy some unicorns  ';
        scope.addTodo();
        expect(scope.todos.length).toBe(1);
        expect(scope.todos[0].title).toBe('buy some unicorns');
      });

      describe('regular todos', function() {
        beforeEach(function() {
          scope.newTodo = 'swim with dolphins';
          scope.addTodo();
        });

        afterEach(function() {
          todoStorageMock.storage = [];
        });

        it('should create a Todo object and add it to storage', function() {
          expect(scope.todos).toEqual([{ title: "swim with dolphins", completed: false }]);
        });

        it('should clear newTodo', function() {
          expect(scope.newTodo).toBe('');
        });

        it('should add to remaining todo count', function() {
          expect(scope.remainingCount).toBe(1);
        });

        it('should add todo to local storage', function() {
          expect(todoStorageMock.storage.length).toBe(1);
        });

        it('should add todo to scope list of todos', function() {
          expect(scope.todos.length).toBe(1);
        });
      });
    });

    // editTodo
    it('should have an editTodo function', function() {
      expect(scope.editTodo).toBeDefined();
    });

    it('should set editedTodo when editTodo is called', function() {
      var todo = { title: "test", completed: false };
      scope.editTodo(todo);
      expect(scope.editedTodo).toBe(todo);
    });

    // doneEditing
    it('should have a doneEditing function', function() {
      expect(scope.doneEditing).toBeDefined();
    });

    describe('editing todos', function() {
      var todo = { title: "test", completed: false };
      beforeEach(function() {
        scope.newTodo = "test";
        scope.addTodo();
        scope.editTodo(todo);
      }); 

      afterEach(function() {
        todoStorageMock.storage = [];
      });

      it('should clear the editedTodo', function() {
        expect(scope.editedTodo).not.toBe(null);
        scope.doneEditing(todo);
        expect(scope.editedTodo).toBe(null);
      });

      it('should trim Todos on saving', function () {
        var todo = todoStorageMock.storage[0];
        todo.title = ' buy moar unicorns  ';

        scope.doneEditing(todo);
        expect(scope.todos[0].title).toBe('buy moar unicorns');
      });

      it('should remove todos that do not have a title', function() {
        todo.title = "";
        scope.doneEditing(todo);
        expect(todoStorageMock.storage.length).toBe(0);
      });

      it('should save the todo in localStorage', function() {
        var todo = todoStorageMock.storage[0];
        todo.title = "buy crocs";
        scope.doneEditing(todo);
        expect(scope.todos[0].title).toBe('buy crocs');
      });
    });

    // removeTodo
    it('should have a removeTodo function', function() {
      expect(scope.removeTodo).toBeDefined();
    });

    describe('removing a todo', function() {
      beforeEach(function() {
        scope.newTodo = "test1";
        scope.addTodo();
        scope.newTodo = "test2";
        scope.addTodo();
        var todo = todoStorageMock.storage[0];
        todo.completed = true;
        scope.todoCompleted(todo);
      });

      afterEach(function() {
        todoStorageMock.storage = [];
      });

      it('should not change the remainingCount if todo was completed', function() {
        var todo = todoStorageMock.storage[0];
        scope.removeTodo(todo);
        expect(todoStorageMock.storage.length).toBe(1);
        expect(scope.remainingCount).toBe(1);
      });

      it('should reduce the remainingCount by 1 if todo was not completed', function() {
        var todo = todoStorageMock.storage[1];
        scope.removeTodo(todo);
        expect(todoStorageMock.storage.length).toBe(1);
        expect(scope.remainingCount).toBe(0);
      });
    });

    // todoCompleted
    it('should have a todoCompleted function', function() {
      expect(scope.todoCompleted).toBeDefined();
    });

    it('should keep track of remaining todos when toggling completed', function() {
      scope.newTodo = "test1";
      scope.addTodo();
      scope.newTodo = "test2";
      scope.addTodo();

      var todo = todoStorageMock.storage[0];
      todo.completed = true;
      scope.todoCompleted(todo);
      expect(scope.remainingCount).toBe(1);

      todo.completed = false;
      scope.todoCompleted(todo);
      expect(scope.remainingCount).toBe(2);
    });

    // clearCompletedTodos
    it('should have a clearCompletedTodos function', function() {
      expect(scope.clearCompletedTodos).toBeDefined();
    });

    it('should delete completed todos when clearing all todos', function() {
      scope.newTodo = "test1";
      scope.addTodo();
      scope.newTodo = "test2";
      scope.addTodo();
      scope.newTodo = "test3";
      scope.addTodo();

      var todo = todoStorageMock.storage[0];
      todo.completed = true;
      scope.todoCompleted(todo);

      todo = todoStorageMock.storage[1];
      todo.completed = true;
      scope.todoCompleted(todo);

      expect(scope.todos.length).toBe(3);
      scope.clearCompletedTodos();
      expect(scope.todos.length).toBe(1);
    });

    // markAll
    it('should have a markAll function', function() {
      expect(scope.markAll).toBeDefined();
    });

    describe('marking all complete', function() {
      beforeEach(function() {
        scope.newTodo = "test1";
        scope.addTodo();
        scope.newTodo = "test2";
        scope.addTodo();
        scope.newTodo = "test3";
        scope.addTodo();
      });

      afterEach(function() {
        todoStorageMock.storage = [];
      });

      it('should set remaining count to 0', function() {
        scope.markAll(true);
        expect(scope.remainingCount).toBe(0);
      });

      it('should set completed for all todos to true', function() {
        scope.markAll(true);

        for(var i; i < todoStorageMock.storage.length; i++) {
          expect(todoStorageMock.storage[i].completed).toBe(true);
        }
      });
    });

    describe('marking all incomplete', function() {
      beforeEach(function() {
        scope.newTodo = "test1";
        scope.addTodo();
        scope.newTodo = "test2";
        scope.addTodo();
        scope.newTodo = "test3";
        scope.addTodo();

        var todo = todoStorageMock.storage[0];
        todo.completed = true;
        scope.todoCompleted(todo);

        todo = todoStorageMock.storage[1];
        todo.completed = true;
        scope.todoCompleted(todo);
      });

      afterEach(function() {
        todoStorageMock.storage = [];
      });

      it('should set remaining count', function() {
        expect(scope.remainingCount).toBe(1);
        scope.markAll(false);
        expect(scope.remainingCount).toBe(3);
      });

      it('should set completed for all todos to false', function() {
        scope.markAll(false);

        for(var i; i < todoStorageMock.storage.length; i++) {
          expect(todoStorageMock.storage[i].completed).toBe(false);
        }
      });
    });
  });
});
