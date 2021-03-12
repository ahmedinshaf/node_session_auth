"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var project_1 = __importDefault(require("../controllers/project"));
var router = express_1.default.Router();
router.post('/', project_1.default.createProject);
router.get('/test', project_1.default.getAllProjects);
module.exports = router;
