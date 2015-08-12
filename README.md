Flagger
==========

Easily access command line flags and arguments in node programs.

## Installation

    $ npm install flagger
    
## Example

Run your node program in the command line with the flags and arguments you want to access:

    $ node program.js --print --debug important

At the top of any of your node files:

    var flagger = require('flagger')();
    
Which will give you access to this object within the file:

    flagger = {
        print: [],
        debug: ['important']
    }
    
## Another Example

Running:

    $ node program.js one two three -a -b four -c --d five six
    
Will give you access to this object in any of the files you call flagger:
    
    flagger = {
        _: ['one', 'two', 'three'], // arguments without a preceding flag are stored in flagger._
        a: [],
        b: ['four'],
        c: [],
        d: ['five', 'six']
    }
