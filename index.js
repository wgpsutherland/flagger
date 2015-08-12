//==================== NODE MODULES ====================//

var _ = require('underscore');

//==================== EXPORTS =========================//

module.exports = function() {

    var args = process.argv.slice(2); // remove node path and file path
    var obj = {};

    if(args.length > 0) {

        var indices = _.chain(args)
            .map(function (arg, index) {
                if (index === 0) return 0; // catch all arguments without a leading flag
                if (/^-/.test(arg)) return index; // match with flags
                return -1;
            })
            .without(-1)
            .value();

        var separate = _.map(indices, function (item, index) {
            return indices[index + 1] ? args.slice(item, indices[index + 1]) : args.slice(item);
        });

        if (!/^-/.test(separate[0][0])) { // if there are arguments without a leading flag
            obj._ = (separate[0]);
            separate.shift();
        }

        _.each(separate, function(item) {
            var label = item[0].replace('-', ''); // removes the first '-' from the flag
            label = label.replace('-', ''); // removes the second '-' if there is one
            obj[label] = item.slice(1, item.length);
        });
    }

    return obj;
};
