import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Project from '../models/project';

const createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { author, title } = req.body;
        const project = new Project({
            _id: new mongoose.Types.ObjectId(),
            author,
            title
        });

        await project.save();
        return res.send(project);
    } catch (e) {
        console.log(e);
    }
};

const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects = await Project.find();
        res.send(projects);
    } catch (e) {}
};

export default { createProject, getAllProjects };
