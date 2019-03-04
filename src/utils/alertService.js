import { generateUniqueId } from './index';

const ERROR = 'error';

class AlertService {
  register(instance) {
    this.__instance = instance;
  }

  showError(message, detail) {
    this.__instance.triggerAlert({
      id: generateUniqueId(),
      type: ERROR,
      message,
      detail
    });
  }
}

const inst = new AlertService();
export default inst;
