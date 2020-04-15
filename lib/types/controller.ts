/*eslint-disable no-unused-vars*/
class ControllerBase {
  _genLog(funName: string, msg: string) {
    return `[controller] - ${funName}: ${msg}`;
  }
}

export default ControllerBase;