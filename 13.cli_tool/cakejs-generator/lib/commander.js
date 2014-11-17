var Command = require('commander').Command;


/**
 * Prompt for a `Number`.
 *
 * @param {String} str
 * @param {Function} fn
 * @api private
 */

Command.prototype.promptForNumber = function(str, fn){
	var self = this;
	this.promptSingleLine(str, function parseNumber(val){
		val = Number(val);
		if (isNaN(val)) return self.promptSingleLine(str + '(must be a number) ', parseNumber);
		fn(val);
	});
};

/**
 * Prompt for a `Date`.
 *
 * @param {String} str
 * @param {Function} fn
 * @api private
 */

Command.prototype.promptForDate = function(str, fn){
	var self = this;
	this.promptSingleLine(str, function parseDate(val){
		val = new Date(val);
		if (isNaN(val.getTime())) return self.promptSingleLine(str + '(must be a date) ', parseDate);
		fn(val);
	});
};


/**
 * Prompt for a `Regular Expression`.
 *
 * @param {String} str
 * @param {Object} pattern regular expression object to test
 * @param {Function} fn
 * @api private
 */

Command.prototype.promptForRegexp = function(str, pattern, fn){
	var self = this;
	this.promptSingleLine(str, function parseRegexp(val){
		if(!pattern.test(val)) return self.promptSingleLine(str + '(regular expression mismatch) ', parseRegexp);
		fn(val);
	});
};


/**
 * Single-line prompt.
 *
 * @param {String} str
 * @param {Function} fn
 * @api private
 */

Command.prototype.promptSingleLine = function(str, fn){
	// determine if the 2nd argument is a regular expression
	if (arguments[1].global !== undefined && arguments[1].multiline !== undefined) {
		return this.promptForRegexp(str, arguments[1], arguments[2]);
	} else if ('function' == typeof arguments[2]) {
		return this['promptFor' + (fn.name || fn)](str, arguments[2]);
	}

	process.stdout.write(str);
	process.stdin.setEncoding('utf8');
	process.stdin.once('data', function(val){
		fn(val.trim());
	}).resume();
};

/**
 * Multi-line prompt.
 *
 * @param {String} str
 * @param {Function} fn
 * @api private
 */

Command.prototype.promptMultiLine = function(str, fn){
	var buf = [];
	console.log(str);
	process.stdin.setEncoding('utf8');
	process.stdin.on('data', function(val){
		if ('\n' == val || '\r\n' == val) {
			process.stdin.removeAllListeners('data');
			fn(buf.join('\n'));
		} else {
			buf.push(val.trimRight());
		}
	}).resume();
};

/**
 * Prompt `str` and callback `fn(val)`
 *
 * Commander supports single-line and multi-line prompts.
 * To issue a single-line prompt simply add white-space
 * to the end of `str`, something like "name: ", whereas
 * for a multi-line prompt omit this "description:".
 *
 *
 * Examples:
 *
 *     program.prompt('Username: ', function(name){
 *       console.log('hi %s', name);
 *     });
 *
 *     program.prompt('Description:', function(desc){
 *       console.log('description was "%s"', desc.trim());
 *     });
 *
 * @param {String|Object} str
 * @param {Function} fn
 * @api public
 */

Command.prototype.prompt = function(str, fn){
	var self = this;
	if ('string' == typeof str) {
		if (/ $/.test(str)) return this.promptSingleLine.apply(this, arguments);
		this.promptMultiLine(str, fn);
	} else {
		var keys = Object.keys(str)
			, obj = {};

		function next() {
			var key = keys.shift()
				, label = str[key];

			if (!key) return fn(obj);
			self.prompt(label, function(val){
				obj[key] = val;
				next();
			});
		}

		next();
	}
};

/**
 * Prompt for password with `str`, `mask` char and callback `fn(val)`.
 *
 * The mask string defaults to '', aka no output is
 * written while typing, you may want to use "*" etc.
 *
 * Examples:
 *
 *     program.password('Password: ', function(pass){
 *       console.log('got "%s"', pass);
 *       process.stdin.destroy();
 *     });
 *
 *     program.password('Password: ', '*', function(pass){
 *       console.log('got "%s"', pass);
 *       process.stdin.destroy();
 *     });
 *
 * @param {String} str
 * @param {String} mask
 * @param {Function} fn
 * @api public
 */

Command.prototype.password = function(str, mask, fn){
	var self = this
		, buf = '';

	// default mask
	if ('function' == typeof mask) {
		fn = mask;
		mask = '';
	}

	keypress(process.stdin);

	function setRawMode(mode) {
		if (process.stdin.setRawMode) {
			process.stdin.setRawMode(mode);
		} else {
			tty.setRawMode(mode);
		}
	};
	setRawMode(true);
	process.stdout.write(str);

	// keypress
	process.stdin.on('keypress', function(c, key){
		if (key && 'enter' == key.name) {
			console.log();
			process.stdin.pause();
			process.stdin.removeAllListeners('keypress');
			setRawMode(false);
			if (!buf.trim().length) return self.password(str, mask, fn);
			fn(buf);
			return;
		}

		if (key && key.ctrl && 'c' == key.name) {
			console.log('%s', buf);
			process.exit();
		}

		process.stdout.write(mask);
		buf += c;
	}).resume();
};

/**
 * Confirmation prompt with `str` and callback `fn(bool)`
 *
 * Examples:
 *
 *      program.confirm('continue? ', function(ok){
 *        console.log(' got %j', ok);
 *        process.stdin.destroy();
 *      });
 *
 * @param {String} str
 * @param {Function} fn
 * @api public
 */


Command.prototype.confirm = function(str, fn, verbose){
	var self = this;
	this.prompt(str, function(ok){
		if (!ok.trim()) {
			if (!verbose) str += '(yes or no) ';
			return self.confirm(str, fn, true);
		}
		fn(parseBool(ok));
	});
};

/**
 * Choice prompt with `list` of items and callback `fn(index, item)`
 *
 * Examples:
 *
 *      var list = ['tobi', 'loki', 'jane', 'manny', 'luna'];
 *
 *      console.log('Choose the coolest pet:');
 *      program.choose(list, function(i){
 *        console.log('you chose %d "%s"', i, list[i]);
 *        process.stdin.destroy();
 *      });
 *
 * @param {Array} list
 * @param {Number|Function} index or fn
 * @param {Function} fn
 * @api public
 */

Command.prototype.choose = function(list, index, fn){
	var self = this
		, hasDefault = 'number' == typeof index;

	if (!hasDefault) {
		fn = index;
		index = null;
	}

	list.forEach(function(item, i){
		if (hasDefault && i == index) {
			console.log('* %d) %s', i + 1, item);
		} else {
			console.log('  %d) %s', i + 1, item);
		}
	});

	function again() {
		self.prompt('  : ', function(val){
			val = parseInt(val, 10) - 1;
			if (hasDefault && isNaN(val)) val = index;

			if (null == list[val]) {
				again();
			} else {
				fn(val, list[val]);
			}
		});
	}

	again();
};


function parseBool(str) {
	return /^y|yes|ok|true$/i.test(str);
}


exports = module.exports = new Command();