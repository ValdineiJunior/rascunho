function foo( ) { return 3; }

foo.bar = function( ) { return 4; };

foo.baz = 5;

console.log(foo( ) + foo.bar( ) + foo.baz); //= 12