import Task from "../modules/Task.js";
import Subjects from "../modules/Subjects.js";
import { validateData } from "../lib/validation.js";
import Group from "../modules/Group.js";
// import {
//   socketAddingTask,
//   socketAddTask,
//   socketDeleteTask,
// } from "../lib/sockets/index.js";
export const createTask = async (req, res) => {
  if (validateData(["title", "date", "subject", "type"], req.body))
    return res.status(400).json({ validationError: true });
  const { title, date, subject, type } = req.body;
  const { user, group } = req;
  var curSubject;
  try {
    if (
      subject.title &&
      (subject.index || subject.index === 0) &&
      subject.color
    ) {
      const { title, index, color } = subject;
      const subjectExist = await Subjects.findOne({ title, group });
      if (subjectExist) {
        await Subjects.updateOne({ title, group }, { color });
        curSubject = subjectExist;
      } else {
        const newSubj = new Subjects({
          title,
          color,
          group,
        });
        curSubject = await newSubj.save();
      }
    } else {
      return res.status(400).json({ validationError1: true });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
  const newTaskData = {
    title,
    index: subject.index,
    date,
    group: group._id,
    subject: curSubject._id,
    createdByUser: user._id,
    type,
    description: req.body.description ?? "",
  };

  const newTask = new Task(newTaskData);
  const newTaskCreated = await newTask.save();
  const newTaskFilled = { ...newTaskCreated._doc, subject: curSubject };
  return res.send(newTaskFilled);
};
export const getData = async (req, res) => {
  // returns group.timetable, tasks
  // const group = await Group.findOne(
  //   { _id: req.group._id },
  //   { calendarData: 1 }
  // );
  try {
    const tasks = await Task.find({ group: req.group._id }).populate("subject");
    return res.send(tasks);
  } catch (err) {
    return res.status(500).send(err);
  }
  // return res.json({ timetable: group.calendarData, tasks });
  // res.json({success: true})
};
export const deleteTask = async (req, res) => {
  if (!req.body.id) return res.status(400).json({ validationError: true });
  try {
    const resp = await Task.deleteOne({ _id: req.body.id });
    // if (resp.deletedCount > 0) socketDeleteTask(req.query.id);
  } catch (err) {
    res.status(400).send(err);
  }
  return res.send(req.body.id);
};
export const getSubjectColor = async (req, res) => {
  const { title } = req.query;
  const subject = await Subjects.findOne(
    { title, group: req.group._id },
    { color: 1 }
  );
  // začíná přidávání tasku
  // socketAddingTask(date, req.user);
  console.log(subject);
  if (subject) {
    return res.send(subject);
  } else {
    return res.send(null);
  }
};
export const getTimetable = async (req, res) => {
  const group = await Group.findOne(
    { _id: req.group._id },
    { calendarData: 1 }
  );
  res.send(group.calendarData);
};
