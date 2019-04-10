import { generateUniqueId } from './index';

const ERROR = 'error';

class AlertService {
  __trigger = () => null;

  register(trigger) {
    this.__trigger = trigger;
  }

  showError(message, detail) {
    this.__trigger({
      id: generateUniqueId(),
      type: ERROR,
      message,
      detail
    });
  }
}

const inst = new AlertService();
window.fire = () => inst.showError('test', 'googoog');
export default inst;
