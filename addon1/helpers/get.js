import getStream from '../utils/get-stream';

export function getHelper(params, hash, options, env) {
  if (arguments.length === 0) {
    return;
  }

  var view = env.data.view;
  var obj = params[0];
  var key = params[1];

  return getStream(view, obj, key);
}


export default getHelper;
