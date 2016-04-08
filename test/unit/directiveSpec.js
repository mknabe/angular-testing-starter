localStorage.clear();

describe('Directives ::', function() {
  beforeEach(module('todomvc'));

  describe('todoBlur', function() {
    var scope, compile;

    beforeEach(inject(function ($rootScope, $compile) {
      scope = $rootScope.$new();
      compile = $compile;
    }));

    it('should execute expression when element loses focus', function() {
      spyOn(scope, '$apply').and.callThrough();
      var el = angular.element('<input todo-blur="console.log(1);">');
      compile(el)(scope);
      el.triggerHandler('blur');

      expect(scope.$apply).toHaveBeenCalled();
    });
  });

   describe('todoFocus', function() {
      var scope, compile, browser;

      beforeEach(inject(function ($rootScope, $compile, $browser) {
        scope = $rootScope.$new();
        compile = $compile;
        browser = $browser;
      }));

      it('should focus on truthy expression', function () {
        var el = angular.element('<input todo-focus="focus">');
        scope.focus = false;

        compile(el)(scope);
        expect(browser.deferredFns.length).toBe(0);

        scope.$apply(function () {
          scope.focus = true;
        });

        expect(browser.deferredFns.length).toBe(1);
      });
   });
});