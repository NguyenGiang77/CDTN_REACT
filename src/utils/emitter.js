import EnventEmitter from 'events';
const _emitter = new EnventEmitter();
_emitter.setMaxListeners(0);
export const emitter = _emitter;