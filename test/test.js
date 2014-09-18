(function() {


    var WeePromise = require( '../index.js' );
    var ES6_Promise = require( 'es6-promise' ).Promise;
    var chai = require( 'chai' );
    var assert = chai.assert;
    var expect = chai.expect;


    [
        [ WeePromise , 'wee-promise' ],
        [ ES6_Promise , 'es6-promise' ]
    ]
    .forEach(function( args ) {


        var Promise = args[0];
        var name = args[1];
        

        describe( name , function() {

            describe( 'Constructor' , function() {
                it( 'should catch errors thrown in the resolver function' , function( done ) {
                    new Promise(function( resolve , reject ) {
                        var a;
                        a.b = 'c';
                    })
                    .catch(function( err ) {
                        try {
                            assert.instanceOf( err , Error );
                            done();
                        }
                        catch( _err ) {
                            done( _err );
                        }
                    });
                });
            });

            describe( '#then()' , function() {
                it( 'should do nothing when resolve is called twice' , function( done ) {
                    new Promise(function( resolve , reject ) {
                        resolve();
                        resolve();
                    })
                    .then(function() {
                        done();
                    });
                });
            });

            describe( '#then()' , function() {
                it( 'should do nothing if the promise is rejected' , function( done ) {
                    new Promise(function( resolve , reject ) {
                        reject();
                        resolve();
                    })
                    .then(function() {
                        done();
                    })
                    .catch(function() {
                        done();
                    });
                });
            });

            describe( '#then()' , function() {
                it( 'should fail silently when an error is thrown' , function( done ) {
                    new Promise(function( resolve , reject ) {
                        resolve();
                    })
                    .then(function() {
                        var a;
                        a.b = 'c';
                    });
                    done();
                });
            });

            describe( '#catch()' , function() {
                it( 'should do nothing when reject is called twice' , function( done ) {
                    new Promise(function( resolve , reject ) {
                        reject();
                        reject();
                    })
                    .catch(function() {
                        done();
                    });
                });
            });

            describe( '#catch()' , function() {
                it( 'should do nothing if the promise is resolved' , function( done ) {
                    new Promise(function( resolve , reject ) {
                        resolve();
                        reject();
                    })
                    .then(function() {
                        done();
                    })
                    .catch(function() {
                        done();
                    });
                });
            });

            describe( '#catch()' , function() {
                it( 'should catch errors thrown in then' , function( done ) {
                    new Promise(function( resolve , reject ) {
                        resolve();
                    })
                    .then(function() {
                        var a;
                        a.b = 'c';
                    })
                    .catch(function( err ) {
                        done();
                    });
                });
            });

            describe( '#catch()' , function() {
                it( 'should catch errors thrown in catch' , function( done ) {
                    new Promise(function( resolve , reject ) {
                        resolve();
                    })
                    .then(function() {
                        var a;
                        a.b = 'c';
                    })
                    .catch(function( err ) {
                        done();
                        throw err;
                    });
                });
            });

            describe( '#catch()' , function() {
                it( 'should receive the error thrown in then' , function( done ) {
                    new Promise(function( resolve , reject ) {
                        resolve();
                    })
                    .then(function() {
                        var a;
                        a.b = 'c';
                    })
                    .catch(function( err ) {
                        try {
                            assert.instanceOf( err , Error );
                            done();
                        }
                        catch( _err ) {
                            done( _err );
                        }
                    });
                });
            });

            describe( '#all()' , function() {
                describe( '#then()' , function() {
                    it( 'should be executed once all promises are resolved (asynchronous)' , function( done ) {
                        all_then( Promise , false , function( result ) {
                            done();
                        });
                    });
                });
                describe( '#then()' , function() {
                    it( 'should be executed once all promises are resolved (synchronous)' , function( done ) {
                        all_then( Promise , true , function( result ) {
                            done();
                        });
                    });
                });
                describe( '#then()' , function() {
                    it( 'should receive a result array equal to the length of the promises array (asynchronous)' , function( done ) {
                        all_then( Promise , false , function( result , test ) {
                            try {
                                expect( result.length ).to.equal( test );
                                done();
                            }
                            catch ( err ) {
                                done( err );
                            }
                        });
                    });
                });
                describe( '#then()' , function() {
                    it( 'should receive a result array equal to the length of the promises array (synchronous)' , function( done ) {
                        all_then( Promise , true , function( result , test ) {
                            try {
                                expect( result.length ).to.equal( test );
                                done();
                            }
                            catch ( err ) {
                                done( err );
                            }
                        });
                    });
                });
                describe( '#catch()' , function() {
                    it( 'should be executed if a promise is rejected (asynchronous)' , function( done ) {
                        all_catch( Promise , false , function( result ) {
                            done();
                        });
                    });
                });
                describe( '#catch()' , function() {
                    it( 'should be executed if a promise is rejected (synchronous)' , function( done ) {
                        all_catch( Promise , true , function( result ) {
                            done();
                        });
                    });
                });
                describe( '#catch()' , function() {
                    it( 'should receive arguments from the first promise that was rejected (asynchronous)' , function( done ) {
                        all_catch( Promise , false , function( result , test ) {
                            try {
                                expect( result ).to.equal( test );
                                done();
                            }
                            catch ( err ) {
                                done( err );
                            }
                        });
                    });
                });
                describe( '#catch()' , function() {
                    it( 'should receive arguments from the first promise that was rejected (synchronous)' , function( done ) {
                        all_catch( Promise , true , function( result , test ) {
                            try {
                                expect( result ).to.equal( test );
                                done();
                            }
                            catch ( err ) {
                                done( err );
                            }
                        });
                    });
                });
            });

            describe( '#race()' , function() {
                describe( '#then()' , function() {
                    it( 'should be executed once the first promise is resolved (asynchronous)' , function( done ) {
                        race_then( Promise , false , function( result ) {
                            done();
                        });
                    });
                });
                describe( '#then()' , function() {
                    it( 'should be executed once the first promise is resolved (synchronous)' , function( done ) {
                        race_then( Promise , true , function( result ) {
                            done();
                        });
                    });
                });
                describe( '#then()' , function() {
                    it( 'should receive arguments from the first promise that was resolved (asynchronous)' , function( done ) {
                        race_then( Promise , false , function( result , test ) {
                            try {
                                expect( result ).to.equal( test );
                                done();
                            }
                            catch ( err ) {
                                done( err );
                            }
                        });
                    });
                });
                describe( '#then()' , function() {
                    it( 'should receive arguments from the first promise that was resolved (synchronous)' , function( done ) {
                        race_then( Promise , true , function( result , test ) {
                            try {
                                expect( result ).to.equal( test );
                                done();
                            }
                            catch ( err ) {
                                done( err );
                            }
                        });
                    });
                });
            });
        });
    });

    
    function all_then( Promise , sync , callback ) {

        var count = 5;
        var promises = [];

        for (var i = 0; i < count; i++) {
            promises.push(
                (function( i ) {
                    return new Promise(function( resolve , reject ) {
                        if (sync) {
                            resolve( i );
                        }
                        else {
                            setTimeout(function() {
                                resolve( i );
                            }, 1 );
                        }
                    });
                }( i ))
            );
        }

        Promise.all( promises ).then(function( result ) {
            callback( result , count );
        });
    }


    function all_catch( Promise , sync , callback ) {

        var count = 5;
        var target = [ 2 , 3 ];
        var promises = [];
        var arr = [];

        function determine( i , resolve , reject ) {
            if (target.indexOf( i ) >= 0) {
                reject( i );
            }
            else {
                resolve( i );
            }
        }

        for (var i = 0; i < count; i++) {
            promises.push(
                (function( i ) {
                    return new Promise(function( resolve , reject ) {
                        if (sync) {
                            determine( i , resolve , reject );
                        }
                        else {
                            setTimeout(function() {
                                determine( i , resolve , reject );
                            }, 1 );
                        }
                    });
                }( i ))
            );
        }

        Promise.all( promises ).catch(function( result ) {
            callback( result , target[0] );
        });
    }


    function race_then( Promise , sync , callback ) {

        var count = 5;
        var target = [ 2 , 3 ];
        var test = sync ? 0 : target[0];
        var promises = [];

        for (var i = 0; i < count; i++) {
            promises.push(
                (function( i ) {
                    return new Promise(function( resolve , reject ) {
                        if (sync) {
                            resolve( i );
                        }
                        else {
                            var t = (target.indexOf( i ) >= 0 ? 1 : count);
                            setTimeout(function() {
                                resolve( i );
                            }, t );
                        }
                    });
                }( i ))
            );
        }

        Promise.race( promises ).then(function( result ) {
            callback( result , test );
        });
    }


}());




























