
/**
 * @imports
 */
import _isTypeObject from '@webqit/util/js/isTypeObject.js';
import getInterceptors from './getInterceptors.js';
import _unproxy from './unproxy.js';

/**
 * Runs a "getProps" type of query operation on a subject.
 * Fires any observers for the specific type that may be bound to subject.
 *
 * @param bool			ownKeys
 * @param array|object	subject
 *
 * @return array
 */
export default function(ownKeys, subject) {
	if (!subject || !_isTypeObject(subject)) {
		throw new Error('Target must be of type object!');
	}
	subject = _unproxy(subject);
	// ---------------------------------
	// Execute any "keys" traps, otherwise "test" the default way
	var interceptors, defaultKeys = function(_keys) {
		return arguments.length ? _keys : (
			ownKeys ? Object.getOwnPropertyNames(subject) : Object.keys(subject)
		);
	};
	if (interceptors = getInterceptors(subject, false)) {
		return interceptors.fire({type:ownKeys ? 'ownKeys' : 'keys'}, defaultKeys) || [];
	}
	return defaultKeys();
}
