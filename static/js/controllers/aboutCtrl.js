import aboutView from '../views/about/aboutView.js';
// import aboutModel from '../model/aboutModel.js';

export default class aboutController {
    constructor({ globalEventBus = {} } = {}) {
        this.aboutView = new aboutView({ globalEventBus });
        // this.aboutModel = new aboutModel();
    }
}