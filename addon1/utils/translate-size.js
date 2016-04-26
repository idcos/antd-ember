/**
 * [translateSize description]
 * @param  {[type]} size [description]
 * @return {[type]}      [description]
 */
export default function translateSize(size) {
	var ret = ''
	switch (size) {
		case 'large':
			ret = 'lg';
			break;
		case 'small':
			ret = 'sm';
			break;
		default:
			break;
	}
	return ret;
}